export default function AuthLayout({ children }) {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white p-4">
      {/* Background Aesthetic */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 w-[150%] rotate-12 h-16 bg-orange-400 rounded-xl top-[10%] md:top-[15%] max-md:rotate-0 max-md:w-[120%] max-md:h-12 max-md:top-[5%]" />
        <div className="absolute left-1/2 -translate-x-1/2 w-[150%] rotate-12 h-16 bg-[#1D3D4C] rounded-xl top-[30%] md:top-[35%] max-md:rotate-0 max-md:w-[120%] max-md:h-12 max-md:top-[25%]" />
        <div className="absolute left-1/2 -translate-x-1/2 w-[150%] rotate-12 h-16 bg-orange-400 rounded-xl top-[50%] md:top-[55%] max-md:rotate-0 max-md:w-[120%] max-md:h-12 max-md:top-[45%]" />
        <div className="absolute left-1/2 -translate-x-1/2 w-[150%] rotate-12 h-16 bg-[#1D3D4C] rounded-xl top-[70%] md:top-[75%] max-md:rotate-0 max-md:w-[120%] max-md:h-12 max-md:top-[65%]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">{children}</div>
    </div>
  );
}
