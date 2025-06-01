import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart() {
  const [labels, setLabels] = useState([]);
  const [jumlahData, setJumlahData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistik = async () => {
      try {
        const res = await axios.get('/api/janji/statistik'); // belom diganti 
        const result = res.data.data;

        setLabels(result.map(r => r.tanggal));
        setJumlahData(result.map(r => r.jumlah));
      } catch (error) {
        console.error("Gagal fetch statistik janji temu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistik();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Jumlah Tamu',
        data: jumlahData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Statistik Kunjungan',
        font: { size: 16 }
      }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-400">Memuat grafik...</p>;
  }

  return (
<div className="w-full h-96 bg-white p-5 rounded-xl shadow-md flex items-center justify-center">
  <div className="w-full h-full">
    <Bar options={options} data={data} />
  </div>
</div>

  );
}
