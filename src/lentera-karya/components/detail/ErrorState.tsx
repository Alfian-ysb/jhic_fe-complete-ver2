import { memo } from 'react';
import { Link } from 'react-router-dom';

interface ErrorStateProps {
  message: string;
}

/**
 * Error State Component
 * Displays error message with icon and back button
 */
const ErrorState = memo(({ message }: ErrorStateProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-red-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-red-700 mb-2">Karya Tidak Ditemukan</h2>
        <p className="text-red-600 mb-6">{message}</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
});

ErrorState.displayName = "ErrorState";

export default ErrorState;
