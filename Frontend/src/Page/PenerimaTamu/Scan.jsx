import SidebarPenerimaTamu from "../../Components/PenerimaTamu/SidebarPenerimaTamu";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../Context/AuthContext";
import { apiAuth } from "../../api/baseAPI";
import { useRef, useState } from "react";
import SidebarLayout from "../../Components/Layout/SidebarLayout";
import { activeLink } from "./_SidebarList";

export default function Scan() {
  const { getToken } = Auth();
  const navigate = useNavigate();
  const input = useRef();
  const [showSidebar, setShowSidebar] = useState(true);

  async function updateData() {
    try {
      const response = await apiAuth(getToken()).put(
        `/janji/${input.current.value}`
      );
      alert(response.data.message);
      navigate("/dashboard-penerima-tamu");
    } catch (error) {
      alert(error.response?.data?.message || "Gagal update data.");
      navigate("/dashboard-penerima-tamu");
    }
  }

  return <SidebarLayout
    title="Dashboard Penerimaan Tamu"
    showDate={true}
    linklist={activeLink("/scan")}
  >
    <main className="flex-1 p-3.5 pt-7 px-6 max-w-[1700px] m-auto">
      <div className="w-full h-screen flex items-center justify-center p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateData();
          }}
          className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800">Scan QR / Input Kode Janji Temu</h2>
          <input
            type="text"
            ref={input}
            autoFocus
            placeholder="Masukkan ID Janji Temu"
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Konfirmasi Kehadiran
          </button>
        </form>
      </div>
    </main>
  </SidebarLayout>
}
