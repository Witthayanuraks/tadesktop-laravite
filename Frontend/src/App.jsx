// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import "./App.css";

// import Dashboard from "./Page/Dashboard";
// import Login from "./Page/Guru/Login";
// import SignUp from "./Page/Guru/SignUp";
// import DashboardGuru from "./Page/Guru/DashboardGuru";
// import TambahJanjiTemu from "./Page/Guru/TambahJanjiTemu";
// import NotifikasiGuru from "./Page/Guru/NotifikasiGuru";

// import DashboardPenerimaTamu from "./Page/PenerimaTamu/DashboardPenerimaTamu";
// import TambahJanjiTemuPenerimaTamu from "./Page/PenerimaTamu/TambahJanjiTemuPenerimaTamu";
// import Scan from "./Page/PenerimaTamu/Scan";
// import NotifikasiPenerimaTamu from "./Page/PenerimaTamu/NotifikasiPenerimaTamu";

// import DashboardAdmin from "./Page/Admin/DashboardAdmin";
// import TambahPengguna from "./Page/Admin/TambahPengguna";
// import DetailPengguna from "./Page/Admin/DetailPengguna";
// import JadwalTemu from "./Page/Admin/JadwalTemu";
// import Laporan from "./Page/Admin/Laporan";

// import LoginTamu from "./Page/Tamu/LoginTamu";
// import DashboardTamu from "./Page/Tamu/DashboardTamu";

// import {
//   AuthProvider,
//   HaveToken,
//   NoToken,
//   Guru,
//   Admin,
//   PenerimaTamu,
//   Tamu,
// } from "./Context/AuthContext";

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>

//           {/* 🌐 Halaman Landing */}
//           <Route path="/" element={<Dashboard />} />

//           {/* 🔐 Auth */}
//           <Route path="/login" element={<HaveToken><Login /></HaveToken>} />
//           <Route path="/signup" element={<HaveToken><SignUp /></HaveToken>} />
//           <Route path="/login-tamu" element={<HaveToken><LoginTamu /></HaveToken>} />

//           {/* 👨‍🏫 Guru */}
//           <Route path="/dashboard-guru" element={<NoToken><Guru><DashboardGuru /></Guru></NoToken>} />
//           <Route path="/tambah-janji" element={<NoToken><Guru><TambahJanjiTemu /></Guru></NoToken>} />
//           <Route path="/notifikasi-guru" element={<NoToken><Guru><NotifikasiGuru /></Guru></NoToken>} />

//           {/* 📥 Penerima Tamu */}
//           <Route path="/dashboard-penerima-tamu" element={<NoToken><PenerimaTamu><DashboardPenerimaTamu /></PenerimaTamu></NoToken>} />
//           <Route path="/tambah-janji-tamu" element={<NoToken><PenerimaTamu><TambahJanjiTemuPenerimaTamu /></PenerimaTamu></NoToken>} />
//           <Route path="/scan" element={<NoToken><PenerimaTamu><Scan /></PenerimaTamu></NoToken>} />
//           <Route path="/notifikasi-penerima-tamu" element={<NoToken><PenerimaTamu><NotifikasiPenerimaTamu /></PenerimaTamu></NoToken>} />

//           {/* 🛠️ Admin */}
//           <Route path="/dashboard-admin" element={<NoToken><Admin><DashboardAdmin /></Admin></NoToken>} />
//           <Route path="/tambah-guru" element={<NoToken><Admin><TambahPengguna /></Admin></NoToken>} />
//           <Route path="/detail-guru" element={<NoToken><Admin><DetailPengguna /></Admin></NoToken>} />
//           <Route path="/jadwal-temu" element={<NoToken><Admin><JadwalTemu /></Admin></NoToken>} />
//           <Route path="/laporan" element={<NoToken><Admin><Laporan /></Admin></NoToken>} />

//           {/* 🎫 Tamu */}
//           <Route path="/dashboard-tamu" element={<NoToken><Tamu><DashboardTamu /></Tamu></NoToken>} />

//           {/* 🧭 Catch-all */}
//           <Route path="*" element={<Navigate to="/" replace />} />

