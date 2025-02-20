"use client"

import { createContext, useContext, useState } from "react"

type CursorContextType = {
  cursorVariant: "default" | "hover"
  setCursorVariant: (variant: "default" | "hover") => void
}

const CursorContext = createContext<CursorContextType>({
  cursorVariant: "default",
  setCursorVariant: () => {},
})

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover">("default")
  
  return (
    <CursorContext.Provider value={{ cursorVariant, setCursorVariant }}>
      {children}
    </CursorContext.Provider>
  )
}

export const useCursor = () => useContext(CursorContext)