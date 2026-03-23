import { RegistrationData } from "../page";

export function Step4Review({
  data,
  uploadedFiles,
  isSubmitting,
  onPrev,
}: {
  data: RegistrationData;
  uploadedFiles: File[];
  isSubmitting: boolean;
  onPrev: () => void;
}) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#031634]">
          Student Information
        </h3>
        <div className="grid grid-cols-2 gap-4 p-4 bg-[#f2f4f7] rounded-lg">
          <div className="text-sm text-[#44474e]">Full Name:</div>
          <div className="text-sm font-medium">{data.full_name}</div>
          <div className="text-sm text-[#44474e]">Date of Birth:</div>
          <div className="text-sm font-medium">{data.date_of_birth}</div>
          <div className="text-sm text-[#44474e]">Gender:</div>
          <div className="text-sm font-medium">{data.gender}</div>
          <div className="text-sm text-[#44474e]">Grade Applying For:</div>
          <div className="text-sm font-medium">{data.grade_applying_for}</div>
        </div>

        <h3 className="text-lg font-semibold text-[#031634]">
          Parent/Guardian Information
        </h3>
        <div className="grid grid-cols-2 gap-4 p-4 bg-[#f2f4f7] rounded-lg">
          <div className="text-sm text-[#44474e]">Father's Name:</div>
          <div className="text-sm font-medium">{data.father_name || "—"}</div>
          <div className="text-sm text-[#44474e]">Mother's Name:</div>
          <div className="text-sm font-medium">{data.mother_name || "—"}</div>
          <div className="text-sm text-[#44474e]">Phone:</div>
          <div className="text-sm font-medium">{data.phone}</div>
          <div className="text-sm text-[#44474e]">Email:</div>
          <div className="text-sm font-medium">{data.email}</div>
          <div className="text-sm text-[#44474e]">Address:</div>
          <div className="text-sm font-medium">{data.address || "—"}</div>
        </div>

        <h3 className="text-lg font-semibold text-[#031634]">
          Uploaded Documents
        </h3>
        <div className="p-4 bg-[#f2f4f7] rounded-lg">
          {uploadedFiles.length === 0 ? (
            <p className="text-sm text-[#75777e]">No documents uploaded</p>
          ) : (
            <ul className="space-y-2">
              {uploadedFiles.map((file, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-sm">
                    description
                  </span>
                  {file.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="pt-8 flex flex-col md:flex-row justify-between gap-6">
        <button
          type="button"
          onClick={onPrev}
          className="text-sm font-semibold text-[#75777e] hover:text-[#031634] transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-10 py-4 rounded-lg bg-gradient-to-r from-[#031634] to-[#364767] text-white font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Registration"}
          {!isSubmitting && (
            <span className="material-symbols-outlined text-sm">
              check_circle
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
