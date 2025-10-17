import { memo, useState, useEffect } from 'react';
import SmallCardSlider from './smallCardSlider';
import type { KaryaCard } from '../types/karya';
import { getApprovedKaryaByCategory } from '../api/karyaServices';

interface DynamicKaryaSectionProps {
  categoryId: string;
  categoryLabel: string;
  displayType: 'card';
}

/**
 * Dynamic Karya Section Component
 * Renders category section only if there are approved karya
 * Automatically adapts to new categories
 */
const DynamicKaryaSection = memo(({ categoryId, categoryLabel }: DynamicKaryaSectionProps) => {
  const [cards, setCards] = useState<KaryaCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ STEP 7: Get API base URL for cover images
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

  useEffect(() => {
    const fetchKaryaByCategory = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const karyaData = await getApprovedKaryaByCategory(categoryId);
        
        // ✅ STEP 7: Map API data to KaryaCard format with backend cover URLs
        const mappedCards: KaryaCard[] = karyaData.map((karya: any) => {
          // Build full cover URL
          let coverUrl = karya.coverUrl || '';
          if (coverUrl && !coverUrl.startsWith('http')) {
            coverUrl = `${API_BASE_URL.replace('/api', '')}${coverUrl}`;
          }

          return {
            id: karya.id,
            image: coverUrl || "https://i.pinimg.com/1200x/02/46/f7/0246f7c0f8feb49d74e77e601e1e171f.jpg", // Fallback to placeholder
            title: karya.title,
            description: karya.description || `Karya ${categoryLabel}`,
            category: karya.category,
            status: karya.status
          };
        });
        
        setCards(mappedCards);
      } catch (err) {
        console.error(`Error fetching karya ${categoryId}:`, err);
        setError(err instanceof Error ? err.message : `Failed to load karya ${categoryId}`);
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchKaryaByCategory();
  }, [categoryId, categoryLabel, API_BASE_URL]);

  // Don't render anything if loading
  if (loading) {
    return null;
  }

  // Don't render anything if error or no cards
  if (error || cards.length === 0) {
    return null;
  }

  // Render appropriate slider based on displayType
  const SliderComponent = SmallCardSlider;

  return (
    <SliderComponent 
      cards={cards} 
      title={categoryLabel}
      categoryLink="/lentera-karya"
    />
  );
});

DynamicKaryaSection.displayName = 'DynamicKaryaSection';

export default DynamicKaryaSection;
