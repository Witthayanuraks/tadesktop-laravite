import { useEffect, useState } from "react";
import { apiAuth } from "../../api/baseAPI";
import { Auth } from "../../Context/AuthContext";
import { activeLink } from "./_SidebarList";

export default function ProfileGuru() {
  const { getToken } = Auth();
  const [profile, setProfile] = useState({
    nama: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await apiAuth(getToken()).get("/profile");
        setProfile(res.data || {});
      } catch (err) {
        console.error("Gagal mengambil profil:", err.response || err.message);
      }
    }
    fetchProfile();
  }, [getToken]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/ProfilGuru.png')" }}
    >
      <div className="bg-[#444] w-full max-w-md rounded-2xl px-6 py-8 text-white shadow-xl relative">
        {/* <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-white border-4 border-white overflow-hidden flex items-center justify-center">
          <img
            src="/default-avatar.png"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div> */}

        {/* Form */}
        <div className="mt-20 space-y-6">
          <div>
            <label className="block font-semibold text-lg mb-1">Nama</label>
            <input
              type="text"
              value={profile.nama}
              disabled
              className="w-full px-4 py-2 bg-white text-black rounded-md border border-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-lg mb-1">Nama Pengguna</label>
            <input
              type="text"
              value={profile.username}
              disabled
              className="w-full px-4 py-2 bg-white text-black rounded-md border border-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-lg mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-2 bg-white text-black rounded-md border border-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
