import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Mic,
  MicOff,
  PhoneOff,
  Share2,
  Sparkles,
  Bot,
  CheckCircle2,
  Radio,
  FileText,
  CheckSquare,
  Activity,
  Terminal,
  Wifi,
  Video,
  VideoOff,
  Hand,
  Volume2,
  Zap,
} from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';
import { cn } from '../../lib/cn';

const SPEECH_SCENARIOS = [
  {
    speaker: 'Sara Chen',
    role: 'Principal Infra Lead',
    text: 'The token refresh update is verified in PR #1042. I have added the canary rollout checks to our launch checklist.',
    actionItem: 'Rollout checks added to launch checklist',
    confidence: '99.2%',
  },
  {
    speaker: 'Marcus Lindqvist',
    role: 'VP of Engineering',
    text: 'On-call rotation is updated for EU-04. Moving Task #4082 to Done on the Sprint 24 Kanban board.',
    actionItem: 'Sprint 24 Task #4082 moved to Done',
    confidence: '98.7%',
  },
  {
    speaker: 'Alex Mercer',
    role: 'CTO · Staff Architect',
    text: 'Let us commit the Redis Sentinel quorum = 2 post-mortem rule into the Living RFC doc for executive sign-off.',
    actionItem: 'Living RFC node #4 sign-off ready',
    confidence: '99.5%',
  },
];

const PARTICIPANTS = [
  {
    id: 'sara',
    name: 'Sara Chen',
    role: 'Principal Infra Engineer',
    initials: 'SC',
    color: 'from-emerald-600 via-teal-600 to-emerald-500',
    speaking: true,
    muted: false,
    cursorColor: '#10b981',
  },
  {
    id: 'alex',
    name: 'Alex Mercer',
    role: 'CTO · Staff Architect',
    initials: 'AM',
    color: 'from-indigo-600 via-blue-600 to-indigo-500',
    speaking: false,
    muted: true,
    cursorColor: '#6366f1',
  },
  {
    id: 'marcus',
    name: 'Marcus Lindqvist',
    role: 'VP of Engineering',
    initials: 'ML',
    color: 'from-violet-600 via-purple-600 to-fuchsia-500',
    speaking: false,
    muted: true,
    cursorColor: '#8b5cf6',
  },
  {
    id: 'ukin',
    name: 'Ukin AI Scribe',
    role: 'Autonomous Huddle Observer',
    initials: 'UK',
    color: 'from-cyan-500 via-indigo-600 to-violet-600',
    isAgent: true,
    speaking: false,
    muted: false,
    cursorColor: '#06b6d4',
  },
];

const HUDDLE_REACTIONS = ['👏', '👍', '🚀', '💡', '🔥'];

