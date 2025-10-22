import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from '@assets/images/shared/logo.png'


type NavItem = {
  label: string
  to?: string
  children?: NavItem[]
}

const NAV_ITEMS: NavItem[] = [
    {
        label: 'Home',
        to: '/lentera-karya',
    },
  {
    label: 'Account',
    children: [
      { label: 'My Profile', to: '/lentera-karya/profile' },
      { label: 'Log Out', to: '/' },
    ],
  },
  {
    label: 'Menu',
    children: [
      { label: 'Dashboard', to: '/lentera-karya/dashboard' },
      { label: 'Upload', to: '/lentera-karya/upload' },
    ],
  }
]

const Navbar = ({position}: {position : string}) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const closeTimer = useRef<number | null>(null)
  const CLOSE_DELAY = 150 // ms, adjust if needed

  return (
    <nav className={`bg-[rgba(161,181,183,0.5)] backdrop-blur-2xl ${position} top-0 left-0 z-80 w-full`}>
      <div className="max-w-screen py-2 px-4 sm:px-6 lg:px-20">
        <div className="flex justify-between md:h-16 lg:h-18">
            <button onClick={() => window.location.href = '/'} className="flex items-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="pr-4 h-10 w-auto max-h-12"
                  style={{ objectFit: 'contain' }}
                />
                <span className="text-2xl font-red-hat">Lentera Karya</span>
            </button>

          {/* Desktop menu */}
          <div className="hidden lg:flex  md:items-center md:space-x-6">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  if (closeTimer.current) {
                    window.clearTimeout(closeTimer.current)
                    closeTimer.current = null
                  }
                  item.children && setOpenDropdown(item.label)
                }}
                onMouseLeave={() => {
                  if (item.children) {
                    // delay closing to allow moving pointer to dropdown
                    closeTimer.current = window.setTimeout(() => setOpenDropdown(null), CLOSE_DELAY)
                  }
                }}
              >
                {item.children ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className="group inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                      aria-haspopup="true"
                      aria-expanded={openDropdown === item.label}
                    >
                      <span>{item.label}</span> 
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-300 ${openDropdown === item.label ? 'rotate-180' : ''} group-hover:rotate-180`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown (no hover handlers here anymore) */}
                    <div
                      className={`absolute right-0 mt-2 w-48 bg-[#F2F2F2] rounded shadow-lg overflow-clip transition-opacity duration-150 z-20 ${openDropdown === item.label ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}
                      onMouseEnter={() => {
                        // cancel the close timer if hovering dropdown
                        if (closeTimer.current) {
                          window.clearTimeout(closeTimer.current)
                          closeTimer.current = null
                        }
                        setOpenDropdown(item.label)
                      }}
                      onMouseLeave={() => {
                        // start close timer when leaving dropdown
                        closeTimer.current = window.setTimeout(() => setOpenDropdown(null), CLOSE_DELAY)
                      }}
                    >
                      <ul>
                        {item.children.map((c) => (
                          <li key={c.label}>
                            {c.to ? (
                              <Link to={c.to} className="block hover:bg-neutral-300 px-4 py-2 text-sm text-gray-700 transition-colors duration-200">{c.label}</Link>
                            ) : (
                              <span className="block px-4 py-2 text-sm text-gray-700">{c.label}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  item.to ? (
                    <Link to={item.to} className="text-gray-700 hover:text-gray-900">{item.label}</Link>
                  ) : (
                    <span className="text-gray-700">{item.label}</span>
                  )
                )}
              </div>
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
                <span className="sr-only">Toggle menu</span>
                {mobileOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
        </div>
      </div>

      {/* Mobile menu panel */}
        {/* Mobile menu panel with slide-down animation */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height,opacity,transform] duration-400 ease-out origin-top ${
            mobileOpen
              ? 'max-h-[600px] opacity-100 translate-y-0'
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
          aria-hidden={!mobileOpen}
        >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="">
              {item.children ? (
                <details className="group">
                  <summary className="flex items-center justify-between px-3 py-2 cursor-pointer text-gray-700 hover:bg-gray-100 rounded">
                    <span>{item.label}</span>
                    <svg className="w-4 h-4 transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="pl-4">
                    {item.children.map((c) => (
                      <Link key={c.label} to={c.to || '#'} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">{c.label}</Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link to={item.to || '#'} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">{item.label}</Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar