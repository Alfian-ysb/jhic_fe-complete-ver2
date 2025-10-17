import { memo } from 'react';

interface CoverImageProps {
  coverName?: string;
  title: string;
}

/**
 * Cover Image Component
 * Displays karya cover image with fallback
 */
const CoverImage = memo(({ coverName, title }: CoverImageProps) => {
  return (
    <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
      {coverName ? (
        <img
          src={`/uploads/${coverName}`}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
          }}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-400 text-lg">No Cover Image</span>
        </div>
      )}
    </div>
  );
});

CoverImage.displayName = "CoverImage";

export default CoverImage;
