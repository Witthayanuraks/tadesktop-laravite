import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone } from "lucide-react";
import { api } from "../../api/baseAPI";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");

    try {
      const res = await api().post("/register", formData);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      setMsg(err.response?.data?.message || "Gagal daftar");
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
      <form
        onSubmit={handleSubmit}
        // className="bg-white shadow-lg p-8 rounded-xl max-w-sm w-full space-y-4 border"
          className="relative z-10 bg-white/90 backdrop-blur-sm p-8 rounded-xl max-w-sm w-full shadow-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#1D3D4C]">Daftar</h2>

        <div className="relative">
          <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            className="pl-10 py-2 border rounded-full w-full focus:outline-none shadow-sm"
            onChange={handleChange}
            required
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="pl-10 py-2 border rounded-full w-full focus:outline-none shadow-sm"
            onChange={handleChange}
            required
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            name="phone"
            placeholder="No. HP"
            className="pl-10 py-2 border rounded-full w-full focus:outline-none shadow-sm"
            onChange={handleChange}
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Kata Sandi"
            className="pl-10 py-2 border rounded-full w-full focus:outline-none shadow-sm"
            onChange={handleChange}
            required
          />
        </div>

        {msg && <p className="text-sm text-red-500 text-center">{msg}</p>}

        <button
          type="submit"
          className={`w-full py-2 text-white font-semibold rounded-full transition ${
            isLoading ? "bg-orange-300" : "bg-orange-400 hover:bg-orange-500"
          }`}
        >
          {isLoading ? "Memproses..." : "Daftar"}
        </button>
      </form>
    </div>
  );
}
