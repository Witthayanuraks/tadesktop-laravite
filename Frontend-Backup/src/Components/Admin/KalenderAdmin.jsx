import { useEffect, useState } from "react";
import { Auth } from "../../Context/AuthContext";
import { apiAuth } from "../../api/baseAPI";
import Loading from "../Loading";
import SidebarAdmin from "./SidebarAdmin";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function KalenderAdmin() {
  const { getToken } = Auth();
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [data, setData] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await apiAuth(getToken()).get("/janji");
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDay = (firstDay.getDay() + 6) % 7;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const tempDays = [];

    // Previous month days
    for (let i = startDay - 1; i >= 0; i--) {
      tempDays.push({
        day: daysInPrevMonth - i,
        currentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      tempDays.push({
        day: i,
        currentMonth: true,
        isToday:
          i === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear(),
      });
    }

    // Next month days (padding to 6 weeks)
    const totalCells = tempDays.length;
    const nextPadding = 42 - totalCells;
    for (let i = 1; i <= nextPadding; i++) {
      tempDays.push({
        day: i,
        currentMonth: false,
      });
    }
    setDays(tempDays);
  };

  const formatToYMD = (date) => {
    if (!(date instanceof Date)) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePrev = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNext = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 3); // 3 bulan ke depan

    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );

    if (nextMonth <= maxDate) {
      setCurrentDate(nextMonth);
    }
  };

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  function filterDataTamu() {
    const formattedDate = formatToYMD(selectedDate);
    return data.filter((item) => {
      return item.tanggal?.split(" ")[0] === formattedDate;
    });
  }

  function checkDataTamuTanggal(day, month, year) {
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return data.some((item) => 
      item.tanggal?.split(" ")[0] === formattedDate
    );
  }

  function checkStatus(d) {
    if (d.reschedule !== null) {
      if (d.reschedule === "Tunggu") return "Terlambat";
      if (d.reschedule === "Batalkan") return "Dibatalkan";
    }
    return d.status === "Telat" ? "Terlambat" : d.status;
  }

  if (loading) return <Loading />;

 return (
  <div className="p-6 space-y-6 bg-gray-50 min-h-screen relative">
    {/* Tombol buka sidebar */}
    <button
      onClick={() => setShowSidebar(true)}
      className="fixed top-5 left-5 z-50 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border hover:scale-105 transition"
    >
      <img
        src="https://smkn2-singosari.sch.id/wp-content/uploads/2021/10/logo.png"
        alt="SMKN 2"
        className="w-8 h-8 object-contain"
      />
    </button>

    <SidebarAdmin show={showSidebar} onClose={() => setShowSidebar(false)} />

    {/* === Kalender Section === */}
    <div className="bg-white rounded-xl shadow p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hari */}
      <div className="grid grid-cols-7 gap-1 text-center text-gray-500 font-medium py-2">
        {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Tanggal */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, index) => {
          const hasAppointment = checkDataTamuTanggal(
            d.day,
            currentDate.getMonth() + 1,
            currentDate.getFullYear()
          );
          const isSelected =
            selectedDate &&
            selectedDate.getDate() === d.day &&
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate.getFullYear() === currentDate.getFullYear();

          return (
            <button
              key={index}
              onClick={() => {
                if (d.currentMonth) {
                  const selected = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    d.day
                  );
                  setSelectedDate(selected);
                }
              }}
              className={`h-12 rounded-md flex items-center justify-center
                ${!d.currentMonth ? "text-gray-300" : "text-gray-800"}
                ${d.isToday ? "border-2 border-blue-500" : ""}
                ${hasAppointment && d.currentMonth ? "bg-blue-50" : ""}
                ${isSelected ? "bg-blue-100 font-bold" : ""}
                hover:bg-gray-100 transition-colors`}
            >
              {d.day}
            </button>
          );
        })}
      </div>
    </div>

    {/* === Daftar Tamu Section === */}
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold">
        Daftar Tamu - {formatDateTime(selectedDate)}
      </h2>

      {filterDataTamu().length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">No</th>
                <th className="px-6 py-3 text-left">Nama Guru</th>
                <th className="px-6 py-3 text-left">Nama Tamu</th>
                <th className="px-6 py-3 text-left">Tanggal Kunjungan</th>
                <th className="px-6 py-3 text-left">Keperluan</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filterDataTamu().map((v, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500">{i + 1}</td>
                  <td className="px-6 py-4 font-medium">{v.guru?.name || "-"}</td>
                  <td className="px-6 py-4 text-gray-700">{v.tamu?.nama || "-"}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {v.tanggal ? formatDateTime(v.tanggal) : "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{v.keperluan || "-"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs font-semibold rounded-full
                        ${checkStatus(v) === "Selesai" ? "bg-green-100 text-green-800" : ""}
                        ${checkStatus(v) === "Terlambat" ? "bg-yellow-100 text-yellow-800" : ""}
                        ${checkStatus(v) === "Dibatalkan" ? "bg-red-100 text-red-800" : ""}
                        ${checkStatus(v) === "Menunggu" ? "bg-blue-100 text-blue-800" : ""}`}
                    >
                      {checkStatus(v)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Tidak ada janji temu untuk tanggal ini
        </div>
      )}
    </div>
  </div>
);
}