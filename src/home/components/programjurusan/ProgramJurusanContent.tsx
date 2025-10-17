import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface JurusanItem {
  id: number
  title: string
  images: string
  description: string
  link: string
}

const ProgramJurusanContent: React.FC = () => {
  const [jurusan, setJurusan] = useState<JurusanItem[]>([])
  const navigate = useNavigate()

  useEffect(() => {
                                                         // ambil data json dari public/data/programjurusan.json
    fetch("/data/ProgramKeahlian.json")
      .then((res) => res.json())
      .then((data) => setJurusan(data))
      .catch((err) => console.error("Gagal memuat data jurusan:", err))
  }, [])

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Program Keahlian
        </h2>

        <div className="space-y-12">
          {jurusan.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8`}
            >
              {/* Gambar Jurusan */}
              <div className="md:w-1/2">
                <img
                  src={item.images}
                  alt={item.title}
                  className="w-full h-auto rounded-xl shadow-lg object-cover"
                />
              </div>

              {/* Teks Jurusan */}
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {item.description}
                </p>
                <button
                  onClick={() => navigate(`/program-jurusan/${item.link}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
                >
                  Lihat Selengkapnya
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProgramJurusanContent
