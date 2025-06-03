import { useEffect, useState } from "react";
import { Auth } from "../../Context/AuthContext";
import { apiAuth } from "../../api/baseAPI";

export default function GetJanjiTemu() {
  const { getToken } = Auth();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await apiAuth(getToken()).get("/janji");
        setData(response.data.janji);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetch();
  }, []);

  function formatDateIndo(date) {
    const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const jam = String(date.getHours()).padStart(2, "0");
    const menit = String(date.getMinutes()).padStart(2, "0");
    const hari = String(date.getDate()).padStart(2, "0");
    const bulanText = bulan[date.getMonth()];
    const tahun = date.getFullYear();
    return `${jam}:${menit} ${hari}-${bulanText}-${tahun}`;
  }

  function checkStatus(d) {
    if (d.reschedule !== null) {
      if (d.reschedule === "Tunggu") return "Terlambat";
      if (d.reschedule === "Batalkan") return "Dijadwalkan Ulang";
    }
    if (d.status === "Telat") return "Terlambat";
    return d.status;
  }

  function statusColor(status) {
    switch (status) {
      case "Terlambat":
        return "bg-orange-400 text-white";
      case "Selesai":
        return "bg-green-500 text-white";
      case "Menunggu":
        return "bg-blue-600 text-white";
      case "Dijadwalkan Ulang":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-300 text-gray-700";
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Daftar Tamu Hari Ini</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 font-medium text-gray-700">No</th>
              <th className="px-4 py-2 font-medium text-gray-700">Nama Tamu</th>
              <th className="px-4 py-2 font-medium text-gray-700">No HP</th>
              <th className="px-4 py-2 font-medium text-gray-700">Keterangan</th>
              <th className="px-4 py-2 font-medium text-gray-700">Status</th>
              <th className="px-4 py-2 font-medium text-gray-700">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length !== 0 ? (
              data.map((v, i) => {
                const status = checkStatus(v);
                return (
                  <tr key={i}>
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2">{v.tamu.nama}</td>
                    <td className="px-4 py-2">{v.tamu.telepon}</td>
                    <td className="px-4 py-2">{v.keterangan}</td>
                    <td className="px-4 py-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(status)}`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {formatDateIndo(new Date(v.tanggal.replace(" ", "T")))}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  Tidak ada janji temu hari ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
