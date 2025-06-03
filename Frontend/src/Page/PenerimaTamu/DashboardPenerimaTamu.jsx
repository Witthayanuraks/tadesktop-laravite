// import { useEffect } from "react";
import SidebarPenerimaTamu from "../../Components/PenerimaTamu/SidebarPenerimaTamu";
import GetJanjiTemuByPenerimaTamu from "../../Components/PenerimaTamu/GetJanjiTemuByPenerimaTamu";
// import echo from "../../api/echo";

export default function DashboardPenerimaTamu() {
  return (
    <div className="dashboard-guru">
      <SidebarPenerimaTamu />
      <GetJanjiTemuByPenerimaTamu />
    </div>
  );
}
