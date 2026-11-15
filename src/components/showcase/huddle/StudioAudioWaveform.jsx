import React, { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * StudioAudioWaveform
 * Procedural harmonic audio equalizer simulating WebRTC audio track energy levels.
 * Renders 7 frequency bands with staggered sine-wave oscillation.
 */
function StudioAudioWaveformComponent({ isSpeaking, isMuted, reduceMotion }) {
  if (isMuted || !isSpeaking) {
    return (
      <div 
        className="flex items-center justify-center gap-0.5 h-5 px-2 rounded-full bg-white/[0.04] border border-white/[0.06]"
        aria-hidden="true"
      >
        {[3, 3, 3, 3, 3, 3, 3].map((h, i) => (
          <span 
            key={i} 
            style={{ height: `${h}px` }} 
            className="w-0.5 rounded-full bg-slate-600 transition-all duration-300" 
          />
        ))}
      </div>
    );
  }

  if (reduceMotion) {
    return (
      <div 
        className="flex items-center justify-center gap-0.5 h-5 px-2 rounded-full bg-emerald-500/15 border border-emerald-500/30"
        aria-hidden="true"
      >
        {[8, 14, 18, 22, 18, 14, 8].map((h, i) => (
          <span 
            key={i} 
            style={{ height: `${h * 0.7}px` }} 
            className="w-0.5 rounded-full bg-emerald-400" 
          />
        ))}
      </div>
    );
  }

  const peaks = [10, 18, 24, 28, 24, 18, 10];

  return (
    <div 
      className="flex items-center justify-center gap-0.5 h-5 px-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
      aria-hidden="true"
    >
      {peaks.map((peak, idx) => (
        <motion.span
          key={idx}
          className="w-0.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]"
          animate={{
            height: [
              `${Math.max(4, peak * 0.3)}px`,
              `${peak * 0.75}px`,
              `${Math.max(4, peak * 0.45)}px`,
            ],
          }}
          transition={{
            duration: 0.55 + idx * 0.04,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: idx * 0.08,
          }}
        />
      ))}
    </div>
  );
}

export const StudioAudioWaveform = memo(StudioAudioWaveformComponent);
export default StudioAudioWaveform;
