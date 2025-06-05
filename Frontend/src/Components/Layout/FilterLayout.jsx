// Universal Filter - Just Use Children Content Only

import { ChevronLeft } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function FilterLayout({ label = "Filter", list = [], onChange }) {
  const [selectionOptionId, setSelectionOptionId] = useState(-1)
  const [showCase, setCase] = useState(false)
  const buttonFilter = useRef()

  const windowChange = (e) => {
    if(e.target === buttonFilter.current) {
      setCase(true)
    } else {
      setCase(false)
      setSelectionOptionId(-1)
    }
  }
  const showWindow = (indexContent) => {
    return selectionOptionId === parseInt(indexContent)
  }
  const closeWindowChange = (nodeQuest, option) => {
    const keyQuest = parseInt(nodeQuest)
    const selectQuest = list[keyQuest]?.name
    const selectAnswer = list[keyQuest]?.select[option]
    const selectOption = {
      [selectQuest||keyQuest]: (selectAnswer.value || String(selectAnswer.label))
    }
    onChange(selectOption)
  }

  useEffect(() => {
    window.addEventListener("click", windowChange)
    return () => {
      window.removeEventListener("click", windowChange)
    }
  }, [])

  const hoveringData = (index) => {
    const keyIndex = parseInt(index)
    setSelectionOptionId(keyIndex)
  }

  return <div className="w-[67px] flex items-start justify-end select-none">
    <button className="bg-coral text-white p-1.5 px-3.5 rounded-md cursor-pointer hover:bg-coral-primary active:bg-coral-primary" ref={buttonFilter}>
      <span className="font-semibold pointer-events-none">{String(label)}</span>
    </button>
    <div className="absolute bg-japanese-indigo py-1.5 z-20 w-auto mt-[40px] text-white rounded-md shadow-xl" style={{ scale: showCase? "1":"0" }}>
      {list.map((select,i) => (
        <div className="p-1.5 px-3.5 flex justify-start items-start cursor-pointer hover:bg-white/30 duration-150 text-nowrap" key={i} onMouseEnter={() => { hoveringData(i) }}>
          {showWindow(i)&&<div className="flex justify-end">
            <div className="absolute py-1.5 bg-japanese-indigo mr-[16px] mt-[-12px] rounded-md shadow-xl">
              {select.select.map((dataselect, key) => (
                <div className="p-1.5 px-4.5 flex justify-start cursor-pointer hover:bg-white/30 duration-150 text-nowrap" key={key} onClick={() => { closeWindowChange(i, key) }}>
                  <span className="font-normal w-full">{dataselect.label}</span>
                </div>
              ))}
            </div>
          </div>}
          <span className="w-[22px] flex justify-end items-center">
            <ChevronLeft />
          </span>
          <span className="font-normal w-[calc(100%-22px)] pr-2.5 pl-1.5">{select.label}</span>
        </div>
      ))}
      {/* <p>{JSON.stringify(list,null,2)}</p> */}
    </div>
  </div>
}