import { useFormContext } from "react-hook-form";

export function Step2ParentInfo({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="font-sans uppercase tracking-widest text-[0.7rem] font-bold text-[#44474e] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">male</span>
            Father's Name (optional)
          </label>
          <input
            {...register("father_name")}
            className="w-full bg-[#f2f4f7] border-none rounded-lg py-4 px-5 focus:ring-2 focus:ring-[#cca72f] focus:bg-white"
            placeholder="Full name"
          />
        </div>

        <div className="space-y-2">
          <label className="font-sans uppercase tracking-widest text-[0.7rem] font-bold text-[#44474e] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">female</span>
            Mother's Name (optional)
          </label>
          <input
            {...register("mother_name")}
            className="w-full bg-[#f2f4f7] border-none rounded-lg py-4 px-5 focus:ring-2 focus:ring-[#cca72f] focus:bg-white"
            placeholder="Full name"
          />
        </div>

        <div className="space-y-2">
          <label className="font-sans uppercase tracking-widest text-[0.7rem] font-bold text-[#44474e] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">phone</span>
            Phone Number
          </label>
          <input
            {...register("phone")}
            className="w-full bg-[#f2f4f7] border-none rounded-lg py-4 px-5 focus:ring-2 focus:ring-[#cca72f] focus:bg-white"
            placeholder="+251 9XX XXX XXX"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">
              {errors.phone.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="font-sans uppercase tracking-widest text-[0.7rem] font-bold text-[#44474e] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">mail</span>
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full bg-[#f2f4f7] border-none rounded-lg py-4 px-5 focus:ring-2 focus:ring-[#cca72f] focus:bg-white"
            placeholder="parent@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2 col-span-full">
          <label className="font-sans uppercase tracking-widest text-[0.7rem] font-bold text-[#44474e] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">home</span>
            Home Address (optional)
          </label>
          <textarea
            {...register("address")}
            rows={3}
            className="w-full bg-[#f2f4f7] border-none rounded-lg py-4 px-5 focus:ring-2 focus:ring-[#cca72f] focus:bg-white"
            placeholder="Street, City, Sub-city"
          />
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
          type="button"
          onClick={onNext}
          className="w-full md:w-auto px-10 py-4 rounded-lg bg-gradient-to-r from-[#031634] to-[#364767] text-white font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-lg"
        >
          Save & Continue
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}
