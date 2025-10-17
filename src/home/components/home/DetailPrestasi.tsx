import React, { useState } from "react";
import Prestasi from "./prestasi";
import type { PrestasiItem } from "./prestasi";

const prestasiData: PrestasiItem[] = [
  {
    id: 1,
    image: "/images/prestasi1.png",
    title: "Muhammad Eksa Arifa XII RPL 1",
    description:
      "Web Technologies Medallion For Excellence Tingkat LKS Nasional 2024.",
  },
  {
    id: 2,
    image: "/images/prestasi2.png",
    title: "Haryo Djati R dan Anggara Deni A XII RPL 1 XII MP 2",
    description:
      "Juara 1 Festival Inovasi Kewirausahaan Siswa Indonesia Juara 1 Tingkat FIKSI Tingkat Provinsi D.I.Yogyakarta.",
  },
  {
    id: 3,
    image: "/images/prestasi3.png",
    title: "Muhammad Eksa Arifa XII RPL 1",
    description:
      "Juara 1 Web Technologies Tingkat LKS Tingkat Provinsi D.I.Yogyakarta.",
  },
  {
    id: 4,
    image: "/images/prestasi4.png",
    title: "Lindu Ari P.N XII TKJ 1",
    description:
      "Juara 2 IT Network Cabling Juara 2 Tingkat LKS Tingkat Provinsi D.I. Yogyakarta.",
  },
  {
    id: 5,
    image: "/images/prestasi5.png",
    title: "Anggita Fitriani XII MP 1",
    description:
      "Juara 2 Billingual Secretary Juara 2 Tingkat LKS Tingkat provinsi D.I.Yogyakarta.",
  },
];

const itemsVisible = 3; // Jumlah item yang terlihat sekaligus
const maxIndex = prestasiData.length - itemsVisible; // Batas maksimum index

const DetailPrestasi: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev < maxIndex ? prev + 1 : prev
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <section className="w-full bg-gray-200 py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto items-center">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 lg:mb-12">
          <div>
            <p className="text-gray-500 text-sm sm:text-base uppercase tracking-wide mb-2">
              PRESTASI SISWA
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              SMKN 1 BANTUL
            </h2>
          </div>
          <button
            onClick={() => (window.location.href = "/prestasi")}
            className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-800 text-gray-800 rounded-full font-medium hover:bg-gray-800 hover:text-white transition-colors text-sm sm:text-base"
          >
            Lihat Semua
          </button>
        </div>

        {/* Desktop Carousel */}
        <div className="hidden lg:block relative">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-colors ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
            aria-label="Previous"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-colors ${
              currentIndex === maxIndex ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
            aria-label="Next"
          >
            <svg
              className="w-6 h-6 text-gray-800"
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

          {/* Wrapper Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
              }}
            >
              {prestasiData.map((item) => (
                <div
                  key={item.id}
                  className="w-1/3 flex-shrink-0 px-2"
                >
                  <Prestasi
                    items={[
                      {
                        ...item
                      },
                    ]}
                    grid={false}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Indikator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-gray-800 w-8"
                    : "bg-gray-400 hover:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile & tablet Grid View */}
        <div className="lg:hidden">
          <Prestasi
            items={showAll ? prestasiData : prestasiData.slice(0, 4)}
            grid={true}
          />
        </div>
      </div>
    </section>
  );
};

export default DetailPrestasi;