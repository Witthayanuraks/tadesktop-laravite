import { useEffect, useState } from "react";
import { Auth } from "../../Context/AuthContext";
import { apiAuth } from "../../api/baseAPI";
import { Mail } from "lucide-react";
import SidebarLayout from "../../Components/Layout/SidebarLayout";
import { activeLink } from "./_SidebarList"

export default function NotifikasiPenerimaTamu() {
  const { getToken } = Auth();
  const [data, setData] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await apiAuth(getToken()).get("/notifications");
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetch();
  }, []);

  function formatIndo(date) {
    return (
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0") +
      ", " +
      date.getDate() +
      "-" +
      date.toLocaleString("id-ID", { month: "long" }) +
      "-" +
      date.getFullYear()
    );
  }

  return <SidebarLayout
    title="Dashboard Penerimaan Tamu"
    showDate={true}
    linklist={activeLink("/notifikasi-penerima-tamu")}
  >
    <main className="flex-1 p-3.5 pt-7 px-6 max-w-[1700px] m-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Notifikasi Penerima Tamu</h2>
      {data.length === 0 ? (
        <p className="text-gray-500">Tidak ada notifikasi saat ini.</p>
      ):(
        <section className="space-y-4">
          {data.map((v, i) => (
            <div
              key={i}
              className="bg-white border-l-4 border-blue-500 shadow p-4 rounded-lg flex items-start gap-4"
            >
              <Mail className="w-6 h-6 text-blue-600 mt-1" />
              <div className="flex-1">
                <p className="text-gray-700 font-medium">
                  <span className="font-semibold text-blue-700">{v.guru.name}</span>{" "}
                  {v.reschedule === "Tunggu"
                    ? "mengkonfirmasi untuk menunggu tamu di lobi."
                    : "membatalkan janji temu."}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {formatIndo(new Date(v.updated_at))}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  </SidebarLayout>
}
