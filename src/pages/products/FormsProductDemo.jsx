/**
 * FormsProductDemo.jsx
 * Interactive Public Form & Intake pipeline preview for /products/forms
 * Features:
 * - Visual form builder on the left: field type blocks (+ Text, + Email, + Dropdown, + Checkbox)
 * - Live interactive preview form on the right
 * - Interactive form submission simulation:
 *   Clicking "Submit Request" triggers an animated confirmation modal
 *   confirming automatic ingestion into the workspace "Support Requests" list!
 */
import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, CheckCircle2, Send, RotateCcw } from 'lucide-react';
import { FORMS_DATA } from '../../data/productPageData';

export default function FormsProductDemo() {
  const reduceMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Maya Chen',
    email: 'maya@northwind.studio',
    issue: 'Billing & Duplicate charge',
  });

  const handleSubmit = (e) => {
    e?.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex h-full w-full bg-[#fbfaf8] text-[#111827] select-none overflow-hidden relative">
      {/* ── Left Field Toolbox ── */}
      <div className="w-[140px] sm:w-[160px] shrink-0 border-r border-[#e7e4de] bg-[#f6f5f2] p-3 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#667085] block mb-2">
            Field Palette
          </span>
          <div className="space-y-1.5">
            {[
              { label: 'Short Text', type: 'text' },
              { label: 'Email', type: 'email' },
              { label: 'Dropdown', type: 'select' },
              { label: 'Long Text', type: 'textarea' },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white border border-[#e7e4de] text-[11px] font-medium text-[#344054] shadow-xs"
              >
                <Plus size={11} className="text-[#3156cf]" />
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[10px] font-mono text-[#667085] bg-white p-2 rounded-lg border border-[#e7e4de]">
          Target list:<br />
          <span className="font-semibold text-emerald-600">Support Requests</span>
        </div>
      </div>

      {/* ── Right Live Form Preview ── */}
      <div className="flex-1 flex flex-col p-5 overflow-y-auto bg-white relative">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto w-full space-y-3"
            >
              <div className="border-b border-[#e7e4de] pb-2 mb-3">
                <span className="text-[10px] font-mono text-[#3156cf] uppercase font-bold tracking-wider">
                  Public Intake Form
                </span>
                <h3 className="text-sm font-bold text-[#111827]">
                  {FORMS_DATA.formTitle}
                </h3>
              </div>

              <div>
                <label htmlFor="intake-name" className="block text-[11px] font-semibold text-[#344054] mb-1">
                  Your Full Name
                </label>
                <input
                  id="intake-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg border border-[#e7e4de] bg-[#fbfaf8] focus:border-[#3156cf] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="intake-email" className="block text-[11px] font-semibold text-[#344054] mb-1">
                  Email Address
                </label>
                <input
                  id="intake-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg border border-[#e7e4de] bg-[#fbfaf8] focus:border-[#3156cf] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="intake-issue" className="block text-[11px] font-semibold text-[#344054] mb-1">
                  Issue Category
                </label>
                <select
                  id="intake-issue"
                  value={formData.issue}
                  onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg border border-[#e7e4de] bg-[#fbfaf8] focus:border-[#3156cf] focus:outline-none"
                >
                  <option>Billing & Duplicate charge</option>
                  <option>Technical defect</option>
                  <option>General question</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2 rounded-xl bg-[#111827] hover:bg-[#1f2937] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send size={12} /> Submit to Workspace
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center p-6"
            >
              <div className="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-3 shadow-sm">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="text-sm font-bold text-[#111827]">Response Submitted</h4>
              <p className="text-xs text-[#667085] max-w-xs mt-1">
                A new record <span className="font-mono font-bold text-emerald-600">#SR-19</span> was created in your team's Support Requests list and routed to on-call triage.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-3 py-1.5 rounded-lg border border-[#e7e4de] bg-white text-xs font-medium text-[#344054] hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw size={12} /> Test another submission
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
