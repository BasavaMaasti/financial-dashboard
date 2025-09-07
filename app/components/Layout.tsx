import { ReactNode } from 'react'
import Navbar from './Navbar'
import MobileRouter from './MobileRouter'
import { Capacitor } from '@capacitor/core'

interface LayoutProps {
  children: ReactNode
  isDarkMode?: boolean
  setIsDarkMode?: (value: boolean) => void
}

const Layout = ({ children, isDarkMode = false, setIsDarkMode }: LayoutProps) => {
  const isNative = Capacitor.isNativePlatform()
  
  return (
    <div className={`min-h-screen flex flex-col ${isNative ? 'safe-area' : ''} ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <MobileRouter />
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}

export default Layout