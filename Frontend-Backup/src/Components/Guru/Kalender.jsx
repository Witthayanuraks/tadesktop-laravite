import { useEffect, useState } from "react";

export default function Kalender({
  setData,
  setSelectedDate,
  selectedDate,
  dataTamu,
  waktu,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      tanggal: formatToYMD(new Date()) + " " + waktu,
    }));
  }, []);

  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDay = (firstDay.getDay() + 6) % 7;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const tempDays = [];

    for (let i = startDay - 1; i >= 0; i--) {
      tempDays.push({
        day: daysInPrevMonth - i,
        currentMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      tempDays.push({
        day: i,
        currentMonth: true,
        isToday:
          i === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear(),
      });
    }

    const nextPadding = 42 - tempDays.length;
    for (let i = 1; i <= nextPadding; i++) {
      tempDays.push({ day: i, currentMonth: false });
    }

    setDays(tempDays);
  };

  function formatToYMD(date) {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handlePrev = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNext = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 3);
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);

    if (nextMonth <= maxDate) {
      setCurrentDate(nextMonth);
    }
  };

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];

  function checkDataTamuTanggal(tgl, bln, thn) {
    return dataTamu.some(
      (item) => item.tanggal.split(" ")[0] === `${thn}-${String(bln).padStart(2, "0")}-${String(tgl).padStart(2, "0")}`
    );
  }

  function filterDataTamu() {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");

    return dataTamu.filter((item) => item.tanggal.split(" ")[0] === `${year}-${month}-${day}`);
  }

  return (
    <div className="relative rounded-2xl shadow-lg overflow-hidden backdrop-blur-xl bg-white/30 border border-white/20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20" />
      
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={handlePrev} 
            className="text-gray-600 hover:text-white px-3 py-1 rounded-full backdrop-blur-sm bg-white/30 hover:bg-white/50 transition-all"
          >
            ‹
          </button>
          <h2 className="text-xl font-semibold text-gray-800/90">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button 
            onClick={handleNext} 
            className="text-gray-600 hover:text-white px-3 py-1 rounded-full backdrop-blur-sm bg-white/30 hover:bg-white/50 transition-all"
          >
            ‸
          </button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600/80 mb-3">
          {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
            <div key={d} className="py-1">{d}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((d, i) => {
            const isSelected =
              d.currentMonth &&
              selectedDate &&
              selectedDate.getDate() === d.day &&
              selectedDate.getMonth() === currentDate.getMonth() &&
              selectedDate.getFullYear() === currentDate.getFullYear();

            const isDisabled =
              !d.currentMonth ||
              (currentDate.getFullYear() === new Date().getFullYear() &&
                currentDate.getMonth() === new Date().getMonth() &&
                d.day < new Date().getDate());

            const hasTamu =
              d.currentMonth &&
              checkDataTamuTanggal(d.day, currentDate.getMonth() + 1, currentDate.getFullYear());

            return (
              <button
                key={i}
                disabled={isDisabled}
                className={`w-full aspect-square rounded-xl text-sm font-medium transition-all 
                  ${!d.currentMonth ? "text-gray-400/50" : "text-gray-700/90"} 
                  ${isSelected ? "bg-blue-600/90 text-white shadow-md" : ""}
                  ${hasTamu ? "ring-2 ring-orange-400/50" : ""}
                  ${d.currentMonth && !isSelected ? "hover:bg-white/50" : ""}
                  backdrop-blur-sm
                  ${d.currentMonth ? "bg-white/30" : "bg-transparent"}
                  `}
                onClick={() => {
                  if (d.currentMonth) {
                    const selected = new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      d.day
                    );
                    setSelectedDate(selected);
                    setData((prev) => ({
                      ...prev,
                      tanggal: formatToYMD(selected) + " " + waktu,
                    }));
                  }
                }}
              >
                {d.day}
              </button>
            );
          })}
        </div>

        {/* Jadwal Hari Ini */}
        <div className="mt-6 space-y-3">
          {filterDataTamu().map((v, i) => (
            <div 
              key={i} 
              className="text-sm bg-white/40 p-3 rounded-xl backdrop-blur-sm border border-white/30 shadow-sm"
            >
              <p className="font-medium text-blue-700/90">
                {v.tanggal.split(" ")[1].split(":").slice(0, 2).join(":")}
              </p>
              <p className="text-gray-700/90">
                Ada jadwal dengan <strong className="font-semibold">{v.tamu.nama}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// import { useEffect, useState } from "react";

// export default function Kalender({
//   setData,
//   setSelectedDate,
//   selectedDate,
//   dataTamu,
//   waktu,
// }) {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [days, setDays] = useState([]);

//   useEffect(() => {
//     setData((prev) => ({
//       ...prev,
//       tanggal: formatToYMD(new Date()) + " " + waktu,
//     }));
//   }, []);

//   useEffect(() => {
//     generateCalendar(currentDate);
//   }, [currentDate]);

//   const generateCalendar = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();

//     const firstDay = new Date(year, month, 1);
//     const startDay = (firstDay.getDay() + 6) % 7;

//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const daysInPrevMonth = new Date(year, month, 0).getDate();

//     const tempDays = [];

//     for (let i = startDay - 1; i >= 0; i--) {
//       tempDays.push({
//         day: daysInPrevMonth - i,
//         currentMonth: false,
//       });
//     }

//     for (let i = 1; i <= daysInMonth; i++) {
//       tempDays.push({
//         day: i,
//         currentMonth: true,
//         isToday:
//           i === new Date().getDate() &&
//           month === new Date().getMonth() &&
//           year === new Date().getFullYear(),
//       });
//     }

//     const nextPadding = 42 - tempDays.length;
//     for (let i = 1; i <= nextPadding; i++) {
//       tempDays.push({ day: i, currentMonth: false });
//     }

//     setDays(tempDays);
//   };

//   function formatToYMD(date) {
//     const year = date.getFullYear();
//     const month = `${date.getMonth() + 1}`.padStart(2, "0");
//     const day = `${date.getDate()}`.padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   }

//   const handlePrev = () => {
//     setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
//   };

//   const handleNext = () => {
//     const today = new Date();
//     const maxDate = new Date(today.getFullYear(), today.getMonth() + 3);
//     const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);

//     if (nextMonth <= maxDate) {
//       setCurrentDate(nextMonth);
//     }
//   };

//   const monthNames = [
//     "Januari", "Februari", "Maret", "April", "Mei", "Juni",
//     "Juli", "Agustus", "September", "Oktober", "November", "Desember",
//   ];

//   function checkDataTamuTanggal(tgl, bln, thn) {
//     return dataTamu.some(
//       (item) => item.tanggal.split(" ")[0] === `${thn}-${String(bln).padStart(2, "0")}-${String(tgl).padStart(2, "0")}`
//     );
//   }

//   function filterDataTamu() {
//     const year = selectedDate.getFullYear();
//     const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
//     const day = String(selectedDate.getDate()).padStart(2, "0");

//     return dataTamu.filter((item) => item.tanggal.split(" ")[0] === `${year}-${month}-${day}`);
//   }

//   return (
//     <div className="relative rounded-xl shadow-xl overflow-hidden backdrop-blur-sm bg-white/80">
//       <div className="relative z-10 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <button onClick={handlePrev} className="text-gray-700 hover:text-black px-2 py-1 rounded">‹</button>
//           <h2 className="text-xl font-semibold text-gray-800">
//             {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
//           </h2>
//           <button onClick={handleNext} className="text-gray-700 hover:text-black px-2 py-1 rounded">›</button>
//         </div>

//         <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 mb-2">
//           {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
//             <div key={d}>{d}</div>
//           ))}
//         </div>

//         <div className="grid grid-cols-7 gap-1">
//           {days.map((d, i) => {
//             const isSelected =
//               d.currentMonth &&
//               selectedDate &&
//               selectedDate.getDate() === d.day &&
//               selectedDate.getMonth() === currentDate.getMonth() &&
//               selectedDate.getFullYear() === currentDate.getFullYear();

//             const isDisabled =
//               !d.currentMonth ||
//               (currentDate.getFullYear() === new Date().getFullYear() &&
//                 currentDate.getMonth() === new Date().getMonth() &&
//                 d.day < new Date().getDate());

//             const hasTamu =
//               d.currentMonth &&
//               checkDataTamuTanggal(d.day, currentDate.getMonth() + 1, currentDate.getFullYear());

//             return (
//               <button
//                 key={i}
//                 disabled={isDisabled}
//                 className={`w-full aspect-square rounded-lg text-sm font-medium transition-all 
//                   ${!d.currentMonth ? "text-gray-300" : "text-gray-700"} 
//                   ${isSelected ? "bg-blue-600 text-white" : ""}
//                   ${hasTamu ? "border border-orange-500" : ""}
//                   ${d.currentMonth && !isSelected ? "hover:bg-blue-100" : ""}
//                   `}
//                 onClick={() => {
//                   if (d.currentMonth) {
//                     const selected = new Date(
//                       currentDate.getFullYear(),
//                       currentDate.getMonth(),
//                       d.day
//                     );
//                     setSelectedDate(selected);
//                     setData((prev) => ({
//                       ...prev,
//                       tanggal: formatToYMD(selected) + " " + waktu,
//                     }));
//                   }
//                 }}
//               >
//                 {d.day}
//               </button>
//             );
//           })}
//         </div>

//         {/* Jadwal Hari Ini */}
//         <div className="mt-4">
//           {filterDataTamu().map((v, i) => (
//             <div key={i} className="text-sm bg-blue-50 p-3 rounded-md mb-2">
//               <p className="font-medium text-blue-700">
//                 {v.tanggal.split(" ")[1].split(":").slice(0, 2).join(":")}
//               </p>
//               <p className="text-gray-700">
//                 Ada jadwal dengan <strong>{v.tamu.nama}</strong>
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
