import { LayoutDashboard, PlusCircle, ScanLine, Bell } from "lucide-react"

const listLink = [
  { path: "/dashboard-penerima-tamu", label: "Beranda", icon: <LayoutDashboard /> },
  { path: "/tambah-janji-tamu", label: "Tambah Janji", icon: <PlusCircle /> },
  { path: "/scan", label: "Scan", icon: <ScanLine /> },
  { path: "/notifikasi-penerima-tamu", label: "Notifikasi", icon: <Bell /> },
]

function activeLink(pathNow = "/") {
  return listLink.map(a => ({ ...a, select: (a.path === pathNow) }))
}

export {
  listLink,
  activeLink
}