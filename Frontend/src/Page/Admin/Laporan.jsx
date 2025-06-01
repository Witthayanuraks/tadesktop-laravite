import { useState } from "react";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin";
import GetJanjiTemuByPenerimaTamu from "../../Components/PenerimaTamu/GetJanjiTemuByPenerimaTamu";

export default function Laporan() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-4 left-4 z-50 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200 hover:scale-105 transition-transform"
      >
        <img
          src="https://smkn2-singosari.sch.id/wp-content/uploads/2021/10/logo.png"
          alt="logo"
          className="w-8 h-8 object-contain"
        />
      </button>

      <SidebarAdmin show={showSidebar} onClose={() => setShowSidebar(false)} />
      <GetJanjiTemuByPenerimaTamu />
    </div>
  );
}
