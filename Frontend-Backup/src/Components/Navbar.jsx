export default function Navbar({ status }) {
  return (
    <div className="container-navbar">
      <a
        href={status == "guru" ? "/login-tamu" : "login"}
        style={{ marginRight: "2rem" }}
      >
        {status == "guru" ? "Masuk sebagai Tamu" : "Masuk sebagai Guru"}
      </a>
    </div>
  );
}
