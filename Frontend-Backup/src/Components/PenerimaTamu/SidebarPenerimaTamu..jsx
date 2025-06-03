import { Auth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  ScanLine,
  Bell,
  X,
} from "lucide-react";
import { useState } from "react";
import { apiAuth } from "../../api/baseAPI";

export default function SidebarPenerimaTamu() {
  const { getName, getToken, removeToken } = Auth();
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  async function logout() {
    try {
      await apiAuth(getToken()).post("/logout");
      removeToken();
      alert("Anda berhasil logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {show && (
        <aside className="w-64 bg-[#183F55] text-white h-screen py-8 px-6 flex flex-col fixed left-0 top-0 z-40 transition-all">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setShow(false)}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-8 p-4 bg-[#1e4a6a] rounded-lg">
            <h2 className="text-lg font-semibold">Selamat Datang,</h2>
            <h2 className="text-xl font-bold mb-1">{getName()}</h2>
            <p className="text-sm opacity-80">
              {new Intl.DateTimeFormat("id-ID", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date())}
            </p>
          </div>

          <nav className="flex-1 space-y-2">
            <a href="/dashboard-penerima-tamu" className="flex items-center py-3 px-4 rounded-lg bg-[#FF894E] hover:bg-[#FF7E43] transition">
              <LayoutDashboard className="w-5 h-5 mr-3" />
              <span>Beranda</span>
            </a>
            <a href="/tambah-janji-tamu" className="flex items-center py-3 px-4 rounded-lg hover:bg-[#FF894E] transition">
              <PlusCircle className="w-5 h-5 mr-3" />
              <span>Tambah Janji</span>
            </a>
            <a href="/scan" className="flex items-center py-3 px-4 rounded-lg hover:bg-[#FF894E] transition">
              <ScanLine className="w-5 h-5 mr-3" />
              <span>Scan</span>
            </a>
            <a href="/notifikasi-penerima-tamu" className="flex items-center py-3 px-4 rounded-lg hover:bg-[#FF894E] transition">
              <Bell className="w-5 h-5 mr-3" />
              <span>Notifikasi</span>
            </a>
          </nav>

          {/* Logout button */}
          <div className="mt-auto pt-4">
            <button
              onClick={() => {
                const confirmLogout = confirm("Apakah Anda yakin ingin logout?");
                if (confirmLogout) logout();
              }}
              className="w-full bg-[#FF894E] hover:bg-[#FF7E43] text-white font-semibold py-3 px-4 rounded-lg transition"
            >
              Keluar
            </button>
          </div>
        </aside>
      )}

      {/* Toggle button */}
      {!show && (
        <button
          onClick={() => setShow(true)}
          className="fixed top-5 left-5 z-50 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border hover:scale-105 transition"
        >
          <img
            src="https://smkn2-singosari.sch.id/wp-content/uploads/2021/10/logo.png"
            alt="SMKN 2"
            className="w-8 h-8 object-contain"
          />
        </button>
      )}
    </>
  );
}
