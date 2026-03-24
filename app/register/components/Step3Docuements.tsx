import { useState } from "react";

export function Step3Documents({
  uploadedFiles,
  setUploadedFiles,
  onNext,
  onPrev,
}: {
  uploadedFiles: File[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 text-[#031634]/50">
      <div className="space-y-4">
        <label className="font-sans uppercase tracking-widest text-[0.7rem] font-bold text-[#44474e] flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">upload_file</span>
          Upload Supporting Documents
        </label>
        <div className="border-2 border-dashed border-[#c5c6cf] rounded-lg p-8 text-center hover:border-[#cca72f] transition">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-flex items-center gap-2 text-[#af2b3e] hover:text-[#8e0f28]"
          >
            <span className="material-symbols-outlined">cloud_upload</span>
            Click to upload
          </label>
          <p className="text-xs text-[#75777e] mt-2">
            Upload birth certificate, last report card, and any other relevant
            documents
          </p>
        </div>

        {uploadedFiles.length > 0 && (
          <ul className="space-y-2 mt-4">
            {uploadedFiles.map((file, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center p-3 bg-[#f2f4f7] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#031634]">
                    description
                  </span>
                  <span className="text-sm truncate max-w-[200px]">
                    {file.name}
                  </span>
                  <span className="text-xs text-[#75777e]">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="text-red-500 hover:text-red-700"
                >
                  <span className="material-symbols-outlined text-sm">
                    delete
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
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
          type="button"
          onClick={onNext}
          className="w-full md:w-auto px-10 py-4 rounded-lg bg-gradient-to-r from-[#031634] to-[#364767] text-white font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-lg"
        >
          Continue to Review
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}
