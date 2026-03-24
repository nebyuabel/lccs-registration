"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Step1StudentInfo } from "./components/Step1StudentInfo";
import { Step2ParentInfo } from "./components/Step2ParentInfo";
import { Step3Documents } from "./components/Step3Docuements";
import { Step4Review } from "./components/Step4Review";

// Combined schema for all steps
const registrationSchema = z.object({
  // Step 1
  full_name: z.string().min(2, "Full name is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female"]),
  grade_applying_for: z.number().min(9).max(12),
  // Step 2
  father_name: z.string().optional(),
  mother_name: z.string().optional(),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required"),
  address: z.string().optional(),
  // Step 3 (documents – handled separately)
});

export type RegistrationData = z.infer<typeof registrationSchema>;

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const methods = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      full_name: "",
      date_of_birth: "",
      gender: "Male",
      grade_applying_for: 9,
      father_name: "",
      mother_name: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: RegistrationData) => {
    setIsSubmitting(true);
    try {
      // 1. Insert student
      const { data: student, error: studentError } = await supabase
        .from("students")
        .insert({
          full_name: data.full_name,
          date_of_birth: data.date_of_birth,
          gender: data.gender,
          grade_applying_for: data.grade_applying_for,
        })
        .select()
        .single();

      if (studentError) throw studentError;

      // 2. Insert parent/guardian
      const { error: parentError } = await supabase.from("parents").insert({
        student_id: student.id,
        father_name: data.father_name || null,
        mother_name: data.mother_name || null,
        phone: data.phone,
        email: data.email,
        address: data.address || null,
      });

      if (parentError) throw parentError;

      // 3. Upload documents to storage
      for (const file of uploadedFiles) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${student.id}/${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("documents")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // 4. Save document record
        const { error: docError } = await supabase.from("documents").insert({
          student_id: student.id,
          file_name: file.name,
          file_path: fileName,
          file_type: file.type,
        });

        if (docError) throw docError;
      }

      // Success – redirect to success page
      router.push(`/register/success?id=${student.id}`);
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const {
    formState: { errors },
  } = methods;
  console.log("Form errors:", errors);

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col">
      {/* Navbar – copy from your landing page */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#C5A028] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9O6d0Q-nS1YehW8CNxVspyTSNjL1WDER9Sw&s"
                  alt=""
                />
              </span>
            </div>
            <span className="font-serif text-xl font-semibold text-[#1A2B4A]">
              Lideta Catholic Cathedral School
            </span>
          </div>
          <Link
            href="/admin/login"
            className="text-sm text-gray-600 hover:text-[#C5A028] transition"
          >
            Admin
          </Link>
        </div>
      </nav>

      <main className="grow flex flex-col items-center justify-start pt-12 pb-24 px-4 sm:px-6">
        <div className="w-full max-w-3xl mb-12">
          <div className="text-center mb-10">
            <span className="font-sans uppercase tracking-[0.2em] text-[0.65rem] text-[#af2b3e] font-bold mb-2 block">
              Student Enrollment 2024-2025
            </span>
            <h2 className="font-headline text-4xl text-[#031634] font-bold">
              Registration Wizard
            </h2>
          </div>

          {/* Stepper */}
          <div className="relative">
            <div className="flex justify-between items-end mb-4">
              <div className="flex flex-col items-start">
                <span className="text-xs font-bold text-[#af2b3e] uppercase tracking-wider">
                  Step {step.toString().padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold text-[#031634]">
                  {step === 1 && "Student Information"}
                  {step === 2 && "Parent / Guardian Info"}
                  {step === 3 && "Document Upload"}
                  {step === 4 && "Review & Submit"}
                </span>
              </div>
              <span className="text-xs font-medium text-[#75777e]">
                {step < 4
                  ? `Next: ${step === 1 ? "Parent Info" : step === 2 ? "Documents" : "Review"}`
                  : "Ready to submit"}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 h-1.5 w-full">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className="rounded-full overflow-hidden bg-[#e0e3e6]"
                >
                  <div
                    className={`h-full transition-all duration-300 ${
                      s <= step ? "bg-[#af2b3e] w-full" : "w-0"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl shadow-[#031634]/5 p-8 md:p-12 relative overflow-hidden border border-[#c5c6cf]/10">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-10 relative z-10"
            >
              {step === 1 && <Step1StudentInfo onNext={nextStep} />}
              {step === 2 && (
                <Step2ParentInfo onNext={nextStep} onPrev={prevStep} />
              )}
              {step === 3 && (
                <Step3Documents
                  uploadedFiles={uploadedFiles}
                  setUploadedFiles={setUploadedFiles}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}
              {step === 4 && (
                <Step4Review
                  data={methods.getValues()}
                  uploadedFiles={uploadedFiles}
                  isSubmitting={isSubmitting}
                  onPrev={prevStep}
                />
              )}
            </form>
          </FormProvider>
        </div>
        <p className="mt-8 text-xs text-[#75777e] font-medium">
          Need help?{" "}
          <a href="#" className="text-[#af2b3e] hover:underline">
            Contact Admissions Office
          </a>
        </p>
      </main>

      <footer className="bg-[#031634] w-full mt-auto border-t border-white/10">
        <div className="w-full px-8 py-12 flex flex-col md:flex-row justify-between items-center max-w-screen-2xl mx-auto">
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <span className="font-serif text-lg text-white mb-2">
              Lideta Catholic Cathedral School
            </span>
            <p className="font-sans text-sm text-slate-300">
              © {new Date().getFullYear()} Lideta Catholic Cathedral School. All
              Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
