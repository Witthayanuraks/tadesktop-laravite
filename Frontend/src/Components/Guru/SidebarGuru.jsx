import { Auth } from "../../Context/AuthContext";
import Logout from "../Logout";
import {
  LayoutDashboard,
  CalendarPlus,
  Bell,
  X
} from "lucide-react";

export default function SidebarGuru({ show, onClose }) {
  const { getName } = Auth();

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#183F55] text-white shadow-lg p-6 flex flex-col transition-transform duration-300 ease-in-out pointer-events-auto
          ${show ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Info Guru */}
        <div className="mb-8 p-4 bg-[#1e4a6a] rounded-lg">
          <h2 className="text-lg font-semibold">Selamat Datang,</h2>
          <h2 className="text-xl font-bold mb-2">{getName()}</h2>
          <p className="text-sm opacity-80">
            {new Intl.DateTimeFormat("id-ID", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(new Date())}
          </p>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 space-y-2">
          <a
            href="/dashboard-guru"
            className="flex items-center py-3 px-4 rounded-lg bg-[#FF894E] hover:bg-[#FF7E43] transition"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            <span>Beranda</span>
          </a>
          <a
            href="/tambah-janji"
            className="flex items-center py-3 px-4 rounded-lg hover:bg-[#FF894E] transition"
          >
            <CalendarPlus className="w-5 h-5 mr-3" />
            <span>Tambah Janji</span>
          </a>
          <a
            href="/notifikasi-guru"
            className="flex items-center py-3 px-4 rounded-lg hover:bg-[#FF894E] transition"
          >
            <Bell className="w-5 h-5 mr-3" />
            <span>Notifikasi</span>
          </a>
        </nav>

        {/* Tombol Logout */}
        <div className="mt-auto pt-6">
  <Logout />
</div>
        {/* <div className="mt-auto pt-4">
          <Logout className="w-full flex items-center justify-center bg-[#FF894E] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#FF7E43] transition" />
        </div> */}
      </aside>
    </div>
  );
}
