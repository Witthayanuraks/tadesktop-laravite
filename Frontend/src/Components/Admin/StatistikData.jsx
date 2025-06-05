import { useState } from "react";
import { LayoutPanelLeft, Info } from "lucide-react"
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
  const [typeSpacesing, setSpacesing] = useState(4)
  const [showInfoLayout, setShowInfoLayout] = useState(false)

  // function calculateWidth(widthVariable = typeSpacesing, percentageToSubtract = 1) {
  //   if (typeof widthVariable !== 'number' || widthVariable === 0) {
  //     return null; 
  //   }
  //   const initialPercentage = 100 / widthVariable;
  //   const finalPercentage = initialPercentage - ((percentageToSubtract/2)*(widthVariable/2))
  //   return `${finalPercentage}%`
  // }


  return (
    <div className="space-y-4">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Statistik Kunjungan</h2>
        <div
          className="flex items-center justify-end border border-gray-200 rounded-md text-sm overflow-hidden"
          onMouseEnter={() => { setTimeout(() => { setShowInfoLayout(true) },100) }}
          onMouseLeave={() => { setShowInfoLayout(false) }}
        >
          <div className={"absolute bg-white shadow-xl p-2 px-3.5 max-w-[260px] border border-gray-200 rounded-md pointer-events-none z-30 duration-300 "+(showInfoLayout?"mt-[160px] opacity-100":"mt-[140px] opacity-0")}>
            <h3 className="font-semibold text-base mb-1 flex items-center"><Info size={16} style={{ marginRight: 6 }}/>Informasi</h3>
            <p className="text-[0.75rem]">Digunakan untuk mengubah layout menjadi 4-1 atau 2-2 pada tampilan dekstop, jika layar responsive akan berubah ke rows menjadi 1</p>
          </div>
          <button
            className={"flex items-center p-1.5 px-3 cursor-pointer border-r border-gray-200 "+(typeSpacesing===4?"bg-coral text-white":"bg-white")}
            onClick={() => { setSpacesing(4) }}
          >
            <span className="w-[24px] pointer-events-none"><LayoutPanelLeft size={19}/></span>
            <span className="w-[calc(100%-24px)] text-nowrap pointer-events-none">4-1</span>
          </button>
          <button
            className={"flex items-center p-1.5 px-3 cursor-pointer border-r border-gray-200 "+(typeSpacesing===2?"bg-coral text-white":"bg-white")}
            onClick={() => { setSpacesing(2) }}
          >
            <span className="w-[24px] pointer-events-none"><LayoutPanelLeft size={19}/></span>
            <span className="w-[calc(100%-24px)] text-nowrap pointer-events-none">2-2</span>
          </button>
        </div>
      </div>
      <div className="lg:grid-cols-4 lg:grid-cols-6"></div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${typeSpacesing} gap-6 duration-300`}>
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