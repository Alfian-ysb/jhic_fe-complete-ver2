import { memo } from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  category: string;
  title: string;
}

/**
 * Breadcrumb Navigation Component
 * Shows navigation path: Home / Lentera Karya / Category / Title
 */
const Breadcrumb = memo(({ category, title }: BreadcrumbProps) => {
  return (
    <div className="bg-gray-100 px-6 py-3 border-b">
      <nav className="flex items-center space-x-2 text-sm">
        <Link to="/" className="text-blue-600 hover:text-blue-700 hover:underline">
          Beranda
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-700 font-medium capitalize">{category}</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-500 truncate max-w-xs">{title}</span>
      </nav>
    </div>
  );
});

Breadcrumb.displayName = "Breadcrumb";

export default Breadcrumb;
