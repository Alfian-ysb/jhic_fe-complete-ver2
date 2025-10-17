// import { memo, useState, useEffect } from 'react';
// import LargeCardSlider from './LargeCardSlider';
// import type { KaryaCard } from '../types/karya';
// import { getApprovedKaryaByCategory } from '../api/karyaServices';

// /**
//  * Karya Animasi Component - Optimized Version
//  * Uses shared LargeCardSlider component
//  * Lazy loads images for better performance
//  * Memoized to prevent unnecessary re-renders
//  */
// const KaryaAnimasi = memo(() => {
//     const [cards, setCards] = useState<KaryaCard[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchKaryaAnimasi = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
                
//                 const karyaAnimasi = await getApprovedKaryaByCategory('animasi');
//                 console.log('🎬 Karya Animasi from API:', karyaAnimasi);
//                 console.log('🎬 Total karya animasi:', karyaAnimasi.length);
                
//                 // Map API data to KaryaCard format
//                 const mappedCards: KaryaCard[] = karyaAnimasi.map((karya: any) => ({
//                     id: karya.id,
//                     image: "https://i.pinimg.com/1200x/02/46/f7/0246f7c0f8feb49d74e77e601e1e171f.jpg", // karya.cover
//                     title: karya.title,
//                     description: karya.description || "Karya Animasi",
//                     category: karya.category,
//                     status: karya.status
//                 }));
                
//                 console.log('🎬 Mapped cards:', mappedCards);
//                 setCards(mappedCards);
//             } catch (err) {
//                 console.error('❌ Error fetching karya animasi:', err);
//                 setError(err instanceof Error ? err.message : 'Failed to load karya animasi');
                
//                 // Fallback to empty array
//                 setCards([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchKaryaAnimasi();
//     }, []);

//     // Show loading state
//     if (loading) {
//         return (
//             <div className="text-center py-8">
//                 <p>Memuat karya animasi...</p>
//             </div>
//         );
//     }

//     // Show error state
//     if (error) {
//         return (
//             <div className="text-center py-8 text-red-600">
//                 <p>Error: {error}</p>
//             </div>
//         );
//     }

//     // Show message when no cards available
//     if (cards.length === 0) {
//         return (
//             <div className="text-center py-8">
//                 <p>Belum ada karya animasi yang tersedia.</p>
//             </div>
//         );
//     }

//     return (
//         <LargeCardSlider 
//             cards={cards} 
//             title="Karya Animasi" 
//             categoryLink="/lentera-karya"
//         />
//     );
// });

// KaryaAnimasi.displayName = 'KaryaAnimasi';

// export default KaryaAnimasi;