import { memo } from 'react';
import type { Karya } from '../../types/karya';
import CoverImage from './CoverImage';
import CategoryBadges from './CategoryBadges';
import KaryaTitle from './KaryaTitle';
import KaryaDescription from './KaryaDescription';
import FileInfo from './FileInfo';
import ActionButtons from './ActionButtons';

interface KaryaDetailContentProps {
  karya: Karya;
}

/**
 * Karya Detail Content Component
 * Contains the main 2-column layout with all karya information
 */
const KaryaDetailContent = memo(({ karya }: KaryaDetailContentProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
      {/* Left Column - Image */}
      <div className="space-y-4">
        <CoverImage coverName={karya.coverName} title={karya.title} />
        <CategoryBadges category={karya.category} />
      </div>

      {/* Right Column - Details */}
      <div className="space-y-6">
        <KaryaTitle title={karya.title} uploadedAt={karya.uploadedAt} />
        
        <hr className="border-gray-200" />
        
        <KaryaDescription description={karya.description} />
        
        <FileInfo fileName={karya.fileName} coverName={karya.coverName} />
        
        <ActionButtons category={karya.category} />
      </div>
    </div>
  );
});

KaryaDetailContent.displayName = "KaryaDetailContent";

export default KaryaDetailContent;
