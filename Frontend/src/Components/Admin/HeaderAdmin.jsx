import { useEffect, useState } from "react";

export default function Header() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
      
          <span className="text-blue-600 font-extrabold"></span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
     
        </p>
      </div>
      
      <div className="bg-white p-3 rounded-lg shadow-sm min-w-[200px]">
        <p className="text-sm text-gray-600">
          {currentDateTime.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-xl font-bold text-gray-800 mt-1">
          {currentDateTime.toLocaleTimeString("id-ID", {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </p>
      </div>
    </header>
  );
}