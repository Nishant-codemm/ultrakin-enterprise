/**
 * TypewriterText.jsx
 * Reveals text character by character. Respects prefers-reduced-motion.
 */
import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function TypewriterText({ text = '', speed = 28, onComplete, className = '' }) {
  const reduceMotion = useReducedMotion();
  const [reveal, setReveal] = useState(() => ({ text, value: '' }));

  useEffect(() => {
    if (reduceMotion) {
      onComplete?.();
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setReveal({ text, value: text.slice(0, i) });
      if (i >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, reduceMotion, onComplete]);

  const displayed = reduceMotion ? text : reveal.text === text ? reveal.value : '';
  return <span className={className}>{displayed}</span>;
}
