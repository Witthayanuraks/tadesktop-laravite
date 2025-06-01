import { useEffect, useState } from "react";
import SidebarGuru from "../../Components/Guru/SidebarGuru";
import Kalender from "../../Components/Guru/Kalender";
import { apiAuth } from "../../api/baseAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "../../Context/AuthContext";

export default function TambahJanjiTemu() {
  const navigate = useNavigate();
  const { getToken } = Auth();
  const { state } = useLocation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate] = useState(new Date());
  const [waktu, setWaktu] = useState("-");
  const [dataTamu, setDataTamu] = useState([]);
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const [data, setData] = useState({
    nama_tamu: "",
    no_hp: "",
    tanggal: "",
    keterangan: "",
  });

  useEffect(() => {
    if (state) {
      setData((prev) => ({
        ...prev,
        nama_tamu: state.nama || "",
        no_hp: state.telepon || "",
      }));
    }

    async function fetchJadwal() {
      try {
        const res = await apiAuth(getToken()).get("/janji");
        setDataTamu(res.data.jadwal_temu);
      } catch (err) {
        console.error(err.response);
      }
    }

    fetchJadwal();
  }, [getToken, state]);

  const formatToYMD = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const setChange = (e) => {
    const { name, value } = e.target;

    if (name === "waktu") {
      setWaktu(value);
      setData((prev) => ({
        ...prev,
        tanggal: `${formatToYMD(selectedDate)} ${value}`,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submit = async () => {
    if (waktu === "-") {
      alert("Pilih Waktu Pertemuan");
      return;
    }

    try {
      setDisabledSubmit(true);
      const res = await apiAuth(getToken()).post("/janji", data);
      alert(res.data.message);
      navigate("/dashboard-guru");
    } catch (err) {
      alert("Wa Service Error");
      console.error(err.response?.data?.message);
    } finally {
      setDisabledSubmit(false);
    }
  };

  const checkWaktuTamu = (time) => {
    const ymd = formatToYMD(selectedDate);
    const occupied = dataTamu.filter((item) => item.tanggal.startsWith(ymd));
    const jam = parseInt(time.split(":")[0]);

    if (
      currentDate.toDateString() === selectedDate.toDateString() &&
      jam <= currentDate.getHours()
    ) {
      return true;
    }

    return occupied.some((item) => item.tanggal.split(" ")[1] === time);
  };

  return (
    <>
      <SidebarGuru show={showSidebar} onClose={() => setShowSidebar(false)} />

      <div className={`min-h-screen bg-gray-50 flex transition-all duration-300 ${showSidebar ? "pl-64" : ""}`}>
        {/* Sidebar Toggle */}
        {!showSidebar && (
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
        )}

        {/* Main */}
        <main className="flex-1 p-6 transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Kalender */}
            <div className="bg-white rounded-lg shadow p-6">
              <Kalender
                setData={setData}
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
                dataTamu={dataTamu}
                waktu={waktu}
              />
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Tambah Janji Temu</h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Nama Tamu</label>
                  <input
                    type="text"
                    name="nama_tamu"
                    value={data.nama_tamu}
                    onChange={setChange}
                    required
                    placeholder="Masukkan Nama"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">No Telepon</label>
                  <input
                    type="number"
                    name="no_hp"
                    value={data.no_hp}
                    onChange={setChange}
                    required
                    placeholder="08123456789"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tanggal</label>
                  <input
                    type="text"
                    value={new Intl.DateTimeFormat("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(selectedDate)}
                    readOnly
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Waktu Pertemuan</label>
                  <select
                    name="waktu"
                    onChange={setChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="-">-- Pilih Waktu --</option>
                    {["08:00:00", "09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00"].map((time) => (
                      <option key={time} value={time} disabled={checkWaktuTamu(time)}>
                        {time.slice(0, 5)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Keterangan</label>
                  <textarea
                    name="keterangan"
                    onChange={setChange}
                    required
                    rows={3}
                    placeholder="Contoh: Keperluan dengan Bu Dian terkait LKS"
                    className="w-full border rounded px-3 py-2"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={disabledSubmit}
                  className={`w-full py-2 rounded text-white font-medium ${
                    disabledSubmit
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600"
                  } transition`}
                >
                  {disabledSubmit ? "Memproses..." : "Buat Janji Temu"}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
