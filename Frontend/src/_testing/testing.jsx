// Daripada ngerusak kode utama, jadi test disini

import SidebarLayout from "../Components/Layout/SidebarLayout"
import { LayoutDashboard, CalendarPlus, Bell } from "lucide-react"

export default function TestingAllLayout() {
  return <div className="font-outfit">
    <SidebarLayout
      name={"@testing"} // Nama Orang
      title="Dashboard Guru (Test)" // Judul
      showLogo={true} // Memunculkan Logo
      showDate={true} // Memunculkan Tanggal
      linklist={[ // Link
        { path: "#/dash/guru/", label: "Beranda", icon: <LayoutDashboard />, select: true },
        { path: "#/dash/guru/janji/add", label: "Tambahan Janji", icon: <CalendarPlus /> },
        { path: "#/notifikasi", label: "Notifikasi", icon: <Bell /> }
      ]}
    >
      <div className="p-3 px-4">
        <button style={{ float: "right" }} className="cursor-pointer">Tets</button>
        <h1 className="text-xl px-2.5 mb-3 font-semibold">Color Class Testing</h1>
        <div className="w-full max-w-[300px]">
          <div className="bg-japanese-indigo w-full text-white flex justify-center items-center h-[60px]">Japanese Indigo</div>
          <div className="bg-coral w-full text-white flex justify-center items-center h-[60px]">Coral</div>
          <div className="bg-white w-full flex justify-center items-center h-[60px]">White</div>
          <div className="bg-black w-full text-white flex justify-center items-center h-[60px]">Black</div>
        </div>
      </div>
    </SidebarLayout>
  </div>
}