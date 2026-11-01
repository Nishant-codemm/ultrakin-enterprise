/**
 * PeopleSolutionDemo.jsx
 * Interactive demo for /solutions/people ("People & Culture")
 * Recreates the verified Ultrakin workflow:
 * Offer Accepted -> Automated IT Tasks -> Welcome Hub -> 30-Day Check-in Pulse.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  CheckCircle2,
  Calendar,
  Laptop,
  Mail,
  Shield,
  Clock,
  Sparkles,
} from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import StatusBadge from '../../components/product/StatusBadge';

export default function PeopleSolutionDemo() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'MacBook Pro M3 provisioned & MDM enrolled', done: true, icon: Laptop },
    { id: 2, title: 'Google Workspace & GitHub SSO accounts created', done: true, icon: Mail },
    { id: 3, title: 'Assigned onboarding buddy (Maya Chen)', done: true, icon: Users },
    { id: 4, title: 'Day 1 Welcome Huddle scheduled with team', done: false, icon: Calendar },
  ]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.done).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#faf9f7] text-xs select-none font-sans relative">
      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-[#e5e2dc] bg-white px-4 py-2.5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f3e8ff] text-[#8b5cf6]">
            <Users size={15} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#111827]">New Hire: Lucas Ray (Staff Frontend)</span>
              <StatusBadge variant={progressPercent === 100 ? 'success' : 'enabled'} text={`${progressPercent}% Ready`} />
            </div>
            <p className="text-[10px] text-[#6b7280]">Start Date: Monday · Onboarding Lead: Aisha Patel</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
            <motion.div
              className="bg-[#8b5cf6] h-full rounded-full"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="font-mono text-[11px] font-semibold text-[#8b5cf6]">{completedCount}/4</span>
        </div>
      </div>

      {/* ─── Two-Column Onboarding Hub ────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden divide-x divide-[#e5e2dc]">
        {/* Left: Provisioning Checklist */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-white">
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">Automated IT & Team Tasks</p>

          <div className="space-y-2">
            {tasks.map((task) => {
              const Icon = task.icon;
              return (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center justify-between rounded-lg border p-2.5 transition-all cursor-pointer ${
                    task.done
                      ? 'border-[#bbf7d0] bg-[#f0fdf4] text-slate-700'
                      : 'border-[#e5e2dc] bg-white hover:border-[#8b5cf6]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-md ${
                      task.done ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <Icon size={13} />
                    </div>
                    <span className={`text-[11px] ${task.done ? 'line-through text-slate-500 font-normal' : 'font-semibold text-[#111827]'}`}>
                      {task.title}
                    </span>
                  </div>

                  <div className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                    task.done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {task.done && <CheckCircle2 size={12} />}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[10px] text-[#6b7280]">Click any task to toggle state and update the onboarding progress.</p>
        </div>

        {/* Right: Day 1 Welcome Portal Preview */}
        <div className="w-64 p-3.5 space-y-3 overflow-y-auto bg-[#faf9f7] shrink-0">
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">Welcome Portal Hub</p>

          <div className="rounded-xl border border-[#e5e2dc] bg-white p-3 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2">
              <AvatarChip name="Lucas Ray" color="#8b5cf6" size="sm" />
              <div>
                <p className="font-semibold text-[#111827]">Welcome, Lucas!</p>
                <p className="text-[10px] text-[#6b7280]">Staff Frontend Engineer</p>
              </div>
            </div>

            <div className="rounded bg-[#f5f3ff] border border-[#ddd6fe] p-2 space-y-1 text-[10px] text-[#6d28d9]">
              <div className="flex items-center gap-1 font-semibold">
                <Sparkles size={11} />
                <span>Assigned Buddy: Maya Chen</span>
              </div>
              <p>Coffee chat scheduled for 10:30 AM in the #welcome huddle room.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
