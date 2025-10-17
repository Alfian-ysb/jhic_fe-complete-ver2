import React, { useState, useEffect, useRef } from 'react'

interface EkstraItem {
  id: number
  name: string
}

const EkstrakurikulerContent: React.FC = () => {
  const slides = [
    '/images/ekstra1.jpeg',
    '/images/ekstra2.jpeg',
    '/images/ekstra3.jpeg',
    '/images/ekstra4.jpeg',
    '/images/ekstra5.jpeg',
    '/images/ekstra6.jpeg',
    '/images/ekstra7.jpeg',
    '/images/ekstra8.jpeg',
    '/images/ekstra9.jpeg',
    '/images/ekstra10.jpeg',
    '/images/ekstra11.jpeg',
    '/images/ekstra12.jpeg',
  ]

  const ekstrakurikuler: EkstraItem[] = [
    { id: 1, name: 'Paduan Suara' },
    { id: 2, name: 'KIR' },
    { id: 3, name: 'Silat' },
    { id: 4, name: 'Basket' },
    { id: 5, name: 'Robotik' },
    { id: 6, name: 'Pramuka' },
    { id: 7, name: 'PMR' },
    { id: 8, name: 'Futsal' },
    { id: 9, name: 'Volly' },
    { id: 10, name: 'Qiroah' },
    { id: 11, name: 'Futsal' },
    { id: 12, name: 'Drumband' },
    { id: 13, name: 'Menjahit' },
    { id: 14, name: 'IT Enterpreneur' },
    { id: 15, name: 'Tari' },
    { id: 16, name: 'Teater' },
    { id: 17, name: 'Renang' },
  ]

  const totalSlides = slides.length
  const extendedSlides = [slides[totalSlides - 1], ...slides, slides[0]] // clone terakhir & pertama

  const [currentSlide, setCurrentSlide] = useState(1) // mulai seko slide asli pertama
  const [isTransitioning, setIsTransitioning] = useState(true)
  const slideRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => setCurrentSlide((prev) => prev + 1)
  const prevSlide = () => setCurrentSlide((prev) => prev - 1)

  // Loop otomatis
  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 3000)
    return () => clearInterval(interval)
  }, [])

  // Reset posisi saat mencapai clone
  useEffect(() => {
    if (currentSlide === totalSlides + 1) {
      // clone terakhir → reset ke slide asli pertama
      setTimeout(() => {
        if (slideRef.current) {
          setIsTransitioning(false)
          slideRef.current.style.transition = 'none'
          setCurrentSlide(1)
        }
      }, 700)
    } else if (currentSlide === 0) {
      // clone pertama di depan → reset ke slide asli terakhir
      setTimeout(() => {
        if (slideRef.current) {
          setIsTransitioning(false)
          slideRef.current.style.transition = 'none'
          setCurrentSlide(totalSlides)
        }
      }, 700)
    } else {
      setIsTransitioning(true)
      if (slideRef.current) slideRef.current.style.transition = ''
    }
  }, [currentSlide])

  // Update transform setiap currentSlide berubah
  useEffect(() => {
    if (slideRef.current) {
      requestAnimationFrame(() => {
        if (slideRef.current) {
          slideRef.current.style.transform = `translateX(-${currentSlide * 100}%)`
        }
      })
      if (!isTransitioning) {
        // Aktifkan kembali transition setelah reset instan
        requestAnimationFrame(() => {
          setIsTransitioning(true)
          if (slideRef.current) slideRef.current.style.transition = ''
        })
      }
    }
  }, [currentSlide, isTransitioning])

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 lg:space-y-12">
        <div className="relative w-full bg-gray-200 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-md">
          <div className="relative aspect-[16/10] sm:aspect-video lg:aspect-[21/9] overflow-hidden">
            <div
              ref={slideRef}
              className={`flex transition-transform duration-700 ease-in-out`}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {extendedSlides.map((slide, index) => (
                <img
                  key={index}
                  src={slide}
                  alt={`Ekstrakurikuler ${index}`}
                  className="w-full flex-shrink-0 object-cover"
                />
              ))}
            </div>

            {/* Tombol Prev */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/70 hover:bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Tombol Next */}
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indikator */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index + 1)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index + 1 ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75 w-1.5 sm:w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tabel Ekstrakurikuler */}
        <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wide w-16 sm:w-20 lg:w-24">
                    NO
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    NAMA EKSTRAKURIKULER
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ekstrakurikuler.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-gray-700 font-medium">{item.id}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-gray-600">{item.name}</td>
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

export default EkstrakurikulerContent
