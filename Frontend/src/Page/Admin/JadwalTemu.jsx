import KalenderAdmin from "../../Components/Admin/KalenderAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin";
import Header from "../../Components/Admin/HeaderAdmin";
import SidebarLayout from "../../Components/Layout/SidebarLayout";
import { activeLink } from "./_SidebarList";

export default function JadwalTemu() {
  return <SidebarLayout
    title="Dashboard Admin"
    showDate={false}
    showLogo={true}
    className="relative min-h-screen flex bg-gray-50"
    style={{
      backgroundImage: "url('/Admin.png')",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}
    linklist={activeLink("/jadwal-temu")}
  >
    <main className="w-full p-3.5 pt-6 px-6 max-w-[1700px] m-auto">
      <Header />
      <KalenderAdmin />
    </main>
  </SidebarLayout>
  // return (
  //   <div>
  //     <SidebarAdmin />
  //     <KalenderAdmin />
  //   </div>
  // );
}
