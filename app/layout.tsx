import { ReactNode } from 'react'
import Navbar from './Navbar'
import MobileRouter from './MobileRouter'
import { Capacitor } from '@capacitor/core'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const isNative = Capacitor.isNativePlatform()
  
  return (
    <div className={`min-h-screen flex flex-col ${isNative ? 'safe-area' : ''}`}>
      <MobileRouter />
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}

export default Layout
