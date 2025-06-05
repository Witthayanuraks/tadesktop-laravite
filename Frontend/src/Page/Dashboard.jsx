import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../Context/AuthContext";

export default function Dashboard() {
  const { getRole, getToken } = Auth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const role = getRole();

    if (token) {
      if (role === "admin") return navigate("/dashboard-admin");
      if (role === "guru") return navigate("/dashboard-guru");
      if (role === "tamu") return navigate("/dashboard-tamu");
      if (role === "penerima_tamu") return navigate("/dashboard-penerima-tamu");
    }
  }, []);

   return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-between text-gray-900"
      style={{ backgroundImage: "url('/TampilanAwal.png')" }} 
    >
      {/* Header */}
      <div className="text-center pt-16 md:pt-24">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 leading-tight">
          BUKU
        </h1>
        <h2 className="text-4xl md:text-5xl font-extrabold text-orange-500">
          TAMU UNDANGAN
        </h2>
        <p className="mt-2 text-lg md:text-xl font-medium text-gray-700">
          SMK Negeri 2 Singosari!
        </p>
      </div>
      {/* Konten tengah */}
      <div className="flex flex-col md:flex-row justify-between items-center px-8 md:px-20 py-12 gap-8">
        {/* Kiri */}
        <div className="max-w-md space-y-6">
          {/* Tombol Login & Login Tamu */}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-[#FF6B00] text-white font-bold px-10 py-3 rounded-full text-lg hover:bg-orange-600 transition w-full md:w-auto"
            >
              Masuk
            </button>

            <button
              onClick={() => navigate("/login-tamu")}
              className="bg-[#004A76] text-white font-bold px-10 py-3 rounded-full text-lg hover:bg-blue-800 transition w-full md:w-auto"
            >
              Masuk Tamu
            </button>
          </div>

          {/* Tentang */}
          <div>
            <h3 className="text-xl font-bold mb-2 text-blue-900">Tentang</h3>
            <p className="text-sm leading-relaxed text-gray-800">
              SMK Negeri 2 Singosari merupakan salah satu Lembaga Pendidikan Menengah Kejuruan di Kabupaten Malang, Jawa Timur yang menyelenggarakan Program Pendidikan Kejuruan Industri Kreatif, Teknologi Informatika dan Elektronika.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 pb-6">
        © SMKN 2 Singosari 2025 — All Rights Reserved.
      </footer>
    </div>
  );
}