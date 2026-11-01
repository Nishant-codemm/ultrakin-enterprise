/**
 * TypewriterText.jsx
 * Reveals text character by character. Respects prefers-reduced-motion.
 */
import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function TypewriterText({ text = '', speed = 28, onComplete, className = '' }) {
  const reduceMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(reduceMotion ? text : '');

  useEffect(() => {
    if (reduceMotion) {
      setDisplayed(text);
      onComplete?.();
      return;
    }
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, reduceMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span className={className}>{displayed}</span>;
}
