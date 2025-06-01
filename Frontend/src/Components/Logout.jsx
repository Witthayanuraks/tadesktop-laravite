import { apiAuth } from "../api/baseAPI";
import { Auth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { getToken, removeToken } = Auth();
  const navigate = useNavigate();

  async function logout() {
    try {
      await apiAuth(getToken()).post("/logout");
      removeToken();
      alert("Anda Berhasil Keluar");
      navigate("/login");
    } catch (error) {
      console.log(error.response);
    }
  }

  function handleClick() {
    const conf = confirm("Apakah Anda Ingin Logout?");
    if (conf) logout();
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-[#FF894E] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#FF7E43] transition-colors"
    >
      Logout
    </button>
  );
}
