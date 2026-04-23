"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";

import EmailModal from "../components/EmailModal";

interface Student {
  id: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  grade_applying_for: number;
  status: string;
  created_at: string;
  parents?: Array<{
    father_name: string | null;
    mother_name: string | null;
    phone: string;
    email: string;
    address: string | null;
  }>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [gradeFilter, setGradeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuthenticated");
    if (!isAuth) {
      router.push("/admin/login");
    }
  }, [router]);

  // Fetch students
  useEffect(() => {
    async function fetchStudents() {
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
          parents ( father_name, mother_name, phone, email, address )
        `,
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching students:", error);
      } else {
        setStudents(data || []);
        setFilteredStudents(data || []);
      }
      setLoading(false);
    }

    fetchStudents();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...students];

    if (gradeFilter !== "all") {
      filtered = filtered.filter(
        (s) => s.grade_applying_for.toString() === gradeFilter,
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((s) => s.status === statusFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.parents?.email?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredStudents(filtered);
  }, [gradeFilter, statusFilter, searchTerm, students]);

  // Update student status
  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("students")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      alert("Failed to update status");
    } else {
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)),
      );
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{
    id: string;
    full_name: string;
    email: string;
  } | null>(null);
  const openEmailModal = (student: any) => {
    const email = student.parents?.[0]?.email; // parents is an array
    if (!email) {
      alert("No email address found for this student.");
      return;
    }
    setSelectedStudent({
      id: student.id,
      full_name: student.full_name,
      email,
    });
    setModalOpen(true);
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "ID",
      "Full Name",
      "Grade",
      "Status",
      "Date Applied",
      "Phone",
      "Email",
    ];
    const rows = filteredStudents.map((s) => [
      s.id.slice(0, 8),
      s.full_name,
      s.grade_applying_for,
      s.status,
      new Date(s.created_at).toLocaleDateString(),
      s.parents?.[0]?.phone || "",
      s.parents?.[0]?.email || "",
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    router.push("/admin/login");
  };

  // Statistics
  const total = students.length;
  const pending = students.filter((s) => s.status === "pending").length;
  const approved = students.filter((s) => s.status === "approved").length;
  const waitlisted = students.filter((s) => s.status === "waitlisted").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#af2b3e]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-50/80 backdrop-blur-xl px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#031634] rounded-lg flex items-center justify-center text-white">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9O6d0Q-nS1YehW8CNxVspyTSNjL1WDER9Sw&s"
              alt=""
            />
          </div>
          <h1 className="font-serif text-xl font-bold text-[#031634]">
            Admin Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={handleLogout}
            className="text-sm text-[#af2b3e] hover:text-[#8e0f28] flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Logout
          </button>
        </div>
      </header>

      <div className="px-8 py-10 max-w-screen-2xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c5c6cf]/10">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-[#031634]/10 rounded-xl flex items-center justify-center text-[#031634]">
                <span className="material-symbols-outlined">groups</span>
              </div>
            </div>
            <p className="text-sm font-medium text-[#75777e]">
              Total Applications
            </p>
            <h3 className="text-3xl font-serif font-bold text-[#031634] mt-1">
              {total}
            </h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c5c6cf]/10">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                <span className="material-symbols-outlined">
                  pending_actions
                </span>
              </div>
            </div>
            <p className="text-sm font-medium text-[#75777e]">Pending Review</p>
            <h3 className="text-3xl font-serif font-bold text-[#031634] mt-1">
              {pending}
            </h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c5c6cf]/10">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
            </div>
            <p className="text-sm font-medium text-[#75777e]">Approved</p>
            <h3 className="text-3xl font-serif font-bold text-[#031634] mt-1">
              {approved}
            </h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c5c6cf]/10">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#031634]">
                <span className="material-symbols-outlined">hourglass_top</span>
              </div>
            </div>
            <p className="text-sm font-medium text-[#75777e]">Waitlisted</p>
            <h3 className="text-3xl font-serif font-bold text-[#031634] mt-1">
              {waitlisted}
            </h3>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#c5c6cf]/10 overflow-hidden">
          {/* Filters */}
          <div className="p-6 border-b border-[#c5c6cf]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#75777e]">
                filter_list
              </span>
              <span className="text-sm font-bold text-[#031634] uppercase tracking-widest">
                Refine Results
              </span>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#f2f4f7] border-none text-sm rounded-lg py-2 px-4 focus:ring-2 focus:ring-[#cca72f] w-full sm:w-64"
              />
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="bg-[#f2f4f7] border-none text-xs font-bold text-[#031634] rounded-lg py-2 pl-4 pr-10"
              >
                <option value="all">All Grades</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#f2f4f7] border-none text-xs font-bold text-[#031634] rounded-lg py-2 pl-4 pr-10"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="waitlisted">Waitlisted</option>
              </select>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#745b00] text-[#745b00] font-bold text-sm hover:bg-[#745b00] hover:text-white transition"
              >
                <span className="material-symbols-outlined text-sm">
                  download
                </span>
                Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#f2f4f7]/30 border-b border-[#c5c6cf]/10">
                  <th className="px-6 py-4 text-[11px] font-bold text-[#75777e] uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-[#75777e] uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-[#75777e] uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-[#75777e] uppercase tracking-wider">
                    Date Applied
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-[#75777e] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-[#75777e] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c5c6cf]/10">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-[#f2f4f7]/50 transition"
                  >
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono font-bold text-[#75777e]">
                        #{student.id.slice(0, 8)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#d8e2ff] text-[#031634] text-[10px] flex items-center justify-center font-bold">
                          {student.full_name.charAt(0)}
                        </div>
                        <p className="text-sm font-semibold text-[#031634]">
                          {student.full_name}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-[#44474e] px-2 py-1 bg-[#f2f4f7] rounded-md">
                        Grade {student.grade_applying_for}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-[#75777e]">
                        {new Date(student.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={student.status}
                        onChange={(e) =>
                          updateStatus(student.id, e.target.value)
                        }
                        className={`text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1 border ${
                          student.status === "pending"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : student.status === "approved"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="waitlisted">Waitlisted</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            router.push(`/admin/student/${student.id}`)
                          }
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#75777e] hover:bg-[#031634] hover:text-white transition"
                        >
                          <span className="material-symbols-outlined text-lg">
                            visibility
                          </span>
                        </button>
                        <button
                          onClick={() => openEmailModal(student)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#75777e] hover:bg-[#745b00] hover:text-white transition"
                        >
                          <span className="material-symbols-outlined text-lg">
                            mail
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {modalOpen && selectedStudent && (
            <EmailModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              student={selectedStudent}
              onStatusChange={updateStatus} // we have updateStatus function already
            />
          )}

          {/* Pagination placeholder */}
          <div className="p-6 bg-[#f2f4f7]/10 border-t border-[#c5c6cf]/10 flex justify-between items-center">
            <p className="text-[11px] text-[#75777e] uppercase tracking-wider">
              Showing {filteredStudents.length} of {students.length} entries
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}
