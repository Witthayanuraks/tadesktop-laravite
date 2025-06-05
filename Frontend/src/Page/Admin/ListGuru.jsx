import Pengguna from "../../Components/Admin/Pengguna";
import SidebarLayout from "../../Components/Layout/SidebarLayout";
import { activeLink } from "./_SidebarList";

export default function ListGuru() {
  return <SidebarLayout
    title="Dashboard Admin"
    showDate={false}
    showLogo={true}
    className="relative min-h-screen flex bg-gray-50"
    linklist={activeLink("/pengguna")}
  >
    <main className="w-full p-3.5 pt-6 px-6 max-w-[1700px] m-auto">
      <Pengguna />
    </main>
  </SidebarLayout>
}