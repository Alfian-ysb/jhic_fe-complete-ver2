import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  title?: string;
  desc?: string;
  img?: string;
  alt?: string;
  to: string;
  external?: boolean;
};

const ChooseCard: React.FC<Props> = ({
  title,
  img,
  alt,
  desc,
  to,
  external = false
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (external) {
      window.open(to, "_blank", "noopener,noreferrer");
    } else {
      navigate(to);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="
        w-full md:w-[48%]
        bg-transparent rounded-2xl sm:rounded-3xl relative overflow-hidden
        shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-[1.03]
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        group
      "
      aria-label={`Navigate to ${title || alt}`}
    >
      {/* Mobile: Vertical (3:4) | MD+: Horizontal (16:9) */}
      <div className="relative w-full aspect-[3/4] md:aspect-[16/9]">
        <img
          src={img}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover rounded-2xl sm:rounded-3xl"
          loading="lazy"
        />
        
        {/* Overlay with gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl sm:rounded-3xl" />
        
        {/* Content overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-5 lg:p-6">
          <h1 className="
            text-base sm:text-lg md:text-xl lg:text-2xl
            font-semibold text-white text-left
            mb-1 sm:mb-2
            line-clamp-2
          ">
            {title}
          </h1>
          
          <p className="
            text-xs sm:text-sm md:text-base
            text-white/90 text-left
            line-clamp-2 sm:line-clamp-3
            leading-relaxed
          ">
            {desc}
          </p>
        </div>
      </div>
    </button>
  );
};

export default ChooseCard;