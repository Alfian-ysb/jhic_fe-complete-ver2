import React from "react";

interface ShortLineProps {
    color: string;
    className?: string;
}

const shortLine: React.FC<ShortLineProps> = ({ color, className}) => {
    return (
        <svg className={`absolute w-12 h-1 ${className}`} viewBox='0 0 12 4' preserveAspectRatio='none' aria-hidden>
            <rect x='0' y='0' width='12' height='4' rx='0.8' ry='2' fill={color} />
        </svg>
    )
}

export default shortLine