import { Link } from 'react-router-dom'
import logo from '@assets/images/home/logo.png'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
      
      {/* Logo and School Name - Top Left */}
      <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
        <img 
          src={logo}
          alt="Logo SMK Negeri 1 Bantul" 
          className="w-10 h-10 sm:w-10 sm:h-10"
        />
        <div className="flex flex-col">
          <h3 className="text-sm sm:text-xl font-bold text-[#0A3C86]">SMKN 1 Bantul</h3>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        
        {/* 404 Number - Static */}
        <div className="mb-8">
          <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0A3C86] to-[#063852]">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="text-center max-w-2xl mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-metropolis">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. 
            Silakan kembali ke beranda untuk melanjutkan.
          </p>
        </div>

        {/* Single Button - Home */}
        <Link 
          to="/" 
          className="px-10 py-4 bg-[#0A3C86] text-white rounded-xl font-semibold hover:bg-[#063852] transition-colors duration-300 shadow-lg text-center"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Kembali ke Beranda
          </span>
        </Link>

        {/* School Info Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            Mencetak Generasi Unggul dan Kompeten
          </p>
        </div>
      </div>

      {/* Custom Animation for Slow Spin */}
      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default NotFound