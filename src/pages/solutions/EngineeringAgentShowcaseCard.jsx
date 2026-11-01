/**
 * EngineeringAgentShowcaseCard.jsx
 * Secondary Stacked Showcase Card for /solutions/engineering
 * Recreates the authentic Ultrakin secondary card beneath the hero:
 * "#inc-891-auth-latency Incident War Room · Autonomous SRE agent triages production alerts"
 */
import React from 'react';
import { CheckCircle2, Sparkles, Clock, GitPullRequest, Terminal, ShieldCheck } from 'lucide-react';

export default function EngineeringAgentShowcaseCard() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 rounded-2xl border border-[rgba(17,24,39,0.08)] bg-white shadow-[0_0_0_1px_rgba(17,24,39,0.04),0_4px_6px_-1px_rgba(17,24,39,0.03),0_20px_40px_-8px_rgba(17,24,39,0.08)] overflow-hidden select-none">
      {/* Top Bar */}
      <div className="flex h-10 items-center justify-between border-b border-[#f0ede8] bg-[#fafaf9] px-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-[#6366f1] text-white flex items-center justify-center font-bold text-[9px]">
            U
          </div>
          <span className="text-[12.5px] font-semibold text-[#111827]">
            #inc-891-auth-latency
          </span>
          <span className="text-[11px] text-[#667085] hidden sm:inline">
            Incident War Room · Autonomous SRE agent triages production alerts
          </span>
        </div>

        <span className="text-[10px] font-mono text-indigo-800 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
          <Sparkles size={10} className="text-[#6366f1]" />
          Autonomous RCA & Postmortem
        </span>
      </div>

      {/* Main Content Row */}
      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[#6366f1] font-bold text-xs shrink-0">
            <Terminal size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#111827]">auth-cluster-us-east</span>
              <span className="text-[10.5px] text-emerald-700 font-mono font-bold">p99: 18ms</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded font-mono font-medium">
                SEV-1 Resolved
              </span>
            </div>
            <p className="text-xs text-[#344054] font-medium mt-0.5">
              Redis pool scaled to 4096 · Commit 8e3a2b1 · 0% error rate
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
          <span className="w-full sm:w-auto text-[11px] font-mono text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-medium">
            <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
            <span>Ukin drafted RCA postmortem & closed customer ticket SR-28</span>
          </span>
        </div>
      </div>

      {/* Telemetry Footer */}
      <div className="border-t border-[#f0ede8] bg-[#faf9f7] px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-[10.5px] text-[#6b7280]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock size={11} className="text-[#9ca3af]" />
            Resolution MTTR: <strong className="font-mono text-[#374151]">14m 28s</strong>
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={11} className="text-emerald-600" />
            Lead SRE: <span className="text-indigo-700 font-medium">Devin Zhao (Apex Cloud)</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#9ca3af]">Linked Pull Request:</span>
          <span className="flex items-center gap-1 font-mono font-bold text-[#111827] bg-white border border-[#e5e2dc] px-1.5 py-0.2 rounded">
            <GitPullRequest size={10} className="text-purple-600" />
            PR #412
          </span>
        </div>
      </div>
    </div>
  );
}
