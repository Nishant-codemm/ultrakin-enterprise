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

  // Stochastic, frequency-varied VAD speech cadence profile
  const speechBars = [
    { keyframes: ['3px', '11px', '5px', '14px', '4px'], duration: 0.32, delay: 0.02 },
    { keyframes: ['4px', '16px', '8px', '12px', '5px'], duration: 0.26, delay: 0.05 },
    { keyframes: ['5px', '18px', '9px', '19px', '6px'], duration: 0.38, delay: 0.00 },
    { keyframes: ['6px', '15px', '11px', '20px', '7px'], duration: 0.29, delay: 0.04 },
    { keyframes: ['4px', '17px', '7px', '14px', '4px'], duration: 0.41, delay: 0.03 },
    { keyframes: ['3px', '13px', '6px', '15px', '5px'], duration: 0.27, delay: 0.06 },
    { keyframes: ['3px', '9px', '4px', '12px', '3px'], duration: 0.34, delay: 0.01 },
  ];

  return (
    <div 
      className="flex items-center justify-center gap-0.5 h-4 px-2 rounded-full bg-emerald-500/10 border border-emerald-500/25"
      aria-hidden="true"
    >
      {speechBars.map((bar, idx) => (
        <motion.span
          key={idx}
          className="w-0.5 rounded-full bg-emerald-400"
          animate={{
            height: bar.keyframes,
          }}
          transition={{
            duration: bar.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: bar.delay,
          }}
        />
      ))}
    </div>
  );
}

export const StudioAudioWaveform = memo(StudioAudioWaveformComponent);
export default StudioAudioWaveform;
