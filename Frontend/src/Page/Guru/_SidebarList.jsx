import { LayoutDashboard, CalendarPlus, Bell, User } from "lucide-react"

const listLink = [
  { path: "/dashboard-guru", label: "Beranda", icon: <LayoutDashboard /> },
  { path: "/tambah-janji", label: "Tambah Janji", icon: <CalendarPlus /> },
  { path: "/notifikasi-guru", label: "Notifikasi", icon: <Bell /> },
  { path: "/profile-guru", label: "Akun", icon: <User /> },
]

function activeLink(pathNow = "/") {
  return listLink.map(a => ({ ...a, select: (a.path === pathNow) }))
}

export {
  listLink,
  activeLink
}