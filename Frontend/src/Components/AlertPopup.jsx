import { createContext, useContext, useState } from "react"

const AlertProvider = createContext()

const defaultData = {
  show: false,
  title: "",
  text: "",
  button: [
    { text: "Oke" },
  ]
}

function AlertPopupProvider({ children }) {
  const [showUpAlert, setShowUpAlert] = useState(defaultData)

  const callAlertProvider = (alertOption = { title: "", text: "", button: [{ text: "Oke" }] }) => {
    console.log("Call...", alertOption)
    const filterButton = alertOption?.button?.filter(a => (typeof a.text === "string" && !!a.text)) || [{ text: "Oke" }]
    const buildAlert = {
      show: true,
      title: alertOption.title,
      text: alertOption.text,
      button: filterButton.slice(0, 5)
    }
    setShowUpAlert(buildAlert)
  }

  const callingShow = (btnOption) => {
    if(typeof btnOption.press === "function") {
      btnOption.press(true) // Call Process
    }
    // Reset
    setShowUpAlert({ ...showUpAlert, show: false, })
    setTimeout(() => {
      setShowUpAlert(defaultData)
    }, 300)
  }

  return <AlertProvider.Provider value={{
    show: callAlertProvider
  }}>
    <div className={"fixed top-0 left-0 w-full h-screen bg-black/50 z-90 flex justify-center items-center duration-150 "+(showUpAlert.show?"opacity-100":"opacity-0 pointer-events-none")}>
      <div className={"bg-white p-0.5 rounded-xl shadow-xl max-w-[420px] duration-300 "+(showUpAlert.show?"mt-[0px] scale-100":"mt-[-20px] scale-95")}>
        <div className="p-5 pb-1">
          <h1 className="font-bold text-2xl">{String(showUpAlert.title)?.trim()?.replace(/\n/g, "")}</h1>
          <p className="text-wrap text-base mt-2.5 whitespace-pre-line">{String(showUpAlert.text)?.trim()}</p>
        </div>
        <div className="w-full flex flex-wrap justify-end pb-2.5 px-2">
          {showUpAlert.button.map((btn, i) => (
            <button className="cursor-pointer text-blue-600 hover:bg-blue-300/40 p-1.5 px-4 rounded-md duration-300 text-[0.98rem] ml-1" onClick={() => { callingShow(btn) }} key={i}>{btn.text}</button>
          ))}
        </div>
      </div>
    </div>
    {children}
  </AlertProvider.Provider>
}

function useAlert() {
  const context = useContext(AlertProvider)
  return context
}

export {
  AlertPopupProvider,
  useAlert
}