import { memo } from 'react';
import { Link } from 'react-router-dom';

interface ActionButtonsProps {
  category: string;
}

/**
 * Action Buttons Component
 * Back button and view more button
 */
const ActionButtons = memo(({ category }: ActionButtonsProps) => {
  return (
    <div className="flex gap-4 pt-4">
      <Link
        to="/"
        className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-center"
      >
        ← Kembali
      </Link>
      <Link
        to={`/lentera-karya/${category}`}
        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
      >
        Lihat Karya Lainnya
      </Link>
    </div>
  );
});

ActionButtons.displayName = "ActionButtons";

export default ActionButtons;
