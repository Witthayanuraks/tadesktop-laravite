import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../Context/AuthContext";
import { api } from "../../api/baseAPI";
import { Eye, EyeOff, Lock, PhoneIcon } from "lucide-react";
import { enqueueSnackbar } from "notistack";

export default function Login() {
  const { saveToken, saveRole, saveName } = Auth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ telepon: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await api().post("/login", formData);
      saveToken(res.data.token);
      saveRole(res.data.role);
      saveName(res.data.name);
      enqueueSnackbar("Berhasil masuk!", { variant: "success" });
      navigate("/dashboard-tamu");
    } catch (err) {
      enqueueSnackbar(String(err.response?.data?.message || "Login gagal"), { variant: "error" });
      setMessage({ text: err.response?.data?.message || "Login gagal", type: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white p-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Masuk.png')" }}
      />

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/90 backdrop-blur-sm p-10 rounded-xl max-w-md w-full shadow-xl space-y-5"
      >
        {/* Judul */}
        <div className="text-center text-[#1D3D4C]">
          <h2 className="text-3xl font-bold leading-tight">Masuk sebagai</h2>
          <h2 className="text-3xl font-bold leading-tight">Tamu</h2>
        </div>

        {/* No HP */}
        <div className="relative">
          <PhoneIcon className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="telepon"
            placeholder="Masukkan No HP"
            className="pl-10 pr-4 py-3 text-base border rounded-full w-full focus:outline-none shadow-sm"
            value={formData.telepon}
            onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Masukkan Kata Sandi"
            className="pl-10 pr-10 py-3 text-base border rounded-full w-full focus:outline-none shadow-sm"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Lupa Password */}
        <div className="text-right">
          <span className="text-sm text-black font-medium cursor-pointer hover:underline">
            Lupa Password?
          </span>
        </div>

        {/* Error Message */}
        {message.text && (
          <p className={`text-sm text-center ${message.type === "error" ? "text-red-500" : "text-green-600"}`}>
            {message.text}
          </p>
        )}

        {/* Submit */}
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
