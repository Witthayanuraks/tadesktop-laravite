// Daripada ngerusak kode utama, jadi test disini

import { useState } from "react"
import FilterLayout from "../Components/Layout/FilterLayout"
import SidebarLayout from "../Components/Layout/SidebarLayout"
import { LayoutDashboard, CalendarPlus, Bell } from "lucide-react"

export default function TestingAllLayout() {
  const [listUpdate, setList] = useState({})

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
        {/* <button style={{ float: "right" }} className="cursor-pointer">Tets</button> */}
        <div className="flex justify-end">
          <FilterLayout
            onChange={(e) => { setList({...listUpdate, ...e}) }}
            list={[
              {
                label: "Selection Test",
                name: "selectcontent",
                select: [
                  { label: "Test 1", value: "test1" },
                  { label: "Test 2", value: "test2" },
                  { label: "Test 3", value: "test3" },
                  { label: "Test 4", value: "test4" },
                  { label: "Test 5", value: "test5" },
                ]
              },
              {
                label: "Selection Testing",
                name: "selection",
                select: [
                  { label: "Apple", value: "testing1" },
                  { label: "Manggo Raguna 2", value: "testing2" },
                  { label: "Pisang Ambon", value: "testing3" },
                  { label: "Batu Hitam", value: "testing4" },
                  { label: "Test", value: "testing5" },
                ]
              }
            ]}
          />
        </div>
        <p>{JSON.stringify(listUpdate)}</p>
        {/* <h1 className="text-xl px-2.5 mb-3 font-semibold">Color Class Testing</h1>
        <div className="w-full max-w-[300px]">
          <div className="bg-japanese-indigo w-full text-white flex justify-center items-center h-[60px]">Japanese Indigo</div>
          <div className="bg-coral w-full text-white flex justify-center items-center h-[60px]">Coral</div>
          <div className="bg-white w-full flex justify-center items-center h-[60px]">White</div>
          <div className="bg-black w-full text-white flex justify-center items-center h-[60px]">Black</div>
        </div> */}
      </div>
    </SidebarLayout>
  </div>
}