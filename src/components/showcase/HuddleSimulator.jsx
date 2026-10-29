import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';
import { cn } from '../../lib/cn';

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

  const [waveHeights, setWaveHeights] = useState([12, 24, 18, 30, 20, 16, 26]);
  const [speechPromptIdx, setSpeechPromptIdx] = useState(0);

  const speechScenarios = [
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

  // Dynamic audio waveform simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveHeights((prev) =>
        prev.map(() => (huddleMuted ? 4 : Math.floor(Math.random() * 26) + 8))
      );
    }, 200);
    return () => clearInterval(interval);
  }, [huddleMuted]);

  const handleSimulateNextSpeech = () => {
    const scenario = speechScenarios[speechPromptIdx % speechScenarios.length];
    simulateHuddleUtterance(scenario.speaker, scenario.text);
    setSpeechPromptIdx((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col h-full bg-obsidian-base text-slate-200">
      {/* Sample Huddle room bar */}
      <div className="h-12 px-4 border-b border-obsidian-border bg-obsidian-surface/90 flex items-center justify-between select-none">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="font-semibold text-xs text-white">Live Huddle: #architecture-rfc</span>
          <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-obsidian-border-soft">
            08:24
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-indigo-300 bg-indigo-500/15 border border-indigo-500/25 px-2 py-0.5 rounded">
            <Wifi className="w-3 h-3 text-indigo-400" />
            Sample Huddle · Launch team
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 rounded">
            Call in progress
          </span>
          <span className="text-xs text-slate-400 font-medium">4 Participants</span>
        </div>
      </div>

      {/* Main Workspace: Split into Speaker Stage + Live Transcript */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-y-auto">
        {/* Left Column: Participant Voice Visualizer OR Screen Share Terminal */}
        <div className="flex flex-col justify-between space-y-4">
          {huddleScreenShareActive ? (
            /* Sample screen-share preview */
            <div className="h-[290px] rounded-xl border border-indigo-500/40 bg-[#060810] p-3 font-mono text-xs flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-obsidian-border pb-2">
                <div className="flex items-center gap-2 text-indigo-300 text-[11px]">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Sara Chen's screen · Launch checklist</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  LIVE 1080p 60fps
                </span>
              </div>

              <div className="space-y-1 text-[11px] text-slate-300 overflow-y-auto py-2 leading-relaxed">
                <p className="text-slate-500">Launch checklist · Sample workspace</p>
                <p className="text-emerald-400">✓ Token refresh update linked to PR #1042</p>
                <p className="text-emerald-400">✓ Rollout checks added to the handoff</p>
                <p className="text-indigo-300">Owner: Sara Chen</p>
                <p className="text-indigo-300">Next step: review the canary plan</p>
                <p className="text-emerald-300 font-semibold pt-1">Ready for team review</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-obsidian-border text-[10px] text-slate-400">
                <span>Shared screen · Sample preview</span>
                <button
                  onClick={() => setHuddleScreenShareActive(false)}
                  className="text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
                >
                  Exit Screen Share View
                </button>
              </div>
            </div>
          ) : (
            /* Standard Grid Dock: Multi-Participant SFU Voice Stage */
            <div className="grid grid-cols-2 gap-3">
              {/* Active Speaker: Sara Chen */}
              <div
                onClick={() => setSelectedSpeakerTrack('Sara Chen')}
                className="relative p-3.5 rounded-xl border border-emerald-500/50 bg-obsidian-surface/90 shadow-lg shadow-emerald-500/10 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-emerald-400"
              >
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  SPEAKING
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-bold text-base text-white mb-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] ring-4 ring-emerald-500/20">
                  SC
                </div>
                <div className="font-semibold text-xs text-white">Sara Chen</div>
                <div className="text-[10px] text-slate-400">Principal Infra Engineer</div>

                {/* Real-time Voice Waveform Animation */}
                <div className="flex items-center gap-1 mt-2.5 h-7">
                  {waveHeights.map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}px` }}
                      className="w-1 bg-emerald-400 rounded-full transition-all duration-150"
                    />
                  ))}
                </div>
              </div>

              {/* Participant 2: Alex Mercer */}
              <div
                onClick={() => setSelectedSpeakerTrack('Alex Mercer')}
                className="p-3.5 rounded-xl border border-obsidian-border bg-obsidian-surface/60 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-white/16"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center font-bold text-base text-white mb-2 shadow-sm">
                  AM
                </div>
                <div className="font-semibold text-xs text-white">Alex Mercer</div>
                <div className="text-[10px] text-slate-400">CTO · Staff Architect</div>
                <div className="mt-2.5 px-2 py-0.5 rounded text-[9px] font-mono text-slate-400 bg-white/5">
                  Listening · Sample preview
                </div>
              </div>

              {/* Participant 3: Marcus Lindqvist */}
              <div
                onClick={() => setSelectedSpeakerTrack('Marcus Lindqvist')}
                className="p-3.5 rounded-xl border border-obsidian-border bg-obsidian-surface/60 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-white/16"
              >
                <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center font-bold text-base text-white mb-2 shadow-sm">
                  ML
                </div>
                <div className="font-semibold text-xs text-white">Marcus Lindqvist</div>
                <div className="text-[10px] text-slate-400">VP of Engineering</div>
                <div className="mt-2.5 px-2 py-0.5 rounded text-[9px] font-mono text-slate-400 bg-white/5">
                  Listening · Sample preview
                </div>
              </div>

              {/* Participant 4: Ukin AI Listener Daemon */}
              <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-obsidian-surface/80 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-base text-white mb-2 shadow-lg shadow-indigo-500/20">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="font-semibold text-xs text-white">Ukin AI Scribe</div>
                <div className="text-[10px] text-indigo-300">Streaming STT & Synthesis</div>
                <div className="mt-2.5 px-2 py-0.5 rounded text-[9px] font-mono text-indigo-300 bg-indigo-500/15 border border-indigo-500/20">
                  Notes in progress
                </div>
              </div>
            </div>
          )}

          {/* Action Trigger Card & Simulation Controls */}
          <div className="p-4 rounded-xl border border-indigo-500/30 bg-obsidian-surface/90 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Huddle follow-up suggestion
              </span>
              <span className="text-[10px] font-mono text-slate-400">CONFIDENCE: 98.4%</span>
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
              <span className="text-[10px] text-slate-400 font-mono">Add a sample participant note:</span>
              <button
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
              Huddle notes · Sample preview
            </span>
            <span className="text-[10px] font-mono text-slate-400">Updates as the discussion continues</span>
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
                        Notes active
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
              <span className="text-[11px] font-mono text-slate-300">Huddle sample connected</span>
            </div>

            <button
              onClick={() => setActiveModule('docs')}
              className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" /> Jump to Living Doc RFC →
            </button>
          </div>
        </div>
      </div>

      {/* Call Control Strip */}
      <div className="h-14 px-6 border-t border-obsidian-border bg-obsidian-surface/90 flex items-center justify-center gap-3">
        <button
          onClick={() => {
            setHuddleMuted(!huddleMuted);
            addToast('Microphone Toggled', huddleMuted ? 'Unmuted. WebAudio pipeline streaming.' : 'Muted local track.', 'info');
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
          onClick={() => {
            setHuddleScreenShareActive(!huddleScreenShareActive);
            addToast(
              'Screen share preview',
              huddleScreenShareActive ? 'Closed the sample presentation.' : 'Opened the sample presentation for Huddle participants.',
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
          <span>{huddleScreenShareActive ? 'Stop Sharing' : 'Share Screen'}</span>
        </button>

        <button
          onClick={() => {
            setActiveModule('chat');
            addToast('Huddle Session Paused', 'Left audio chamber. Meeting transcript preserved in #architecture-rfc.', 'info');
          }}
          className="p-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-rose-600/25 transition-all cursor-pointer"
        >
          <PhoneOff className="w-4 h-4" />
          <span>Leave Huddle</span>
        </button>
      </div>
    </div>
  );
}
