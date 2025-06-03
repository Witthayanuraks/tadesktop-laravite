import SidebarPenerimaTamu from "../../Components/PenerimaTamu/SidebarPenerimaTamu";
import { useEffect, useState } from "react";
import Kalender from "../../Components/Guru/Kalender";
import { apiAuth } from "../../api/baseAPI";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../Context/AuthContext";

export default function TambahJanjiTemuPenerimaTamu() {
  const navigate = useNavigate();
  const { getToken } = Auth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate] = useState(new Date()); // setCurrentDate
  const [waktu, setWaktu] = useState("-");
  const [dataTamu, setDataTamu] = useState([]);
  const [dataGuru, setDataGuru] = useState([]);
  const [selectGuru, setSelectGuru] = useState(1);
  const [showSidebar, setShowSidebar] = useState(true);

  const [data, setData] = useState({
    guru: "",
    nama_tamu: "",
    no_hp: "",
    tanggal: "",
    keterangan: "",
  });

  useEffect(() => {
    async function fetch() {
      try {
        const response = await apiAuth(getToken()).get(`/janji/${selectGuru}`);
        setDataTamu(response.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetch();
  }, [selectGuru]);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await apiAuth(getToken()).get("/users");
        setDataGuru(response.data);
        setData({
          ...data,
          guru: response.data[0]?.id || "",
        });
      } catch (error) {
        console.log(error.response);
      }
    }
    fetch();
  }, []);

  function formatToYMD(date) {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function setChange(e) {
    const { name, value } = e.target;
    if (name === "guru") {
      setSelectGuru(value);
      setData({ ...data, guru: value });
    } else if (name === "waktu") {
      setWaktu(value);
      setData({ ...data, tanggal: formatToYMD(selectedDate) + " " + value });
    } else {
      setData({ ...data, [name]: value });
    }
  }

  async function submit() {
    try {
      if (waktu === "-") {
        alert("Pilih Waktu Pertemuan");
        return;
      }
      const response = await apiAuth(getToken()).post("/janji", data);
      alert(response.data.message);
      setSelectedDate(new Date());
      navigate("/dashboard-penerima-tamu");
    } catch (error) {
      console.log(error.response?.data);
    }
  }

  function checkWaktuTamu(time) {
    let status = false;
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const filter = dataTamu.filter((item) => item.tanggal.split(" ")[0] === `${year}-${month}-${day}`);

    if (
      currentDate.getMonth() + 1 === selectedDate.getMonth() + 1 &&
      currentDate.getDate() === selectedDate.getDate() &&
      parseInt(time.split(":")[0]) <= currentDate.getHours()
    ) {
      status = true;
    } else {
      for (let i = 0; i < filter.length; i++) {
        if (filter[i].tanggal.split(" ")[1] === time) {
          status = true;
          break;
        }
      }
    }

    return status;
  }

  return (
    <div className={`min-h-screen bg-gray-50 flex ${showSidebar ? "pl-64" : ""} transition-all duration-300`}>
      {/* Toggle Logo */}
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

      <SidebarPenerimaTamu show={showSidebar} onClose={() => setShowSidebar(false)} />

      <main className="flex-1 p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Tambah Janji Temu</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Kalender
            setData={setData}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
            dataTamu={dataTamu}
            waktu={waktu}
          />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="bg-white p-6 rounded-lg shadow-md space-y-4"
          >
            <div>
              <label className="block font-medium mb-1">Pilih Guru</label>
              <select
                name="guru"
                onChange={setChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                {dataGuru.map((v, i) => (
                  <option value={v.id} key={i}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Nama Tamu</label>
              <input
                type="text"
                name="nama_tamu"
                placeholder="Masukan Nama Tamu"
                onChange={setChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">No Telepon</label>
              <input
                type="number"
                name="no_hp"
                placeholder="08123456789"
                onChange={setChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Tanggal</label>
              <input
                type="text"
                name="tanggal"
                value={new Intl.DateTimeFormat("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(selectedDate)}
                className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Waktu Pertemuan</label>
              <select
                name="waktu"
                onChange={setChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value="-">-- Pilih Waktu Pertemuan --</option>
                {["08:00:00", "09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00"].map((time) => (
                  <option key={time} value={time} disabled={checkWaktuTamu(time)}>
                    {time.slice(0, 5)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Keterangan</label>
              <textarea
                name="keterangan"
                onChange={setChange}
                required
                placeholder="Contoh: Keperluan dengan Bu Dian terkait LKS"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
            >
              Buat Janji Temu
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