/* ─── Procedural Harmonic Audio Equalizer Component ─── */
function StudioAudioWaveform({ isSpeaking, isMuted, reduceMotion }) {
  if (isMuted || !isSpeaking) {
    return (
      <div className="flex items-center justify-center gap-0.5 h-5 px-2 rounded-full bg-white/[0.04] border border-white/[0.06]">
        {[3, 3, 3, 3, 3, 3, 3].map((h, i) => (
          <span key={i} style={{ height: `${h}px` }} className="w-0.5 rounded-full bg-slate-600" />
        ))}
      </div>
    );
  }

  if (reduceMotion) {
    return (
      <div className="flex items-center justify-center gap-0.5 h-5 px-2 rounded-full bg-emerald-500/15 border border-emerald-500/30">
        {[8, 14, 18, 22, 18, 14, 8].map((h, i) => (
          <span key={i} style={{ height: `${h * 0.7}px` }} className="w-0.5 rounded-full bg-emerald-400" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-0.5 h-5 px-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
      {[10, 18, 24, 28, 24, 18, 10].map((peak, idx) => (
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

export default function HuddleSimulator() {
  const reduceMotion = useReducedMotion();
  const {
    huddleMuted,
    setHuddleMuted,
    huddleScreenShareActive,
    setHuddleScreenShareActive,
    huddleTranscript,
    huddleTaskSynced,
    huddleDocSynced,
    syncHuddleCommitment,
    simulateHuddleUtterance,
    synthesizeHuddleToDoc,
    setActiveModule,
    addToast,
  } = useWorkspace();

  const [speechPromptIdx, setSpeechPromptIdx] = useState(0);
  const [activeSpeaker, setActiveSpeaker] = useState('Sara Chen');
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [floatingReactions, setFloatingReactions] = useState([]);
  const [callSeconds, setCallSeconds] = useState(504); // 08:24
  const reactionIdRef = useRef(0);

  // Live timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCallSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedCallTime = `${String(Math.floor(callSeconds / 60)).padStart(2, '0')}:${String(
    callSeconds % 60,
  ).padStart(2, '0')}`;

  // Keyboard shortcut listener for power-user SaaS speed (M, V, S, H)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setHuddleMuted((m) => {
          const next = !m;
          addToast('Microphone', next ? 'Muted local microphone' : 'Unmuted. Voice streaming', 'info');
          return next;
        });
      } else if (e.key === 'v' || e.key === 'V') {
        e.preventDefault();
        setCameraEnabled((c) => {
          const next = !c;
          addToast('Camera', next ? 'HD 1080p camera feed enabled' : 'Camera off (Avatar mode)', 'info');
          return next;
        });
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        setHuddleScreenShareActive((s) => !s);
      } else if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        setHandRaised((h) => {
          const next = !h;
          if (next) handleReaction('✋');
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addToast, setHuddleMuted, setHuddleScreenShareActive]);

  const handleSimulateNextSpeech = () => {
    const scenario = SPEECH_SCENARIOS[speechPromptIdx % SPEECH_SCENARIOS.length];
    simulateHuddleUtterance(scenario.speaker, scenario.text);
    setActiveSpeaker(scenario.speaker);
    setSpeechPromptIdx((prev) => prev + 1);
  };

  const handleReaction = (emoji) => {
    reactionIdRef.current += 1;
    const newId = reactionIdRef.current;
    // Anchor reaction position randomly across upper stage
    const randX = 35 + Math.random() * 30; // 35% - 65% width
    setFloatingReactions((prev) => [...prev, { id: newId, emoji, left: randX }]);
    addToast('Huddle Reaction', `Sent ${emoji} to room participants`, 'info');
    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== newId));
    }, 2200);
  };

  const toggleHandRaise = () => {
    const nextState = !handRaised;
    setHandRaised(nextState);
    if (nextState) {
      handleReaction('✋');
      addToast('Hand Raised', 'Sara Chen raised her hand to speak.', 'info');
    }
  };

  const currentScenario = SPEECH_SCENARIOS[(speechPromptIdx + SPEECH_SCENARIOS.length - 1) % SPEECH_SCENARIOS.length];

  return (
    <div className="flex flex-col h-full bg-[#07090E] text-slate-200 relative overflow-hidden select-none font-sans">
      {/* ── Top Huddle Room Master Header ── */}
      <div className="h-12 px-4 border-b border-white/[0.08] bg-[#0B0F19]/90 backdrop-blur-md flex items-center justify-between select-none relative z-20">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </span>
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold text-xs text-white truncate">Live Huddle: #architecture-rfc</span>
            <span className="text-[10px] text-slate-500">·</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 tabular-nums">
              {formattedCallTime}
            </span>
          </div>
          <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono text-indigo-300 bg-indigo-500/15 border border-indigo-500/25 px-2 py-0.5 rounded">
            <Wifi className="w-3 h-3 text-indigo-400" />
            Opus 48kHz HD
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {handRaised && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded animate-pulse">
              <Hand className="w-3 h-3 text-amber-400" /> 1 Hand Raised
            </span>
          )}
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded">
            E2EE 256-bit
          </span>
          <div className="flex items-center gap-1.5 pl-2 border-l border-white/[0.08]">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-300 font-medium">4 in room</span>
          </div>
        </div>
      </div>

      {/* ── Main Dynamic Stage (Split View: Collaborative Stage + Live Transcription Engine) ── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3.5 p-3.5 overflow-y-auto relative">
        {/* Left Column (7 cols): Stage View (SFU Audio Tiles + Live Workspace RFC Canvas) */}
        <div className="lg:col-span-7 flex flex-col gap-3 min-h-0">
          {/* 1. Multi-Participant Voice Stage (SFU Voice Tiles) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 relative">
            {PARTICIPANTS.map((participant) => {
              const isCurrentActive = activeSpeaker === participant.name;
              const isSaraMuted = participant.name === 'Sara Chen' && huddleMuted;
              const isSpeakingNow = isCurrentActive && !isSaraMuted;

              return (
                <button
                  key={participant.id}
                  type="button"
                  onClick={() => {
                    setActiveSpeaker(participant.name);
                    addToast('Focused Speaker', `Focused audio on ${participant.name}`, 'info');
                  }}
                  className={cn(
                    'relative p-2.5 rounded-xl border transition-all duration-200 flex flex-col items-center justify-between text-center cursor-pointer group',
                    isSpeakingNow
                      ? 'border-emerald-500/60 bg-[#0F172A]/95 shadow-[0_0_24px_rgba(16,185,129,0.18)] ring-1 ring-emerald-500/40'
                      : 'border-white/[0.06] bg-[#0B0F19]/70 hover:border-white/[0.14] hover:bg-[#0F172A]/50',
                  )}
                >
                  {/* Speaking Radiant Wave Pulse */}
                  {isSpeakingNow && !reduceMotion && (
                    <span className="pointer-events-none absolute -inset-1 rounded-2xl border border-emerald-400/40 animate-ping opacity-30" />
                  )}

                  {/* Corner Status Badges */}
                  <div className="w-full flex items-center justify-between mb-1.5 text-[9px] font-mono">
                    <span
                      className={cn(
                        'px-1.5 py-0.2 rounded-full flex items-center gap-1',
                        isSpeakingNow
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'text-slate-500 bg-white/[0.03]',
                      )}
                    >
                      {isSpeakingNow && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                      {isSpeakingNow ? 'SPEAKING' : participant.isAgent ? 'AI SCRIBE' : 'IDLE'}
                    </span>

                    <span className="text-slate-400">
                      {participant.muted || isSaraMuted ? (
                        <MicOff className="w-2.5 h-2.5 text-rose-400/80" />
                      ) : (
                        <Mic className="w-2.5 h-2.5 text-emerald-400/80" />
                      )}
                    </span>
                  </div>

                  {/* Avatar Chassis with Specular Halo */}
                  <div className="relative my-1">
                    <div
                      className={cn(
                        'w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-xs text-white shadow-md bg-gradient-to-tr transition-transform duration-200',
                        participant.color,
                        isSpeakingNow && 'scale-105 shadow-[0_0_16px_rgba(16,185,129,0.4)]',
                      )}
                    >
                      {participant.isAgent ? (
                        <Bot className="w-5 h-5 text-white animate-pulse" />
                      ) : (
                        participant.initials
                      )}
                    </div>

                    {/* Microphone status pill */}
                    <span
                      className={cn(
                        'absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#07090E] text-[8px]',
                        isSpeakingNow
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : participant.muted || isSaraMuted
                          ? 'bg-rose-500/90 text-white'
                          : 'bg-slate-700 text-slate-300',
                      )}
                    >
                      {isSpeakingNow ? (
                        <Volume2 className="h-2.5 w-2.5" />
                      ) : participant.muted || isSaraMuted ? (
                        <MicOff className="h-2.5 w-2.5" />
                      ) : (
                        <Mic className="h-2.5 w-2.5 opacity-60" />
                      )}
                    </span>
                  </div>

                  {/* Participant Name & Role */}
                  <div className="w-full mt-1">
                    <span className="font-semibold text-[11px] text-white block truncate">
                      {participant.name}
                    </span>
                    <span className="text-[9px] text-slate-400 block truncate font-mono">
                      {participant.role.split('·')[0]}
                    </span>
                  </div>

                  {/* Live Procedural Audio Equalizer */}
                  <div className="mt-2 w-full flex items-center justify-center">
                    <StudioAudioWaveform
                      isSpeaking={isSpeakingNow}
                      isMuted={participant.muted || isSaraMuted}
                      reduceMotion={reduceMotion}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* 2. Interactive Collaborative Workspace Canvas (Canary RFC & Code Artifact) */}
          <div className="flex-1 min-h-[220px] rounded-xl border border-white/[0.08] bg-[#060810] p-3.5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Artifact Top Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-semibold text-[11px] text-white">
                  Shared Canary RFC · PR #1042 Rollout Sequence
                </span>
                <span className="text-[9px] font-mono text-emerald-300 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                  EU-04 LIVE
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-mono text-slate-400">Collaborative Mode</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* Living Document Content with Live Multiplayer Cursors */}
            <div className="relative py-2.5 space-y-2 text-[11px] font-mono text-slate-300">
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04] space-y-1">
                <div className="text-slate-400 flex items-center justify-between">
                  <span># Canary Rollout Checklist · Target Pods: 24/24</span>
                  <span className="text-emerald-400">100% Canary Healthy</span>
                </div>
                <div className="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Token refresh TTL updated to 3600s in Redis Sentinel</span>
                </div>
                <div className="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>PR #1042 automated integration suite passed (14/14 checks)</span>
                </div>
                <div className="text-indigo-300 flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-indigo-400 animate-pulse" />
                  <span>Rollout checks verified by Sara Chen & Alex Mercer</span>
                </div>
              </div>

              {/* Floating Multiplayer Cursor 1 (Sara Chen - Infra) */}
              <motion.div
                className="absolute pointer-events-none z-10 flex items-center gap-1"
                animate={
                  reduceMotion
                    ? { left: '42%', top: '35%' }
                    : {
                        left: ['38%', '46%', '40%', '38%'],
                        top: ['30%', '38%', '34%', '30%'],
                      }
                }
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 drop-shadow" viewBox="0 0 24 24">
                  <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z" />
                </svg>
                <span className="text-[9px] font-sans font-semibold bg-emerald-500/90 text-white px-1.5 py-0.5 rounded shadow-sm">
                  Sara Chen
                </span>
              </motion.div>

              {/* Floating Multiplayer Cursor 2 (Alex Mercer - CTO) */}
              <motion.div
                className="absolute pointer-events-none z-10 flex items-center gap-1"
                animate={
                  reduceMotion
                    ? { left: '72%', top: '65%' }
                    : {
                        left: ['75%', '68%', '74%', '75%'],
                        top: ['62%', '70%', '64%', '62%'],
                      }
                }
                transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <svg className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400 drop-shadow" viewBox="0 0 24 24">
                  <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z" />
                </svg>
                <span className="text-[9px] font-sans font-semibold bg-indigo-500/90 text-white px-1.5 py-0.5 rounded shadow-sm">
                  Alex Mercer
                </span>
              </motion.div>
            </div>

            {/* Bottom Status & Screen Share Mode */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[10px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Synced with Space #architecture-rfc
              </span>
              <button
                type="button"
                onClick={() => setHuddleScreenShareActive(!huddleScreenShareActive)}
                className="text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
              >
                {huddleScreenShareActive ? 'Close Presentation Mode' : 'Present Screen to Room'}
              </button>
            </div>
          </div>

          {/* 3. Ukin Autonomous Commitment Synthesis Card */}
          <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-[#0F172A]/90 shadow-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                Ukin AI Synthesis · Spoken Commitment Detected
              </span>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                CONFIDENCE: {currentScenario?.confidence || '99.2%'}
              </span>
            </div>

            <p className="text-xs text-white font-medium italic">
              "{currentScenario?.text || 'Review the launch checklist and share the rollout notes with the team'}"
            </p>

            {/* 1-Click Action Buttons to Workspace Surfaces */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
              {huddleTaskSynced ? (
                <div className="py-2 px-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Synced to Sprint 24 Board
                </div>
              ) : (
                <button
                  type="button"
                  onClick={syncHuddleCommitment}
                  className="py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-500/25 cursor-pointer"
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  1-Click Sync to Kanban
                </button>
              )}

              {huddleDocSynced ? (
                <div className="py-2 px-3 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Decision Injected in Living Doc
                </div>
              ) : (
                <button
                  type="button"
                  onClick={synthesizeHuddleToDoc}
                  className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/[0.1] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  Synthesize into Living RFC
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Automated Live STT Transcription Stream */}
        <div className="lg:col-span-5 flex flex-col h-full rounded-xl border border-white/[0.08] bg-[#0B0F19] overflow-hidden shadow-2xl min-h-[360px]">
          {/* Header */}
          <div className="p-3 border-b border-white/[0.08] bg-[#0F172A]/70 flex items-center justify-between">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Live Huddle Transcript
            </span>
            <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.08]">
              Whisper v3 · 48kHz
            </span>
          </div>

          {/* Transcript Message Feed */}
          <div className="flex-1 p-3 space-y-2.5 overflow-y-auto text-xs">
            {huddleTranscript.map((t) => (
              <div
                key={t.id}
                className={cn(
                  'p-2.5 rounded-lg border transition-all',
                  t.isAgent
                    ? 'bg-indigo-500/10 border-indigo-500/30'
                    : 'bg-[#0F172A]/50 border-white/[0.06]',
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-semibold text-white truncate">{t.speaker}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({t.role})</span>
                    {!t.isAgent && (
                      <span className="text-[8.5px] font-mono text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded border border-emerald-500/20">
                        Speaker
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">{t.time}</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11.5px]">{t.text}</p>
              </div>
            ))}
          </div>

          {/* Next Utterance Simulator & RFC Continuity */}
          <div className="p-3 border-t border-white/[0.08] bg-[#0F172A]/40 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400 font-mono">Simulate speech cadence:</span>
              <button
                type="button"
                onClick={handleSimulateNextSpeech}
                className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Activity className="w-3 h-3 animate-pulse" />
                Next Utterance →
              </button>
            </div>

            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
              <span className="text-slate-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Context retained
              </span>
              <button
                type="button"
                onClick={() => setActiveModule('docs')}
                className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer font-medium"
              >
                <FileText className="w-3 h-3" /> Jump to RFC Document →
              </button>
            </div>
          </div>
        </div>

        {/* ── Parabolic Floating Reactions Layer ── */}
        <AnimatePresence>
          {floatingReactions.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -160, scale: 1.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              style={{ left: `${r.left}%`, bottom: '60px' }}
              className="pointer-events-none absolute text-3xl z-40 drop-shadow-xl"
            >
              {r.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Enterprise Call Control Toolbar Dock ── */}
      <div className="h-14 px-4 sm:px-6 border-t border-white/[0.08] bg-[#0B0F19]/95 backdrop-blur-md flex items-center justify-between gap-3 relative z-20">
        {/* Left: Quick In-Call Reaction Emojis & Hand Raise */}
        <div className="hidden sm:flex items-center gap-1">
          {HUDDLE_REACTIONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => handleReaction(emoji)}
              title={`React ${emoji}`}
              className="h-8 w-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.06] text-sm flex items-center justify-center transition-transform hover:scale-115 active:scale-95 cursor-pointer"
            >
              {emoji}
            </button>
          ))}
          <button
            type="button"
            onClick={toggleHandRaise}
            title={handRaised ? 'Lower Hand (H)' : 'Raise Hand (H)'}
            className={cn(
              'h-8 px-2.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer',
              handRaised
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                : 'bg-white/[0.04] border-white/[0.08] text-slate-300 hover:bg-white/[0.08]',
            )}
          >
            <Hand className="w-3.5 h-3.5" />
            <span className="text-[11px] font-semibold">{handRaised ? 'Hand Raised' : 'Raise'}</span>
            <span className="text-[9px] font-mono text-slate-500">(H)</span>
          </button>
        </div>

        {/* Center: Core WebRTC Media Control Dock */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          {/* Mute Button */}
          <button
            type="button"
            onClick={() => {
              const next = !huddleMuted;
              setHuddleMuted(next);
              addToast(
                'Microphone',
                next ? 'Muted local microphone.' : 'Unmuted. Voice streaming.',
                'info',
              );
            }}
            title={huddleMuted ? 'Unmute (M)' : 'Mute (M)'}
            className={cn(
              'p-2 sm:px-3 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold',
              huddleMuted
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.2)]'
                : 'bg-white/[0.06] border-white/[0.1] text-white hover:bg-white/[0.1]',
            )}
          >
            {huddleMuted ? (
              <MicOff className="w-4 h-4 text-rose-400" />
            ) : (
              <Mic className="w-4 h-4 text-emerald-400" />
            )}
            <span className="hidden sm:inline">{huddleMuted ? 'Muted' : 'Mute'}</span>
            <span className="text-[9px] font-mono text-slate-500 hidden sm:inline">(M)</span>
          </button>

          {/* Camera Button */}
          <button
            type="button"
            onClick={() => {
              const next = !cameraEnabled;
              setCameraEnabled(next);
              addToast(
                'Camera',
                next ? 'Camera video feed enabled (HD 1080p).' : 'Camera disabled (Voice avatar mode).',
                'info',
              );
            }}
            title={cameraEnabled ? 'Turn off video (V)' : 'Turn on video (V)'}
            className={cn(
              'p-2 sm:px-3 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold',
              cameraEnabled
                ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.25)]'
                : 'bg-white/[0.06] border-white/[0.1] text-white hover:bg-white/[0.1]',
            )}
          >
            {cameraEnabled ? (
              <Video className="w-4 h-4 text-indigo-400" />
            ) : (
              <VideoOff className="w-4 h-4 text-slate-400" />
            )}
            <span className="hidden sm:inline">{cameraEnabled ? 'Video On' : 'Video'}</span>
            <span className="text-[9px] font-mono text-slate-500 hidden sm:inline">(V)</span>
          </button>

          {/* Screen Share Button */}
          <button
            type="button"
            onClick={() => {
              const next = !huddleScreenShareActive;
              setHuddleScreenShareActive(next);
              addToast(
                'Screen Share',
                next ? 'Presenting screen to room.' : 'Stopped presentation.',
                'info',
              );
            }}
            title={huddleScreenShareActive ? 'Stop sharing screen (S)' : 'Share screen (S)'}
            className={cn(
              'p-2 sm:px-3 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold',
              huddleScreenShareActive
                ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.25)]'
                : 'bg-white/[0.06] border-white/[0.1] text-white hover:bg-white/[0.1]',
            )}
          >
            <Share2 className="w-4 h-4 text-slate-300" />
            <span className="hidden sm:inline">{huddleScreenShareActive ? 'Stop Sharing' : 'Share'}</span>
            <span className="text-[9px] font-mono text-slate-500 hidden sm:inline">(S)</span>
          </button>

          {/* Leave Call Button */}
          <button
            type="button"
            onClick={() => {
              setActiveModule('chat');
              addToast(
                'Huddle Concluded',
                'Left session. Full meeting transcript linked in #architecture-rfc.',
                'info',
              );
            }}
            className="p-2 sm:px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-rose-600/30 transition-all cursor-pointer"
          >
            <PhoneOff className="w-4 h-4" />
            <span>Leave</span>
          </button>
        </div>
      </div>
    </div>
  );
}
