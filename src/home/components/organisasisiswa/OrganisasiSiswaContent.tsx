import React, { useState,  useEffect } from 'react'

interface EkstraItem {
  id: number
  name: string
}

const OrganisasiSiswaContent: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    '/images/organisasi1.jpeg',
    '/images/organisasi2.jpeg',
    '/images/organisasi3.jpeg',
    '/images/organisasi4.jpeg',
    '/images/organisasi5.jpeg',
    '/images/organisasi6.jpeg',
    '/images/organisasi7.jpeg',
    

  ]


  const organisasi: EkstraItem[] = [
    { id: 1, name: 'MPK' },
    { id: 2, name: 'Osis' },
    { id: 3, name: 'Rohis' },
    { id: 4, name: 'PKS' },
    { id: 5, name: 'Dewan Tonti' },
    { id: 6, name: 'Dewan Ambalan' },
    { id: 7, name: 'PMR' },



  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

useEffect(() => {
  const interval = setInterval(nextSlide, 2000)
  return () => clearInterval(interval)
}, [])
  
return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-6 sm:space-y-8 lg:space-y-12">
       
       
        {/* Image Slider */}
        <div className="relative w-full bg-gray-200 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-md">
          {/* Aspect ratio container */}
          <div className="relative aspect-[16/10] sm:aspect-video lg:aspect-[21/9]">
          
          {/* animate slider (Manual Only) */}
              {slides.map((slide, index) => (
                <img
                  key={index}
                  src={slide}
                  alt={`Organisasi ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out ${
                    index === currentSlide
                      ? 'translate-x-0'
                      : index < currentSlide
                      ? '-translate-x-full'
                      : 'translate-x-full'
                  }`}
                />
              ))}

            <img
              src={slides[currentSlide]}
              alt={`Organisasi ${currentSlide + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/70 hover:bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous slide"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next / Navigasi Button */}
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Next slide"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* slide indikator */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-white w-6'
                      : 'bg-white/50 hover:bg-white/75 w-1.5 sm:w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="w-full min-[320px]">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wide w-16 sm:w-20 lg:w-24">
                    NO
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    NAMA ORGANISASI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {organisasi.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-gray-700 font-medium">
                      {item.id}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-gray-600">
                      {item.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganisasiSiswaContent