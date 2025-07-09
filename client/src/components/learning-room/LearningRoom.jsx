import React from "react";

const LearningRoom = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e2344] text-white p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-8">[EDUFREE]</h1>

        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-1">Statistik</h3>
          <div className="w-full bg-gray-300 h-2 rounded-full">
            <div
              className="bg-yellow-400 h-2 rounded-full"
              style={{ width: "20%" }}
            ></div>
          </div>
          <p className="text-xs mt-1">4 dari 20 modul berhasil diselesaikan</p>
        </div>

        <nav className="space-y-6 text-sm">
          <div>
            <h4 className="text-purple-300 mb-1">Intro</h4>
            <ul className="space-y-1 ml-3">
              <li className="cursor-pointer hover:text-yellow-400">
                Perkenalan Instruktur
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-purple-300 mb-1">Instalasi</h4>
            <ul className="space-y-1 ml-3">
              <li className="cursor-pointer hover:text-yellow-400">
                Download Tools
              </li>
              <li className="text-yellow-400 font-semibold cursor-pointer">
                Installasi Tools
              </li>
              <li className="cursor-pointer hover:text-yellow-400">
                Basic Penggunaan Tools
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-purple-300 mb-1">Dasar HTML</h4>
            <ul className="space-y-1 ml-3">
              <li className="cursor-pointer hover:text-yellow-400">
                Tentang HTML
              </li>
              <li className="cursor-pointer hover:text-yellow-400">
                Menjalankan Kode
              </li>
              <li className="cursor-pointer hover:text-yellow-400">Tag</li>
              <li className="cursor-pointer hover:text-yellow-400">
                Header dan Paragraf
              </li>
              <li className="cursor-pointer hover:text-yellow-400">Link</li>
              <li className="cursor-pointer hover:text-yellow-400">Tabel</li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button className="md:hidden text-2xl">☰</button>
          <div className="flex items-center gap-4">
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
        </div>

        {/* Video player section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Dasar Pemrogramman Web</h2>
          <h1 className="text-2xl font-bold mb-4">Installasi Tools</h1>

          <div className="aspect-w-16 aspect-h-9 bg-gray-300 rounded-xl overflow-hidden relative">
            <img
              src="https://via.placeholder.com/800x450"
              alt="Video Thumbnail"
              className="object-cover w-full h-full"
            />
            <button className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                <div className="text-black text-2xl">▶</div>
              </div>
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button className="bg-yellow-300 px-4 py-2 rounded font-semibold">
            Kembali
          </button>
          <button className="bg-yellow-400 px-4 py-2 rounded font-semibold">
            Selesai & Lanjut
          </button>
        </div>
      </main>
    </div>
  );
};

export default LearningRoom;
