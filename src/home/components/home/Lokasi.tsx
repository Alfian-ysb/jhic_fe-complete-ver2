import React from "react";
import telepon from "../../assets/img/telepon-label.png";
import sekolahImg from "../../assets/img/outsideOfSchool.png";
import googleMaps from "../../assets/img/location label.png";

const Lokasi: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 md:grid-rows-4 gap-4 md:gap-6">
          {/* Gambar Sekolah */}
          <div className="md:col-span-3 md:row-span-2 relative rounded-2xl overflow-hidden shadow-md">
            <img
              src={sekolahImg}
              alt="SMK Negeri 1 Bantul"
              className="w-full h-56 sm:h-64 md:h-80 object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-black/30"></div>    
            <div className="absolute top-3 left-3 md:top-4 md:left-4">
              <img src={googleMaps} alt="Lokasi" className="w-24 sm:w-28 md:w-35" />
            </div>
            <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 text-white pr-3">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-poppins mb-1">
                SMK Negeri 1 Bantul
              </h2>
              <p className="text-xs sm:text-sm md:text-base max-w-md leading-snug">
                SMK Negeri 1 Bantul berada di Jl. Parangtritis No.KM.11, Dukuh,
                Sabdodadi, Kec. Bantul, Kab. Bantul, Daerah Istimewa Yogyakarta
                55715
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="md:col-start-1 md:col-span-3 md:row-start-3 md:row-span-2 rounded-2xl overflow-hidden shadow-md order-3 md:order-none">
            <iframe
              title="Lokasi SMK Negeri 1 Bantul"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7904.107401112937!2d110.355893!3d-7.889451!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7b00889ad8f84d%3A0x2e0009ca7815eaf0!2sSMK%20Negeri%201%20Bantul!5e0!3m2!1sen!2sus!4v1760634774433!5m2!1sen!2sus"
              width="100%"
              height="280"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-56 sm:h-64 md:h-full rounded-2xl"
            ></iframe>

            <button
              onClick={() =>
                window.open(
                  "https://maps.google.com?q=SMK+Negeri+1+Bantul",
                  "_blank"
                )
              }
             
            >
            </button>
          </div>

        {/* Bagian Kanan - Teks dan Card Kontak */}
          <div className="flex flex-wrap md:flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 md:col-span-2 md:row-span-2 md:col-start-4 md:row-start-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-poppins text-gray-900 py-6 md:py-0 order-1 md:order-none">
            <span>Temukan</span> 
            <span className="text-[#063852]">Kami</span>
            <span>di sini</span>
          </div>

          {/* Card Hubungi Kami */}
          <div className="md:col-span-2 md:row-span-2 md:col-start-4 md:row-start-3 md:ml-2 bg-white border border-gray-200 shadow-md rounded-2xl p-5 sm:p-6 w-full space-y-3 sm:space-y-4 order-2 md:order-none">
            <h3 className="text-lg sm:text-xl font-semibold border-b border-gray-300 pb-2 text-[#063852]">
              Hubungi Kami
            </h3>

            <div className="flex items-center gap-3">
              <img src={telepon} alt="Telepon" className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-sm sm:text-base text-gray-700">+62 274 367 156</span>
            </div>

            

            <button
            onClick={() => 
              window.open(
                  "https://maps.google.com?q=SMK+Negeri+1+Bantul",
                  "_blank"
              )
            } 
             className="mt-4 sm:mt-6 w-full bg-[#063852] text-white py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium hover:bg-[#052c42] transition">
              Datang Sekarang
            </button>
          </div>
        </div>
    </section>
  );
};

export default Lokasi;
