import React from "react";
import { Link } from "react-router-dom";
import Youtube from '../../assets/img/YouTube.png'
import Instagram from '../../assets/img/instagram.png'
import Telegram from '../../assets/img/telegramppdb.png'
import Tiktok from '../../assets/img/Tiktok.png'

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0A] text-1xl text-white py-10 px-6 sm:px-10 lg:px-20 ">
      <div className="max-w-sceen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Kiri: Info Sekolah */}
        <div>
          <h2 className="text-lg font-poppins mb-3 text-white">
            SMK Negeri 1 Bantul
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-3">
            Jl. Parangtritis No.KM.11, Dukuh, Sabdodadi, Kec. Bantul, Kab. Bantul,  
            Daerah Istimewa Yogyakarta 55715
          </p>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
          
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">

          </div>
        </div>

        {/* Tengah: Media Sosial */}
        <div>
          <h3 className="text-base font-semibold mb-3">Ikuti Kami</h3>
          <div className="flex space-x-4 mb-5">
            <a href={`https://www.youtube.com/@officialsmkn1bantul`} aria-label="YouTube">
              <img src={Youtube} alt="YouTube" className="w-6 h-6" />
            </a>
            <a href={`https://www.instagram.com/smkn1bantul?igsh=bnV1ZG9uMWR3ZGRm`} aria-label="Instagram">
              <img src={Instagram} alt="Instagram" className="w-6 h-6" />
            </a>
            <a href={'https://t.me/PPDBSMK1BANTUL'} aria-label="Telegram">
              <img src={Telegram} alt="Telegram" className="w-6 h-6" />
            </a>
            <a href={`http://tiktok.com/@skansaba.id?is_from_webapp=1&sender_device=pc`} aria-label="Tiktok">
              <img src={Tiktok} alt="TikTok" className="w-6 h-6" />
            </a>
          </div>
          <button className="bg-white text-black font-semibold px-5 py-2 rounded-md hover:bg-gray-200 transition">
            Hubungi Kami
          </button>
        </div>

        {/* Kolom Menu 1 */}
        <div>
          <h3 className="text-base font-semibold mb-3">Navigasi Singkat</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/sejarah" className="hover:text-white text-xl transition">Sejarah</Link></li>
            <li><Link to="/visi-dan-misi" className="hover:text-white text-xl transition">Visi & Misi</Link></li>
            <li><Link to="/struktur-organisasi" className="hover:text-white text-xl transition">Struktur Organisasi</Link></li>
            <li><Link to="/sarana-prasarana" className="hover:text-white text-xl transition">Sarana & Prasarana</Link></li>
          </ul>
        </div>
      </div>
      
      {/* Footer bawah */}
      <div className="text-center text-gray-500 text-xs sm:text-sm mt-10 border-t border-gray-800 pt-5">
        © {new Date().getFullYear()} Copyright SMKN 1 Bantul
      </div>
    </footer>
  );
};

export default Footer;