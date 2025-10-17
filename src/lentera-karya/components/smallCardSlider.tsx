import { memo, useRef } from "react";
import { usePagination } from "../hooks/useOptimization";
import LazyImage from "./LazyImage";
import type { KaryaCard, SmallCardSliderProps } from "../types/karya";
import Button from "./button";

/**
 * Optimized Large Card Slider Component
 * Shared between karyaVisual and karyaAnimasi
 * Features:
 * - Lazy loading images
 * - Debounced scroll/resize handlers
 * - Memoized to prevent unnecessary re-renders
 * - Responsive design
 * - Touch-friendly
 */
const SmallCardSlider = memo(
  ({ cards, title, categoryLink }: SmallCardSliderProps) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const { scrollByPage } = usePagination(trackRef, cards.length);

    // Early return if no cards
    if (!cards || cards.length === 0) {
      return (
        <div className="w-full h-fit mt-0 md:mt-20 px-6 lg:px-20">
          <h1 className="text-3xl py-2">{title}</h1>
          <div className="text-center py-10 text-gray-500">
            Belum ada karya {title.toLowerCase()} yang tersedia.
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-fit mt-5 md:mt-20 px-6 lg:px-20">
        <h1 className="text-3xl py-2">{title}</h1>

        {/* Hide native scrollbar - extracted to component level for performance */}
        <style>{`
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .hide-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

        <div className="relative w-full overflow-hidden mt-5">
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
            role="region"
            aria-label={`${title} slider`}
          >
            {cards.map((card) => (
              <CardItem key={card.id} card={card} categoryLink={categoryLink} />
            ))}
          </div>
          <div>
            <NavigationButton
              direction="prev"
              onClick={() => scrollByPage("prev")}
              ariaLabel="Previous page"
              // disabled={currentPage === 0}
            />
            <NavigationButton
              direction="next"
              onClick={() => scrollByPage("next")}
              ariaLabel="Next page"
              // disabled={currentPage >= maxPages}
            />
          </div>
        </div>
      </div>
    );
  }
);

SmallCardSlider.displayName = "SmallCardSlider";

/**
 * Memoized Card Item Component
 * Only re-renders when card data changes
 */
const CardItem = memo(
  ({ card }: { card: KaryaCard; categoryLink?: string }) => {
    return (
      <div data-card className="flex-none w-full sm:w-1/2 lg:w-1/4">
        <article className="w-full h-auto flex flex-col gap-6">
          <LazyImage
            src={card.image}
            alt={card.title}
            className="w-full h-60 object-cover flex-shrink-0 rounded-lg"
          />
          <div>
            <h3 className="text-2xl font-semibold">{card.title}</h3>
            <p className="text-secondary-grey text-lg line-clamp-2">
              {card.description.length > 100 ? card.description.slice(0, 100) + "..." : card.description}
            </p>
            <Button
              className="mt-4 py-0"
            
              url={`/detail/${card.id}`}
              buttonText="Detail"
            />
          </div>
        </article>
      </div>
    );
  }
);

CardItem.displayName = "CardItem";

/**
 * Memoized Navigation Button Component
 * Always visible, disabled state for better UX
 */
const NavigationButton = memo(
  ({
    direction,
    onClick,
    ariaLabel,
    disabled = false,
  }: {
    direction: "prev" | "next";
    onClick: () => void;
    ariaLabel: string;
    disabled?: boolean;
  }) => {
    const isNext = direction === "next";

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`absolute ${
          isNext ? "right-4" : "left-4"
        } top-1/2 transform -translate-y-1/2 
                bg-[#52525290] text-white w-10 h-10 rounded-full 
                transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                ${
                  disabled
                    ? "opacity-30 cursor-not-allowed"
                    : "bg-opacity-60 hover:bg-opacity-75 cursor-pointer"
                }`}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        type="button"
      >
        {isNext ? "›" : "‹"}
      </button>
    );
  }
);

NavigationButton.displayName = "NavigationButton";

export default SmallCardSlider;
