import { Auth } from "../../Context/AuthContext";
import GetJanjiTemu from "../../Components/Guru/GetJanjiTemu";
import RiwayatTemu from "../../Components/Guru/RiwayatTemu";
import SidebarLayout from "../../Components/Layout/SidebarLayout";
import { LayoutDashboard, CalendarPlus, Bell } from "lucide-react";

export default function DashboardGuru() {
  const { getName } = Auth()
  return <SidebarLayout
    name={getName()}
    title="Dashboard Guru"
    showDate={true}
    className="relative min-h-screen flex bg-gray-50"
    linklist={[
      { path: "/dashboard-guru", label: "Beranda", icon: <LayoutDashboard />, select: true },
      { path: "/tambah-janji", label: "Tambah Janji", icon: <CalendarPlus /> },
      { path: "/notifikasi-guru", label: "Notifikasi", icon: <Bell /> }
    ]}
  >
    <main className="flex-1 p-3.5 pt-7 px-6 max-w-[1700px] m-auto">
      <GetJanjiTemu />
      <RiwayatTemu />
    </main>
  </SidebarLayout>
}