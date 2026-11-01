/**
 * EngineeringSolutionDemo.jsx
 * Interactive demo for /solutions/engineering ("Engineering")
 * Recreates the authentic Ultrakin workflow:
 * Sentry Alert Ingestion -> Audio War Room Huddle -> Collaborative Postmortem -> Pull Request Closure.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  AlertTriangle,
  Mic,
  MicOff,
  GitPullRequest,
  CheckCircle2,
  FileText,
  Terminal,
} from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import WorkspaceAppRail from '../../components/product/WorkspaceAppRail';

export default function EngineeringSolutionDemo() {
  const reduceMotion = useReducedMotion();
  const [resolved, setResolved] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleResolve = useCallback(() => {
    setResolved((prev) => {
      const next = !prev;
      setToastMessage(
        next
          ? 'Incident #inc-891 resolved · Postmortem published to #eng-incidents · SR-28 closed'
          : 'Incident #inc-891 reopened · War room audio huddle active'
      );
      setTimeout(() => setToastMessage(null), 3000);
      return next;
    });
  }, []);

  // Keyboard shortcut: R to resolve/reopen incident
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleResolve();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleResolve]);

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#0f172a] text-xs select-none font-sans text-slate-200 relative">
      {/* ─── Unified Workspace App Rail (Dark Mode) ─── */}
      <WorkspaceAppRail activeApp="calls" theme="dark" />

      {/* ─── Main Incident Console ─── */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* ─── Top Bar: Incident Header ───────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-[#1e293b] px-4 py-2.5 gap-2 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`flex h-7 w-7 items-center justify-center rounded-lg shrink-0 ${
              resolved
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {resolved ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-white truncate">#inc-891-auth-latency</span>
                <span className={`rounded px-1.5 py-0.5 text-[9.5px] font-semibold shrink-0 ${
                  resolved ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400 animate-pulse'
                }`}>
                  {resolved ? 'RESOLVED' : 'ACTIVE INCIDENT (SEV-1)'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono truncate">auth-cluster-us-east · Redis connection pool exhausted</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResolve}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                resolved
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm'
              }`}
            >
              <CheckCircle2 size={13} />
              <span>{resolved ? 'Reopen Incident' : 'Resolve & Generate Postmortem'}</span>
            </button>
          </div>
        </div>

        {/* ─── Two-Column War Room Layout ──────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
          {/* Left: Live Huddle War Room & Log Stream */}
          <div className="flex w-full sm:w-1/2 flex-col p-3 space-y-3 overflow-y-auto bg-[#0b1120]">
            {/* Active Audio Huddle Bar */}
            <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/40 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${resolved ? 'bg-emerald-400 opacity-75' : 'bg-indigo-400 opacity-75'}`} />
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${resolved ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
                  </span>
                  <span className="font-semibold text-white text-[11px]">War Room Audio Huddle</span>
                  <span className="text-[10px] text-indigo-300 font-mono">14:28 elapsed</span>
                </div>
                <span className="rounded bg-indigo-900/60 px-2 py-0.5 text-[10px] text-indigo-300">
                  4 in huddle
                </span>
              </div>

              {/* Speaking tiles */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="rounded-lg bg-slate-900/80 border border-indigo-500/40 p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AvatarChip name="Devin Zhao" color="#6366f1" size="xs" />
                    <span className="text-white font-medium">Devin (Lead)</span>
                  </div>
                  <div className="flex items-center gap-0.5 h-3">
                    {[0.4, 0.9, 0.5, 0.8, 0.3].map((h, i) => (
                      <motion.span
                        key={i}
                        className="w-0.5 bg-indigo-400 rounded-full"
                        animate={reduceMotion ? { height: '50%' } : { height: ['20%', `${h * 100}%`, '30%'] }}
                        transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.08 }}
                      />
                    ))}
                  </div>
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setIsMicMuted(!isMicMuted)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsMicMuted(!isMicMuted)}
                  className="rounded-lg bg-slate-900/50 border border-slate-800 p-2 flex items-center justify-between cursor-pointer hover:bg-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <AvatarChip name="Dana Lee" color="#059669" size="xs" />
                    <span className="text-slate-300 font-medium">Dana</span>
                  </div>
                  {isMicMuted ? (
                    <MicOff size={11} className="text-red-400" />
                  ) : (
                    <Mic size={11} className="text-slate-500" />
                  )}
                </div>
              </div>
            </div>

            {/* Sentry & Service Logs */}
            <div className="rounded-xl border border-slate-800 bg-[#070b14] p-3 space-y-1.5 font-mono text-[10px] flex-1">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5 mb-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Terminal size={12} />
                  <span>telemetry-stream</span>
                </span>
                <span className={resolved ? 'text-emerald-400' : 'text-amber-400'}>
                  {resolved ? 'Normalized · 18ms p99' : 'Live 100 ops/s'}
                </span>
              </div>
              <p className="text-red-400">09:14:02 ERR pool: connection timeout after 5000ms [client_id=auth-88]</p>
              <p className="text-amber-400">09:14:15 WARN max_connections reached (1024/1024), throttling</p>
              {!resolved && (
                <p className="text-red-400">09:15:30 ERR retry queue saturated (2480 jobs backlogged on us-east)</p>
              )}
              {resolved && (
                <>
                  <p className="text-emerald-400">09:16:40 INFO hotfix PR #412 merged: pool capacity scaled to 4096</p>
                  <p className="text-emerald-300">09:17:05 OK latency normalized (p99: 18ms, error_rate: 0.00%)</p>
                  <p className="text-slate-400">09:17:15 OK healthcheck 200 OK: ticket SR-28 closed in Customer Support</p>
                </>
              )}
            </div>
          </div>

          {/* Right: Living Postmortem & PR Integration */}
          <div className="flex w-full sm:w-1/2 flex-col p-3 space-y-3 overflow-y-auto bg-[#131b2e]">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white text-[11px] flex items-center gap-1.5">
                <FileText size={13} className="text-indigo-400" />
                <span>Living Postmortem (Auto-Drafting)</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Synced to PR #412</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3 space-y-2 text-[11px] text-slate-300 leading-relaxed flex-1">
              <div>
                <p className="font-semibold text-white">Root Cause Analysis</p>
                <p className="text-slate-400 text-[10px] mt-0.5">
                  Spike in concurrent SSO login requests saturated Redis connection pool limit (1024 conns maxed).
                </p>
              </div>

              <div className="border-t border-slate-800 pt-2">
                <p className="font-semibold text-white">Remediation Action Items</p>
                <ul className="space-y-1.5 text-[10px] mt-1.5">
                  <li className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <CheckCircle2 size={11} className="shrink-0" />
                    <span>PR #412: Increase pool size to 4096 with exponential backoff (Merged)</span>
                  </li>
                  <li className={`flex items-center gap-1.5 ${resolved ? 'text-emerald-400 font-medium' : 'text-slate-400'}`}>
                    <CheckCircle2 size={11} className={`shrink-0 ${resolved ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span>Add alert threshold when pool utilization exceeds 75%</span>
                  </li>
                  <li className={`flex items-center gap-1.5 ${resolved ? 'text-emerald-400 font-medium' : 'text-slate-400'}`}>
                    <CheckCircle2 size={11} className={`shrink-0 ${resolved ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span>Customer notification sent to affected enterprise accounts (SR-28)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* GitHub PR Connector Badge */}
            <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-2.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <GitPullRequest size={14} className="text-purple-400 shrink-0" />
                <div>
                  <p className="text-white font-medium">fix(auth): increase redis client pool</p>
                  <p className="text-[10px] text-slate-400">Merged by Devin Zhao · commit 8e3a2b1</p>
                </div>
              </div>
              <span className="rounded bg-purple-950/60 border border-purple-800/40 px-2 py-0.5 text-[9px] font-semibold text-purple-300 font-mono">
                PR #412
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Workspace Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-950/90 px-3 py-2 text-xs font-semibold text-emerald-200 shadow-xl backdrop-blur-sm"
          >
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
