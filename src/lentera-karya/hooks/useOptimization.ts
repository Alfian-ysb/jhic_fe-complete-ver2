import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for lazy loading images
 * Only loads images when they're visible in viewport
 * Reduces initial page load time and bandwidth
 * 
 * @param imageUrl - URL of the image to load
 * @param placeholder - Placeholder image URL (optional)
 * @returns Object with loaded state and image source
 */
export function useLazyImage(imageUrl: string, placeholder?: string) {
    const [imageSrc, setImageSrc] = useState(placeholder || '');
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const imgElement = imgRef.current;
        if (!imgElement) return;

        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setImageSrc(imageUrl);
                            setIsLoaded(true);
                            observer.unobserve(imgElement);
                        }
                    });
                },
                {
                    rootMargin: '50px', // Start loading 50px before image is visible
                }
            );

            observer.observe(imgElement);

            return () => {
                if (imgElement) {
                    observer.unobserve(imgElement);
                }
            };
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            setImageSrc(imageUrl);
            setIsLoaded(true);
        }
    }, [imageUrl]);

    return { imageSrc, isLoaded, imgRef };
}

/**
 * Custom hook for optimized pagination
 * Handles scroll and resize events with debouncing
 * 
 * @param trackRef - Ref to the scrollable container
 * @param itemCount - Total number of items
 * @returns Pagination state and controls
 */
export function usePagination(
    trackRef: React.RefObject<HTMLDivElement | null>,
    itemCount: number
) {
    const [currentPage, setCurrentPage] = useState(0);
    const [maxPages, setMaxPages] = useState(0);

    const updatePagination = () => {
        const el = trackRef.current;
        if (!el) return;
        
        const card = el.querySelector<HTMLElement>('div[data-card]');
        if (!card) return;
        
        const containerWidth = el.clientWidth;
        const cardWidth = card.clientWidth + parseInt(getComputedStyle(el).columnGap || '24');
        const cardsPerPage = Math.max(1, Math.floor(containerWidth / cardWidth));
        const pages = Math.max(0, Math.ceil(itemCount / cardsPerPage) - 1);
        
        setMaxPages(pages);
        setCurrentPage((p) => Math.min(p, pages));
    };

    useEffect(() => {
        updatePagination();
        
        const el = trackRef.current;
        if (!el) return;

        // Debounced resize handler
        let resizeTimeout: ReturnType<typeof setTimeout>;
        const onResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updatePagination, 150);
        };

        window.addEventListener('resize', onResize, { passive: true });
        return () => {
            window.removeEventListener('resize', onResize);
            clearTimeout(resizeTimeout);
        };
    }, [itemCount]);

    // Track manual scroll
    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;

        let scrollTimeout: ReturnType<typeof setTimeout>;
        const onScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const page = Math.round(el.scrollLeft / el.clientWidth);
                setCurrentPage(page);
            }, 100);
        };

        el.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            el.removeEventListener('scroll', onScroll);
            clearTimeout(scrollTimeout);
        };
    }, [maxPages]);

    const scrollByPage = (dir: 'prev' | 'next') => {
        const el = trackRef.current;
        if (!el) return;
        
        const pageWidth = el.clientWidth;
        const nextPage = dir === 'next' 
            ? Math.min(currentPage + 1, maxPages) 
            : Math.max(currentPage - 1, 0);
        
        el.scrollTo({ left: nextPage * pageWidth, behavior: 'smooth' });
        setCurrentPage(nextPage);
    };

    return { currentPage, maxPages, scrollByPage };
}
