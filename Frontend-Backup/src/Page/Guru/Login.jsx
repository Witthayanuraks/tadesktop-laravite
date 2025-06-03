import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../Context/AuthContext";
import { api } from "../../api/baseAPI";
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
      saveToken(res.data.token);
      saveRole(res.data.role);
      saveName(res.data.name);
      navigate("/dashboard-guru");
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Login gagal", type: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white p-4">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 w-[150%] rotate-12 h-16 bg-orange-400 rounded-xl top-[10%] md:top-[15%] max-md:rotate-0 max-md:w-[120%] max-md:h-12 max-md:top-[5%]" />
        <div className="absolute left-1/2 -translate-x-1/2 w-[150%] rotate-12 h-16 bg-[#1D3D4C] rounded-xl top-[30%] md:top-[35%] max-md:rotate-0 max-md:w-[120%] max-md:h-12 max-md:top-[25%]" />
        <div className="absolute left-1/2 -translate-x-1/2 w-[150%] rotate-12 h-16 bg-orange-400 rounded-xl top-[50%] md:top-[55%] max-md:rotate-0 max-md:w-[120%] max-md:h-12 max-md:top-[45%]" />
        <div className="absolute left-1/2 -translate-x-1/2 w-[150%] rotate-12 h-16 bg-[#1D3D4C] rounded-xl top-[70%] md:top-[75%] max-md:rotate-0 max-md:w-[120%] max-md:h-12 max-md:top-[65%]" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/90 backdrop-blur-sm p-8 rounded-xl max-w-sm w-full shadow-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#1D3D4C]">Login</h2>

        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="username"
            placeholder="Masukan Pengguna"
            className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none shadow-sm"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Masukan Kata Sandi"
            className="pl-10 pr-10 py-2 border rounded-full w-full focus:outline-none shadow-sm"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {message.text && (
          <p className={`text-sm text-center ${message.type === "error" ? "text-red-500" : "text-green-600"}`}>
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 text-white font-semibold rounded-full transition ${
            isLoading ? "bg-orange-300" : "bg-orange-400 hover:bg-orange-500"
          }`}
        >
          {isLoading ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
