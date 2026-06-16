function DashboardLayout({

  children,

  title,

  subtitle

}) {

  return (

    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* ================================= */}
      {/* SIDEBAR */}
      {/* ================================= */}

      <div className="w-[260px] bg-slate-900 border-r border-slate-800 p-6">
    {/* <div className="w-[260px] bg-white border-r border-slate-200 p-6"> */}

        {/* LOGO */}

        <h1 className="text-3xl font-bold text-cyan-400 mb-12">

          FaceAttend AI

        </h1>

        {/* NAVIGATION */}

        <div className="space-y-4">

          <button
            onClick={() => window.location.href="/dashboard"}
            className="w-full text-left bg-slate-800 hover:bg-slate-700 p-4 rounded-xl transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => window.location.href="/students"}
            className="w-full text-left bg-slate-800 hover:bg-slate-700 p-4 rounded-xl transition"
          >
            Students
          </button>

          <button
            onClick={() => window.location.href="/attendance"}
            className="w-full text-left bg-slate-800 hover:bg-slate-700 p-4 rounded-xl transition"
          >
            Live Attendance
          </button>

          <button
            onClick={() => window.location.href="/attendance-history"}
            className="w-full text-left bg-slate-800 hover:bg-slate-700 p-4 rounded-xl transition"
          >
            Attendance History
          </button>

        </div>

        {/* FOOTER */}

        <div className="absolute bottom-8 left-6 text-slate-500 text-sm">

          Enterprise AI Attendance System

        </div>

      </div>

      {/* ================================= */}
      {/* MAIN CONTENT */}
      {/* ================================= */}

      <div className="flex-1">

        {/* TOPBAR */}

        <div className="border-b border-slate-800 px-10 py-6 flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              {title}
            </h1>

            <p className="text-slate-400 mt-2">
              {subtitle}
            </p>

          </div>

          {/* PROFILE */}

          <div className="flex items-center gap-4">

            <div className="bg-cyan-600 w-12 h-12 rounded-full flex items-center justify-center font-bold">

              AI

            </div>

          </div>

        </div>

        {/* PAGE CONTENT */}

        <div className="p-10">

          {children}

        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;