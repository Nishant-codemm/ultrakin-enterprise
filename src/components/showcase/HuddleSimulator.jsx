import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useWorkspace } from '../../context/useWorkspace';
import { HuddleHeader } from './huddle/HuddleHeader';
import { HuddleParticipantTile } from './huddle/HuddleParticipantTile';
import { HuddleSharedCanvas } from './huddle/HuddleSharedCanvas';
import { HuddleAISynthesisCard } from './huddle/HuddleAISynthesisCard';
import { HuddleTranscriptFeed } from './huddle/HuddleTranscriptFeed';
import { HuddleControlBar } from './huddle/HuddleControlBar';

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
    role: 'Principal Infra Lead',
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
    role: 'Autonomous Observer',
    initials: 'UK',
    color: 'from-cyan-500 via-indigo-600 to-violet-600',
    isAgent: true,
    speaking: false,
    muted: false,
    cursorColor: '#06b6d4',
  },
];

/**
 * HuddleSimulator
 * Enterprise WebRTC Huddle surface demonstrating real-time voice, multiplayer collaboration,
 * and autonomous AI commitment synthesis directly within team workspaces.
 */
function HuddleSimulator() {
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
  const reactionTimersRef = useRef(new Set());

  // Live session timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCallSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cleanup pending reaction timers on unmount
  useEffect(() => {
    const timers = reactionTimersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  const formattedCallTime = `${String(Math.floor(callSeconds / 60)).padStart(2, '0')}:${String(
    callSeconds % 60,
  ).padStart(2, '0')}`;

  const handleReaction = useCallback((emoji) => {
    reactionIdRef.current += 1;
    const newId = reactionIdRef.current;
    // Anchor reactions gracefully to the right margin to never obscure canvas text
    const randRight = 24 + Math.random() * 32;
    setFloatingReactions((prev) => [...prev, { id: newId, emoji, right: randRight }]);
    addToast('Huddle Reaction', `Sent ${emoji} to room participants`, 'info');
    const timer = setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== newId));
      reactionTimersRef.current.delete(timer);
    }, 2200);
    reactionTimersRef.current.add(timer);
  }, [addToast]);

  const toggleHandRaise = useCallback(() => {
    setHandRaised((prev) => {
      const nextState = !prev;
      queueMicrotask(() => {
        if (nextState) {
          handleReaction('✋');
          addToast('Hand Raised', 'Sara Chen raised her hand to speak.', 'info');
        } else {
          addToast('Hand Lowered', 'Sara Chen lowered her hand.', 'info');
        }
      });
      return nextState;
    });
  }, [handleReaction, addToast]);

  const handleToggleMute = useCallback(() => {
    setHuddleMuted((prev) => {
      const next = !prev;
      addToast('Microphone', next ? 'Muted local microphone.' : 'Unmuted. Voice streaming.', 'info');
      return next;
    });
  }, [setHuddleMuted, addToast]);

  const handleToggleCamera = useCallback(() => {
    setCameraEnabled((prev) => {
      const next = !prev;
      addToast('Camera', next ? 'Camera video feed enabled (HD 1080p).' : 'Camera disabled (Voice avatar mode).', 'info');
      return next;
    });
  }, [addToast]);

  const handleToggleScreenShare = useCallback(() => {
    setHuddleScreenShareActive((prev) => {
      const next = !prev;
      addToast('Screen Share', next ? 'Presenting screen to room.' : 'Stopped presentation.', 'info');
      return next;
    });
  }, [setHuddleScreenShareActive, addToast]);

  // Keyboard shortcut listener for power users (M, V, S, H)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handleToggleMute();
      } else if (e.key === 'v' || e.key === 'V') {
        e.preventDefault();
        handleToggleCamera();
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        handleToggleScreenShare();
      } else if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        toggleHandRaise();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleToggleMute, handleToggleCamera, handleToggleScreenShare, toggleHandRaise]);

  const handleSimulateNextSpeech = useCallback(() => {
    const nextIdx = (speechPromptIdx + 1) % SPEECH_SCENARIOS.length;
    const scenario = SPEECH_SCENARIOS[nextIdx];
    simulateHuddleUtterance(scenario.speaker, scenario.text);
    setActiveSpeaker(scenario.speaker);
    setSpeechPromptIdx(nextIdx);
  }, [speechPromptIdx, simulateHuddleUtterance]);

  const handleLeaveCall = useCallback(() => {
    setActiveModule('chat');
    addToast('Huddle Concluded', 'Left session. Full meeting transcript linked in #architecture-rfc.', 'info');
  }, [setActiveModule, addToast]);

  const currentScenario = SPEECH_SCENARIOS[speechPromptIdx % SPEECH_SCENARIOS.length];

  return (
    <div className="flex flex-col h-full bg-[#07090E] text-slate-200 relative overflow-hidden select-none font-sans">
      {/* 1. Header with Room Meta & Network Telemetry */}
      <HuddleHeader
        channelName="#architecture-rfc"
        formattedCallTime={formattedCallTime}
        handRaised={handRaised}
        participantCount={PARTICIPANTS.length}
      />

      {/* 2. Main Collaborative Stage */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3.5 p-3.5 overflow-y-auto relative">
        {/* Left Column (7 cols): Voice Tiles + Shared Canvas + AI Synthesis */}
        <div className="lg:col-span-7 flex flex-col gap-3 min-h-0">
          {/* SFU Audio Stream Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 relative">
            {PARTICIPANTS.map((participant) => {
              const isCurrentActive = activeSpeaker === participant.name;
              const isSaraMuted = participant.name === 'Sara Chen' && huddleMuted;
              const isSpeakingNow = isCurrentActive && !isSaraMuted;

              return (
                <HuddleParticipantTile
                  key={participant.id}
                  participant={participant}
                  isSpeakingNow={isSpeakingNow}
                  isMuted={participant.muted || isSaraMuted}
                  onFocusSpeaker={setActiveSpeaker}
                  reduceMotion={reduceMotion}
                />
              );
            })}
          </div>

          {/* Interactive Shared Canvas */}
          <HuddleSharedCanvas
            screenShareActive={huddleScreenShareActive}
            onToggleScreenShare={handleToggleScreenShare}
            reduceMotion={reduceMotion}
          />

          {/* Ukin Autonomous Commitment Synthesis */}
          <HuddleAISynthesisCard
            currentScenario={currentScenario}
            taskSynced={huddleTaskSynced}
            docSynced={huddleDocSynced}
            onSyncTask={syncHuddleCommitment}
            onSyncDoc={synthesizeHuddleToDoc}
          />
        </div>

        {/* Right Column (5 cols): Automated STT Transcription Stream */}
        <HuddleTranscriptFeed
          transcript={huddleTranscript}
          onSimulateNextSpeech={handleSimulateNextSpeech}
          onNavigateToDocs={() => setActiveModule('docs')}
        />

        {/* Floating Reactions Layer — Anchored to Right Margin for Visual Calm */}
        <AnimatePresence>
          {floatingReactions.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 1, y: 0, scale: 0.85 }}
              animate={{ opacity: 0, y: -140, scale: 1.25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              style={{ right: `${r.right}px`, bottom: '65px' }}
              className="pointer-events-none absolute text-2xl z-40 drop-shadow-lg"
            >
              {r.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 3. Media Controls & Reaction Dock */}
      <HuddleControlBar
        huddleMuted={huddleMuted}
        cameraEnabled={cameraEnabled}
        screenShareActive={huddleScreenShareActive}
        handRaised={handRaised}
        onToggleMute={handleToggleMute}
        onToggleCamera={handleToggleCamera}
        onToggleScreenShare={handleToggleScreenShare}
        onToggleHandRaise={toggleHandRaise}
        onSendReaction={handleReaction}
        onLeaveCall={handleLeaveCall}
      />
    </div>
  );
}

export default memo(HuddleSimulator);
