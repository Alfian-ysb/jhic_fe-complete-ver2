import React from 'react';

interface PartnerItem {
  id: number;
  title: string;
  subtitle: string;
  logo: string;
  alt: string;
}

const TeachingFactoryContent: React.FC = () => {
  const partners: PartnerItem[] = [
    {
      id: 1,
      title: 'Rekayasa Perangkat Lunak',
      subtitle: 'Berkerjasama Dengan',
      logo: "/images/seven-inc.jpg",
      alt: 'Seven Inc Logo',
    },
    {
      id: 2,
      title: 'Akuntansi Dan Keuangan Lembaga',
      subtitle: 'Berkerjasama Dengan',
      logo: '/images/bank-bantul.jpg',
      alt: 'Bank Bantul Logo',
    },
    {
      id: 3,
      title: 'Teknik Komputer Dan Jaringan',
      subtitle: 'Berkerjasama Dengan',
      logo: '/images/telkom-indonesia.jpg',
      alt: 'Telkom Indonesia Logo',
    },
    {
      id: 4,
      title: 'Desain Komunikasi Visual',
      subtitle: 'Berkerjasama Dengan',
      logo: '/images/time-excelindo.jpg',
      alt: 'Time Excelindo Logo',
    },
    {
      id: 5,
      title: 'Manajemen Perkantoran',
      subtitle: 'Berkerjasama Dengan',
      logo: '/images/kantor-pos.jpg',
      alt: 'Pos Indonesia Logo',
    },
    {
      id: 6,
      title: 'Pemasaran',
      subtitle: 'Berkerjasama Dengan',
      logo: '/images/ABdina.jpg',
      alt: 'Adina Spunbond Logo',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p lg:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
            <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 min-h-[2.5rem] sm:min-h-[3rem] lg:min-h-[3.5rem] flex items-center justify-center px-2 leading-tight">
              {partner.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-3 sm:mt-4 lg:mt-6">{partner.subtitle}</p>
            <div className="w-full h-20 sm:h-24 lg:h-32 flex items-center justify-center mt-3 sm:mt-4 lg:mt-6">
              <img
                src={partner.logo}
                alt={partner.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachingFactoryContent;
