import { memo } from 'react';

interface KaryaTitleProps {
  title: string;
  uploadedAt: string;
}

/**
 * Karya Title Component
 * Displays title and upload date
 */
const KaryaTitle = memo(({ title, uploadedAt }: KaryaTitleProps) => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-500 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
        Diupload pada {new Date(uploadedAt).toLocaleDateString("id-ID", {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </p>
    </div>
  );
});

KaryaTitle.displayName = "KaryaTitle";

export default KaryaTitle;
