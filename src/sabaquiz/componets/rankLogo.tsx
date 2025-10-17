import React from "react";

type Props = {
  width?: string;
  height?: string;
  className?: string;
};

// Helper path
const ShieldBase = ({ fill }: { fill: string }) => (
  <path
    d="M96 64h320v256c0 64-64 128-160 128s-160-64-160-128V64z"
    fill={fill}
  />
);

// ✅ Garis diagonal sudah diperpendek & sejajar dengan tepi shield
const Diagonal = ({ fill }: { fill: string }) => (
  <path
    d="M96 272L416 160v64L96 336v-64z"
    fill={fill}
    opacity="0.9"
  />
);

export const Bronze: React.FC<Props> = ({ width, height, className }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <ShieldBase fill="#A86B29" />
    <Diagonal fill="#C67A29" />
  </svg>
);

export const Silver: React.FC<Props> = ({ width, height, className }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <ShieldBase fill="#CAC8C8" />
    <Diagonal fill="#DEDEDE" />
  </svg>
);

export const Gold: React.FC<Props> = ({ width, height, className }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <ShieldBase fill="#F7D000" />
    <Diagonal fill="#FFE248" />
  </svg>
);

export const Diamond: React.FC<Props> = ({ width, height, className }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <ShieldBase fill="#43DAFF" />
    <Diagonal fill="#6BE0FF" />
  </svg>
);

export const Ruby: React.FC<Props> = ({ width, height, className }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <ShieldBase fill="#D91404" />
    <Diagonal fill="#EE0A30" />
  </svg>
);
