import { useEffect, useRef, useState } from "react";
import { Auth } from "../../Context/AuthContext";
import { apiAuth } from "../../api/baseAPI";
import Loading from "../Loading";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import ButtonFiltering from "../ButtonFiltering";
// import SidebarAdmin from "../Admin/SidebarAdmin";

export default function GetJanjiTemuByPenerimaTamu() {
  const { getToken } = Auth();
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [dataGuru, setDataGuru] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("bulan-ini");
  const [custom, setCustom] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [filtering, setFiltering] = useState({
    guru: "semua",
  });
  const table = useRef();
  // const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await apiAuth(getToken()).get("/laporan", {
          params: {
            date: selectedMonth,
            guru: filtering.guru,
          },
        });
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [selectedMonth, filtering]);

  function formatDateIndo(date) {
    const bulan = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    const jam = String(date.getHours()).padStart(2, "0");
    const menit = String(date.getMinutes()).padStart(2, "0");
    const hari = String(date.getDate()).padStart(2, "0");
    const bulanText = bulan[date.getMonth()];
    const tahun = date.getFullYear();

    return `${jam}:${menit} ${hari}-${bulanText}-${tahun}`;
  }

  function setChange(e) {
    const { name, value } = e.target;
    if (name == "select-bulan") {
      if (value == "custom") {
        setCustom(true);
      } else {
        setCustom(false);
        setSelectedMonth(value);
      }
    }
    if (name == "bulan") {
      setSelectedMonth(value);
    }
  }
  function checkStatus(d) {
    if (d.reschedule !== null) {
      if (d.reschedule == "Tunggu") {
        return "Terlambat";
      }
      if (d.reschedule == "Batalkan") {
        return "Dijadwalkan Ulang";
      }
    } else if (d.status == "Telat") {
      return "Terlambat";
    } else {
      return d.status;
    }
  }
  const handleExportExcel = async () => {
    const worksheet = XLSX.utils.table_to_sheet(table.current);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    let guru = dataGuru.find((item) => {
      return item.id == filtering.guru;
    });
    XLSX.writeFile(
      workbook,
      `Laporan Bulan ${
        selectedMonth == "bulan-ini"
          ? `${new Date().toLocaleString("id-ID", {
              month: "long",
            })} ${new Date().toLocaleString("id-ID", { year: "numeric" })}`
          : "p"
      } - ${filtering.guru == "semua" ? "Semua Guru" : guru.name}.xlsx`
    );
    setDisabled(false);
  };
  const handleExportPDF = async () => {
    const canvas = await html2canvas(table.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    let guru = dataGuru.find((item) => {
      return item.id == filtering.guru;
    });

    pdf.save(
      `Laporan Bulan ${
        selectedMonth == "bulan-ini"
          ? `${new Date().toLocaleString("id-ID", {
              month: "long",
            })} ${new Date().toLocaleString("id-ID", { year: "numeric" })}`
          : "p"
      } - ${filtering.guru == "semua" ? "Semua Guru" : guru.name}.pdf`
    );
    setDisabled(false);
  };
  if (loading) return <Loading />;

return (
  <div className="relative min-h-screen bg-gray-50 p-6 space-y-6">
    {/* Tombol Sidebar
    <button
      onClick={() => setShowSidebar(true)}
      className="fixed top-5 left-5 z-50 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border hover:scale-105 transition"
    >
      <img
        src="https://smkn2-singosari.sch.id/wp-content/uploads/2021/10/logo.png"
        alt="SMKN 2"
        className="w-7 h-7 object-contain"
      />
    </button>

    <SidebarAdmin show={showSidebar} onClose={() => setShowSidebar(false)} /> */}

    {/* Filter Bulan */}
    <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center gap-4">
      <select
        name="select-bulan"
        className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-auto"
        onChange={setChange}
        value={selectedMonth}
      >
        <option value="bulan-ini">Bulan Ini</option>
        <option value="bulan-kemarin">Bulan Kemarin</option>
        <option value="custom">Kustom</option>
      </select>

      {custom && (
        <input
          type="month"
          name="bulan"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-auto"
          onChange={setChange}
        />
      )}
    </div>

    {/* Tabel & Export */}
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Export */}
        <div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
            Export Data
          </button>
          {isHovered && (
            <div className="absolute top-12 left-0 bg-white shadow-md border rounded-lg z-10 w-40 p-2 space-y-2">
              <button
                className="w-full px-3 py-2 text-sm rounded hover:bg-gray-100 disabled:opacity-50"
                disabled={disabled}
                onClick={() => {
                  setDisabled(true);
                  handleExportPDF();
                }}
              >
                Export PDF
              </button>
              <button
                className="w-full px-3 py-2 text-sm rounded hover:bg-gray-100 disabled:opacity-50"
                disabled={disabled}
                onClick={() => {
                  setDisabled(true);
                  handleExportExcel();
                }}
              >
                Export Excel
              </button>
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center sm:text-left">
          Daftar Tamu
        </h2>

        {/* Filter Guru */}
        <ButtonFiltering
          setFiltering={setFiltering}
          filtering={filtering}
          filterBy={["guru"]}
          setDataGuru={setDataGuru}
        />
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto">
        <table ref={table} className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Nama Guru</th>
              <th className="px-4 py-2 text-left">Nama Tamu</th>
              <th className="px-4 py-2 text-left">No HP</th>
              <th className="px-4 py-2 text-left">Keterangan</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {data.map((v, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2">{v.guru.name}</td>
                <td className="px-4 py-2">{v.tamu.nama}</td>
                <td className="px-4 py-2">{v.tamu.telepon}</td>
                <td className="px-4 py-2">{v.keterangan}</td>
                <td className="px-4 py-2">
                  <span
                    className={`text-white text-xs font-medium px-2 py-1 rounded 
                    ${
                      checkStatus(v) === "Terlambat"
                        ? "bg-orange-500"
                        : checkStatus(v) === "Selesai"
                        ? "bg-green-600"
                        : checkStatus(v) === "Menunggu"
                        ? "bg-blue-600"
                        : "bg-red-600"
                    }`}
                  >
                    {checkStatus(v)}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {formatDateIndo(new Date(v.tanggal.replace(" ", "T")))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}
