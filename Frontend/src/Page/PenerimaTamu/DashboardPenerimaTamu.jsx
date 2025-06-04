// import { useEffect } from "react";
import SidebarPenerimaTamu from "../../Components/PenerimaTamu/SidebarPenerimaTamu";
import GetJanjiTemuByPenerimaTamu from "../../Components/PenerimaTamu/GetJanjiTemuByPenerimaTamu";
// import echo from "../../api/echo";
import SidebarLayout from "../../Components/Layout/SidebarLayout";

export default function DashboardPenerimaTamu() {
  return <SidebarLayout
  
  >

  </SidebarLayout>
  return (
    <div className="dashboard-guru">
      <SidebarPenerimaTamu />
      <GetJanjiTemuByPenerimaTamu />
    </div>
  );
}
