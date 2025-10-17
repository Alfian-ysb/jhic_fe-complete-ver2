import { memo } from 'react';

interface LoadingStateProps {
  message?: string;
}

/**
 * Loading State Component
 * Displays animated spinner with loading message
 */
const LoadingState = memo(({ message = "Memuat detail karya..." }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  );
});

LoadingState.displayName = "LoadingState";

export default LoadingState;
