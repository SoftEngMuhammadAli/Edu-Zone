import React from "react";

const Dashboard = () => {
  const courses = [
    {
      title: "Dasar Pemrogramman Web",
      desc: "Materi pemrogramman web untuk pemula",
      progress: 20,
    },
    {
      title: "Digital Marketing 101",
      desc: "Dasar-dasar strategi marketing pemula",
      progress: 10,
      status: "sertifikat",
    },
    {
      title: "Data Science Dasar",
      desc: "Materi pemula tentang pengolahan data",
      progress: 50,
    },
    {
      title: "UI/UX Pemula",
      desc: "Dasar-dasar teori dan praktik tentang UI dan UX design",
      progress: 75,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e2344] text-white p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-8">[EduZone]</h1>
        <nav className="space-y-6">
          {[
            "Dashboard",
            "Kursus Saya",
            "Event Saya",
            "Pengaturan",
            "Bantuan",
          ].map((item) => (
            <div key={item} className="hover:text-yellow-400 cursor-pointer">
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="flex justify-end items-center gap-4 mb-6">
          <div className="text-right">
            <p className="text-sm text-gray-500">Hi, Dimas</p>
            <p className="font-semibold">Frontend Developer</p>
          </div>
          <img
            src="https://via.placeholder.com/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
        </div>

        {/* Overview + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overview Chart */}
          <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Overview</h2>
            <div className="flex items-end justify-between h-40">
              {[8, 5, 6, 3, 9, 4, 7, 3, 5, 6].map((val, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-3 rounded-md ${
                      val === 9 ? "bg-black" : "bg-purple-300"
                    }`}
                    style={{ height: `${val * 10}px` }}
                  ></div>
                  <span className="text-xs mt-1">{i + 1} Jan</span>
                </div>
              ))}
            </div>
          </div>

          {/* Statistik */}
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h2 className="font-semibold mb-4">Statistik</h2>
            <div className="relative w-24 h-24 mx-auto">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  className="text-gray-200"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.8"
                />
                <path
                  className="text-yellow-400"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.8"
                  strokeDasharray="65, 100"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                65%
              </span>
            </div>
            <p className="text-sm mt-2">Video ditonton</p>
          </div>
        </div>

        {/* Aktivitas Belajar */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Aktivitas Belajar</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded px-3 py-1"
              />
              <button className="border rounded px-4 py-1">Kategori</button>
            </div>
          </div>

          <div className="space-y-4">
            {courses.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-16 bg-gray-300 rounded" />
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 w-full md:w-1/3">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <span className="text-sm text-gray-500">
                        {item.progress}%
                      </span>
                      <div className="flex items-center gap-1 text-blue-500 cursor-pointer">
                        {item.status && (
                          <span className="text-yellow-500 font-semibold text-xs uppercase">
                            {item.status}
                          </span>
                        )}
                        <span className="text-sm">Lanjutkan</span>
                        <span>{">"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
