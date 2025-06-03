import Logout from "./Logout";

export default function NavbarTamu() {
  return (
    <div className="container-navbar-guru">
      <div className="info-guru">
        <h2>Selamat Datang Di Buku Tamu</h2>
        <p>
          {new Intl.DateTimeFormat("id-ID", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
          }).format(new Date(Date.now()))}
        </p>
      </div>
      <div>
        <Logout />
      </div>
    </div>
  );
}
