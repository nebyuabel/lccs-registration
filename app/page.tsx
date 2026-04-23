import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#C5A028] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9O6d0Q-nS1YehW8CNxVspyTSNjL1WDER9Sw&s"
                  alt="LCCS crest"
                  className="w-full h-full object-cover rounded-full"
                />
              </span>
            </div>
            <span className="font-serif text-xl font-semibold text-[#1A2B4A]">
              Lideta Catholic Cathedral School
            </span>
          </div>
          <Link
            href="/admin/login"
            className="text-sm text-gray-600 hover:text-[#031634] transition"
          >
            Admin
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A2B4A] leading-tight">
              Student Registration <br />
              <span className="text-[#C5A028]">Made Simple</span>
            </h1>
            <p className="text-gray-600 text-lg mt-6 leading-relaxed">
              Welcome to Lideta Catholic Cathedral School's online registration
              portal. Complete your application in minutes, upload documents,
              and secure your spot for the upcoming academic year.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="bg-[#031634] text-white font-semibold px-8 py-3 rounded-lg text-center transition shadow-md hover:shadow-lg"
              >
                Start Registration
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-full max-w-md h-80 px-4 bg-gradient-to-br from-[#1A2B4A]/5 to-[#C5A028]/10 rounded-3xl flex items-center justify-center border border-gray-100 shadow-sm">
              <img
                src="https://files.catholicmission.org.au/transforms/7bc0ee636b3b83484fc3b9348863bd22/382859/LCCS-21_ec856721179297beb3a4f4f64b6dd7b1.JPG"
                alt="LCCS campus"
                className="rounded-3xl h-70 object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#C5A028]/10 rounded-full blur-xl -z-10" />
          </div>
        </div>
      </main>

      <section className="py-20 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#031634]/5 rounded-full -z-10 blur-3xl"></div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMlKkRmbGfVXuC6jBrNONTuRMT7JZtE9MyCx56z3CbQaaAmZBikTPtZhvuYH6ZZ5UjKLiHP0O3Xy0IuQ6c0HE2ulQO_5SUW1Qeo7ZoOit5dCh4jg3CrSed0UKWhhGHATeRXNcYY_XVoQykTKQPPyKpxPsAyUPYqB1iCjIR0mumza8dYoCCfCLQPG2Ad6w3n5iJiFAWfCNUfrj-cZFCIzCvB_Q8210blR9-47HRgvNkOxiILf-R5hkBJV_qax_BSG1AuY1rpj_T0U4"
                alt="Student studying"
                className="rounded-2xl shadow-2xl relative z-10 w-full object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#af2b3e] p-8 rounded-xl shadow-xl z-20 hidden md:block">
                <span className="text-white font-serif text-3xl font-bold italic">
                  70+
                </span>
                <p className="text-white/80 text-[10px] uppercase tracking-widest mt-1">
                  Years of Tradition
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <span className="uppercase tracking-widest text-xs text-[#af2b3e] font-semibold">
                Our Heritage
              </span>
              <h2 className="font-serif text-4xl text-[#031634] leading-tight">
                Rooted in Tradition, <br />
                Focused on the Future
              </h2>
              <p className="text-[#44474e] leading-relaxed">
                Lideta Catholic Cathedral School stands as a beacon of academic
                rigor and moral formation. Our commitment to excellence is
                grounded in the values of the Catholic Church, providing a
                sanctuary where students grow not just in knowledge, but in
                character and spirit.
              </p>
              <p className="text-[#44474e] leading-relaxed">
                Through this new digital portal, we aim to make our community
                more accessible to families while maintaining the same standards
                of integrity that have defined us for decades.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#eceef1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="uppercase tracking-widest text-xs text-[#031634] font-bold">
              Registration Portal
            </span>
            <h2 className="font-serif text-4xl text-[#031634]">
              Designed for Modern Excellence
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-[#031634] mb-8 group-hover:bg-[#031634] group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">bolt</span>
              </div>
              <h3 className="font-serif text-2xl text-[#031634] mb-4">
                Streamlined Efficiency
              </h3>
              <p className="text-[#44474e] text-sm leading-relaxed">
                Complete your entire registration in minutes. Our intelligent
                system remembers your progress and guides you through each
                requirement seamlessly.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center text-[#745b00] mb-8 group-hover:bg-[#745b00] group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">
                  visibility
                </span>
              </div>
              <h3 className="font-serif text-2xl text-[#031634] mb-4">
                Total Transparency
              </h3>
              <p className="text-[#44474e] text-sm leading-relaxed">
                Track your application status in real-time. Receive instant
                notifications on document approvals and admission decisions
                through your dashboard.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-[#af2b3e] mb-8 group-hover:bg-[#af2b3e] group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">
                  encrypted
                </span>
              </div>
              <h3 className="font-serif text-2xl text-[#031634] mb-4">
                Institutional Security
              </h3>
              <p className="text-[#44474e] text-sm leading-relaxed">
                Your family's data is protected by bank-grade encryption. We
                adhere to the highest standards of privacy and institutional
                data governance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#031634] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[30rem]">
              account_balance
            </span>
          </div>
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-white mb-4">
              Your Path to Enrollment
            </h2>
            <p className="text-slate-400 uppercase tracking-widest text-xs">
              Five simple steps to join our legacy
            </p>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {[
                {
                  step: "1",
                  title: "Student Info",
                  desc: "Basic demographics and personal details.",
                },
                {
                  step: "2",
                  title: "Parent Info",
                  desc: "Guardian contacts and emergency data.",
                },
                {
                  step: "3",
                  title: "Academic History",
                  desc: "Transcripts and previous school info.",
                },
                {
                  step: "4",
                  title: "Documents",
                  desc: "Upload IDs and certifications.",
                },
                {
                  step: "5",
                  title: "Review",
                  desc: "Final check and submission.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#C5A028] text-[#031634] flex items-center justify-center font-bold relative">
                    {item.step}
                    <div className="absolute inset-0 rounded-full animate-ping bg-[#C5A028] opacity-20"></div>
                  </div>
                  <h4 className="text-white font-serif text-lg">
                    {item.title}
                  </h4>
                  <p className="text-slate-400 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 flex justify-center">
            <Link
              href="/register"
              className="bg-white text-[#031634] px-10 py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-[#C5A028] hover:text-white transition-colors"
            >
              Begin Registration
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="uppercase tracking-widest text-xs text-[#af2b3e] font-bold">
                Voice of the Community
              </span>
              <h2 className="font-serif text-4xl text-[#031634]">
                Trusted by Generations <br />
                of Families
              </h2>
              <div className="flex gap-4 pt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[#031634] italic">
                    98%
                  </span>
                  <span className="text-xs text-[#44474e] uppercase tracking-widest">
                    Satisfaction
                  </span>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[#031634] italic">
                    5,000+
                  </span>
                  <span className="text-xs text-[#44474e] uppercase tracking-widest">
                    Alumni
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-[#f2f4f7] p-12 rounded-3xl relative">
                <span className="material-symbols-outlined text-6xl text-[#C5A028]/20 absolute top-8 left-8">
                  format_quote
                </span>
                <div className="relative z-10 space-y-6">
                  <p className="text-xl font-serif text-[#031634] italic leading-relaxed">
                    "The registration process was incredibly smooth. As a
                    parent, I value how organized and professional Lideta
                    Catholic Cathedral School is. It gives me peace of mind
                    knowing my child is in such an environment."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1A2B4A]"></div>
                    <div>
                      <p className="font-bold text-[#031634]">Martha Gebre</p>
                      <p className="text-xs text-[#44474e] uppercase tracking-widest">
                        Parent of Grade 9 Student
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#031634]">
              <span className="material-symbols-outlined">verified</span>{" "}
              ACCREDITED
            </div>
            <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#031634]">
              <span className="material-symbols-outlined">church</span> CATHOLIC
              EDUCATION
            </div>
            <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#031634]">
              <span className="material-symbols-outlined">award_star</span> EST.
              1954
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#031634] w-full border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-4">
            <span className="font-serif text-lg text-white">
              Lideta Catholic Cathedral School
            </span>
            <p className="text-sm text-slate-300">
              Nurturing faith and intellect for a brighter future.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="#"
                className="text-slate-400 hover:text-[#C5A028] transition-colors"
              >
                <span className="material-symbols-outlined">public</span>
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-[#C5A028] transition-colors"
              >
                <span className="material-symbols-outlined">mail</span>
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-[#C5A028] transition-colors"
              >
                <span className="material-symbols-outlined">phone</span>
              </a>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="#"
              className="text-slate-400 hover:text-[#C5A028] text-sm transition-colors"
            >
              FAQ
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-[#C5A028] text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-[#C5A028] text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-[#C5A028] text-sm transition-colors"
            >
              Contact Us
            </a>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-slate-300">
              © {new Date().getFullYear()} Lideta Catholic Cathedral School. All
              Rights Reserved.
            </p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-2">
              Addis Ababa, Ethiopia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
