import React, { memo } from 'react';

function UltrakinLogo({
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

export default memo(UltrakinLogo);

