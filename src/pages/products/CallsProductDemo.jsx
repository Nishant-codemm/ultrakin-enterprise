/**
 * CallsProductDemo.jsx
 * Production-grade Calls & Huddles preview for /products/calls
 * Features:
 * - Real-time animated audio equalizer waveform on active speaker tile
 * - Live streaming speech caption ticker at bottom of call
 * - Active ticking timer with recording beacon
 * - Interactive toolbar: Mute, Video toggle, Screen Share, End Call
 * - End Call transitions to AI Huddle Summary with Typewriter text animation
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, PhoneOff, PhoneCall, Sparkles, CheckSquare, Share2 } from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import WorkspaceAppRail from '../../components/product/WorkspaceAppRail';
import TypewriterText from '../../components/product/TypewriterText';
import { CALLS_DATA } from '../../data/productPageData';

function AudioWaveform({ reduceMotion }) {
  return (
    <div className="flex items-center gap-0.5 h-3 px-1.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30">
      {[40, 90, 60, 100, 50].map((h, i) => (
        <motion.span
          key={i}
          className="w-0.5 rounded-full bg-emerald-400"
          animate={reduceMotion ? { height: `${h}%` } : { height: ['25%', `${h}%`, '30%'] }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default function CallsProductDemo() {
  const reduceMotion = useReducedMotion();
  const [inCall, setInCall] = useState(true);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [sharingScreen, setSharingScreen] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState(1);
  const [seconds, setSeconds] = useState(738); // 12:18

  // Live timer tick
  useEffect(() => {
    if (!inCall) return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [inCall]);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex h-full w-full bg-[#07090E] text-slate-100 select-none overflow-hidden relative">
      {/* ── Unified Workspace App Rail ── */}
      <WorkspaceAppRail activeApp="calls" theme="dark" />

      {/* ── Main Call Viewport ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Bar */}
      <div className="h-10 shrink-0 border-b border-white/[0.08] flex items-center justify-between px-4 bg-[#0B0F19]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-200">Kestrel Robotics · Project kickoff</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400 bg-white/[0.05] px-2 py-0.5 rounded border border-white/[0.08] tabular-nums">
            {inCall ? `● REC ${formatTimer(seconds)}` : 'Call ended'}
          </span>
          <span className="text-[10px] font-mono text-indigo-400 flex items-center gap-1 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            <Sparkles size={11} /> AI Transcribing
          </span>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 p-3 flex flex-col justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {inCall ? (
            <motion.div
              key="call-grid"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col h-full justify-between"
            >
              <div className="grid grid-cols-2 gap-2.5 h-full max-h-[250px]">
                {CALLS_DATA.participants.map((p) => {
                  const isSpeaking = p.id === activeSpeaker;
                  const isUser = p.id === 2;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActiveSpeaker(p.id)}
                      aria-label={`Show ${p.person.name} as active speaker`}
                      aria-pressed={isSpeaking}
                      className={`relative rounded-xl border p-2.5 flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isSpeaking
                          ? 'border-emerald-500/50 bg-[#0F172A] shadow-[0_0_20px_rgba(16,185,129,0.14)]'
                          : 'border-white/[0.06] bg-[#0B0F19] hover:border-white/[0.12]'
                      }`}
                    >
                      {/* Speaking indicator and waveform */}
                      <div className="relative mb-1">
                        {isSpeaking && !reduceMotion && (
                          <span className="absolute -inset-1.5 rounded-full border border-emerald-400/60 animate-ping opacity-40" />
                        )}
                        <AvatarChip
                          person={p.person}
                          size="md"
                          className={isSpeaking ? 'ring-2 ring-emerald-400' : ''}
                        />
                      </div>

                      <div className="text-center">
                        <span className="text-[11.5px] font-semibold text-slate-200 block truncate max-w-[110px]">
                          {p.person.name}
                        </span>
                        <div className="flex items-center justify-center gap-1 mt-0.5">
                          {isSpeaking ? (
                            <AudioWaveform reduceMotion={reduceMotion} />
                          ) : (
                            <span className="text-[9.5px] text-slate-500 font-mono">{p.person.role}</span>
                          )}
                        </div>
                      </div>

                      {/* Status indicator in tile corner */}
                      <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-slate-400">
                        {isUser && muted ? (
                          <MicOff size={11} className="text-rose-400" />
                        ) : p.muted ? (
                          <MicOff size={11} className="text-slate-500" />
                        ) : (
                          <Mic size={11} className="text-emerald-400" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Live Streaming Speech Caption Ticker */}
              <div className="mt-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-between text-[11px] text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold font-mono text-[9px] uppercase">Priya K:</span>
                  <span className="italic text-slate-200">"...let’s keep the checklist in the shared kickoff doc and assign an owner to each follow-up."</span>
                </span>
                <span className="text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                  {sharingScreen ? 'Sharing screen' : 'Live'}
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="summary-view"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="h-full rounded-xl border border-indigo-500/25 bg-[#0F172A] p-4 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-100">Automated Huddle Summary</h4>
                    <p className="text-[10px] text-slate-400 font-mono">Generated instantly · Synced to Docs</p>
                  </div>
                </div>

                <div className="mt-3 p-2.5 rounded-lg bg-black/30 border border-white/[0.06] text-xs text-slate-300 leading-relaxed">
                  <TypewriterText text={CALLS_DATA.summary} speed={20} />
                </div>

                <div className="mt-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Action items captured (3)
                  </span>
                  <div className="space-y-1.5">
                    {CALLS_DATA.actionItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-slate-300 p-1.5 rounded-md bg-white/[0.03] border border-white/[0.04]"
                      >
                        <CheckSquare size={13} className="text-indigo-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Summary saved to #client-kestrel</span>
                <button
                  onClick={() => setInCall(true)}
                  className="px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <PhoneCall size={12} /> Rejoin
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Controls Toolbar */}
      <div className="h-12 shrink-0 border-t border-white/[0.08] bg-[#0B0F19] flex items-center justify-center gap-3 px-4">
        {inCall ? (
          <>
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? 'Unmute microphone' : 'Mute microphone'}
              aria-pressed={muted}
              className={`p-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                muted
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : 'bg-white/[0.06] border-white/[0.1] text-slate-200 hover:bg-white/[0.1]'
              }`}
              title={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <MicOff size={14} /> : <Mic size={14} />}
            </button>

            <button
              type="button"
              onClick={() => setCameraOff((c) => !c)}
              aria-label={cameraOff ? 'Turn camera on' : 'Turn camera off'}
              aria-pressed={cameraOff}
              className={`p-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                cameraOff
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : 'bg-white/[0.06] border-white/[0.1] text-slate-200 hover:bg-white/[0.1]'
              }`}
              title={cameraOff ? 'Turn on video' : 'Turn off video'}
            >
              {cameraOff ? <VideoOff size={14} /> : <Video size={14} />}
            </button>

            <button
              type="button"
              onClick={() => setSharingScreen((sharing) => !sharing)}
              aria-pressed={sharingScreen}
              className={`p-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${sharingScreen ? 'border-indigo-400/50 bg-indigo-500/20 text-indigo-200' : 'border-white/[0.1] bg-white/[0.06] text-slate-200 hover:bg-white/[0.1]'}`}
              title={sharingScreen ? 'Stop sharing screen' : 'Share screen'}
            >
              <Share2 size={14} />
            </button>

            <button
              type="button"
              onClick={() => setInCall(false)}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-rose-900/40 cursor-pointer"
            >
              <PhoneOff size={13} /> End Huddle
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setInCall(true)}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-900/40 cursor-pointer"
          >
            <PhoneCall size={13} /> Start New Call
          </button>
        )}
      </div>
      </div>
    </div>
  );
}
