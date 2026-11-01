/**
 * CallsProductDemo.jsx
 * Production-grade Calls & Huddles preview for /products/calls
 * Features:
 * - 2x2 grid of participant tiles with live speaking indicators (pulsing audio ring)
 * - Interactive toolbar: Mute, Video toggle, Screen Share, End Call
 * - Clicking "End Call" transitions to an AI Huddle Summary screen showing auto-transcribed
 *   action items with Typewriter text animation and synced team tasks!
 * - Toggle back to "Rejoin Call" anytime
 */
import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, PhoneOff, PhoneCall, Sparkles, CheckSquare, Share2, Users } from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import TypewriterText from '../../components/product/TypewriterText';
import { CALLS_DATA } from '../../data/productPageData';

export default function CallsProductDemo() {
  const reduceMotion = useReducedMotion();
  const [inCall, setInCall] = useState(true);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState(1);

  return (
    <div className="flex flex-col h-full w-full bg-[#07090E] text-slate-100 select-none overflow-hidden relative">
      {/* Top Bar */}
      <div className="h-10 shrink-0 border-b border-white/[0.08] flex items-center justify-between px-4 bg-[#0B0F19]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-200">Engineering Sync · Audio Huddle</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400 bg-white/[0.05] px-2 py-0.5 rounded border border-white/[0.08]">
            {inCall ? '14:28' : 'Call ended'}
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
              className="grid grid-cols-2 gap-2.5 h-full max-h-[300px]"
            >
              {CALLS_DATA.participants.map((p) => {
                const isSpeaking = p.id === activeSpeaker;
                const isUser = p.id === 2; // Sam/You
                return (
                  <div
                    key={p.id}
                    onClick={() => setActiveSpeaker(p.id)}
                    className={`relative rounded-xl border p-3 flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSpeaking
                        ? 'border-emerald-500/50 bg-[#0F172A] shadow-[0_0_20px_rgba(16,185,129,0.12)]'
                        : 'border-white/[0.06] bg-[#0B0F19] hover:border-white/[0.12]'
                    }`}
                  >
                    {/* Speaking pulse ring */}
                    <div className="relative">
                      {isSpeaking && !reduceMotion && (
                        <span className="absolute -inset-1.5 rounded-full border border-emerald-400/60 animate-ping opacity-40" />
                      )}
                      <AvatarChip
                        person={p.person}
                        size="lg"
                        className={isSpeaking ? 'ring-2 ring-emerald-400' : ''}
                      />
                    </div>

                    <div className="mt-2 text-center">
                      <span className="text-xs font-semibold text-slate-200 block truncate max-w-[110px]">
                        {p.person.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {isSpeaking ? (
                          <span className="text-emerald-400 flex items-center justify-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Speaking...
                          </span>
                        ) : (
                          p.person.role
                        )}
                      </span>
                    </div>

                    {/* Status icons inside tile */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-slate-400">
                      {isUser && muted ? (
                        <MicOff size={12} className="text-rose-400" />
                      ) : p.muted ? (
                        <MicOff size={12} className="text-slate-500" />
                      ) : (
                        <Mic size={12} className="text-emerald-400" />
                      )}
                    </div>
                  </div>
                );
              })}
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
                <span className="text-slate-400">All attendees notified in #engineering</span>
                <button
                  onClick={() => setInCall(true)}
                  className="px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-1.5"
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
              onClick={() => setMuted((m) => !m)}
              className={`p-2 rounded-xl border text-xs font-medium transition-colors ${
                muted
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : 'bg-white/[0.06] border-white/[0.1] text-slate-200 hover:bg-white/[0.1]'
              }`}
              title={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <MicOff size={15} /> : <Mic size={15} />}
            </button>

            <button
              onClick={() => setCameraOff((c) => !c)}
              className={`p-2 rounded-xl border text-xs font-medium transition-colors ${
                cameraOff
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : 'bg-white/[0.06] border-white/[0.1] text-slate-200 hover:bg-white/[0.1]'
              }`}
              title={cameraOff ? 'Turn on video' : 'Turn off video'}
            >
              {cameraOff ? <VideoOff size={15} /> : <Video size={15} />}
            </button>

            <button
              className="p-2 rounded-xl border border-white/[0.1] bg-white/[0.06] text-slate-200 hover:bg-white/[0.1] text-xs font-medium transition-colors"
              title="Share screen"
            >
              <Share2 size={15} />
            </button>

            <button
              onClick={() => setInCall(false)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-rose-900/40 cursor-pointer"
            >
              <PhoneOff size={14} /> End Huddle
            </button>
          </>
        ) : (
          <button
            onClick={() => setInCall(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-900/40 cursor-pointer"
          >
            <PhoneCall size={14} /> Start New Call
          </button>
        )}
      </div>
    </div>
  );
}
