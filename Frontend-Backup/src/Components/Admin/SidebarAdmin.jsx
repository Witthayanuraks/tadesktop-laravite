import { Auth } from "../../Context/AuthContext";
import Logout from "../Logout";
import {
  LayoutDashboard,
  CalendarCheck,
  Bell,
  X,
  AlignJustify,
  Users,
  DoorClosed,
} from "lucide-react";

export default function SidebarAdmin({ show, onClose }) {
  const { getName } = Auth();

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#183F55] text-white shadow-lg p-6 flex flex-col z-40 transition-transform duration-300 ease-in-out
          ${show ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ pointerEvents: "auto" }}
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <img
          src="https://smkn2-singosari.sch.id/wp-content/uploads/2021/10/logo.png"
          alt="logo"
          className="mx-auto my-4 w-20 h-20"
        />

        <h2 className="text-xl font-bold text-orange-400 text-center mb-6">Admin</h2>

        <div className="mb-8 p-4 bg-[#1e4a6a] rounded-lg">
          <p className="text-lg font-semibold">Selamat Datang,</p>
          <p className="text-xl font-bold mb-2">{getName()}</p>
          <p>
            {new Intl.DateTimeFormat("id-ID", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(new Date())}
          </p>
        </div>

        <nav className="space-y-3 font-medium">
          <SidebarButton href="/dashboard-penerima-tamu" label="Dashboard" icon={<LayoutDashboard className="w-5 h-5 mr-2" />} />
          <SidebarButton href="/jadwal-temu" label="Jadwal Temu" icon={<CalendarCheck className="w-5 h-5 mr-2" />} />
          <SidebarButton href="/laporan" label="Laporan" icon={<Bell className="w-5 h-5 mr-2" />} />
          <SidebarButton href="/pengguna" label="Daftar Guru" icon={<Users className="w-5 h-5 mr-2" />} />
        </nav>

        <div className="mt-auto pt-6">
          <Logout 
            icon={
              <DoorClosed className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors" />
            } 
          />
        </div>
      </aside>
    </div>
  );
}

function SidebarButton({ href, label, icon }) {
  return (
    <a
      href={href}
      className="flex items-center px-4 py-2 rounded-lg text-white hover:bg-[#1e4a6a] hover:text-orange-300 transition-colors"
    >
      {icon}
      {label}
    </a>
  );
}
