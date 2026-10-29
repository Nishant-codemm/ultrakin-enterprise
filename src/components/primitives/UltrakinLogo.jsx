import React from 'react';

export default function UltrakinLogo({
  size = 28,
  className = '',
}) {
  return (
    <img
      src="/logo.svg"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      className={className}
    />
  );
}
