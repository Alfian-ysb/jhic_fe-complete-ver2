
import React, { useState } from 'react'

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo */}
          <div className="flex items-center">
            <div className=" text-sm font-medium text-gray-700">
                <img 
                    src="/images/logo.png" 
                    alt="Quiz" 
                    className="w-10 h-10 object-contain"
                  />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"> 
              </div>
              <span className="text-xl font-bold text-gray-900">SabaQuiz</span>
            </div>
          </div>

          {/* Center - Brand */}
          <div className="hidden md:flex items-center gap-2">
                 <img 
                    src="/images/skansabaicon.svg" 
                    alt="Quiz" 
                    className="w-6 h-6 object-contain"
                  />
            <span className="text-lg font-bold text-gray-800">SKANSABA.DEV</span>
          </div>

          {/* Right - User Menu */}
          <div className="flex items-center gap-4">
            {/* Desktop Menu */}
            <div className="hidden sm:block relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span className="text-sm font-medium">Akun</span>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <button onClick={() => window.location.href="/profile"} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    Profil Saya
                  </button>
                  <a href="/" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                    </svg>
                    Logout
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="sm:hidden py-4 border-t border-gray-200">
            <a href="/LeaderBoard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Leaderboard</a>
            <a href="/MiniGame" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Quiz</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">League</a>
            <div className="border-t border-gray-200 mt-2 pt-2">
              <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil Saya</a>
              <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar