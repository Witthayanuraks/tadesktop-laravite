import { useState } from "react";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin";
import Header from "../../Components/Admin/HeaderAdmin";
import StatistikData from "../../Components/Admin/StatistikData";
import BarChart from "../../Components/BarChart";
import Pengguna from "../../Components/Admin/Pengguna";
import { ChevronRight } from "lucide-react";
import SidebarLayout from "../../Components/Layout/SidebarLayout";
import { activeLink } from "./_SidebarList";

export default function DashboardAdmin() {
  return <SidebarLayout
    title="Dashboard Admin"
    showDate={false}
    showLogo={true}
    className="relative min-h-screen flex"
    linklist={activeLink("/dashboard-admin")}
  >
    <main className="w-full p-3.5 pt-1 px-6 max-w-[1700px] m-auto">
      <div className="p-6 space-y-6" style={{ backgroundImage: "url('/Datatamu.png')" }}>
        <Header />
        <StatistikData />
        <BarChart />
        {/* <Pengguna /> */}
      </div>
    </main>
  </SidebarLayout>

// return (
//   <div className="relative min-h-screen bg-gray-50 overflow-hidden">
//     {/* Tombol buka sidebar */}
//     <button
//       onClick={() => setShowSidebar(!showSidebar)}
//       className="fixed top-4 left-4 z-50 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200 hover:scale-105 transition-transform cursor-pointer"
//     >
//       <ChevronRight />
//       {/* <img
//         src="https://smkn2-singosari.sch.id/wp-content/uploads/2021/10/logo.png"
//         alt="logo"
//         className="w-8 h-8 object-contain"
//       /> */}
//     </button>

//     {/* Sidebar */}
//     <SidebarAdmin show={showSidebar} onClose={() => setShowSidebar(false)} />

//     {/* Main content area */}
//     <main
//       className={`
//         transition-all duration-300 ease-in-out
//         ${showSidebar ? "ml-64" : "ml-0"}
//       `}
//     >
//       <div className="p-6 space-y-6">
//         <Header />
//         <StatistikData />
//         <BarChart />
//         {/* <Pengguna /> */}
//       </div>
//     </main>
//   </div>
// );
}
