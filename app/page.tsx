import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#C5A028] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">LCCS</span>
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
                className="bg-[#C5A028] hover:bg-[#b08c22] text-white font-semibold px-8 py-3 rounded-lg text-center transition shadow-md hover:shadow-lg"
              >
                Start Registration
              </Link>
              <Link
                href="#info"
                className="border border-gray-300 hover:border-[#C5A028] text-gray-700 hover:text-[#C5A028] font-semibold px-8 py-3 rounded-lg text-center transition"
              >
                Learn More
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#C5A028]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Secure data</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#C5A028]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>5‑minute process</span>
              </div>
            </div>
          </div>

          {/* Right side: Illustration / Placeholder */}
          <div className="relative flex justify-center">
            <div className="w-full max-w-md h-80 bg-gradient-to-br from-[#1A2B4A]/5 to-[#C5A028]/10 rounded-3xl flex items-center justify-center border border-gray-100 shadow-sm">
              <div className="text-center">
                <svg
                  className="w-24 h-24 mx-auto text-[#1A2B4A]/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <p className="mt-4 text-gray-400 text-sm">
                  Register online, skip the queue
                </p>
              </div>
            </div>
            {/* Optional decorative element */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#C5A028]/10 rounded-full blur-xl -z-10"></div>
          </div>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="border-t border-gray-100 mt-16 py-6 text-center text-gray-400 text-sm">
        <p>
          © {new Date().getFullYear()} Lideta Catholic Cathedral School. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}
