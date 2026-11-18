import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { cn } from '../../../lib/cn';
import { useWorkspace } from '../../../context/useWorkspace';

export default function EventDiscussionThread({ event }) {
  const { addEventDiscussionReply } = useWorkspace();
  const [replyText, setReplyText] = useState('');

  if (!event) return null;

  const discussion = event.discussion || [];

  const handleSend = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addEventDiscussionReply(event.id, replyText.trim());
    setReplyText('');
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-wider text-obsidian-muted flex items-center gap-1.5">
          <MessageSquare className="w-3 h-3 text-slate-400" />
          <span>Event Discussion ({discussion.length})</span>
        </span>
        <span className="text-[10px] font-mono text-slate-500">Matrix Encrypted</span>
      </div>

      {/* Message List */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {discussion.length === 0 ? (
          <div className="p-3 rounded-lg bg-black/20 border border-white/[0.04] text-center text-xs text-slate-500">
            No discussion items yet. Post notes, pre-reads, or questions for attendees.
          </div>
        ) : (
          discussion.map((msg) => (
            <div
              key={msg.id}
              className="p-2.5 rounded-lg bg-white/[0.025] border border-white/[0.06] text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      'w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center text-white',
                      msg.sender?.avatarBg || 'bg-indigo-600'
                    )}
                  >
                    {msg.sender?.initials || 'SC'}
                  </span>
                  <span className="font-semibold text-white text-[11px]">
                    {msg.sender?.name || 'Sara Chen'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{msg.time}</span>
              </div>
              <p className="text-[11.5px] leading-relaxed text-slate-300 pl-5.5">
                {msg.text}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Reply Composer */}
      <form onSubmit={handleSend} className="flex items-center gap-2 pt-1">
        <input
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Reply to this event..."
          className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={!replyText.trim()}
          className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white transition-colors cursor-pointer"
          title="Send reply"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
