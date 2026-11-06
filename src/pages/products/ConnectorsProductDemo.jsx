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

  const selectedIntegration = integrations.find((i) => i.id === selectedId) || integrations[0];
  const connectedCount = integrations.filter((item) => item.connected).length;

  const toggleConnect = (id) => {
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
            {connectedCount} Active
          </span>
        </div>

        {/* 3x3 Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {integrations.map((app) => {
            const isSelected = app.id === selectedId;
            return (
              <div
                key={app.id}
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
                    <span className="h-2 w-2 rounded-full bg-emerald-500" role="img" aria-label="Connected" />
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleConnect(app.id)}
                      className="text-[10px] font-medium text-[#3156cf] hover:underline"
                    >
                      + Connect
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedId(app.id)}
                  aria-pressed={isSelected}
                  className="w-full text-left rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3156cf]"
                >
                  <h4 className="text-xs font-bold text-[#111827] truncate">{app.name}</h4>
                  <span className="text-[10px] text-[#667085] font-mono block">
                    {app.connected ? `${app.syncedToday} synced` : 'Disconnected'}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Selected connection and live ingestion stream ── */}
      <div className="w-[190px] sm:w-[210px] shrink-0 bg-[#faf9f7] p-3 flex flex-col overflow-y-auto">
        <div>
          <div className="pb-2 mb-2.5 border-b border-[#e7e4de]">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#667085]">Selected connection</span>
              <span className={`h-1.5 w-1.5 rounded-full ${selectedIntegration?.connected ? 'bg-emerald-500' : 'bg-slate-300'}`} aria-hidden="true" />
            </div>
            <h4 className="mt-1 text-xs font-semibold text-[#111827]">{selectedIntegration?.name}</h4>
            <p className="mt-0.5 text-[10px] text-[#667085]">
              {selectedIntegration?.connected
                ? `${selectedIntegration.syncedToday} records synced today`
                : `${selectedIntegration?.category} · not connected`}
            </p>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-[#e7e4de] mb-2.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3156cf] flex items-center gap-1">
              <Zap size={11} /> Live Signals
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[190px]">
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

        <div className="pt-2 mt-2 border-t border-[#e7e4de] text-[10px] text-[#667085] font-mono text-center">
          Signals stream into context graph
        </div>
      </div>
    </div>
  );
}
