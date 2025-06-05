// import { useEffect } from "react";
import SidebarPenerimaTamu from "../../Components/PenerimaTamu/SidebarPenerimaTamu";
import GetJanjiTemuByPenerimaTamu from "../../Components/PenerimaTamu/GetJanjiTemuByPenerimaTamu";
// import echo from "../../api/echo";
import SidebarLayout from "../../Components/Layout/SidebarLayout";
import { activeLink } from "./_SidebarList"

export default function DashboardPenerimaTamu() {
  return <SidebarLayout
    title="Dashboard Penerimaan Tamu"
    showDate={true}
    linklist={activeLink("/dashboard-penerima-tamu")}
    className="bg-gray-50"
  >
    <main className="flex-1 p-3.5 pt-7 px-6 max-w-[1700px] m-auto">
      <GetJanjiTemuByPenerimaTamu />
    </main>
  </SidebarLayout>
}
