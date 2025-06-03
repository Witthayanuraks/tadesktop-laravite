import { useState } from "react";
import GetJanjiTemu from "../../Components/Guru/GetJanjiTemu";
import RiwayatTemu from "../../Components/Guru/RiwayatTemu";
import SidebarGuru from "../../Components/Guru/SidebarGuru";
export default function DashboardGuru() {
  const [showSidebar, setShowSidebar] = useState(false); 

  return (
    <div className="relative min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <SidebarGuru show={showSidebar} onClose={() => setShowSidebar(false)} />

      {/* Tombol toggle jika sidebar disembunyikan */}
      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          className="fixed top-5 left-5 z-50 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border hover:scale-105 transition"
        >
          <img
            src="https://smkn2-singosari.sch.id/wp-content/uploads/2021/10/logo.png"
            alt="SMKN 2"
            className="w-8 h-8 object-contain"
          />
        </button>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 z-10">
        <GetJanjiTemu />
        <RiwayatTemu />
      </main>
    </div>
  );
}

