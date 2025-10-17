// import React from 'react'
import { useEffect, useState } from "react";
// import { getApprovedKaryaByCategory } from "../api/karyaServices"
import { getApprovedKarya} from "../api/karyaServices";
// import { data } from "react-router-dom";

interface KaryaShowcase {
  id: string | number;
  title: string;
  category: string;
  coverName: string;
  uploadedAt: string;
}

const heroShowcase = () => {
  const [latestKarya, setLatestKarya] = useState<KaryaShowcase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLatestKarya = async () => {
      try {
        setLoading(true);

        // Fetch all approved karya from all categories
        const datakarya = await getApprovedKarya();

        // Combine all karya
        // const allKarya = [...karyaSastra, ...karyaVisual, ...karyaAnimasi];

        // Sort by uploadedAt (newest first) and take top 3
        const sortedKarya = datakarya
          .sort(
            (a, b) =>
              new Date(b.uploadedAt).getTime() -
              new Date(a.uploadedAt).getTime()
          )
          .slice(0, 3);

        setLatestKarya(sortedKarya);
        console.log("✨ Latest 3 Karya:", sortedKarya);
      } catch (error) {
        console.error("❌ Error fetching latest karya:", error);
        setLatestKarya([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestKarya();
  }, []);

  // Placeholder image URL
  const placeholderImage =
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80";

  if (loading) {
    return (
      <div className="w-full h-[400px] px-20 flex items-center justify-center">
        <p className="text-gray-500">Memuat karya terbaru...</p>
      </div>
    );
  }

  // Get the 3 latest karya (or use placeholders if not enough)
  const karya1 = latestKarya[0];
  const karya2 = latestKarya[1];
  const karya3 = latestKarya[2];

  return (
    <div className="w-full h-[300px] md:h-[400px] gap-2 md:gap-8 px-8 md:px-20 grid grid-cols-5 grid-rows-2">
      {/* Main showcase - Latest karya */}
      <div className="w-full h-full bg-neutral-400 col-span-3 row-span-2 rounded-lg md:rounded-2xl overflow-hidden relative group">
        {karya1 ? (
          <button
            onClick={() => (window.location.href = `/detail/${karya1.id}`)}
            className="cursor-pointer w-full h-full  box-border"
          >
            <img
              src={placeholderImage}
              alt={karya1.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute flex flex-col items-start bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <span className="text-xs uppercase tracking-wider bg-white/20 px-2 py-1 rounded">
                {karya1.category}
              </span>
              <h3 className="text-left text-lg md:text-2xl font-bold mt-2">
                {karya1.title}
              </h3>
            </div>
          </button>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <p>Belum ada karya</p>
          </div>
        )}
      </div>

      {/* Second karya */}
      <div className="w-full h-full bg-neutral-400 col-span-2 rounded-lg row-span-1 md:rounded-2xl overflow-hidden relative group">
        {karya2 ? (
          <button
            onClick={() => (window.location.href = `/detail/${karya2.id}`)}
            className="cursor-pointer w-full h-full  box-border"
          >
            <img
              src={placeholderImage}
              alt={karya2.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute flex flex-col items-start bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
              <span className="text-left text-xs uppercase tracking-wider bg-white/20 px-2 py-1 rounded">
                {karya2.category}
              </span>
              <h3 className="text-left text-lg font-bold mt-1">{karya2.title}</h3>
            </div>
          </button>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <p>Belum ada karya</p>
          </div>
        )}
      </div>

      {/* Third karya */}
      <div className="w-full h-full bg-neutral-400 col-span-2 row-span-1 rounded-lg md:rounded-2xl overflow-hidden relative group">
        {karya3 ? (
          <button
            onClick={() => (window.location.href = `/detail/${karya3.id}`)}
            className="cursor-pointer w-full h-full  box-border"
          >
            <img
              src={placeholderImage}
              alt={karya3.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute flex flex-col items-start bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
              <span className="text-left text-xs uppercase tracking-wider bg-white/20 px-2 py-1 rounded">
                {karya3.category}
              </span>
              <h3 className="text-left text-lg font-bold mt-1">{karya3.title}</h3>
            </div>
          </button>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <p>Belum ada karya</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default heroShowcase;
