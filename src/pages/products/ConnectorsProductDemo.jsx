/**
 * ConnectorsProductDemo.jsx
 * Enterprise Integration Mesh preview for /products/connectors
 * Features:
 * - Integration ecosystem grid: HubSpot, Stripe, GitHub, Slack, Linear, Figma
 * - Real-time sync counters (records synced today)
 * - Live Event Stream displaying webhook signals turning into workspace records
 * - Clickable integration cards to inspect sync telemetry
 */
import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { CONNECTORS_DATA } from '../../data/productPageData';

export default function ConnectorsProductDemo() {
  const [selectedId, setSelectedId] = useState('hubspot');
  const [integrations, setIntegrations] = useState(CONNECTORS_DATA.integrations);

  const toggleConnect = (id, e) => {
    e.stopPropagation();
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, connected: !item.connected, syncedToday: item.connected ? 0 : 5 } : item
      )
    );
  };

  return (
    <div className="flex h-full w-full bg-[#fbfaf8] text-[#111827] select-none overflow-hidden">
      {/* ── Left Grid of Integrations ── */}
      <div className="flex-1 p-3.5 flex flex-col border-r border-[#e7e4de] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#e7e4de]">
          <div>
            <h3 className="text-xs font-bold text-[#111827]">Connected Ecosystem</h3>
            <span className="text-[10px] text-[#667085] font-mono">Real-time webhook listeners</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            3 Active
          </span>
        </div>

        {/* 3x3 Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {integrations.map((app) => {
            const isSelected = app.id === selectedId;
            return (
              <div
                key={app.id}
                onClick={() => setSelectedId(app.id)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#3156cf] bg-white shadow-sm ring-1 ring-blue-200'
                    : 'border-[#e7e4de] bg-[#fffefd] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-xs"
                    style={{ backgroundColor: app.color }}
                  >
                    {app.name.charAt(0)}
                  </div>
                  {app.connected ? (
                    <span className="h-2 w-2 rounded-full bg-emerald-500" title="Connected" />
                  ) : (
                    <button
                      onClick={(e) => toggleConnect(app.id, e)}
                      className="text-[10px] font-medium text-[#3156cf] hover:underline"
                    >
                      + Connect
                    </button>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#111827] truncate">{app.name}</h4>
                  <span className="text-[10px] text-[#667085] font-mono block">
                    {app.connected ? `${app.syncedToday} synced` : 'Disconnected'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Right Live Ingestion Stream ── */}
      <div className="w-[190px] sm:w-[210px] shrink-0 bg-[#faf9f7] p-3 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-[#e7e4de] mb-2.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3156cf] flex items-center gap-1">
              <Zap size={11} /> Live Signals
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[260px]">
            {CONNECTORS_DATA.activityFeed.map((feed) => (
              <div
                key={feed.id}
                className="p-2 rounded-lg bg-white border border-[#e7e4de] text-[11px] shadow-2xs"
              >
                <div className="flex items-center justify-between text-[9px] font-mono text-[#667085] mb-1">
                  <span className="font-semibold text-[#111827]">{feed.source}</span>
                  <span>{feed.time}</span>
                </div>
                <p className="text-[#344054] text-[10.5px] leading-tight">{feed.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-[#e7e4de] text-[10px] text-[#667085] font-mono text-center">
          Signals stream into context graph
        </div>
      </div>
    </div>
  );
}