//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Page/Dashboard";
import Login from "./Page/Guru/Login";
import SignUp from "./Page/Guru/SignUp";
import DashboardGuru from "./Page/Guru/DashboardGuru";
import {
  Admin,
  AuthProvider,
  Guru,
  HaveToken,
  NoToken,
  PenerimaTamu,
  Tamu,
} from "./Context/AuthContext";
import TambahJanjiTemu from "./Page/Guru/TambahJanjiTemu";
import NotifikasiGuru from "./Page/Guru/NotifikasiGuru";
import DashboardPenerimaTamu from "./Page/PenerimaTamu/DashboardPenerimaTamu";
import TambahJanjiTemuPenerimaTamu from "./Page/PenerimaTamu/TambahJanjiTemuPenerimaTamu";
import Scan from "./Page/PenerimaTamu/Scan";
import NotifikasiPenerimaTamu from "./Page/PenerimaTamu/NotifikasiPenerimaTamu";
import DashboardAdmin from "./Page/Admin/DashboardAdmin";
import Laporan from "./Page/Admin/Laporan";
import JadwalTemu from "./Page/Admin/JadwalTemu";
import DetailPengguna from "./Page/Admin/DetailPengguna";
import TambahPengguna from "./Page/Admin/TambahPengguna";
import LoginTamu from "./Page/Tamu/LoginTamu";
import DashboardTamu from "./Page/Tamu/DashboardTamu";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/login"
            element={
              <HaveToken>
                <Login />
              </HaveToken>
            }
          />
          <Route
            path="/signup"
            element={
              <HaveToken>
                <SignUp />
              </HaveToken>
            }
          />
          <Route
            path="/login-tamu"
            element={
              <HaveToken>
                <LoginTamu />
              </HaveToken>
            }
          />
          <Route
            path="/dashboard-guru"
            element={
              <NoToken>
                <Guru>
                  <DashboardGuru />
                </Guru>
              </NoToken>
            }
          />
          <Route
            path="/tambah-janji"
            element={
              <NoToken>
                <Guru>
                  <TambahJanjiTemu />
                </Guru>
              </NoToken>
            }
          />
          <Route
            path="/notifikasi-guru"
            element={
              <NoToken>
                <Guru>
                  <NotifikasiGuru />
                </Guru>
              </NoToken>
            }
          />
          {/* penerima tamu */}
          <Route
            path="/dashboard-penerima-tamu"
            element={
              <NoToken>
                <PenerimaTamu>
                  <DashboardPenerimaTamu />
                </PenerimaTamu>
              </NoToken>
            }
          />
          <Route
            path="/tambah-janji-tamu"
            element={
              <NoToken>
                <PenerimaTamu>
                  <TambahJanjiTemuPenerimaTamu />
                </PenerimaTamu>
              </NoToken>
            }
          />
          <Route
            path="/scan"
            element={
              <NoToken>
                <PenerimaTamu>
                  <Scan />
                </PenerimaTamu>
              </NoToken>
            }
          />
          <Route
            path="/notifikasi-penerima-tamu"
            element={
              <NoToken>
                <PenerimaTamu>
                  <NotifikasiPenerimaTamu />
                </PenerimaTamu>
              </NoToken>
            }
          />
          {/* Admin */}
          <Route
            path="/dashboard-admin"
            element={
              <NoToken>
                <Admin>
                  <DashboardAdmin />
                </Admin>
              </NoToken>
            }
          />
          <Route
            path="/tambah-guru"
            element={
              <NoToken>
                <Admin>
                  <TambahPengguna />
                </Admin>
              </NoToken>
            }
          />
          <Route
            path="/detail-guru"
            element={
              <NoToken>
                <Admin>
                  <DetailPengguna />
                </Admin>
              </NoToken>
            }
          />
          <Route
            path="/jadwal-temu"
            element={
              <NoToken>
                <Admin>
                  <JadwalTemu />
                </Admin>
              </NoToken>
            }
          />
          <Route
            path="/laporan"
            element={
              <NoToken>
                <Admin>
                  <Laporan />
                </Admin>
              </NoToken>
            }
          />
          {/* Tamu */}
          <Route
            path="/dashboard-tamu"
            element={
              <NoToken>
                <Tamu>
                  <DashboardTamu />
                </Tamu>
              </NoToken>
            }
          />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
