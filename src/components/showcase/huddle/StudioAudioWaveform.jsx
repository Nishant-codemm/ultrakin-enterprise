import React, { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * StudioAudioWaveform
 * Procedural harmonic audio equalizer simulating WebRTC audio track energy levels.
 * Calibrated for visual calm and realistic speech presence without hyperactive motion.
 */
function StudioAudioWaveformComponent({ isSpeaking, isMuted, reduceMotion }) {
  if (isMuted || !isSpeaking) {
    return (
      <div 
        className="flex items-center justify-center gap-0.5 h-4 px-2 rounded-full bg-white/[0.03] border border-white/[0.05]"
        aria-hidden="true"
      >
        {[3, 3, 3, 3, 3, 3, 3].map((h, i) => (
          <span 
            key={i} 
            style={{ height: `${h}px` }} 
            className="w-0.5 rounded-full bg-slate-600/70" 
          />
        ))}
      </div>
    );
  }

  if (reduceMotion) {
    return (
      <div 
        className="flex items-center justify-center gap-0.5 h-4 px-2 rounded-full bg-emerald-500/10 border border-emerald-500/20"
        aria-hidden="true"
      >
        {[6, 10, 14, 16, 14, 10, 6].map((h, i) => (
          <span 
            key={i} 
            style={{ height: `${h}px` }} 
            className="w-0.5 rounded-full bg-emerald-400/90" 
          />
        ))}
      </div>
    );
  }

  // Balanced studio VU meter amplitude profile
  const peaks = [6, 12, 16, 19, 16, 12, 6];

  return (
    <div 
      className="flex items-center justify-center gap-0.5 h-4 px-2 rounded-full bg-emerald-500/10 border border-emerald-500/25"
      aria-hidden="true"
    >
      {peaks.map((peak, idx) => (
        <motion.span
          key={idx}
          className="w-0.5 rounded-full bg-emerald-400"
          animate={{
            height: [
              `${Math.max(3, peak * 0.35)}px`,
              `${peak}px`,
              `${Math.max(3, peak * 0.45)}px`,
            ],
          }}
          transition={{
            duration: 0.65 + idx * 0.04,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: idx * 0.06,
          }}
        />
      ))}
    </div>
  );
}

export const StudioAudioWaveform = memo(StudioAudioWaveformComponent);
export default StudioAudioWaveform;
