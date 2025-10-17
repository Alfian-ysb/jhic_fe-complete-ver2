import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.png'

type NavItem = {
  label: string
  to?: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Logout', to: '/login' }
]

const Navbar = ({ position }: { position: string }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className={`bg-[rgba(161,181,183,0.5)] backdrop-blur-2xl ${position} top-0 left-0 z-80 w-full fixed`}>
      <div className="max-w-screen px-4 sm:px-6 lg:px-20">
        <div className="flex justify-between md:h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="pr-4 h-10 w-auto max-h-12 object-contain"
            />
            <span className="text-2xl font-red-hat">SMKN 1 Bantul</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex md:items-center md:space-x-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to || '#'}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity,transform] duration-400 ease-out origin-top ${
          mobileOpen ? 'max-h-[600px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to || '#'}
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setMobileOpen(false)} // tutup menu setelah klik
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
