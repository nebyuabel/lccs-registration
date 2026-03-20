"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/lib/supabaseClient";

interface StudentData {
  id: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  grade_applying_for: number;
  parents?: {
    father_name: string | null;
    mother_name: string | null;
    phone: string;
    email: string;
    address: string | null;
  } | null;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const studentId = searchParams.get("id");
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      const { data, error } = await supabase
        .from("students")
        .select(
          `
          id,
          full_name,
          date_of_birth,
          gender,
          grade_applying_for,
          parents ( father_name, mother_name, phone, email, address )
        `,
        )
        .eq("id", studentId)
        .single();

      if (!error && data) {
        setStudent(data);
      }
      setLoading(false);
    }

    fetchData();
  }, [studentId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#af2b3e] mx-auto"></div>
          <p className="mt-4 text-[#44474e]">Loading your registration...</p>
        </div>
      </div>
    );
  }

  if (!student || !studentId) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center max-w-md">
          <span className="material-symbols-outlined text-6xl text-[#af2b3e] mb-4">
            error
          </span>
          <h2 className="font-headline text-2xl font-bold text-[#031634]">
            No Registration Found
          </h2>
          <p className="text-[#44474e] mt-2">
            Please complete the registration form first.
          </p>
          <Link
            href="/register"
            className="inline-block mt-6 px-6 py-3 bg-[#031634] text-white rounded-lg hover:bg-[#1a2b4a] transition"
          >
            Start Registration
          </Link>
        </div>
      </div>
    );
  }

  // Format date of birth
  const formattedDob = new Date(student.date_of_birth).toLocaleDateString();

  // Generate a simple student ID (you can use the UUID or a formatted one)
  const shortId = student.id.slice(0, 8).toUpperCase();

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-body">
      {/* Fixed TopAppBar (same as landing page) */}
      <header className="bg-slate-50/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="font-serif text-xl font-bold text-blue-900">
              Lideta Catholic Cathedral School
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="font-sans uppercase tracking-widest text-xs text-slate-600 hover:text-red-700 transition"
            >
              Admissions
            </a>
            <a
              href="#"
              className="font-sans uppercase tracking-widest text-xs text-slate-600 hover:text-red-700 transition"
            >
              Academics
            </a>
            <a
              href="#"
              className="font-sans uppercase tracking-widest text-xs text-slate-600 hover:text-red-700 transition"
            >
              Faith
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[#44474e] cursor-pointer hover:text-[#031634]">
              language
            </span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-xl p-8 md:p-16 shadow-[0_8px_32px_rgba(3,22,52,0.04)] relative overflow-hidden border border-[#c5c6cf]/10">
            {/* Decorative school icon */}
            <div className="absolute -top-12 -right-12 opacity-[0.03] pointer-events-none">
              <span
                className="material-symbols-outlined text-[240px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                school
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-[#f2f4f7] rounded-full flex items-center justify-center mb-8">
                <span
                  className="material-symbols-outlined text-[#af2b3e] text-5xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>

              <p className="font-sans uppercase tracking-[0.2em] text-xs text-[#af2b3e] font-bold mb-3">
                Submission Confirmed
              </p>
              <h1 className="font-headline text-4xl md:text-5xl text-[#031634] mb-6 leading-tight">
                Application Successfully Submitted!
              </h1>
              <p className="text-[#44474e] max-w-lg mx-auto mb-10 leading-relaxed">
                Welcome to the LCCS family journey. Your application has been
                logged into our admissions portal.
              </p>

              {/* ID Card Section - This is what we'll print */}
              <div id="id-card" className="w-full max-w-2xl mb-12 print:mb-0">
                <div className="bg-[#f2f4f7] p-6 rounded-lg border border-[#c5c6cf]/20">
                  <h3 className="font-headline text-xl font-semibold text-[#031634] mb-4">
                    Your Student ID Card
                  </h3>
                  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    {/* Avatar placeholder */}
                    <div className="w-28 h-28 bg-gradient-to-br from-[#031634] to-[#1a2b4a] rounded-full flex items-center justify-center text-white shadow-md">
                      <span className="material-symbols-outlined text-5xl">
                        account_circle
                      </span>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-xs text-[#75777e] uppercase tracking-wide">
                        Student ID
                      </p>
                      <p className="font-mono text-lg font-bold text-[#031634] mb-2">
                        LCCS-{shortId}
                      </p>
                      <p className="text-xs text-[#75777e] uppercase tracking-wide mt-3">
                        Full Name
                      </p>
                      <p className="font-semibold text-lg">
                        {student.full_name}
                      </p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 text-sm">
                        <div>
                          <span className="text-[#75777e]">Grade:</span>{" "}
                          {student.grade_applying_for}
                        </div>
                        <div>
                          <span className="text-[#75777e]">DOB:</span>{" "}
                          {formattedDob}
                        </div>
                        <div>
                          <span className="text-[#75777e]">Gender:</span>{" "}
                          {student.gender}
                        </div>
                        <div>
                          <span className="text-[#75777e]">Valid Until:</span>{" "}
                          2025-08-31
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mt-6 print:hidden">
                <Link
                  href="/"
                  className="flex-1 bg-[#031634] text-white py-4 px-8 rounded-lg font-medium flex items-center justify-center gap-3 hover:-translate-y-1 transition-all shadow-lg active:scale-95"
                >
                  <span>Return to Homepage</span>
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>
                <button
                  onClick={handlePrint}
                  className="flex-1 bg-[#745b00] text-white py-4 px-8 rounded-lg font-medium flex items-center justify-center gap-3 hover:-translate-y-1 transition-all shadow-lg active:scale-95"
                >
                  <span className="material-symbols-outlined">print</span>
                  <span>Print ID Card</span>
                </button>
              </div>

              <div className="mt-10 pt-10 border-t border-[#c5c6cf]/10 w-full">
                <p className="text-xs text-[#75777e] italic">
                  A confirmation email has been sent to{" "}
                  {student.parents?.email || "your registered email"}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer (same as landing) */}
      <footer className="bg-[#031634] w-full mt-auto border-t border-white/10 print:hidden">
        <div className="w-full px-8 py-12 flex flex-col md:flex-row justify-between items-center max-w-screen-2xl mx-auto">
          <div className="mb-8 md:mb-0">
            <span className="font-serif text-lg text-white block mb-2">
              Lideta Catholic Cathedral School
            </span>
            <p className="font-sans text-sm text-slate-300">
              © 2024 Lideta Catholic Cathedral School. All Rights Reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="#"
              className="text-slate-400 hover:text-[#eac249] font-sans text-sm transition-colors"
            >
              FAQ
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-[#eac249] font-sans text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-[#eac249] font-sans text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-[#eac249] font-sans text-sm transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #id-card,
          #id-card * {
            visibility: visible;
          }
          #id-card {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            margin: 0;
            padding: 1rem;
          }
          .print\\:mb-0 {
            margin-bottom: 0 !important;
          }
          header,
          footer,
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
