import NavbarTamu from "../../Components/NavbarTamu";
import { useEffect, useState } from "react";
import { Auth } from "../../Context/AuthContext";
import { apiAuth } from "../../api/baseAPI";

export default function DashboardTamu() {
  const { getToken } = Auth();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await apiAuth(getToken()).get("/janji/tamu");
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    }

    fetch();
  }, []);

  function formatDateIndo(date) {
    const bulan = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    const jam = String(date.getHours()).padStart(2, "0");
    const menit = String(date.getMinutes()).padStart(2, "0");
    const hari = String(date.getDate()).padStart(2, "0");
    const bulanText = bulan[date.getMonth()];
    const tahun = date.getFullYear();

    return `${jam}:${menit} ${hari}-${bulanText}-${tahun}`;
  }
  function checkStatus(d) {
    if (d.reschedule !== null) {
      if (d.reschedule == "Tunggu") {
        return "Terlambat";
      }
      if (d.reschedule == "Batalkan") {
        return "Dibatalkan";
      }
    } else if (d.status == "Telat") {
      return "Terlambat";
    } else {
      return d.status;
    }
  }
  return (
    <div className="dashboard-guru">
      <NavbarTamu /> 
      <div className="container-admin">
        <div className="table-container">
          <div className="header-table">
            <h2>Jadwal Temu</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Guru</th>
                <th>Keterangan</th>
                <th>Status</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {data.map((v, i) => (
                <tr key={i}>
                  <td data-label="No">{i + 1}</td>
                  <td data-label="Nama Tamu">{v.guru.name}</td>
                  <td data-label="Keterangan">{v.keterangan}</td>
                  <td data-label="Status">{checkStatus(v)}</td>
                  <td data-label="Kalender">
                    {formatDateIndo(new Date(v.tanggal.replace(" ", "T")))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
