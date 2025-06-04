// Universal Sidebar - Just Use Children Content Only

import { useEffect, useRef, useState } from "react"
import { X, Menu, LogOut } from "lucide-react"
import { Auth } from "../../Context/AuthContext"

export default function SidebarLayout({ title, showLogo, showDate, linklist, children, ...other }) {
  const { getName, removeToken } = Auth()
  const refAll = useRef()
  const [showSidebar, setShowSidebar] = useState(true)
  const _symbName = String(getName()||"#Unknowing")
  const symbolicName = String(_symbName||(typeof _symbName !== "string"? "#Unknowing":_symbName))
  const dateFormat = new Intl.DateTimeFormat("id-ID", {
    weekday: "long", day: "2-digit", month: "long", year: "numeric"
  }).format(new Date())
  const linkFormat = Array.isArray(linklist)? linklist.filter(a => a.icon && a.label).map(a => ({
   icon: a.icon,
   label: a.label,
   path: a.path,
   onClick: a.onClick,
   select: !!a.select
  })):[]

  const Retriggersidebar = (value = !showSidebar) => {
    setShowSidebar(value)
    localStorage.setItem("_navigation.sidebar.trigger", String(value))
  }

  useEffect(() => {
    const getLoc = localStorage.getItem("_navigation.sidebar.trigger")
    if(!getLoc) {
      // Set default "fales" value
      localStorage.setItem("_navigation.sidebar.trigger", String(false))
      if(window.innerWidth < 768) {
        setShowSidebar(false)
      }
      return;
    }
    if(getLoc === "true") {
      setShowSidebar(true)
    } else {
      setShowSidebar(false)
    }
    refAll.current.classList.add("disable-animation-trigger")
    setTimeout(() => {
      refAll.current.classList.remove("disable-animation-trigger")
    }, 300)
  }, [])

  return <div className="w-full" {...other} ref={refAll}>
    <button
      className={"w-[48px] h-[48px] fixed top-2 left-2 z-60 flex justify-center items-center cursor-pointer duration-300 rounded-full border-gray-300"+(showSidebar? " border border-japanese-indigo":" shadow-xl border")} 
      style={{ color: showSidebar? "white":"black", transform: `rotate(${showSidebar?"-30deg":"0deg"})`, background: showSidebar?"var(--c-japanese-indigo)":"white" }}
      onClick={() => { Retriggersidebar() }}
    >
      <div
        className="w-[40px] h-[40px] flex justify-center items-center duration-300"
        style={{ opacity: showSidebar?"0":"1" }}
      >
        <Menu size={26}/>
      </div>
      <div
        className="w-[40px] h-[40px] absolute flex justify-center items-center duration-300"
        style={{ opacity: showSidebar?"1":"0", transform: "rotate(30deg)" }}
      >
        <X size={26}/>
      </div>
    </button>
    <aside
      className={"fixed top-0 left-0 w-full max-w-[300px] h-screen bg-japanese-indigo flex flex-wrap content-between z-50 duration-300 overflow-x-auto"+(showSidebar? " ml-[0px] max-md:shadow-xl":" ml-[-300px]")}
    >
      <div className="w-full pt-[68px] p-3.5 px-5">
        {!!(showLogo && typeof showLogo === "boolean")&&<div className="w-full h-[155px] my-3 mb-5">
          <img src="/logo.png" className="w-full h-full object-contain"/>
        </div>}
        {!!(title && typeof title === "string")&&<h1 className="text-white text-3xl font-semibold mb-4.5">{title}</h1>}
        {!!(showDate && typeof showDate === "boolean")&&<div className="bg-japanese-indigo-primary p-3 px-4.5 mb-4.5 rounded-md">
          <p className="text-white text-lg font-semibold">{`Selamat datang, ${symbolicName}`}</p>
          <p className="text-white/80 text-sm mt-0.5">{String(dateFormat)}</p>
        </div>}
        <div className="w-full text-white pt-2.5">
          {linkFormat.map((link, i) => (
            <a href={link.path} onClick={link.onClick} className={"w-full flex items-center p-3.5 px-2 my-1.5 rounded-md duration-150"+(link.select? " bg-coral shadow-xl":" hover:bg-coral-primary/80")} key={`unik-link-${i}`}>
              <span className="w-[46px] flex items-center justify-center">
                {link.icon}
              </span>
              <span className={"pl-2.5"+(link.select? " font-semibold":"")}>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="w-full h-[90px] p-3.5 px-5 text-white">
        <button
          className="w-full flex items-center p-3.5 px-2 rounded-md bg-coral shadow-xl cursor-pointer duration-150"
          onClick={() => { removeToken() }}
        >
          <span className="w-[46px] flex items-center justify-center">
            <LogOut />
          </span>
          <span className="pl-2.5">Keluar</span>
        </button>
      </div>
    </aside>
    <div
      className={"w-full duration-300"+(showSidebar?" md:pl-[300px]":" md:ml-[0px]")}
    >
      <div className={"fixed top-0 left-0 w-full h-screen z-40 duration-300 pointer-events-none "+(showSidebar?"max-md:bg-black/40 max-md:pointer-events-auto":"max-md:bg-black/0")} onClick={() => { Retriggersidebar() }}></div>
      {children}
    </div>
  </div>
}