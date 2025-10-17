import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeTitle from "../components/home/homeTitle";
import Hero from "../components/home/hero";
import Navbar from "../components/navbar";
import SchoolStatistic from "../components/home/schoolStatistic";
import KepalaSekolah from "../components/home/KepalaSekolah";
import kepalaSekolah from "../assets/img/kepalaSekolah.png";
import NewsFeed from "../components/home/newsFeed";
import DetailPrestasi from "../components/home/DetailPrestasi";
import Suport from "../components/suport";
import Lokasi from "../components/home/Lokasi";
import Modal from "../components/modal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Otomatis buka modal setelah 2 detik (opsional - bisa dihapus)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      
        <Navbar />
      <main className="py-15 lg:py-0 box-border">
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="relative text-center space-y-8 py-6 lg:h-[35vh]">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 z-20">
                Skansaba New feature has arrived!
              </h2>

              <div className="flex flex-col sm:flex-row gap-6 sm:gap-25 justify-center items-center pt-4 ">
                {/* SabaQuiz Button */}
                <div className="flex flex-col items-center space-y-3 z-20 ">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      // Navigate ke SabaQuiz atau action lainnya
                      window.location.href = "/sabaquiz";
                    }}
                    className="bg-blue-600 text-white text-xl font-semibold py-4 px-12 rounded-full hover:bg-blue-700 transition shadow-lg"
                  >
                    SabaQuiz
                  </button>
                  <p className="text-gray-700 text-sm">Quiz minigame</p>
                </div>

                {/* Lentera Karya Button */}
                <div className="flex flex-col items-center space-y-3 z-20">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      // Navigate ke Lentera Karya atau action lainnya
                      window.location.href = "/lentera-karya";
                    }}
                    className="bg-orange-500 text-white text-xl font-semibold py-4 px-12 rounded-full hover:bg-orange-600 transition shadow-lg"
                  >
                    Lentera Karya
                  </button>
                  <p className="text-gray-700 text-sm">
                    Expres your creativity
                  </p>
                </div>
              </div>
            </div>
        </Modal>
        <div className="box-border relative flex flex-col gap-16 lg:gap-0 lg:flex-row items-center lg:justify-between px-4 sm:px-10 lg:px-14 lg:py-18">
          <svg width="200" height="40" className="absolute top-1/20 hidden xl:stroke-3 lg:stroke-2 lg:block" xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="10" y1="20" x2="120" y2="20" stroke="black" strokeLinecap="round"
            />
            <line x1="140" y1="20" x2="180" y2="20" stroke="black" strokeLinecap="round"
            />
          </svg>
          
          <HomeTitle className="w-full lg:w-1/2" />
          <Hero />
        </div>

        {/* Stats and Mission Section */}
        <div className="relative mx-auto px-4 lg:px-20 py-44 mt-55 lg:mt-14 bg-neutral-semiblue z-10">
          <SchoolStatistic className="absolute right-1/2  -top-14 transform translate-x-1/2" />
          {/* Mission Statement */}
          <div className="max-w-3xl flex flex-col gap-8 text-center mx-auto mb-44">
            <h2 className="font-metropolis text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Menumbuhkan Harapan, Menempa Masa Depan
            </h2>
            <p className="text-gray-600 font-tt-norms text-md md:text-lg leading-relaxed">
              Di sekolah ini, setiap siswa adalah harapan, setiap guru adalah
              cahaya, setiap jurusan adalah jalan masa depan, dan setiap ruang
              belajar adalah jembatan menuju dunia nyata.
            </p>
          </div>
          <div className="h-[3px] bg-black rounded-b-3xl"></div>
        </div>
        {/* A Brief History Section */}
        <div className="flex flex-col md:flex-row justify-between px-8 md:px-20 bg-neutral-semiblue pb-44">
          <h1 className="font-metropolis font-semibold text-3xl text-center md:textl-right md:text-3xl lg:text-6xl mb-20 w-full md:w-[35%] text-[#254A83] ">
            Perjalanan Panjang SMK Negeri 1 Bantul dalam Membangun <br />
            <span className="text-white bg-[#0A3C86] rounded-xl px-3">
              Masa Depan
            </span>
          </h1>
          <div className="w-full md:w-[43%] text-lg md:text-[20px] mr-5 font-tt-norms font">
            <p className="leading-relaxed font-normal">
              SMK Negeri 1 Bantul memiliki perjalanan sejarah panjang yang penuh
              dengan komitmen terhadap pendidikan berkualitas. Berdiri pada
              tahun 1968 berdasarkan Surat Keputusan Menteri Pendidikan dan
              Kebudayaan Nomor: 213/UKK/III/1968 tertanggal 9 Juni 1968, sekolah
              ini awalnya bernama SMEA Negeri VI Bantul. Seiring waktu, nama
              sekolah berubah menjadi SMEA Negeri 1 Bantul dan kini dikenal
              sebagai SMK Negeri 1 Bantul. <br />
              <br /> Sejak awal, SMK Negeri 1 Bantul telah hadir sebagai lembaga
              pendidikan yang berfokus pada pengembangan keterampilan vokasional
              yang siap menghadapi tuntutan dunia kerja. Dalam perkembangannya,
              sekolah ini terus menunjukkan komitmen tinggi terhadap peningkatan
              mutu dan kualitas pendidikan. <br />
              <br />
            </p>
            <Link to="/sejarah" className="underline text-[16px]">
              Learn more
            </Link>
          </div>
        </div>
        
        <KepalaSekolah imageSrc={kepalaSekolah} name="Raharjo, S.IP, M.Pd">
          <p className="font-geomanist text-sm sm:text-base md:text-lg leading-relaxed">
            Assalamualaikum warahmatullahi wabarakatuh, Salam sejahtera bagi
            kita semua. Saya, Raharjo, M.Pd., Kepala SMK Negeri 1 Bantul, dengan
            bangga menyampaikan visi dan misi sekolah kami, yaitu mencetak
            lulusan yang unggul, berkompeten, dan siap bersaing di dunia global.
            Visi ini kami wujudkan melalui pendidikan yang berbasis pada
            penguatan karakter, keterampilan, dan penguasaan teknologi. Kami
            percaya bahwa dengan pendidikan yang berkualitas, kami dapat
            menyiapkan generasi yang siap menghadapi tantangan masa depan, baik
            di dunia kerja, wirausaha, maupun pendidikan tinggi. Di SMK Negeri 1
            Bantul, kami menerapkan pembelajaran yang memanusiakan hubungan,
            memahami konsep, membangun keberlanjutan, memilih tantangan, dan
            memberdayakan konteks. Dengan pendekatan ini, kami berupaya
            menciptakan siswa yang tidak hanya cerdas secara akademik, tetapi
            juga memiliki karakter yang sesuai dengan Profil Pelajar Pancasila.
            Kami ingin siswa mampu berkolaborasi, berinovasi, dan berkontribusi
            positif dalam masyarakat. Harapan besar kami adalah lulusan SMK
            Negeri 1 Bantul menjadi generasi yang siap kerja di dunia industri,
            siap berwirausaha dengan ide-ide kreatifnya, serta siap melanjutkan
            pendidikan ke jenjang yang lebih tinggi. Kami percaya, dengan
            dukungan semua pihak, cita-cita ini dapat terwujud, dan lulusan kami
            akan menjadi kebanggaan bangsa. Teruslah belajar, berinovasi, dan
            berkontribusi untuk masa depan yang lebih baik. Wassalamualaikum
            warahmatullahi wabarakatuh.
          </p>
        </KepalaSekolah>
        <NewsFeed />
        <DetailPrestasi />
        <Suport />
        <Lokasi />
      
      </main>
      {/* Modal popup untuk fitur spesial */}
    </div>
  );
};

export default Home;
