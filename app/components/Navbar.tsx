'use client'

import { useState } from 'react'

interface NavbarProps {
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
}

const Navbar = ({ isDarkMode, setIsDarkMode }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const menuItems = [
    'CRM', 'Utilities', 'Insurance', 'Assets', 'Mutual', 
    'Research', 'Transact Online', 'Goal GPS', 'Financial Planning', 
    'Wealth Report', 'Other'
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Searching for: ${searchQuery}`)
    setSearchQuery('')
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    alert('Login successful!')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    alert('Logged out successfully!')
  }

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <nav className={`shadow-md transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* FinanceApp title */}
          <div className="flex items-center mr-4">
            <span className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              FinanceApp
            </span>
          </div>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 mx-4 max-w-md">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 rounded-md transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                      : 'bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-200'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
            </form>
          </div>
          
          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Navigation items - show only first 4 */}
            {menuItems.slice(0, 4).map((item) => (
              <a 
                key={item} 
                href="#" 
                className={`px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item}
              </a>
            ))}
            
            {/* More dropdown */}
            <div className="relative group">
              <button className={`px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}>
                More
              </button>
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10 hidden group-hover:block ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } ring-1 ring-black ring-opacity-5`}>
                {menuItems.slice(4).map((item) => (
                  <a 
                    key={item} 
                    href="#" 
                    className={`block px-4 py-2 text-sm transition-colors ${
                      isDarkMode 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Dark Mode Toggle - NOW PROPERLY VISIBLE */}
            <button
              onClick={handleDarkModeToggle}
              className={`p-2 rounded-md border-2 transition-all duration-200 ${
                isDarkMode 
                  ? 'text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-gray-800' 
                  : 'text-gray-600 border-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                // Sun icon for light mode
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                // Moon icon for dark mode
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            {/* Login/Logout Button */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="px-3 py-2 rounded-md text-sm font-medium bg-green-500 hover:bg-green-600 text-white transition-colors"
              >
                Login
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Dark Mode Toggle - Mobile */}
            <button
              onClick={handleDarkModeToggle}
              className={`p-2 rounded-md border-2 transition-all duration-200 ${
                isDarkMode 
                  ? 'text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-gray-800' 
                  : 'text-gray-600 border-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            
            {/* Menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className={`px-4 py-3 transition-colors ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`block w-full pl-3 pr-3 py-2 rounded-md transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white placeholder-gray-400' 
                      : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </form>
          </div>
          
          <div className={`px-2 pt-2 pb-3 space-y-1 transition-colors ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {menuItems.map((item) => (
              <a 
                key={item} 
                href="#" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
