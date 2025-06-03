import { useState } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

function StatCard({ title, value, icon, color, textColor, trend, trendValue, description }) {
  return (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-xl shadow-sm`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-semibold mt-2 ${textColor}`}>{value}</p>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          {trend === 'up' ? (
            <ArrowUpIcon className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-500" />
          )}
          <span className="text-sm ml-1 text-gray-600">{trendValue}</span>
        </div>
      )}
    </div>
  );
}

export default function StatistikData() {
  const [stats] = useState({
    totalGuests: 125,
    todayVisits: 12,
    weeklyVisits: 36,
    monthlyVisits: 84,
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Statistik Kunjungan</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tamu"
          value={stats.totalGuests}
          icon="👥"
          color="from-blue-50 to-blue-100"
          textColor="text-blue-600"
          trend="up"
          trendValue="5%"
          description="Jumlah tamu keseluruhan"
        />
        <StatCard
          title="Hari Ini"
          value={stats.todayVisits}
          icon="📅"
          color="from-green-50 to-green-100"
          textColor="text-green-600"
          trend="up"
          trendValue="12%"
          description="Kunjungan hari ini"
        />
        <StatCard
          title="Mingguan"
          value={stats.weeklyVisits}
          icon="📈"
          color="from-purple-50 to-purple-100"
          textColor="text-purple-600"
          trend="down"
          trendValue="3%"
          description="Dibanding minggu lalu"
        />
        <StatCard
          title="Bulanan"
          value={stats.monthlyVisits}
          icon="🗓️"
          color="from-orange-50 to-orange-100"
          textColor="text-orange-600"
          trend="up"
          trendValue="8%"
          description="Dibanding bulan lalu"
        />
      </div>
    </div>
  );
}