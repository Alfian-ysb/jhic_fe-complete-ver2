import { memo } from 'react';

interface KaryaDescriptionProps {
  description?: string;
}

/**
 * Karya Description Component
 * Displays description with icon
 */
const KaryaDescription = memo(({ description }: KaryaDescriptionProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Deskripsi Karya
      </h2>
      {description ? (
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {description}
        </p>
      ) : (
        <p className="text-gray-400 italic">Tidak ada deskripsi</p>
      )}
    </div>
  );
});

KaryaDescription.displayName = "KaryaDescription";

export default KaryaDescription;
