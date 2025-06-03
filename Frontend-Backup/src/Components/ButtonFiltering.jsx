import { useEffect, useState } from "react";
import { Auth } from "../Context/AuthContext";
import { apiAuth } from "../api/baseAPI";
import { Filter } from "lucide-react";

export default function ButtonFiltering({
  filterBy,
  setFiltering,
  filtering,
  setDataGuru,
}) {
  const { getToken } = Auth();
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await apiAuth(getToken()).get("/users");
        setData(response.data);
        setDataGuru(response.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetch();
  }, []);

  function setChange(e) {
    const { name, value } = e.target;
    setFiltering({
      ...filtering,
      [name]: value,
    });
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition">
        <Filter className="w-4 h-4" />
        Filter
      </button>

      {isHovered && (
        <div className="absolute right-0 mt-2 w-64 bg-white border shadow-lg rounded-md p-4 z-50 space-y-4">
          {filterBy.includes("status") && (
            <div className="space-y-1">
              <label htmlFor="fil-status" className="text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                id="fil-status"
                onChange={setChange}
                value={filtering.status || ""}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="Semua">Semua</option>
                <option value="Menunggu">Menunggu</option>
                <option value="Selesai">Selesai</option>
                <option value="Telat">Terlambat</option>
                <option value="Batalkan">Jadwalkan Ulang</option>
              </select>
            </div>
          )}
          {filterBy.includes("tanggal") && (
            <div className="space-y-1">
              <label htmlFor="fil-tanggal" className="text-sm font-medium text-gray-700">
                Waktu
              </label>
              <select
                name="tanggal"
                id="fil-tanggal"
                onChange={setChange}
                value={filtering.tanggal || ""}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="desc">Terbaru</option>
                <option value="asc">Terlama</option>
              </select>
            </div>
          )}
          {filterBy.includes("guru") && (
            <div className="space-y-1">
              <label htmlFor="fil-guru" className="text-sm font-medium text-gray-700">
                Pilih Guru
              </label>
              <select
                name="guru"
                id="fil-guru"
                onChange={setChange}
                value={filtering.guru}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="semua">Semua Guru</option>
                {data.map((v, i) => (
                  <option key={i} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
