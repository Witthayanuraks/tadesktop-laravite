import { useState } from "react";
import NavbarAdmin from "../../Components/Admin/SidebarAdmin";
import { Auth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiAuth } from "../../api/baseAPI";

export default function TambahPengguna() {
  const { getToken } = Auth();
  const navigate = useNavigate();
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  async function submit() {
    try {
      if (data.password !== data.confirm_password) {
        alert("Konfirmasi Password Tidak Valid");
        return;
      }
      setDisabledSubmit(true);
      const response = await apiAuth(getToken()).post("/users", data);
      alert(response.data.message);
      navigate("/dashboard-admin");
    } catch (error) {
      alert(error.response?.data?.message || "Gagal membuat akun");
    } finally {
      setDisabledSubmit(false);
    }
  }

  function setChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  return (
    <div className="relative min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <NavbarAdmin />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tambah Data Guru</h3>
          <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="space-y-4">
            <div>
              <label htmlFor="nama-guru" className="block font-medium mb-1">Nama Guru</label>
              <input
                type="text"
                id="nama-guru"
                name="name"
                onChange={setChange}
                required
                placeholder="Masukan Nama Guru"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="username" className="block font-medium mb-1">Nama Pengguna</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={setChange}
                required
                placeholder="Masukan Nama Pengguna"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={setChange}
                required
                placeholder="Masukan Email"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-medium mb-1">Kata Sandi</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={setChange}
                required
                placeholder="Masukan Kata Sandi"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="conf_password" className="block font-medium mb-1">Konfirmasi Kata Sandi</label>
              <input
                type="password"
                id="conf_password"
                name="confirm_password"
                onChange={setChange}
                required
                placeholder="Konfirmasi Kata Sandi"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              disabled={disabledSubmit}
              className={`w-full py-2 rounded font-semibold text-white transition ${
                disabledSubmit
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {disabledSubmit ? "Memproses..." : "Buat Data Guru"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
