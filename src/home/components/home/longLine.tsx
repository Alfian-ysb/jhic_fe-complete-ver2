import React from "react";

interface LongLineProps{
    color: string;
    className?: string;
}

const longLine : React.FC<LongLineProps> = ({ color, className}) => {
    return (
        <svg className={`absolute w-32 h-1 ${className}`} viewBox='0 0 32 4' preserveAspectRatio='none' aria-hidden>
            <rect x='0' y='0' width='32' height='4' rx='0.8' ry='2' fill={color} />
        </svg>
    )
}

export default longLine