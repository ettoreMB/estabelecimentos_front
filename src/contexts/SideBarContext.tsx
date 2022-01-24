import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

const SidebarDrawerContext = createContext({isOpen: false, handleDrawer:() => {} });

export function SidebarDrawerProvider({children}: SidebarDrawerProviderProps) {
  const [isOpen, setIsopen] = useState(false);
  const router = useRouter()
 let handleDrawer = () => {
  setIsopen(!isOpen)
 }

  return (
    <SidebarDrawerContext.Provider value={{isOpen, handleDrawer}}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)