import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
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
            className="text-sm text-gray-600 hover:text-[#031634] transition"
          >
            Admin
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side: Text */}
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

          {/* Right side: Illustration / Placeholder */}
          <div className="relative flex justify-center">
            <div className="w-full max-w-md h-80 px-4 bg-gradient-to-br from-[#1A2B4A]/5 to-[#C5A028]/10 rounded-3xl flex items-center justify-center border border-gray-100 shadow-sm">
              <img
                src="https://files.catholicmission.org.au/transforms/7bc0ee636b3b83484fc3b9348863bd22/382859/LCCS-21_ec856721179297beb3a4f4f64b6dd7b1.JPG"
                alt=""
                className="rounded-3xl h-70"
              />
            </div>
            {/* Optional decorative element */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#C5A028]/10 rounded-full blur-xl -z-10">
              {" "}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9O6d0Q-nS1YehW8CNxVspyTSNjL1WDER9Sw&s"
                alt=""
              />
            </div>
          </div>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="border-t border-gray-100 mt-36 py-6 text-center text-gray-400 text-sm">
        <p>
          © {new Date().getFullYear()} Lideta Catholic Cathedral School. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}
