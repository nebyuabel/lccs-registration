"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/lib/supabaseClient";

interface Student {
  id: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  grade_applying_for: number;
  status: string;
  created_at: string;
  parents?: {
    father_name: string | null;
    mother_name: string | null;
    phone: string;
    email: string;
    address: string | null;
  }[];
  documents?: {
    id: string;
    file_name: string;
    file_path: string;
    uploaded_at: string;
  }[];
}

export default function StudentDetail() {
  const params = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const { data, error } = await supabase
        .from("students")
        .select(
          `
          id,
          full_name,
          date_of_birth,
          gender,
          grade_applying_for,
          status,
          created_at,
          parents ( father_name, mother_name, phone, email, address ),
          documents ( id, file_name, file_path, uploaded_at )
        `,
        )
        .eq("id", params.id)
        .single();

      if (error) {
        console.error(error);
        setError("Student not found");
      } else {
        setStudent(data);
      }
      setLoading(false);
    };

    if (params.id) fetchStudent();
  }, [params.id]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#af2b3e]"></div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 text-center">
          <p className="text-red-500">{error || "Student not found"}</p>
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="mt-4 px-4 py-2 bg-[#031634] text-white rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const parent = student.parents?.[0] || null;

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-50/80 backdrop-blur-xl px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/dashboard"
            className="text-[#031634] hover:text-[#af2b3e]"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="w-10 h-10 bg-[#031634] rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">school</span>
          </div>
          <h1 className="font-serif text-xl font-bold text-[#031634]">
            Student Details
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="text-sm text-[#af2b3e] hover:text-[#8e0f28]"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <div className="px-8 py-10 max-w-4xl mx-auto">
        {/* Student Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#c5c6cf]/10 overflow-hidden mb-8">
          <div className="p-6 border-b border-[#c5c6cf]/10 bg-[#f2f4f7]/30">
            <h2 className="font-headline text-xl font-bold text-[#031634]">
              Student Information
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-[#75777e] uppercase tracking-wider">
                Full Name
              </p>
              <p className="font-semibold text-[#031634]">
                {student.full_name}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#75777e] uppercase tracking-wider">
                Date of Birth
              </p>
              <p className="font-semibold text-[#031634]">
                {formatDate(student.date_of_birth)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#75777e] uppercase tracking-wider">
                Gender
              </p>
              <p className="font-semibold text-[#031634]">{student.gender}</p>
            </div>
            <div>
              <p className="text-xs text-[#75777e] uppercase tracking-wider">
                Grade Applying For
              </p>
              <p className="font-semibold text-[#031634]">
                {student.grade_applying_for}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#75777e] uppercase tracking-wider">
                Status
              </p>
              <p
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  student.status === "pending"
                    ? "bg-amber-50 text-amber-700"
                    : student.status === "approved"
                      ? "bg-green-50 text-green-700"
                      : "bg-blue-50 text-blue-700"
                }`}
              >
                {student.status}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#75777e] uppercase tracking-wider">
                Date Applied
              </p>
              <p className="font-semibold text-[#031634]">
                {formatDate(student.created_at)}
              </p>
            </div>
          </div>
        </div>

        {/* Parent/Guardian Info */}
        {parent && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#c5c6cf]/10 overflow-hidden mb-8">
            <div className="p-6 border-b border-[#c5c6cf]/10 bg-[#f2f4f7]/30">
              <h2 className="font-headline text-xl font-bold text-[#031634]">
                Parent/Guardian Information
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-[#75777e] uppercase tracking-wider">
                  Father's Name
                </p>
                <p className="font-semibold text-[#031634]">
                  {parent.father_name || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#75777e] uppercase tracking-wider">
                  Mother's Name
                </p>
                <p className="font-semibold text-[#031634]">
                  {parent.mother_name || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#75777e] uppercase tracking-wider">
                  Phone
                </p>
                <p className="font-semibold text-[#031634]">
                  {parent.phone || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#75777e] uppercase tracking-wider">
                  Email
                </p>
                <p className="font-semibold text-[#031634]">
                  {parent.email || "—"}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-[#75777e] uppercase tracking-wider">
                  Address
                </p>
                <p className="font-semibold text-[#031634]">
                  {parent.address || "—"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Documents */}
        {student.documents && student.documents.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#c5c6cf]/10 overflow-hidden">
            <div className="p-6 border-b border-[#c5c6cf]/10 bg-[#f2f4f7]/30">
              <h2 className="font-headline text-xl font-bold text-[#031634]">
                Uploaded Documents
              </h2>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {student.documents.map((doc) => (
                  <li
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-[#f2f4f7] rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#031634]">
                        description
                      </span>
                      <span className="text-sm font-medium">
                        {doc.file_name}
                      </span>
                    </div>
                    <a
                      href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/documents/${doc.file_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#af2b3e] hover:underline text-sm"
                    >
                      View
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
