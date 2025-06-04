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
import Pengguna from "./Components/Admin/Pengguna";
import TestingAllLayout from "./_testing/testing";
import { SnackbarProvider } from "notistack";


// [INFO]: Problem must be a <Route> or <React.Fragment>
// const routeGroups = [
//   {
//     wrapper: (PageComponent) => <HaveToken>{PageComponent}</HaveToken>,
//     routes: [
//       { path: "/login", element: <Login /> },
//       { path: "/signup", element: <SignUp /> },
//       { path: "/login-tamu", element: <LoginTamu /> },
//     ],
//   },
//   {
//     wrapper: (PageComponent) => <NoToken><Guru>{PageComponent}</Guru></NoToken>,
//     routes: [
//       { path: "/dashboard-guru", element: <DashboardGuru /> },
//       { path: "/tambah-janji", element: <TambahJanjiTemu /> },
//       { path: "/notifikasi-guru", element: <NotifikasiGuru /> },
//     ],
//   },
//   {
//     wrapper: (PageComponent) => <NoToken><PenerimaTamu>{PageComponent}</PenerimaTamu></NoToken>,
//     routes: [
//       { path: "/dashboard-penerima-tamu", element: <DashboardPenerimaTamu /> },
//       { path: "/tambah-janji-tamu", element: <TambahJanjiTemuPenerimaTamu /> },
//       { path: "/scan", element: <Scan /> },
//       { path: "/notifikasi-penerima-tamu", element: <NotifikasiPenerimaTamu /> },
//     ],
//   },
//   {
//     wrapper: (PageComponent) => <NoToken><Admin>{PageComponent}</Admin></NoToken>,
//     routes: [
//       { path: "/dashboard-admin", element: <DashboardAdmin /> },
//       { path: "/tambah-guru", element: <TambahPengguna /> },
//       { path: "/detail-guru", element: <DetailPengguna /> },
//       { path: "/jadwal-temu", element: <JadwalTemu /> },
//       { path: "/laporan", element: <Laporan /> },
//       { path: "/pengguna", element: <Pengguna /> },
//     ],
//   },
//   {
//     wrapper: (PageComponent) => <NoToken><Tamu>{PageComponent}</Tamu></NoToken>,
//     routes: [
//       { path: "/dashboard-tamu", element: <DashboardTamu /> },
//     ],
//   },
//   {
//     wrapper: null,
//     routes: [
//       { path: "/", element: <Dashboard /> },
//     ]
//   }
// ]
// 
// function RenderedRouter() {
//   return <>
//     <Route></Route>
//     {/* {routeGroups.flatMap((group, groupIndex) =>
//       group.routes.map((route, routeIndex) => {
//         const finalElement = group.wrapper
//         ? group.wrapper(route.element)
//         : route.element;
//         return (
//           <Route
//             key={`${groupIndex}-${routeIndex}-${route.path}`}
//             path={route.path}
//             element={() => finalElement}
//           />
//         )
//       })
//     )} */}
//   </>
// }
// 
// function App() {
//   return <Router>
//     <AuthProvider>
//       <Routes>
//         <RenderedRouter />
//       </Routes>
//     </AuthProvider>
//   </Router>
// }

// THIS ELEMENT FOR DESIGN ONLY (NONE INCLUDE LOGIC LIKE AUTHENTICATION OR VALIDATION)
function AppDesign_Dev() {
  return <SnackbarProvider
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
  >
    <div className="font-poppins">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* [TRIGGER] Please Remove Testing Layout On Production! */}
            <Route path="/testing/layout" element={<TestingAllLayout />}/>
            {/* ----------------------------------------------------- */}
            {/* --- AUTHENTICATION --- */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login-tamu" element={<LoginTamu />} />
            {/* --- DASHBOARD GURU --- */}
            <Route path="/dashboard-guru" element={<DashboardGuru />} />
            <Route path="/tambah-janji" element={<TambahJanjiTemu />} />
            <Route path="/notifikasi-guru" element={<NotifikasiGuru />} />
            {/* --- PENERIMAAN TAMU --- */}
            <Route path="/dashboard-penerima-tamu" element={<DashboardPenerimaTamu />} />
            <Route path="/tambah-janji-tamu" element={<TambahJanjiTemuPenerimaTamu />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/notifikasi-penerima-tamu" element={<NotifikasiPenerimaTamu />} />
            {/* --- ADMIN --- */}
            <Route path="/dashboard-admin" element={<DashboardAdmin />} />
            <Route path="/tambah-guru" element={<TambahPengguna />} />
            <Route path="/detail-guru" element={<DetailPengguna />} />
            <Route path="/jadwal-temu" element={<JadwalTemu />} />
            <Route path="/laporan" element={<Laporan />} />
            {/* --- PENGGUNA --- */}
            <Route path="/pengguna" element={<Pengguna />} />
            <Route path="/dashboard-tamu" element={<DashboardTamu />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  </SnackbarProvider>
}

function App() {
  return <AppDesign_Dev /> // Development Design

  return <SnackbarProvider
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
  >
    <div className="font-poppins">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<HaveToken><Login /></HaveToken>} />
            <Route path="/signup" element={<HaveToken><SignUp /></HaveToken>} />
            <Route path="/login-tamu" element={<HaveToken><LoginTamu /></HaveToken>} />
            <Route path="/dashboard-guru" element={<NoToken><Guru><DashboardGuru /></Guru></NoToken>} />
            <Route path="/tambah-janji" element={<NoToken><Guru><TambahJanjiTemu /></Guru></NoToken>} />
            <Route path="/notifikasi-guru" element={<NoToken><Guru><NotifikasiGuru /></Guru></NoToken>} />
            <Route path="/dashboard-penerima-tamu" element={<NoToken><PenerimaTamu><DashboardPenerimaTamu /></PenerimaTamu></NoToken>} />
            <Route path="/tambah-janji-tamu" element={<NoToken><PenerimaTamu><TambahJanjiTemuPenerimaTamu /></PenerimaTamu></NoToken>} />
            <Route path="/scan" element={<NoToken><PenerimaTamu><Scan /></PenerimaTamu></NoToken>} />
            <Route path="/notifikasi-penerima-tamu" element={<NoToken><PenerimaTamu><NotifikasiPenerimaTamu /></PenerimaTamu></NoToken>} />
            <Route path="/dashboard-admin" element={<NoToken><Admin><DashboardAdmin /></Admin></NoToken>} />
            <Route path="/tambah-guru" element={<NoToken><Admin><TambahPengguna /></Admin></NoToken>} />
            <Route path="/detail-guru" element={<NoToken><Admin><DetailPengguna /></Admin></NoToken>} />
            <Route path="/jadwal-temu" element={<NoToken><Admin><JadwalTemu /></Admin></NoToken>} />
            <Route path="/laporan" element={<NoToken><Admin><Laporan /></Admin></NoToken>} />
            <Route path="/pengguna" element={<NoToken><Admin><Pengguna /></Admin></NoToken>} />
            <Route path="/dashboard-tamu" element={<NoToken><Tamu><DashboardTamu /></Tamu></NoToken>} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  </SnackbarProvider>
}

export default App;
