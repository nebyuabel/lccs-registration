import { useFormContext } from "react-hook-form";

export function Step1StudentInfo({ onNext }: { onNext: () => void }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Full Name */}
        <div className="space-y-2 col-span-full">
          <label className="font-sans uppercase tracking-widest text-[0.7rem] font-bold text-[#44474e] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">person</span>
            Student's Full Name
          </label>
          <input
            {...register("full_name")}
            className="w-full bg-[#f2f4f7] border-none rounded-lg py-4 px-5 focus:ring-2 focus:ring-[#cca72f] focus:bg-white transition-all placeholder:text-[#75777e]/50"
            placeholder="Enter complete legal name"
          />
          {errors.full_name && (
            <p className="text-red-500 text-xs">
              {errors.full_name.message as string}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <label className="font-sans uppercase tracking-widest text-[0.7rem] font-bold text-[#44474e] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              calendar_today
            </span>
            Date of Birth
          </label>
          <input
            type="date"
            {...register("date_of_birth")}
            className="w-full bg-[#f2f4f7] border-none rounded-lg py-4 px-5 focus:ring-2 focus:ring-[#cca72f] focus:bg-white"
          />
          {errors.date_of_birth && (
            <p className="text-red-500 text-xs">
              {errors.date_of_birth.message as string}
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label className="font-sans uppercase tracking-widest text-[0.7rem] font-bold text-[#44474e] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">wc</span>
            Gender
          </label>
          <div className="flex gap-4 h-[56px] items-center">
            <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-[#f2f4f7] hover:bg-[#e6e8eb] py-3 rounded-lg transition-colors border border-transparent has-[:checked]:border-[#af2b3e]/20 has-[:checked]:bg-[#af2b3e]/5">
              <input
                type="radio"
                value="Male"
                {...register("gender")}
                className="text-[#af2b3e] focus:ring-[#af2b3e] w-4 h-4"
              />
              <span className="text-sm font-medium">Male</span>
            </label>
            <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-[#f2f4f7] hover:bg-[#e6e8eb] py-3 rounded-lg transition-colors border border-transparent has-[:checked]:border-[#af2b3e]/20 has-[:checked]:bg-[#af2b3e]/5">
              <input
                type="radio"
                value="Female"
                {...register("gender")}
                className="text-[#af2b3e] focus:ring-[#af2b3e] w-4 h-4"
              />
              <span className="text-sm font-medium">Female</span>
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-xs">
              {errors.gender.message as string}
            </p>
          )}
        </div>

        {/* Grade Applying For */}
        <div className="space-y-2 col-span-full">
          <div className="flex justify-between items-center">
            <label className="font-sans uppercase tracking-widest text-[0.7rem] font-bold text-[#44474e] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                grid_view
              </span>
              Grade Applying For
            </label>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="relative flex-grow">
              <select
                {...register("grade_applying_for", { valueAsNumber: true })}
                className="w-full appearance-none bg-[#f2f4f7] border-none rounded-lg py-4 px-5 focus:ring-2 focus:ring-[#cca72f] focus:bg-white"
              >
                <option value={9}>Grade 9</option>
                <option value={10}>Grade 10</option>
                <option value={11}>Grade 11</option>
                <option value={12}>Grade 12</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[#75777e]">
                  expand_more
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 bg-green-50 rounded-lg border border-green-100/50 min-w-fit">
              <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
              <span className="text-xs font-bold text-green-800">
                Grade 9 – 23 seats left
              </span>
            </div>
          </div>
          {errors.grade_applying_for && (
            <p className="text-red-500 text-xs">
              {errors.grade_applying_for.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="pt-8 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="w-full md:w-auto px-10 py-4 rounded-lg bg-gradient-to-r from-[#031634] to-[#364767] text-white font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-lg shadow-[#031634]/20 hover:translate-y-[-2px] transition-all"
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
