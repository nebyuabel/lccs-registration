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
  parents?: Array<{
    father_name: string | null;
    mother_name: string | null;
    phone: string;
    email: string;
    address: string | null;
  }> | null;
}

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const studentId = searchParams.get("id");
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) {
      setError("No student ID provided.");
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

      if (error) {
        setError(error.message);
      } else {
        setStudent(data);
      }
      setLoading(false);
    }

    fetchData();
  }, [studentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#af2b3e]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center max-w-md">
          <span className="material-symbols-outlined text-6xl text-red-500 mb-4">
            error
          </span>
          <h2 className="font-headline text-2xl font-bold text-[#031634]">
            Error
          </h2>
          <p className="text-[#44474e] mt-2">{error}</p>
          <Link
            href="/register"
            className="inline-block mt-6 px-6 py-3 bg-[#031634] text-white rounded-lg hover:bg-[#1a2b4a] transition"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center max-w-md">
          <span className="material-symbols-outlined text-6xl text-[#af2b3e] mb-4">
            info
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
  const shortId = student.id.slice(0, 8).toUpperCase();
  const parent = student.parents?.[0] || null;

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#031634] font-body">
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

      <main className="flex-grow flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-xl p-8 md:p-16 shadow-[0_8px_32px_rgba(3,22,52,0.04)] relative overflow-hidden border border-[#c5c6cf]/10">
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

              {/* ID Card Section */}
              <div id="id-card" className="w-full max-w-2xl mb-12 print:mb-0">
                <div className="bg-[#f2f4f7] p-6 rounded-lg border border-[#c5c6cf]/20">
                  <h3 className="font-headline text-xl font-semibold text-[#031634] mb-4">
                    Your Student ID Card
                  </h3>
                  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
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
                          2026-08-31
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
            </div>
          </div>
        </div>
      </main>

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
          .print\:mb-0 {
            margin-bottom: 0 !important;
          }
          header,
          footer,
          .print\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
