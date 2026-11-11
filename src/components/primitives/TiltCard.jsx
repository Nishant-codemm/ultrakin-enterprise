import React, { useCallback, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/cn';

/**
 * TiltCard
 * High-performance cursor-tracking 3D perspective card primitive.
 * Batched via requestAnimationFrame to avoid layout thrashing and maintain 60-120fps.
 * Respects prefers-reduced-motion.
 */
export default function TiltCard({
  children,
  className = '',
  style = {},
  maxTilt = 8,
  perspective = 900,
  scale = 1.015,
  glare = true,
  glareColor = 'rgba(165,180,252,0.1)',
  disabled = false,
}) {
  const ref = useRef(null);
  const rafId = useRef(null);
  const reduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });

  const onMove = useCallback(
    (e) => {
      if (disabled || reduceMotion) return;
      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;

        setTilt({
          rx: -dy * maxTilt,
          ry: dx * maxTilt,
          gx: (dx + 0.5) * 100,
          gy: (dy + 0.5) * 100,
          on: true,
        });
      });
    },
    [disabled, reduceMotion, maxTilt],
  );

  const onLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('relative', className)}
      style={{
        perspective: `${perspective}px`,
        perspectiveOrigin: '50% 50%',
        ...style,
      }}
    >
      <div
        style={{
          transform:
            tilt.on && !reduceMotion
              ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${scale})`
              : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transition: tilt.on
            ? 'transform 90ms ease-out'
            : 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
          transformOrigin: '50% 50%',
          willChange: 'transform',
          position: 'relative',
          borderRadius: 'inherit',
          height: '100%',
        }}
      >
        {children}
        {glare && tilt.on && !reduceMotion && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, ${glareColor} 0%, transparent 60%)`,
              mixBlendMode: 'screen',
              zIndex: 10,
            }}
          />
        )}
      </div>
    </div>
  );
}
