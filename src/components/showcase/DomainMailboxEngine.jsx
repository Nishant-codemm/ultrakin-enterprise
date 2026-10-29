import React, { useState, useEffect } from 'react';
import {
  Mail,
  Shield,
  CheckCircle2,
  CheckSquare,
  MessageSquare,
  Sparkles,
  Send,
  X,
  Plus,
  Search,
} from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';
import { cn } from '../../lib/cn';

export default function DomainMailboxEngine() {
  const {
    emails,
    activeEmail,
    setActiveEmailId,
    convertEmailToTask,
    sendEmailReply,
    composeNewEmail,
    discussEmailInSpace,
  } = useWorkspace();

  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [draftSavedTime, setDraftSavedTime] = useState(null);

  // New compose form state
  const [newTo, setNewTo] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newBody, setNewBody] = useState('');

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Debounced draft save simulation for reply
  useEffect(() => {
    if (!replyText) return;
    const timer = setTimeout(() => {
      setDraftSavedTime('Saved just now');
    }, 400);
    return () => clearTimeout(timer);
  }, [replyText]);

  const filteredEmails = emails.filter(
    (em) =>
      em.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      em.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      em.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendReply = (e) => {
    e?.preventDefault();
    if (!replyText.trim()) return;
    sendEmailReply(activeEmail.id, replyText);
    setReplyText('');
    setIsReplying(false);
  };

  const handleSendNewEmail = (e) => {
    e?.preventDefault();
    if (!newTo.trim() || !newSubject.trim()) return;
    composeNewEmail({
      to: newTo.trim(),
      subject: newSubject.trim(),
      body: newBody.trim() || 'No body provided.',
    });
    setNewTo('');
    setNewSubject('');
    setNewBody('');
    setShowComposeModal(false);
  };

  return (
    <div className="flex flex-col h-full bg-obsidian-canvas text-slate-200 relative overflow-hidden">
      {/* Top Mail Header Bar */}
      <div className="h-12 px-4 border-b border-obsidian-border bg-obsidian-surface/80 flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-sky-400" />
          <span className="font-semibold text-xs sm:text-sm text-white">Custom Domain Mailbox</span>
          <span className="text-[10px] font-mono text-sky-300 bg-sky-500/15 border border-sky-500/20 px-2 py-0.5 rounded">
            @acme.corp · Sample inbox
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowSecurityModal(true)}
            className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/20 px-2.5 py-1 rounded transition-colors cursor-pointer"
            title="Inspect illustrative email header data"
          >
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>Example headers</span>
          </button>

          <button
            type="button"
            onClick={() => setShowComposeModal(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 px-3 py-1 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compose</span>
          </button>
        </div>
      </div>

      {/* Split Pane: Inbox List + Email Reader */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[320px_1fr] overflow-hidden">
        {/* Left Column: Email Thread List */}
        <div className="border-r border-obsidian-border bg-obsidian-base/90 flex flex-col overflow-hidden">
          {/* Search Bar */}
          <div className="p-2.5 border-b border-obsidian-border-soft">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                aria-label="Filter conversations"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter threads..."
                className="w-full bg-obsidian-surface border border-obsidian-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
              />
            </div>
          </div>

          {/* Thread List Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/6">
            {filteredEmails.map((email) => {
              const isActive = email.id === activeEmail.id;
              return (
                <button
                  key={email.id}
                  type="button"
                  onClick={() => setActiveEmailId(email.id)}
                  className={cn(
                    'w-full p-3 text-left transition-all flex flex-col gap-1 cursor-pointer relative',
                    isActive
                      ? 'bg-sky-500/10 border-l-2 border-sky-400'
                      : 'hover:bg-white/[0.03]'
                  )}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={cn(
                        'font-semibold truncate max-w-[170px]',
                        isActive ? 'text-white' : 'text-slate-300'
                      )}
                    >
                      {email.company}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{email.time}</span>
                  </div>

                  <div className="text-xs font-medium text-slate-200 line-clamp-1">
                    {email.subject}
                  </div>

                  <div className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                    {email.snippet}
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    {email.converted && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" /> Task Created
                      </span>
                    )}
                    {email.replied && (
                      <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-1.5 py-0.2 rounded border border-sky-500/20">
                        Replied
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Full Email View & Action Bar */}
        <div className="flex flex-col h-full bg-obsidian-canvas overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Email Subject Header */}
          <div className="space-y-2 border-b border-obsidian-border pb-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 bg-sky-500/15 border border-sky-500/20 px-2 py-0.5 rounded font-bold">
                SAMPLE EMAIL THREAD
              </span>
              <span className="text-xs font-mono text-slate-400">{activeEmail.time}</span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
              {activeEmail.subject}
            </h2>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span>
                  From: <strong className="text-white font-mono">{activeEmail.sender}</strong>
                </span>
                <span>·</span>
                <span className="text-emerald-400 font-mono text-[11px]">✓ DKIM Signed</span>
              </div>

              <div className="text-[10px] font-mono text-slate-500 truncate max-w-xs">
                {activeEmail.messageId || '<msg-id-rfc5322>'}
              </div>
            </div>
          </div>

          {/* Action Callout Box (Sprint 3 Core Bridge) */}
          <div className="p-3.5 rounded-xl border border-sky-500/30 bg-obsidian-surface/90 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-sky-300 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                CROSS-MODULE ACTION BRIDGE
              </span>
              <span className="text-[10px] font-mono text-slate-400">ZERO CONTEXT SWITCH</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Synthesize this inbound email thread across your workspace. Convert directly into an assigned
              engineering task, link it to a Space, or draft a reply. Actions in this preview stay in the sample workspace.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {activeEmail.converted ? (
                <div className="py-1 px-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Synced to Kanban Pipeline
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => convertEmailToTask(activeEmail.id)}
                  className="py-1 px-3.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-sky-600/25 transition-all cursor-pointer"
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  1-Click Convert to Task
                </button>
              )}

              <button
                type="button"
                onClick={() => discussEmailInSpace(activeEmail, 'client-escalations')}
                className="py-1 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs border border-obsidian-border flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                Discuss in #client-escalations →
              </button>

              <button
                type="button"
                onClick={() => setIsReplying(!isReplying)}
                className="py-1 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs border border-obsidian-border flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span>{isReplying ? 'Close Reply' : 'Draft reply'}</span>
              </button>
            </div>
          </div>

          {/* Email Body Text */}
          <div className="p-4 rounded-xl border border-obsidian-border-soft bg-obsidian-base/70 text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed font-sans">
            {activeEmail.body}
          </div>

          {/* Inline Auto-Saving Reply Composer */}
          {isReplying && (
            <div className="p-4 rounded-xl border border-sky-500/30 bg-obsidian-surface space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-sky-400" />
                  Reply to {activeEmail.sender}
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  {draftSavedTime || 'Auto-saving draft...'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 border-b border-obsidian-border-soft pb-2">
                <span>To: <strong className="text-white">{activeEmail.sender}</strong></span>
                <span>·</span>
                <span className="text-emerald-400">✓ Valid MX Route</span>
              </div>

              <textarea
                rows={4}
                aria-label="Write a sample reply"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a sample reply..."
                className="w-full bg-obsidian-base border border-obsidian-border-medium rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 font-sans resize-none"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-500 font-mono">
                  DKIM Signature: s=202604._domainkey.acme.corp
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReplying(false)}
                    className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className={cn(
                      'px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all flex items-center gap-1.5 cursor-pointer',
                      replyText.trim()
                        ? 'bg-sky-600 hover:bg-sky-500 shadow-sm'
                        : 'bg-white/10 text-slate-500 cursor-not-allowed'
                    )}
                  >
                    <Send className="w-3 h-3" /> Send Reply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Illustrative email header preview */}
      {showSecurityModal && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-obsidian-surface border border-emerald-500/30 rounded-2xl p-5 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-obsidian-border pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-sm text-white">Example email headers</span>
              </div>
              <button
                type="button"
                onClick={() => setShowSecurityModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] leading-5 text-slate-400">Illustrative sample data for this inbox preview; these values are not live verification results.</p>
            <div className="space-y-3 font-mono text-[11px]">
              <div className="p-2.5 rounded-lg bg-obsidian-base border border-obsidian-border-soft space-y-1">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>SPF (Sender Policy Framework)</span>
                  <span className="bg-slate-500/20 px-1.5 py-0.5 rounded text-[10px]">SAMPLE</span>
                </div>
                <div className="text-slate-400 text-[10px]">
                  Example sender domain: {activeEmail.sender.split('@')[1]}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-obsidian-base border border-obsidian-border-soft space-y-1">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>DKIM (DomainKeys Identified Mail)</span>
                  <span className="bg-slate-500/20 px-1.5 py-0.5 rounded text-[10px]">SAMPLE</span>
                </div>
                <div className="text-slate-400 text-[10px]">
                  Example signature metadata for {activeEmail.sender.split('@')[1]}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-obsidian-base border border-obsidian-border-soft space-y-1">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>DMARC Compliance</span>
                  <span className="bg-slate-500/20 px-1.5 py-0.5 rounded text-[10px]">SAMPLE</span>
                </div>
                <div className="text-slate-400 text-[10px]">
                  Example sender policy metadata.
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-obsidian-base border border-obsidian-border-soft space-y-1">
                <div className="flex items-center justify-between text-sky-400 font-bold">
                  <span>Transport Encryption</span>
                  <span className="bg-slate-500/20 px-1.5 py-0.5 rounded text-[10px]">SAMPLE</span>
                </div>
                <div className="text-slate-400 text-[10px]">
                  Example transport metadata.
                </div>
              </div>

              <div className="p-2 rounded bg-white/[0.02] text-[10px] text-slate-500 break-all">
                Example message ID: {activeEmail.messageId}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSecurityModal(false)}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Outbound New Email Compose Modal */}
      {showComposeModal && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSendNewEmail}
            className="w-full max-w-lg bg-obsidian-surface border border-sky-500/30 rounded-2xl p-5 shadow-2xl space-y-3.5 text-xs"
          >
            <div className="flex items-center justify-between border-b border-obsidian-border pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400" />
                <span className="font-bold text-sm text-white">Compose Outbound Message</span>
              </div>
              <button
                type="button"
                onClick={() => setShowComposeModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 bg-obsidian-base border border-obsidian-border-medium rounded-lg px-3 py-2">
                <span className="text-slate-400 font-mono text-xs w-10">To:</span>
                <input
                  type="email"
                  aria-label="Recipient email address"
                  required
                  value={newTo}
                  onChange={(e) => setNewTo(e.target.value)}
                  placeholder="recipient@enterprise-client.com"
                  className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 bg-obsidian-base border border-obsidian-border-medium rounded-lg px-3 py-2">
                <span className="text-slate-400 font-mono text-xs w-10">Subj:</span>
                <input
                  type="text"
                  aria-label="Email subject"
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Subject line..."
                  className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                />
              </div>

              <textarea
                rows={5}
                aria-label="Email body"
                required
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                placeholder="Write your email body..."
                className="w-full bg-obsidian-base border border-obsidian-border-medium rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 resize-none font-sans"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-obsidian-border">
              <span className="text-[10px] text-slate-500 font-mono">
                From: team@acme.corp (DKIM signed)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowComposeModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3 h-3" /> Send Email
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
