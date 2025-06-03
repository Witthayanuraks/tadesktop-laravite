import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../Context/AuthContext";
import { api } from "../../api/baseAPI";
import Navbar from "../../Components/Navbar";

export default function LoginTamu() {
  const { saveToken, saveRole, saveName } = Auth();
  const navigate = useNavigate();
  const [data, setData] = useState({
    telepon: "",
  });

  async function submit() {
    try {
      const response = await api().post("/login", data);
      saveToken(response.data.token);
      saveRole(response.data.role);
      saveName(response.data.name);
      alert("Login Berhasil");
      navigate("/dashboard-tamu");
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  function setChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  return (
    <>
      <Navbar status={"tamu"} />
      <div className="container-signup">
        <div className="container-form-login">
          <h1 style={{ textAlign: "start", lineHeight: "40px" }}>
            Selamat Datang Di <br />
            Buku Tamu
          </h1>
          <p>
            Yuk, Masuk Kembali dan Lihat Jadwal <br /> Kunjungan-mu
          </p>
          <form
            className="form-login"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <input
              type="text"
              name="telepon"
              placeholder="Masukan No Hp"
              onChange={setChange}
              required
            />
            <input
              type="password"
              name="password"
              onChange={setChange}
              placeholder="Masukan Kata Sandi"
              required
            />
            <button
              type="submit"
              className="btn-form"
              style={{ width: "80px", alignSelf: "flex-end" }}
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
