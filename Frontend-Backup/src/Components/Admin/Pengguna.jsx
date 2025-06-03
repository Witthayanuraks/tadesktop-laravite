import { useEffect, useState } from "react";
import { Auth } from "../../Context/AuthContext";
import { apiAuth } from "../../api/baseAPI";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import Search from "../Search";
import { PlusCircle } from "lucide-react"; // Added for the Tambah Guru button

export default function Pengguna() {
  const navigate = useNavigate();
  const { getToken } = Auth();
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState({
    nama: "",
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await apiAuth(getToken()).get("/users", {
          params: filtering,
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, [filtering]); // Added filtering to dependency array

  if (loading) return <Loading />;

  function filterGuru() {
    if (filtering.nama === "") return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(filtering.nama.toLowerCase())
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="overflow-x-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <Search setFiltering={setFiltering} filtering={filtering} />
          <h2 className="text-xl font-semibold text-gray-800">Daftar Guru</h2>
          <button
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md transition-colors"
            onClick={() => navigate("/tambah-guru")}
          >
            <PlusCircle className="w-5 h-5" />
            Tambah Guru
          </button>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Guru</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length !== 0 ? (
              filterGuru().map((v, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{v.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{v.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{v.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => navigate("/detail-guru", { state: { id: v.id } })}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  Tidak ada data guru
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}