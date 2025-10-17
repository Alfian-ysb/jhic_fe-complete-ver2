import React from "react";

const prestasiData = [
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

const PrestasiContent: React.FC = () => {
  return (
    <section className="w-full  py-2 lg:py-6 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid item */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-items-center">
          {prestasiData.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center p-4"
            >
              {/* Gambar */}
              <div className="w-full  bg-gray-200 overflow-hidden rounded-lg mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="%23ddd"%3E%3Crect width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="24"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>

              {/* Teks */}
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrestasiContent;
