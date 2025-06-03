import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../Context/AuthContext";

export default function Dashboard() {
  const { getRole, getToken } = Auth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const role = getRole();

    // Jika sudah login, redirect ke dashboard sesuai role
    if (token) {
      if (role === "admin") return navigate("/dashboard-admin");
      if (role === "guru") return navigate("/dashboard-guru");
      if (role === "tamu") return navigate("/dashboard-tamu");
      if (role === "penerima_tamu") return navigate("/dashboard-penerima-tamu");
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden font-sans flex flex-col justify-between">
      {/* <div className="absolute inset-0 z-0 overflow-hidden">
       <div className="absolute left-1/2 -translate-x-1/2 w-[150%] rotate-12 h-16 bg-orange-400 rounded-xl top-[10%] md:top-[15%] max-md:rotate-0 max-md:w-[120%] max-md:h-12 max-md:top-[5%]" />
          <div className="absolute left-1/2 -translate-x-1/2 w-[150%] rotate-12 h-16 bg-[#1D3D4C] rounded-xl top-[30%] md:top-[35%] max-md:rotate-0 max-md:w-[120%] max-md:h-12 max-md:top-[25%]" />
          <div className="absolute left-1/2 -translate-x-1/2 w-[150%] rotate-12 h-16 bg-orange-400 rounded-xl top-[50%] md:top-[55%] max-md:rotate-0 max-md:w-[120%] max-md:h-12 max-md:top-[45%]" />
          <div className="absolute left-1/2 -translate-x-1/2 w-[150%] rotate-12 h-16 bg-[#1D3D4C] rounded-xl top-[70%] md:top-[75%] max-md:rotate-0 max-md:w-[120%] max-md:h-12 max-md:top-[65%]" />
      </div> */}
      {/* 🔰 LOGO */}
      <img
        src="https://smkn2-singosari.sch.id/wp-content/uploads/2021/10/logo.png"
        alt="Logo"
        className="absolute top-6 left-6 w-16 z-10"
      />

      {/* MAIN CONTENT */}
      <div className="z-10 mt-24 px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#004A76] mb-1">
            BUKU TAMU
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-[#FF6B00] mb-6">
            UNDANGAN
          </h2>

          <div className="flex gap-4 flex-wrap justify-center mb-6">
            <button
              onClick={() => navigate("/login")}
              className="bg-[#FF6B00] text-white font-bold py-3 px-10 rounded-full shadow-md hover:bg-[#E56000] transition-all text-lg"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/login-tamu")}
              className="bg-[#004A76] text-white font-bold py-3 px-10 rounded-full shadow-md hover:bg-[#003952] transition-all text-lg"
            >
              Sign Up
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-12 max-w-xl mx-auto leading-relaxed">
            Untuk Guru & Staf, silakan login untuk melanjutkan. Untuk Tamu,
            silahkan sign up jika belum memiliki akun, atau login jika sudah
            terdaftar.
          </p>
        </div>

        {/* Tentang Sekolah */}
        <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto shadow-md text-center">
          <h3 className="text-xl font-bold text-[#004A76] mb-3 border-b-2 border-[#FF6B00] pb-2 inline-block">
            Tentang
          </h3>
          <p className="text-md text-[#333] leading-relaxed">
            SMK Negeri 2 Singosari merupakan salah satu Lembaga Pendidikan
            Menengah Kejuruan di Kabupaten Malang, Jawa Timur yang
            menyelenggarakan Program Pendidikan Kejuruan Industri Kreatif,
            Teknologi Informatika dan Elektronika.
          </p>
        </div>

        {/* Ulasan */}
        <div className="mt-12 max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#004A76] mb-6">
            ULASAN
          </h1>

          <p className="text-lg text-gray-700 font-medium mb-8 max-w-2xl leading-relaxed">
            Kami sangat menghargai pendapat Anda<br />
            Silahkan beri ulasan atau masukan untuk meningkatkan pelayanan kami.
          </p>

          <div className="bg-white shadow-md p-6 rounded-xl inline-block">
            <img
              src="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://goo.gl/maps/KvNfgbdKXn5HFpBa6"
              alt="QR Code"
              className="w-[220px] h-[220px] mx-auto"
            />
            <p className="mt-4 text-sm text-gray-500">
              Scan untuk beri ulasan melalui Google Maps
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-600 my-8 z-10">
        © SMKN 2 Singosari 2024 – All Rights Reserved.
      </div>
    </div>
  );
}
