import { Auth } from "../../Context/AuthContext";
import Logout from "../Logout";
import {
  LayoutDashboard,
  CalendarCheck,
  Bell,
  X,
  AlignJustify,
  DoorClosed,
} from "lucide-react";

export default function SidebarAdmin({ show, onClose }) {
  const { getName } = Auth();

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <aside
    className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col z-40 transition-transform duration-300 ease-in-out
      ${show ? "translate-x-0" : "-translate-x-full"}
    `}
        style={{ pointerEvents: "auto" }} // supaya sidebar bisa di-click
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <img
          src="https://smkn2-singosari.sch.id/wp-content/uploads/2021/10/logo.png"
          alt="logo"
          className="mx-auto my-4 w-20 h-20"
        />

        <h2 className="text-xl font-bold text-orange-600 text-center mb-6">Admin</h2>

        <div className="bg-orange-100 text-orange-900 p-3 rounded-lg mb-6 text-sm">
          <p className="font-medium">Selamat Datang,</p>
          <p className="font-bold">{getName()}</p>
          <p>
            {new Intl.DateTimeFormat("id-ID", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(new Date())}
          </p>
        </div>

        <nav className="space-y-3 text-gray-700 font-medium">
          <SidebarButton href="/dashboard-penerima-tamu" label="Dashboard" icon={<LayoutDashboard className="w-5 h-5 mr-2" />} />
          <SidebarButton href="/jadwal-temu" label="Jadwal Temu" icon={<CalendarCheck className="w-5 h-5 mr-2" />} />
          <SidebarButton href="/laporan" label="Laporan" icon={<Bell className="w-5 h-5 mr-2" />} />
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
      className="flex items-center px-4 py-2 rounded-lg hover:text-orange-600 transition-colors"
    >
      {icon}
      {label}
    </a>
  );
}

