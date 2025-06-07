import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../Context/AuthContext";
import { api } from "../api/baseAPI";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function Login() {
  const { saveToken, saveRole, saveName } = Auth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
async function handleSubmit(e) {
  e.preventDefault();
  setIsLoading(true);
  setMessage({ text: "", type: "" });

  try {
    const res = await api().post("/login", formData);
    const role = res.data.role?.toLowerCase();

    saveToken(res.data.token);
    saveRole(res.data.role); // tetap simpan dengan original case
    saveName(res.data.name);

    // ✅ Arahkan berdasarkan role
    if (role === "guru") navigate("/dashboard-guru");
    else if (role === "admin") navigate("/dashboard-admin");
    else if (role === "penerima tamu" || role === "penerima-tamu") navigate("/dashboard-penerima-tamu");
    else if (role === "tamu") navigate("/dashboard-tamu");
    else navigate("/"); // fallback
  } catch (err) {
    setMessage({
      text: err.response?.data?.message || "Login gagal",
      type: "error",
    });
  } finally {
    setIsLoading(false);
  }
}


  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white p-4">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Masuk.png')" }}
      />

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/70 backdrop-blur-sm p-10 rounded-4xl max-w-md w-full shadow-xl space-y-5"
      >
        <div className="text-center text-[#1D3D4C]">
          <h2 className="text-3xl font-bold leading-tight">Selamat Datang</h2>
          <h2 className="text-3xl font-bold leading-tight mt-2.5">Di Buku Tamu Digital</h2>
        </div>

        {/* Username */}
        <label className="text-japanese-indigo font-semibold pl-3.5 block w-full mb-1">Nama</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="username"
            placeholder="Masukkan Pengguna"
            className="bg-white pl-10 pr-4 py-3 text-base border border-gray-300 rounded-full w-full focus:outline-none shadow-sm"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </div>

        {/* Password */}
        <label className="text-japanese-indigo font-semibold pl-3.5 block w-full mb-1">Sandi</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Masukkan Kata Sandi"
            className="bg-white pl-10 pr-10 py-3 text-base border border-gray-300 rounded-full w-full focus:outline-none shadow-sm"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Lupa Password */}
        <div className="text-right">
          <span className="text-sm text-black font-medium cursor-pointer hover:underline">
            Lupa Password?
          </span>
        </div>

        {/* Message */}
        {message.text && (
          <p
            className={`text-sm text-center ${
              message.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 text-base text-white font-semibold rounded-full transition ${
            isLoading ? "bg-orange-300" : "bg-orange-400 hover:bg-orange-500"
          }`}
        >
          {isLoading ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
