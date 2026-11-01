/**
 * FieldServicesSolutionDemo.jsx
 * Interactive demo for /solutions/field-services ("Field services")
 * Recreates the verified Ultrakin workflow:
 * Inbound Emergency Service Call -> Smart Dispatcher Assignment -> Live GPS Status -> Mobile Signoff.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  CheckCircle2,
  MapPin,
  Clock,
  PhoneCall,
  UserCheck,
  Wrench,
  Navigation,
} from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import StatusBadge from '../../components/product/StatusBadge';

export default function FieldServicesSolutionDemo() {
  const [jobStatus, setJobStatus] = useState('in_route'); // 'unassigned', 'in_route', 'on_site', 'completed'

  const handleNextStatus = () => {
    if (jobStatus === 'in_route') setJobStatus('on_site');
    else if (jobStatus === 'on_site') setJobStatus('completed');
    else setJobStatus('in_route');
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#faf9f7] text-xs select-none font-sans relative">
      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-[#e5e2dc] bg-white px-4 py-2.5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ecfdf5] text-[#10b981]">
            <Truck size={15} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#111827]">Job #409: Commercial HVAC Failure</span>
              <StatusBadge
                variant={jobStatus === 'completed' ? 'success' : 'enabled'}
                text={
                  jobStatus === 'in_route'
                    ? 'In Route (ETA 8 mins)'
                    : jobStatus === 'on_site'
                    ? 'Tech On Site'
                    : 'Job Completed & Invoiced'
                }
              />
            </div>
            <p className="text-[10px] text-[#6b7280]">Location: 840 Market St · Dispatcher: Ray Kowalski</p>
          </div>
        </div>

        <button
          onClick={handleNextStatus}
          className="flex items-center gap-1.5 rounded-md bg-[#10b981] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#059669] transition-all cursor-pointer shadow-sm"
        >
          <Navigation size={12} />
          <span>
            {jobStatus === 'in_route'
              ? 'Mark Arrived On Site'
              : jobStatus === 'on_site'
              ? 'Capture Customer Signoff'
              : 'Reset Demo to In Route'}
          </span>
        </button>
      </div>

      {/* ─── Two-Column Dispatch Kanban & Mobile Ticket ──────────────────────── */}
      <div className="flex flex-1 overflow-hidden divide-x divide-[#e5e2dc]">
        {/* Left: Dispatch Board */}
        <div className="flex-1 p-3.5 space-y-3 overflow-y-auto bg-white">
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">Live Fleet Dispatch Board</p>

          <div className="grid grid-cols-3 gap-2">
            {/* Column: In Route */}
            <div className="rounded-lg bg-[#faf9f7] border border-[#e5e2dc] p-2 space-y-2">
              <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-semibold text-[#6b7280] uppercase">In Route</span>
                <span className="rounded-full bg-slate-200 px-1.5 py-0.2 text-[9px] font-bold">1</span>
              </div>

              {jobStatus === 'in_route' && (
                <motion.div
                  layoutId="job-card"
                  className="rounded-lg border-2 border-[#10b981] bg-[#ecfdf5] p-2.5 space-y-1.5 shadow-2xs"
                >
                  <div className="flex justify-between font-semibold text-[#111827]">
                    <span>Job #409</span>
                    <span className="text-[10px] text-[#059669]">8m ETA</span>
                  </div>
                  <p className="text-[10px] text-[#4b5563]">Van 04 (Tech: Sam Ortiz)</p>
                  <div className="flex items-center gap-1 text-[9px] text-[#059669]">
                    <Navigation size={10} />
                    <span>GPS 0.4 mi from site</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Column: On Site */}
            <div className="rounded-lg bg-[#faf9f7] border border-[#e5e2dc] p-2 space-y-2">
              <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-semibold text-[#6b7280] uppercase">On Site</span>
                <span className="rounded-full bg-slate-200 px-1.5 py-0.2 text-[9px] font-bold">
                  {jobStatus === 'on_site' ? '1' : '0'}
                </span>
              </div>

              {jobStatus === 'on_site' && (
                <motion.div
                  layoutId="job-card"
                  className="rounded-lg border-2 border-[#3b82f6] bg-[#eff6ff] p-2.5 space-y-1.5 shadow-2xs"
                >
                  <div className="flex justify-between font-semibold text-[#111827]">
                    <span>Job #409</span>
                    <span className="text-[10px] text-[#2563eb]">Diagnosing</span>
                  </div>
                  <p className="text-[10px] text-[#4b5563]">Tech: Sam Ortiz</p>
                  <div className="flex items-center gap-1 text-[9px] text-[#2563eb]">
                    <Wrench size={10} />
                    <span>Compressor relay inspected</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Column: Completed */}
            <div className="rounded-lg bg-[#faf9f7] border border-[#e5e2dc] p-2 space-y-2">
              <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-semibold text-[#6b7280] uppercase">Completed</span>
                <span className="rounded-full bg-slate-200 px-1.5 py-0.2 text-[9px] font-bold">
                  {jobStatus === 'completed' ? '1' : '0'}
                </span>
              </div>

              {jobStatus === 'completed' && (
                <motion.div
                  layoutId="job-card"
                  className="rounded-lg border border-emerald-200 bg-[#f0fdf4] p-2.5 space-y-1.5 shadow-2xs"
                >
                  <div className="flex justify-between font-semibold text-[#111827]">
                    <span>Job #409</span>
                    <span className="text-[10px] text-emerald-700">Closed</span>
                  </div>
                  <p className="text-[10px] text-[#4b5563]">Customer Signature captured</p>
                  <div className="flex items-center gap-1 text-[9px] text-emerald-700">
                    <CheckCircle2 size={10} />
                    <span>Invoice #INV-889 issued</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Field Mobile Signoff Preview */}
        <div className="w-68 p-3.5 space-y-3 overflow-y-auto bg-[#faf9f7] shrink-0">
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">Field Tech Mobile View</p>

          <div className="rounded-xl border border-[#e5e2dc] bg-white p-3 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2">
              <AvatarChip name="Sam Ortiz" color="#dc2626" size="sm" />
              <div>
                <p className="font-semibold text-[#111827]">Sam Ortiz</p>
                <p className="text-[10px] text-[#6b7280]">Master HVAC Technician</p>
              </div>
            </div>

            <div className="rounded bg-[#f8fafc] border border-slate-200 p-2 space-y-1 text-[11px] text-[#475569]">
              <div className="flex justify-between">
                <span>Work Order:</span>
                <span className="font-medium text-[#111827]">Relay Replacement</span>
              </div>
              <div className="flex justify-between">
                <span>Parts Billed:</span>
                <span className="font-mono text-[#111827]">$385.00</span>
              </div>
              <div className="flex justify-between">
                <span>Labor (1.5 hrs):</span>
                <span className="font-mono text-[#111827]">$210.00</span>
              </div>
            </div>

            <p className="text-[10px] text-[#6b7280] pt-1">
              Customer signs digitally on technician's tablet upon completion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
