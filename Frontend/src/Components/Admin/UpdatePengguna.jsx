import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "../../Context/AuthContext";
import { apiAuth } from "../../api/baseAPI";
import Loading from "../Loading";

export default function UpdatePengguna() {
  const { getToken } = Auth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataGuru, setDataGuru] = useState(null);

  useEffect(() => {
    if (!state || !state.id) {
      alert("Data pengguna tidak ditemukan");
      navigate("/dashboard-admin");
      return;
    }

    async function fetchData() {
      try {
        const response = await apiAuth(getToken()).get(`/users/${state.id}`);
        setDataGuru(response.data);
      } catch (error) {
        console.error(error.response);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const setChange = (e) => {
    const { name, value } = e.target;
    setDataGuru((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async () => {
    try {
      setDisabledSubmit(true);
      const res = await apiAuth(getToken()).put(`/users/${state.id}`, dataGuru);
      alert(res.data.message);
      navigate("/dashboard-admin");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    } finally {
      setDisabledSubmit(false);
    }
  };

  const deleteGuru = async () => {
    if (!confirm("Yakin ingin menghapus pengguna ini?")) return;
    try {
      const res = await apiAuth(getToken()).delete(`/users/${state.id}`);
      alert(res.data.message);
      navigate("/dashboard-admin");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus pengguna");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-12">
      {dataGuru && (
        <div className="w-full max-w-xl bg-white shadow-xl rounded-lg p-6 space-y-6">
          <h3 className="text-2xl font-bold text-center text-[#1D3D4C]">Perbarui Data Guru</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="nama-guru" className="block font-medium mb-1">Nama Guru</label>
              <input
                type="text"
                id="nama-guru"
                name="name"
                value={dataGuru.name}
                onChange={setChange}
                placeholder="Masukkan Nama Guru"
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div>
              <label htmlFor="username" className="block font-medium mb-1">Nama Pengguna</label>
              <input
                type="text"
                id="username"
                name="username"
                value={dataGuru.username}
                onChange={setChange}
                placeholder="Masukkan Nama Pengguna"
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={dataGuru.email}
                onChange={setChange}
                placeholder="Masukkan Email"
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div className="flex justify-between items-center gap-4">
              <button
                type="submit"
                disabled={disabledSubmit}
                className={`flex-1 py-2 text-white font-semibold rounded transition ${
                  disabledSubmit
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {disabledSubmit ? "Memproses..." : "Perbarui Data"}
              </button>

              <button
                type="button"
                onClick={deleteGuru}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition"
              >
                Hapus Data
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
