// Universal Select - Just Use Children Content Only

import { ChevronLeft } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function SelectLayout({ label = "Select", layout = "left-top", name = "trigger", list = [], onChange }) {
  const [layoutY, layoutX] = String(layout).split("-")
  const [showCase, setCase] = useState(false)
  const buttonFilter = useRef()

  const windowChange = (e) => {
    if(e.target === buttonFilter.current) {
      setCase(true)
    } else {
      setCase(false)
    }
  }
  const closeWindowChange = (nodeQuest) => {
    const keyQuest = parseInt(nodeQuest)
    onChange({ [name||"trigger"]: String(list[keyQuest]?.value||list[keyQuest]?.label) })
  }

  useEffect(() => {
    window.addEventListener("click", windowChange)
    return () => {
      window.removeEventListener("click", windowChange)
    }
  }, [])

  return <div className="w-[67px] flex items-start justify-start select-none" style={{ justifyContent: layoutY === "left"?"start":"end" }}>
    <button className="bg-coral text-white p-1.5 px-3.5 rounded-md cursor-pointer hover:bg-coral-primary active:bg-coral-primary text-nowrap" ref={buttonFilter}>
      <span className="font-semibold pointer-events-none">{String(label)}</span>
    </button>
    <div className="absolute bg-japanese-indigo py-1.5 z-20 w-auto mt-[40px] text-white rounded-md shadow-xl" style={{ scale: showCase? "1":"0" }}>
      {list.map((select,i) => (
        <div className="p-1.5 px-3.5 flex justify-start items-start cursor-pointer hover:bg-white/30 duration-150 text-nowrap" key={i} onClick={() => { closeWindowChange(i) }}>
          <span className="font-normal w-full pr-2.5 pl-1.5">{select.label}</span>
        </div>
      ))}
    </div>
  </div>
}