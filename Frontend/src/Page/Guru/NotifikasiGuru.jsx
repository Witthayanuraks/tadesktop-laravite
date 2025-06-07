import { useEffect, useState } from "react";
import { Auth } from "../../Context/AuthContext";
import { apiAuth } from "../../api/baseAPI";
import Loading from "../../Components/Loading";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../../Components/Layout/SidebarLayout";
import { Mail, Clock, Ban, Check, LayoutDashboard, CalendarPlus, Bell } from "lucide-react";
import { activeLink } from "./_SidebarList";

export default function NotifikasiGuru() {
  const navigate = useNavigate()
  const { getName, getToken } = Auth()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    async function fetch() {
      try {
        const response = await apiAuth(getToken()).get("/notifications")
        setData(response.data)
      } catch (error) {
        console.log(error.response)
      } finally {
        setLoading(false)
      }
    }
    fetch();
  }, [refresh]);
  async function submit(status, d) {
    try {
      const response = await apiAuth(getToken()).put(
        `/notifications/${d.id}`,
        {},
        {
          params: { status },
        }
      );
      alert(response.data.message)
      setRefresh((prev) => !prev)
      if (status === "Batalkan") {
        navigate("/tambah-janji", { state: d.tamu })
      }
    } catch (error) {
      console.log(error.response)
    }
  }
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

  function checkreschedule(d) {
    return d.status === "Telat" && d.reschedule == null;
  }

  return <SidebarLayout
    name={getName()}
    title="Dashboard Guru"
    showDate={true}
    className="relative min-h-screen flex bg-gray-50"
    style={{
      backgroundImage: "url('/Notifikasi.png')",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}
    linklist={activeLink("/notifikasi-guru")}
  >
    <main className="flex-1 p-3.5 pt-7 px-6 max-w-[1700px] m-auto">
      {loading ? (
        <Loading />
      ) : (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Notifikasi</h2>
          {data.length === 0 ? (
            <p className="text-gray-500">Tidak ada notifikasi saat ini.</p>
          ) : (
            data.map((v, i) => (
              <div
                key={i}
                className="bg-white border-l-4 border-blue-500 shadow p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800">
                      Tamu Anda Telah Datang (
                      <span className="text-blue-600 font-semibold">{v.tamu.nama}</span>)
                    </p>
                    <span className="text-sm text-gray-500">
                      {formatIndo(new Date(v.updated_at))}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  {/* Status saat ini */}
                  {v.status !== "Telat" && (
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        v.status === "Selesai"
                          ? "bg-green-100 text-green-700"
                          : v.reschedule === "Batal"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      } flex items-center gap-1`}
                    >
                      <Check className="w-3 h-3" />
                      {v.status}
                    </span>
                  )}

                  {/* Reschedule Status */}
                  {v.reschedule === "Batalkan" && (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600 flex items-center gap-1">
                      <Ban className="w-3 h-3" />
                      Jadwal Ulang
                    </span>
                  )}
                  {v.reschedule === "Tunggu" && (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Terlambat
                    </span>
                  )}

                  {/* Jika Telat & belum konfirmasi */}
                  {checkreschedule(v) && (
                    <>
                      <button
                        onClick={() => {
                          if (confirm("Konfirmasi janji ini sebagai 'Tunggu'?")) {
                            submit("Tunggu", v);
                          }
                        }}
                        className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                      >
                        Konfirmasi Tunggu
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Jadwalkan ulang janji temu ini?")) {
                            submit("Batalkan", v);
                          }
                        }}
                        className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                      >
                        Jadwal Ulang
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </section>
      )}
    </main>
  </SidebarLayout>
}