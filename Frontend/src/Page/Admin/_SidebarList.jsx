import { LayoutDashboard, CalendarCheck, Bell, Users } from "lucide-react";

const listLink = [
  { path: "/dashboard-admin", label: "Beranda", icon: <LayoutDashboard /> },
  { path: "/jadwal-temu", label: "Jadwal Temu", icon: <CalendarCheck /> },
  { path: "/laporan", label: "Laporan", icon: <Bell /> },
  { path: "/pengguna", label: "Daftar Guru", icon: <Users /> },
]

function activeLink(pathNow = "/") {
  return listLink.map(a => ({ ...a, select: (a.path === pathNow) }))
}

export {
  listLink,
  activeLink
}