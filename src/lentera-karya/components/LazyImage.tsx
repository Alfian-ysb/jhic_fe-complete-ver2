import { memo } from 'react';
import { useLazyImage } from '../hooks/useOptimization';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    placeholder?: string;
}

/**
 * Optimized image component with lazy loading
 * Reduces initial page load and bandwidth usage
 * Only loads images when they enter viewport
 */
const LazyImage = memo(({ src, alt, className, placeholder }: LazyImageProps) => {
    const { imageSrc, isLoaded, imgRef } = useLazyImage(src, placeholder);

    return (
        <div className="relative w-full h-60 bg-gray-200 rounded-lg overflow-hidden">
            <img
                ref={imgRef}
                src={imageSrc || placeholder || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3C/svg%3E'}
                alt={alt}
                className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
            />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}
        </div>
    );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;
