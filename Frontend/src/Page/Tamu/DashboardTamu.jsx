import { useEffect, useState } from "react";
import { Auth } from "../../Context/AuthContext";
import { apiAuth } from "../../api/baseAPI";

export default function DashboardTamu() {
  const { getToken } = Auth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //   useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const token = getToken();
  //       if (!token) {
  //         throw new Error("No token found");
  //       }

  //       console.log("Fetching data with token:", token); // Debug log
  //       const response = await apiAuth(token).get("/janji/tamu");
        
  //       console.log("API Response:", response); // Debug log
  //       setData(response.data);
  //       setError(null);
  //     } catch (error) {
  //       console.error("API Error:", error); // Detailed error log
        
  //       if (error.response) {
  //         // Server responded with an error (4xx, 5xx)
  //         setError(`Server Error: ${error.response.status} - ${error.response.data?.message || "No message"}`);
  //       } else if (error.request) {
  //         // Request was made but no response (network issue)
  //         setError("Network Error: Could not connect to the server.");
  //       } else {
  //         // Other errors (e.g., no token)
  //         setError(`Error: ${error.message}`);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, [getToken]);

  // // Formatting functions (unchanged)
  // function formatDateIndo(dateString) { /* ... */ }
  // function formatWaktu(dateString) { /* ... */ }
  // function checkStatus(item) { /* ... */ }
  // function getStatusStyle(status) { /* ... */ }
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiAuth(getToken()).get("/janji/tamu");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [getToken]);

  function formatDateIndo(dateString) {
    try {
      const date = new Date(dateString.replace(" ", "T"));
      if (isNaN(date.getTime())) return "Invalid Date";
      
      const bulan = [
        "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
        "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
      ];
      const hari = String(date.getDate()).padStart(2, "0");
      const bulanText = bulan[date.getMonth()];
      const tahun = date.getFullYear();
      return `${hari}/${String(date.getMonth() + 1).padStart(2, "0")}/${tahun}`;
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid Date";
    }
  }

  function formatWaktu(dateString) {
    try {
      const date = new Date(dateString.replace(" ", "T"));
      if (isNaN(date.getTime())) return "Invalid Time";
      
      const jam = String(date.getHours()).padStart(2, "0");
      const menit = String(date.getMinutes()).padStart(2, "0");
      return `${jam}.${menit} WIB`;
    } catch (e) {
      console.error("Error formatting time:", e);
      return "Invalid Time";
    }
  }

  function checkStatus(item) {
    if (!item) return "Unknown";
    
    if (item.reschedule !== null) {
      if (item.reschedule === "Tunggu") return "Terlambat";
      if (item.reschedule === "Batalkan") return "Dibatalkan";
      return "Dijadwalkan Ulang";
    } else if (item.status === "Telat") {
      return "Terlambat";
    }
    return item.status || "Unknown";
  }

  function getStatusStyle(status) {
    switch (status) {
      case "Selesai":
        return "bg-[#008000] text-white";
      case "Menunggu":
        return "bg-[#007595] text-white";
      case "Dijadwalkan Ulang":
      case "Terlambat":
        return "bg-[#B5B806] text-black";
      case "Dibatalkan":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  }

  if (loading) {
    return (
      <div className="px-6 py-10 bg-white min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // -- PLEASE ENABLE FOR THIS IN PRODUCTION
  // if (error) {
  //   return (
  //     <div className="px-6 py-10 bg-white min-h-screen flex items-center justify-center">
  //       <p className="text-red-500">Error: {error}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="px-6 py-10 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Riwayat Pertemuan </h1>
      {data.length === 0 ? (
        <p className="text-gray-500">Tidak ada riwayat pertemuan</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="p-4 border-b">No</th>
                <th className="p-4 border-b">Nama Tamu</th>
                <th className="p-4 border-b">Tanggal</th>
                <th className="p-4 border-b">Waktu</th>
                <th className="p-4 border-b">Kepada</th>
                <th className="p-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                const status = checkStatus(item);
                return (
                  <tr key={index} className="text-sm text-gray-700 hover:bg-gray-50">
                    <td className="p-4 border-b">{index + 1}</td>
                    <td className="p-4 border-b">{item.namaTamu || "-"}</td>
                    <td className="p-4 border-b">{formatDateIndo(item.tanggal)}</td>
                    <td className="p-4 border-b">{formatWaktu(item.tanggal)}</td>
                    <td className="p-4 border-b">{item.guru?.name || "-"}</td>
                    <td className="p-4 border-b">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(status)}`}>
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}