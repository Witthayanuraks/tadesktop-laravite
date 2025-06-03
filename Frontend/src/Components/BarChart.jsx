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
  const [dataByStatus, setDataByStatus] = useState({
    menunggu: [],
    selesai: [],
    terlambat: [],
    jadwalUlang: []
  });
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(2025);
  const [stats, setStats] = useState({
    totalTamu: 0,
    totalUlasan: 0
  });

  useEffect(() => {
    const fetchStatistik = async () => {
      try {
        const [chartRes, statsRes] = await Promise.all([
          axios.get(`/api/janji/statistik?year=${year}`),
          axios.get('/api/janji/summary')
        ]);

        const chartData = chartRes.data.data;
        const summaryData = statsRes.data;

        // Group data by month and status
        const months = [
          'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
          'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        
        setLabels(months);
        
        setDataByStatus({
          menunggu: months.map(month => 
            chartData.filter(d => d.bulan === month && d.status === 'Menunggu').length
          ),
          selesai: months.map(month => 
            chartData.filter(d => d.bulan === month && d.status === 'Selesai').length
          ),
          terlambat: months.map(month => 
            chartData.filter(d => d.bulan === month && d.status === 'Terlambat').length
          ),
          jadwalUlang: months.map(month => 
            chartData.filter(d => d.bulan === month && d.status === 'Jadwal Ulang').length
          )
        });

        setStats({
          totalTamu: summaryData.totalTamu || 0,
          totalUlasan: summaryData.totalUlasan || 0
        });
      } catch (error) {
        console.error("Gagal fetch statistik:", error);
        // Fallback to sample data
        setLabels(['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']);
        setStats({
          totalTamu: 150,
          totalUlasan: 800
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStatistik();
  }, [year]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Menunggu',
        data: dataByStatus.menunggu,
        backgroundColor: 'rgba(255, 193, 7, 0.8)', // Amber
        borderRadius: 4,
        barThickness: 20,
      },
      {
        label: 'Selesai',
        data: dataByStatus.selesai,
        backgroundColor: 'rgba(76, 175, 80, 0.8)', // Green
        borderRadius: 4,
        barThickness: 20,
      },
      {
        label: 'Terlambat',
        data: dataByStatus.terlambat,
        backgroundColor: 'rgba(244, 67, 54, 0.8)', // Red
        borderRadius: 4,
        barThickness: 20,
      },
      {
        label: 'Jadwal Ulang',
        data: dataByStatus.jadwalUlang,
        backgroundColor: 'rgba(33, 150, 243, 0.8)', // Blue
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        // text: `Statistik Janji Temu Tahun ${year}`,
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: { 
        beginAtZero: true,
        grid: {
          display: false
        },
        ticks: {
          stepSize: 5
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-400">Memuat grafik...</p>;
  }

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Statistik Janji Temu</h2>
        <select 
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="border border-gray-300 rounded-md px-3 py-1"
        >
          {[2023, 2024, 2025].map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      <div className="h-96">
        <Bar options={options} data={data} />
      </div>

      <div className="flex flex-wrap gap-6 mt-8">
        <div className="bg-amber-50 p-4 rounded-lg flex-1 min-w-[200px]">
          <h3 className="text-gray-600 font-medium">Menunggu</h3>
          <p className="text-2xl font-bold text-amber-600">
            {dataByStatus.menunggu.reduce((a, b) => a + b, 0)}
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg flex-1 min-w-[200px]">
          <h3 className="text-gray-600 font-medium">Selesai</h3>
          <p className="text-2xl font-bold text-green-600">
            {dataByStatus.selesai.reduce((a, b) => a + b, 0)}
          </p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg flex-1 min-w-[200px]">
          <h3 className="text-gray-600 font-medium">Terlambat</h3>
          <p className="text-2xl font-bold text-red-600">
            {dataByStatus.terlambat.reduce((a, b) => a + b, 0)}
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg flex-1 min-w-[200px]">
          <h3 className="text-gray-600 font-medium">Jadwal Ulang</h3>
          <p className="text-2xl font-bold text-blue-600">
            {dataByStatus.jadwalUlang.reduce((a, b) => a + b, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}