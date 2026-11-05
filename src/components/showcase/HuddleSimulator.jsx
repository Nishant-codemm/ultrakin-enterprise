import React, { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';
import { cn } from '../../lib/cn';

const SPEECH_SCENARIOS = [
  {
    speaker: 'Sara Chen',
    role: 'Infra Lead',
    text: 'The token refresh update is in PR #1042. Let’s add the rollout checks to the launch checklist.',
  },
  {
    speaker: 'Marcus Lindqvist',
    role: 'VP Eng',
    text: 'Confirmed on-call rotation updated. Moving Task #4082 to Done in Sprint 24 Kanban board.',
  },
  {
    speaker: 'Alex Mercer',
    role: 'CTO',
    text: 'Let us commit the post-mortem summary into the Cluster Migration RFC living doc for executive sign-off.',
  },
];

const PARTICIPANTS = [
  {
    id: 'sara',
    name: 'Sara Chen',
    role: 'Principal Infra Engineer',
    initials: 'SC',
    color: 'from-emerald-600 to-teal-500',
    speaking: true,
    muted: false,
  },
  {
    id: 'alex',
    name: 'Alex Mercer',
    role: 'CTO · Staff Architect',
    initials: 'AM',
    color: 'from-indigo-600 to-blue-500',
    speaking: false,
    muted: true,
  },
  {
    id: 'marcus',
    name: 'Marcus Lindqvist',
    role: 'VP of Engineering',
    initials: 'ML',
    color: 'from-violet-600 to-purple-500',
    speaking: false,
    muted: true,
  },
  {
    id: 'ukin',
    name: 'Ukin AI Scribe',
    role: 'Autonomous Huddle Observer',
    initials: 'UK',
    color: 'from-indigo-500 to-violet-500',
    isAgent: true,
    speaking: false,
    muted: false,
  },
];

const HUDDLE_REACTIONS = ['👏', '👍', '🚀', '💡', '✋'];

export default function HuddleSimulator() {
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

  const [waveHeights, setWaveHeights] = useState([8, 14, 22, 28, 20, 16, 24, 12, 6]);
  const [speechPromptIdx, setSpeechPromptIdx] = useState(0);
  const [activeSpeaker, setActiveSpeaker] = useState('Sara Chen');
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [floatingReactions, setFloatingReactions] = useState([]);
  const [callSeconds, setCallSeconds] = useState(504); // 08:24 baseline
  const reactionIdRef = useRef(0);

  // Natural call duration timer (increments every second)
  useEffect(() => {
    const timer = setInterval(() => {
      setCallSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedCallTime = `${String(Math.floor(callSeconds / 60)).padStart(2, '0')}:${String(
    callSeconds % 60
  ).padStart(2, '0')}`;

  // Symmetrical natural audio waveform simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveHeights(() => {
        if (huddleMuted && activeSpeaker === 'Sara Chen') {
          return [3, 3, 3, 3, 3, 3, 3, 3, 3];
        }
        return [
          Math.floor(Math.random() * 8) + 6,
          Math.floor(Math.random() * 12) + 10,
          Math.floor(Math.random() * 18) + 14,
          Math.floor(Math.random() * 22) + 18,
          Math.floor(Math.random() * 26) + 20,
          Math.floor(Math.random() * 22) + 18,
          Math.floor(Math.random() * 18) + 14,
          Math.floor(Math.random() * 12) + 10,
          Math.floor(Math.random() * 8) + 6,
        ];
      });
    }, 160);
    return () => clearInterval(interval);
  }, [huddleMuted, activeSpeaker]);

  const handleSimulateNextSpeech = () => {
    const scenario = SPEECH_SCENARIOS[speechPromptIdx % SPEECH_SCENARIOS.length];
    simulateHuddleUtterance(scenario.speaker, scenario.text);
    setActiveSpeaker(scenario.speaker);
    setSpeechPromptIdx((prev) => prev + 1);
  };

  const handleReaction = (emoji) => {
    reactionIdRef.current += 1;
    const newId = reactionIdRef.current;
    setFloatingReactions((prev) => [...prev, { id: newId, emoji }]);
    addToast('Huddle Reaction', `Sent ${emoji} to call participants`, 'info');
    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== newId));
    }, 1800);
  };

  const toggleHandRaise = () => {
    const nextState = !handRaised;
    setHandRaised(nextState);
    if (nextState) {
      handleReaction('✋');
      addToast('Hand Raised', 'Sara Chen raised her hand to speak.', 'info');
    }
  };

  return (
    <div className="flex flex-col h-full bg-obsidian-base text-slate-200 relative overflow-hidden select-none">
      {/* Sample Huddle room bar */}
      <div className="h-12 px-4 border-b border-obsidian-border bg-obsidian-surface/90 flex items-center justify-between select-none">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="font-semibold text-xs text-white">Live Huddle: #architecture-rfc</span>
          <span className="text-[10px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-obsidian-border-soft">
            {formattedCallTime}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-indigo-300 bg-indigo-500/15 border border-indigo-500/25 px-2 py-0.5 rounded">
            <Wifi className="w-3 h-3 text-indigo-400" />
            Opus 48kHz HD Audio
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 rounded">
            End-to-End Encrypted
          </span>
          <span className="text-xs text-slate-400 font-medium">4 in call</span>
        </div>
      </div>

      {/* Main Workspace: Split into Speaker Stage + Live Transcript */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-y-auto">
        {/* Left Column: Participant Voice Visualizer OR Screen Share Terminal */}
        <div className="flex flex-col justify-between space-y-4">
          {huddleScreenShareActive ? (
            /* Real high-fidelity screen-share preview */
            <div className="h-[290px] rounded-xl border border-indigo-500/40 bg-[#060810] p-3 font-mono text-xs flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-obsidian-border pb-2">
                <div className="flex items-center gap-2 text-indigo-300 text-[11px]">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Sara Chen's screen · Launch checklist &amp; Canary Plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    LIVE 1080p 60fps
                  </span>
                  <span className="text-[10px] text-slate-400">100% Fit</span>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-300 overflow-y-auto py-2 leading-relaxed">
                <p className="text-slate-500"># Canary Verification Sequence — Cluster EU-04</p>
                <p className="text-emerald-400">✓ Token refresh update linked to PR #1042</p>
                <p className="text-emerald-400">✓ Redis Sentinel heartbeat check: OK (latency 1.4ms)</p>
                <p className="text-emerald-400">✓ Rollout checks added to the handoff</p>
                <p className="text-indigo-300">Owner: Sara Chen (Infra Lead)</p>
                <p className="text-indigo-300">Next step: monitor p99 latency in production</p>
                <p className="text-emerald-300 font-semibold pt-1">● 100% Canary traffic healthy</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-obsidian-border text-[10px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  Shared via Screen Capture API
                </span>
                <button
                  type="button"
                  onClick={() => setHuddleScreenShareActive(false)}
                  className="text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
                >
                  Exit Screen Share View
                </button>
              </div>
            </div>
          ) : (
            /* Standard Grid Dock: Multi-Participant SFU Voice Stage */
            <div className="grid grid-cols-2 gap-3 relative">
              {PARTICIPANTS.map((participant) => {
                const isCurrentActive = activeSpeaker === participant.name;
                const isSaraMuted = participant.name === 'Sara Chen' && huddleMuted;

                return (
                  <div
                    key={participant.id}
                    onClick={() => {
                      setActiveSpeaker(participant.name);
                      addToast('Focused Speaker', `Focused on ${participant.name}`, 'info');
                    }}
                    className={cn(
                      'relative p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center text-center',
                      isCurrentActive && !isSaraMuted
                        ? 'border-emerald-500/50 bg-obsidian-surface/95 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                        : 'border-obsidian-border bg-obsidian-surface/60 hover:border-white/16'
                    )}
                  >
                    {/* Live Speaking Pill */}
                    {isCurrentActive && !isSaraMuted ? (
                      <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        SPEAKING
                      </div>
                    ) : (
                      <div className="absolute top-2 right-2 flex items-center text-[9px] font-mono text-slate-500">
                        {participant.muted || isSaraMuted ? (
                          <span className="flex items-center gap-0.5 text-slate-400 bg-white/5 px-1.5 py-0.2 rounded">
                            <MicOff className="w-2.5 h-2.5 text-rose-400/80" /> Muted
                          </span>
                        ) : (
                          <span className="text-slate-400">Idle</span>
                        )}
                      </div>
                    )}

                    {/* Avatar with speaking wave ring */}
                    <div className="relative mb-2">
                      <div
                        className={cn(
                          'w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm text-white shadow-sm bg-gradient-to-tr transition-transform duration-200',
                          participant.color,
                          isCurrentActive && !isSaraMuted && 'ring-4 ring-emerald-500/25 scale-105'
                        )}
                      >
                        {participant.isAgent ? (
                          <Bot className="w-6 h-6 text-white" />
                        ) : (
                          participant.initials
                        )}
                      </div>

                      {/* Micro-mic status badge */}
                      <span
                        className={cn(
                          'absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-obsidian-base text-[8px]',
                          isCurrentActive && !isSaraMuted
                            ? 'bg-emerald-500 text-white shadow-sm'
                            : participant.muted || isSaraMuted
                            ? 'bg-rose-500/80 text-white'
                            : 'bg-slate-700 text-slate-300'
                        )}
                      >
                        {isCurrentActive && !isSaraMuted ? (
                          <Mic className="h-2.5 w-2.5" />
                        ) : participant.muted || isSaraMuted ? (
                          <MicOff className="h-2.5 w-2.5" />
                        ) : (
                          <Mic className="h-2.5 w-2.5 opacity-60" />
                        )}
                      </span>
                    </div>

                    <div className="font-semibold text-xs text-white truncate max-w-[130px]">
                      {participant.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                      {participant.role}
                    </div>

                    {/* Real-time Voice Waveform Animation on active speaker */}
                    <div className="flex items-center justify-center gap-0.5 mt-2.5 h-6 w-full">
                      {isCurrentActive && !isSaraMuted ? (
                        waveHeights.map((h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h}px` }}
                            className="w-0.5 bg-emerald-400 rounded-full transition-all duration-150"
                          />
                        ))
                      ) : (
                        <div className="text-[9px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                          {participant.isAgent ? 'Streaming Scribe' : 'Listening'}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Floating Live Reactions Layer */}
              {floatingReactions.map((r) => (
                <div
                  key={r.id}
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl animate-bounce z-30 drop-shadow-lg"
                >
                  {r.emoji}
                </div>
              ))}
            </div>
          )}

          {/* Action Trigger Card & Simulation Controls */}
          <div className="p-4 rounded-xl border border-indigo-500/30 bg-obsidian-surface/90 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Live Huddle Synthesis · Ukin
              </span>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                CONFIDENCE: 98.4%
              </span>
            </div>

            <p className="text-xs text-white font-medium">
              "Review the launch checklist and share the rollout notes with the team"
            </p>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {huddleTaskSynced ? (
                <div className="py-2 px-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Synced to Kanban
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
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Synthesized in RFC Doc
                </div>
              ) : (
                <button
                  type="button"
                  onClick={synthesizeHuddleToDoc}
                  className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-obsidian-border-medium text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  Synthesize into Living Doc
                </button>
              )}
            </div>

            {/* Live Utterance Simulation Trigger for Demo */}
            <div className="pt-2 border-t border-obsidian-border flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">Simulate active discussion:</span>
              <button
                type="button"
                onClick={handleSimulateNextSpeech}
                className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
              >
                <Activity className="w-3 h-3" />
                Speak Next Utterance →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: WebAudio Streaming Transcription Stream */}
        <div className="flex flex-col h-full rounded-xl border border-obsidian-border bg-obsidian-canvas overflow-hidden">
          <div className="p-3 border-b border-obsidian-border-soft bg-obsidian-surface/50 flex items-center justify-between">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Live Huddle Transcript
            </span>
            <span className="text-[10px] font-mono text-slate-400">Automated STT · Whisper v3</span>
          </div>

          <div className="flex-1 p-3 space-y-3 overflow-y-auto text-xs">
            {huddleTranscript.map((t) => (
              <div
                key={t.id}
                className={cn(
                  'p-3 rounded-lg border transition-all',
                  t.isAgent
                    ? 'bg-indigo-500/10 border-indigo-500/30'
                    : 'bg-obsidian-surface/50 border-obsidian-border-soft'
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{t.speaker}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({t.role})</span>
                    {!t.isAgent && (
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1 rounded">
                        Active speaker
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{t.time}</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[12px]">{t.text}</p>
              </div>
            ))}
          </div>

          {/* Bottom Transcription Pipeline Controls */}
          <div className="p-3 border-t border-obsidian-border-soft bg-obsidian-surface/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-mono text-slate-300">Continuous context retention</span>
            </div>

            <button
              type="button"
              onClick={() => setActiveModule('docs')}
              className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" /> Jump to Living Doc RFC →
            </button>
          </div>
        </div>
      </div>

      {/* Call Control Strip — Real Enterprise Collaboration Bar */}
      <div className="h-14 px-4 sm:px-6 border-t border-obsidian-border bg-obsidian-surface/90 flex items-center justify-between gap-3">
        {/* Left: Quick In-Call Emoji Reactions Bar */}
        <div className="hidden sm:flex items-center gap-1">
          {HUDDLE_REACTIONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => handleReaction(emoji)}
              title={`React ${emoji}`}
              className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 text-sm flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            >
              {emoji}
            </button>
          ))}
          <button
            type="button"
            onClick={toggleHandRaise}
            title={handRaised ? 'Lower Hand' : 'Raise Hand'}
            className={cn(
              'h-8 px-2.5 rounded-lg border text-xs font-medium flex items-center gap-1 transition-all cursor-pointer',
              handRaised
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-white/5 border-obsidian-border-medium text-slate-300 hover:bg-white/10'
            )}
          >
            <Hand className="w-3.5 h-3.5" />
            <span className="text-[11px]">{handRaised ? 'Hand Raised' : 'Raise'}</span>
          </button>
        </div>

        {/* Center: Core Call Controls */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <button
            type="button"
            onClick={() => {
              setHuddleMuted(!huddleMuted);
              addToast(
                'Microphone Toggled',
                huddleMuted ? 'Unmuted. Local microphone streaming.' : 'Muted local microphone.',
                'info'
              );
            }}
            className={cn(
              'p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold',
              huddleMuted
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                : 'bg-white/5 border-obsidian-border-medium text-white hover:bg-white/10'
            )}
          >
            {huddleMuted ? <MicOff className="w-4 h-4 text-rose-400" /> : <Mic className="w-4 h-4 text-emerald-400" />}
            <span>{huddleMuted ? 'Muted' : 'Mute'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCameraEnabled(!cameraEnabled);
              addToast(
                'Camera Toggled',
                !cameraEnabled ? 'Camera video feed enabled (HD 1080p).' : 'Camera disabled (Voice avatar mode).',
                'info'
              );
            }}
            className={cn(
              'p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold',
              cameraEnabled
                ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                : 'bg-white/5 border-obsidian-border-medium text-white hover:bg-white/10'
            )}
          >
            {cameraEnabled ? <Video className="w-4 h-4 text-indigo-400" /> : <VideoOff className="w-4 h-4 text-slate-400" />}
            <span className="hidden sm:inline">{cameraEnabled ? 'Camera On' : 'Camera'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setHuddleScreenShareActive(!huddleScreenShareActive);
              addToast(
                'Screen share preview',
                huddleScreenShareActive
                  ? 'Stopped screen presentation.'
                  : 'Started presenting screen to Huddle.',
                'info'
              );
            }}
            className={cn(
              'p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold',
              huddleScreenShareActive
                ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                : 'bg-white/5 border-obsidian-border-medium text-white hover:bg-white/10'
            )}
          >
            <Share2 className="w-4 h-4 text-slate-300" />
            <span>{huddleScreenShareActive ? 'Stop Sharing' : 'Share'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveModule('chat');
              addToast('Huddle Left', 'Left audio session. Meeting transcript linked in #architecture-rfc.', 'info');
            }}
            className="p-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-rose-600/25 transition-all cursor-pointer"
          >
            <PhoneOff className="w-4 h-4" />
            <span>Leave</span>
          </button>
        </div>
      </div>
    </div>
  );
}
