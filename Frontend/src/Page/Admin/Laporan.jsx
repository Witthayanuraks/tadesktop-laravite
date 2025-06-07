import { useState } from "react";
import GetJanjiTemuByPenerimaTamu from "../../Components/PenerimaTamu/GetJanjiTemuByPenerimaTamu";
import SidebarLayout from "../../Components/Layout/SidebarLayout";
import { activeLink } from "./_SidebarList";

export default function Laporan() {
  return <SidebarLayout
    title="Dashboard Admin"
    showDate={false}
    showLogo={true}
    className="relative min-h-screen flex bg-gray-50"
    linklist={activeLink("/laporan")}
    style={{
      backgroundImage: "url('/Admin.png')",
      // backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      // backgroundPosition: "center"
    }}
  >
    <main className="w-full p-3.5 pt-6 px-6 max-w-[1700px] m-auto">
      <GetJanjiTemuByPenerimaTamu />
    </main>
  </SidebarLayout>
}
