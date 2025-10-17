import { memo } from 'react';

interface CategoryBadgesProps {
  category: string;
}

/**
 * Category Badges Component
 * Displays category and approved status badges
 */
const CategoryBadges = memo(({ category }: CategoryBadgesProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold capitalize">
        📁 {category}
      </span>
      <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
        ✅ Approved
      </span>
    </div>
  );
});

CategoryBadges.displayName = "CategoryBadges";

export default CategoryBadges;
