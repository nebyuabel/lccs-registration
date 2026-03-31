"use client";

import { useState } from "react";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    id: string;
    full_name: string;
    email: string;
  };
  onStatusChange: (id: string, newStatus: string) => void;
}

export default function EmailModal({
  isOpen,
  onClose,
  student,
  onStatusChange,
}: EmailModalProps) {
  const [status, setStatus] = useState("approved");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    setSending(true);
    try {
      // Update status in Supabase
      const resStatus = await fetch("/api/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: student.id, status }),
      });
      if (!resStatus.ok) {
        const errorData = await resStatus.json();
        console.error("Status update error:", errorData);
        throw new Error(errorData.error || "Failed to update status");
      }

      // Send email using student data
      const resEmail = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: student.email,
          studentName: student.full_name,
          status,
          message,
        }),
      });

      if (!resEmail.ok) {
        const errorData = await resEmail.json();
        throw new Error(errorData.error || "Failed to send email");
      }

      const result = await resEmail.json();
      if (result.previewUrl) {
        alert(`Email sent to test inbox. View it here: ${result.previewUrl}`);
      } else {
        alert("Email sent successfully!");
      }

      // Update local state
      onStatusChange(student.id, status);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to send email. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <h3 className="font-headline text-xl font-bold text-[#031634] mb-4">
          Update Application Status
        </h3>
        <p className="text-sm text-[#44474e] mb-4">
          Student: <strong>{student.full_name}</strong>
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#44474e] mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full text-black bg-[#f2f4f7] border-none rounded-lg py-2 px-3 focus:ring-2 focus:ring-[#cca72f]"
            >
              <option value="approved">Approve</option>
              <option value="rejected">Reject</option>
              <option value="waitlisted">Waitlist</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#44474e] mb-2">
              Optional Message (will be included in email)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-[#f2f4f7] border-none rounded-lg py-2 px-3 focus:ring-2 focus:ring-[#cca72f]"
              placeholder="Add any additional information for the parent..."
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[#75777e] hover:text-[#031634] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={sending}
            className="px-4 py-2 bg-[#031634] text-white rounded-lg text-sm font-semibold hover:bg-[#1a2b4a] transition disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Email & Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
