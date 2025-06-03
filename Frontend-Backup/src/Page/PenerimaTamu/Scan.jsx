import SidebarPenerimaTamu from "../../Components/PenerimaTamu/SidebarPenerimaTamu.";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../Context/AuthContext";
import { apiAuth } from "../../api/baseAPI";
import { useRef, useState } from "react";

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

      {/* Sidebar */}
      <SidebarPenerimaTamu show={showSidebar} onClose={() => setShowSidebar(false)} />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
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
      </main>
    </div>
  );
}
