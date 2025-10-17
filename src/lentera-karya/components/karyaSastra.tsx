import { memo, useState, useEffect } from 'react';
import SmallCardSlider from './smallCardSlider';
import type { KaryaCard } from '../types/karya';
import { getApprovedKaryaByCategory } from '../api/karyaServices';

/**
 * Karya Sastra Component - Optimized Version
 * Uses shared SmallCardSlider component
 * Lazy loads images for better performance
 * Memoized to prevent unnecessary re-renders
 */
const KaryaSastra = memo(() => {
  const [cards, setCards] = useState<KaryaCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKaryaSastra = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const karyaSastra = await getApprovedKaryaByCategory('sastra');
        
        // Map API data to KaryaCard format
        const mappedCards: KaryaCard[] = karyaSastra.map((karya: any) => ({
          id: karya.id,
          image: "https://i.pinimg.com/1200x/02/46/f7/0246f7c0f8feb49d74e77e601e1e171f.jpg", // karya.cover
          title: karya.title,
          description: karya.description || "Karya Sastra",
          category: karya.category,
          status: karya.status
        }));
        
        setCards(mappedCards);
      } catch (err) {
        console.error('Error fetching karya sastra:', err);
        setError(err instanceof Error ? err.message : 'Failed to load karya sastra');
        
        // Fallback to empty array
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchKaryaSastra();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Memuat karya sastra...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Show message when no cards available
  if (cards.length === 0) {
    return (
      <div className="text-center py-8">
        <p>Belum ada karya sastra yang tersedia.</p>
      </div>
    );
  }

  return (
    <SmallCardSlider 
      cards={cards} 
      title="Karya Sastra" 
      categoryLink="/lentera-karya"
    />
  );
});

KaryaSastra.displayName = 'KaryaSastra';

export default KaryaSastra;
