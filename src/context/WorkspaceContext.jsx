import React, { createContext, useContext, useState } from 'react';

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  // Navigation & Active Module
  const [activeModule, setActiveModule] = useState('huddle'); // start on huddle for Week 5 showcase
  const [activeChannel, setActiveChannel] = useState('general-arch');

  // Enterprise Demo & Sales Drawer State (Week 5 Deliverable)
  const [isDemoDrawerOpen, setIsDemoDrawerOpen] = useState(false);
  const openDemoDrawer = () => setIsDemoDrawerOpen(true);
  const closeDemoDrawer = () => setIsDemoDrawerOpen(false);

  // Compliance Inspector Modal State (Week 5 Trust Center Deliverable)
  const [complianceModalItem, setComplianceModalItem] = useState(null);

  // Channels metadata
  const [channels] = useState([
    { id: 'general-arch', name: 'general-arch', unread: 0, topic: 'Core protocol & cluster architecture RFCs' },
    { id: 'client-escalations', name: 'client-escalations', unread: 2, topic: 'Inbound high-priority domain mailbox bridges' },
    { id: 'cluster-eu-04', name: 'cluster-eu-04', unread: 0, topic: 'Telemetry, Sentinel monitoring, and failover health' },
  ]);

  // Messages per channel
  const [messagesByChannel, setMessagesByChannel] = useState({
    'general-arch': [
      {
        id: 'msg_1',
        sender: 'Alex Mercer',
        role: 'CTO · Staff Architect',
        avatar: 'AM',
        avatarBg: 'bg-indigo-600',
        time: '10:38 AM',
        text: 'The Redis Sentinel cluster failover completed gracefully. However, token caching TTL is expiring prematurely under peak EU load. Should we revert back to 3600s?',
        reactions: { '👍': 3, '🚀': 2 },
      },
      {
        id: 'msg_2',
        sender: 'Sara Chen',
        role: 'Principal Infra Engineer',
        avatar: 'SC',
        avatarBg: 'bg-emerald-600',
        time: '10:40 AM',
        text: 'Agreed. PR #1042 reverts the TTL change. CI tests are passing across all 14 integration test suites in cluster-eu-04.',
        reactions: { '🎉': 4 },
      },
    ],
    'client-escalations': [
      {
        id: 'msg_esc_1',
        sender: 'Inbound JMAP Gateway',
        role: 'Mail Bridge Daemon',
        avatar: 'MG',
        avatarBg: 'bg-sky-600',
        time: '10:32 AM',
        text: 'Incoming client email from david@acmecorp.com: "Intermittent timeout during token authentication on EU cluster". SPF=PASS, DKIM=PASS.',
        reactions: { '👀': 2 },
      },
    ],
    'cluster-eu-04': [
      {
        id: 'msg_cl_1',
        sender: 'Sentinel Bot',
        role: 'Cluster Telemetry Daemon',
        avatar: 'SB',
        avatarBg: 'bg-purple-600',
        time: '10:35 AM',
        text: 'Cluster eu-04 failover threshold warning cleared. Nodes 1-4 healthy. Redis memory usage at 41%.',
        reactions: { '✅': 5 },
      },
    ],
  });

  // Ukin AI Agent Runtime State
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [proposalStatus, setProposalStatus] = useState('pending'); // 'pending' | 'approved' | 'rejected'

  // Domain Mailbox State
  const [emails, setEmails] = useState([
    {
      id: 'em_101',
      sender: 'david@acmecorp.com',
      company: 'Acme Corp',
      subject: 'URGENT: Intermittent SSL handshake timeout on EU cluster endpoint',
      time: '10:31 AM',
      unread: true,
      converted: false,
      replied: false,
      snippet: 'Hi team, our telemetry is reporting 504 timeouts on the Frankfurt cluster...',
      body: `Hi Ultrakin Engineering Team,

Our production monitoring has detected intermittent SSL handshake timeouts on the Frankfurt cluster endpoint (https://eu-central-01.ultrakin.internal) over the past 45 minutes.

Around 12% of inbound API client requests are receiving 504 Gateway Timeouts. This is affecting our customer-facing checkout pipelines.

Could you please confirm if there is an active cluster failover underway or if this is related to the recent TLS 1.3 token cache migration?

Urgent escalation from:
David Vance
VP of Infrastructure, Acme Corp
david@acmecorp.com | +1 (555) 019-2834`,
      spf: 'PASS (sender IP: 198.51.100.24)',
      dkim: 'VERIFIED (rsa2048: acmecorp.com)',
      dmarc: 'PASS (p=reject dis=none)',
      tls: 'TLS 1.3 (Cipher: CHACHA20_POLY1305_SHA256)',
      messageId: '<20261020-093112.5849.acme@mail.acmecorp.com>',
      references: '<inbound-jmap-stream-8841>',
    },
    {
      id: 'em_102',
      sender: 'elena@fintechscale.io',
      company: 'FintechScale',
      subject: 'SOC 2 Type II & CMEK security audit verification for Q4 enterprise rollout',
      time: '09:14 AM',
      unread: false,
      converted: true,
      replied: true,
      snippet: 'We are completing vendor risk assessment for 450 seats. Please provide...',
      body: `Hi Ultrakin Security Team,

Our compliance team is completing the annual vendor risk assessment for our upcoming 450-seat rollout. 

Could you please confirm whether Customer-Managed Encryption Keys (CMEK) via AWS KMS are included in the Enterprise Grid plan, and share the latest penetration testing executive summary?

Best regards,
Elena Rostova
Head of Compliance & Security, FintechScale.io`,
      spf: 'PASS (sender IP: 203.0.113.19)',
      dkim: 'VERIFIED (rsa2048: fintechscale.io)',
      dmarc: 'PASS (p=quarantine dis=none)',
      tls: 'TLS 1.3 (Cipher: AES_256_GCM)',
      messageId: '<20261020-081402.1932.fintech@mail.fintechscale.io>',
      references: '<inbound-jmap-stream-8839>',
    },
    {
      id: 'em_103',
      sender: 'marcus.vance@uberlogistics.de',
      company: 'UberLogistics DE',
      subject: 'Inquiry regarding JMAP email threading and German data residency',
      time: 'Yesterday',
      unread: false,
      converted: false,
      replied: false,
      snippet: 'Does Ultrakin guarantee that our domain mailboxes and transcripts reside in Frankfurt...',
      body: `Guten Tag,

We are evaluating Ultrakin to replace both Slack Enterprise and Google Workspace for our 1,200 European logistics coordinators.

Can your technical architects confirm that all JMAP email storage, Matrix room histories, and WebRTC call transcripts will be pinned exclusively to Frankfurt (eu-central-1) without data replication to US regions?

Mit freundlichen Grüßen,
Marcus Vance
Director of IT Operations, UberLogistics DE`,
      spf: 'PASS (sender IP: 194.0.12.8)',
      dkim: 'VERIFIED (rsa2048: uberlogistics.de)',
      dmarc: 'PASS (p=reject dis=none)',
      tls: 'TLS 1.3 (Cipher: AES_256_GCM)',
      messageId: '<20261019-152204.4910.uber@mail.uberlogistics.de>',
      references: '<inbound-jmap-stream-8812>',
    },
  ]);
  const [activeEmailId, setActiveEmailId] = useState('em_101');

  // Living Docs State
  const [docChecklists, setDocChecklists] = useState([
    { id: 'c1', text: 'Revert token cache TTL to 3600s in PR #1042', checked: true },
    { id: 'c2', text: 'Deploy canary build to cluster-eu-04 (Frankfurt)', checked: true },
    { id: 'c3', text: 'Run synthetic load test (10k concurrent WebSocket handshakes)', checked: true },
    { id: 'c4', text: 'Verify Redis Sentinel failover health with zero dropped connections', checked: true },
    { id: 'c5', text: 'Promote cluster-eu-04 to primary routing target', checked: false },
  ]);

  const [docComments, setDocComments] = useState({
    'node_p1': [
      {
        id: 'cm_1',
        author: 'Alex Mercer',
        role: 'CTO · Staff Architect',
        time: '10:44 AM',
        text: 'Let us ensure the Sentinel quorum value is explicitly set to 2 in helm-values.prod.yaml before deploying.',
      },
    ],
    'node_checklist': [
      {
        id: 'cm_2',
        author: 'Sara Chen',
        role: 'Principal Infra Engineer',
        time: '10:48 AM',
        text: 'Synthetic load tests showed 0 packet loss with 18ms p99 latency in Frankfurt.',
      },
    ],
  });

  // Live Huddle & Transcription Engine State (Sprint Week 5 Deliverables)
  const [isHuddleActive, setIsHuddleActive] = useState(true);
  const [huddleMuted, setHuddleMuted] = useState(false);
  const [huddleScreenShareActive, setHuddleScreenShareActive] = useState(false); // LiveKit screen sharing
  const [huddleTranscript, setHuddleTranscript] = useState([
    { id: 'tr_1', speaker: 'Alex Mercer', role: 'CTO', time: '10:41 AM', text: "Let's review the EU cluster latency spike. What do the Sentinel logs say?" },
    { id: 'tr_2', speaker: 'Sara Chen', role: 'Infra Lead', time: '10:42 AM', text: "Token cache TTL expired prematurely under peak load. I have reverted the cache TTL to 3600s in PR #1042." },
    { id: 'tr_3', speaker: 'Ukin Agent', role: 'Autonomous Daemon', time: '10:42 AM', isAgent: true, text: 'Detected commitment: "Revert token cache TTL to 3600s in PR #1042". Ready to sync to Kanban sprint pipeline.' },
    { id: 'tr_4', speaker: 'Marcus Lindqvist', role: 'VP Eng', time: '10:43 AM', text: "LiveKit SFU connection in Frankfurt is solid at 18ms RTT. Load testing with 10k connections ready to initiate." },
  ]);
  const [huddleTaskSynced, setHuddleTaskSynced] = useState(false);
  const [huddleDocSynced, setHuddleDocSynced] = useState(false);

  // Kanban Board Tasks (connected to Event Bus)
  const [kanbanTasks, setKanbanTasks] = useState([
    {
      id: 'tsk_1',
      col: 'triage',
      title: 'Investigate intermittent SSL handshake timeouts on EU cluster',
      source: 'From Mailbox',
      sourceType: 'mail',
      priority: 'P1',
      time: '10m ago',
      assignee: 'Sara Chen',
    },
    {
      id: 'tsk_2',
      col: 'in_progress',
      title: 'Revert token caching logic & bump TTL to 3600s',
      source: 'From Huddle #18',
      sourceType: 'huddle',
      priority: 'P0',
      time: 'Active',
      assignee: 'Sara Chen',
      prLinked: 'PR #1042',
    },
    {
      id: 'tsk_3',
      col: 'done',
      title: 'Update Redis Sentinel cluster failover thresholds',
      source: 'Closed by Commit',
      sourceType: 'commit',
      priority: 'P2',
      time: 'Yesterday',
      assignee: 'Alex Mercer',
    },
  ]);

  // Toasts / Telemetry Feed
  const [toasts, setToasts] = useState([]);

  const addToast = (title, desc, type = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, desc, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Actions
  const sendMessage = (text, channelId = activeChannel) => {
    if (!text.trim()) return;

    const newMsg = {
      id: 'msg_' + Date.now(),
      sender: 'You',
      role: 'Staff Engineer (Active)',
      avatar: 'ME',
      avatarBg: 'bg-emerald-600',
      time: 'Just now',
      text: text.trim(),
      reactions: {},
    };

    setMessagesByChannel((prev) => ({
      ...prev,
      [channelId]: [...(prev[channelId] || []), newMsg],
    }));

    addToast('Message Dispatched', `Delivered to #${channelId} via Matrix E2EE sync.`, 'info');

    // Trigger AI Agent reaction after 800ms
    setTimeout(() => {
      setIsAgentTyping(true);
      setTimeout(() => {
        setIsAgentTyping(false);
        const agentResponse = {
          id: 'msg_agent_' + Date.now(),
          sender: 'Ukin Agent',
          role: 'Autonomous Systems Daemon',
          avatar: 'UA',
          avatarBg: 'bg-indigo-600',
          time: 'Just now',
          isAgent: true,
          proposal: {
            title: 'Deploy Canary to cluster-eu-04',
            desc: 'Sentinel health checks passed. Automated rollback plan ready if p99 latency exceeds 35ms.',
            commit: '#8b19f0 (PR #1042)',
            checks: '14 passed in cluster-eu-04',
            status: 'pending',
          },
          text: 'I have analyzed the Redis failover telemetry. Canary rollout for PR #1042 is prepared with zero-downtime safety invariants.',
          reactions: {},
        };
        setMessagesByChannel((prev) => ({
          ...prev,
          [channelId]: [...(prev[channelId] || []), agentResponse],
        }));
        setProposalStatus('pending');
        addToast('Agent Action Proposal Generated', 'Ukin Agent formulated canary deployment plan.', 'warning');
      }, 1200);
    }, 600);
  };

  const approveProposal = (channelId = activeChannel) => {
    setProposalStatus('approved');
    addToast('Proposal Approved & Executed', 'Canary deployed to cluster-eu-04. Traffic shifting: 10% -> 50% -> 100%.', 'success');

    const executionMsg = {
      id: 'msg_exec_' + Date.now(),
      sender: 'Ukin Agent',
      role: 'Autonomous Systems Daemon',
      avatar: 'UA',
      avatarBg: 'bg-indigo-600',
      time: 'Just now',
      isAgent: true,
      text: '✅ Canary rollout successfully promoted. Cluster eu-04 p99 latency returned to 18ms. Operational incident auto-resolved.',
      reactions: { '🚀': 6, '👏': 3 },
    };

    setMessagesByChannel((prev) => ({
      ...prev,
      [channelId]: [...(prev[channelId] || []), executionMsg],
    }));
  };

  const convertEmailToTask = (email) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === email.id ? { ...e, converted: true } : e))
    );

    const newTask = {
      id: 'tsk_' + Date.now(),
      col: 'triage',
      title: `Escalation: ${email.subject}`,
      source: `From ${email.sender}`,
      sourceType: 'mail',
      priority: 'P0',
      time: 'Just now',
      assignee: 'Sara Chen',
    };
    setKanbanTasks((prev) => [newTask, ...prev]);
    addToast('Email Converted to Task', `Synthesized email from ${email.sender} into a P0 Kanban ticket.`, 'success');
  };

  const syncHuddleCommitment = () => {
    setHuddleTaskSynced(true);
    const huddleTask = {
      id: 'tsk_huddle_' + Date.now(),
      col: 'in_progress',
      title: 'Huddle #18 Action: Revert token cache TTL to 3600s',
      source: 'From Huddle #18',
      sourceType: 'huddle',
      priority: 'P0',
      time: 'Just now',
      assignee: 'Sara Chen',
    };
    setKanbanTasks((prev) => [huddleTask, ...prev]);
    addToast('Huddle Action Extracted', 'Speech commitment synced to Sprint 24 Kanban pipeline.', 'success');
  };

  // Sprint Week 5: Live Streaming Speech Simulation
  const simulateHuddleUtterance = (speaker = 'Sara Chen', text = 'Cluster eu-04 latency dropped to 18ms. All Sentinel nodes reporting optimal health.') => {
    const newTr = {
      id: 'tr_' + Date.now(),
      speaker: speaker,
      role: speaker === 'Sara Chen' ? 'Infra Lead' : speaker === 'Marcus Lindqvist' ? 'VP Eng' : 'CTO',
      time: 'Just now',
      text: text,
      isAgent: false,
    };
    setHuddleTranscript((prev) => [...prev, newTr]);
    addToast('WebAudio STT Stream', `Transcribed live audio from ${speaker} (Latency: 28ms, Confidence: 99.2%).`, 'info');
  };

  // Sprint Week 5: Synthesize Huddle to Living Doc
  const synthesizeHuddleToDoc = () => {
    setHuddleDocSynced(true);
    const newComment = {
      id: 'cm_huddle_' + Date.now(),
      author: 'Ukin AI Meeting Scribe',
      role: 'Automated Synthesis Daemon',
      time: 'Just now',
      text: 'Huddle Synthesis: Sara Chen & Alex Mercer verified token cache TTL revert in PR #1042. Latency drop to 18ms confirmed across Frankfurt pods.',
    };
    setDocComments((prev) => ({
      ...prev,
      'node_huddle_summary': [newComment],
    }));
    addToast('Meeting Synthesis Exported', 'Huddle decisions & audio citations committed to Living Doc RFC-2026.', 'success');
  };

  const toggleChecklist = (id) => {
    setDocChecklists((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
    addToast('CRDT Synced', 'Checklist state merged across 3 active peers in sub-12ms.', 'info');
  };

  const sendEmailReply = (emailId, replyText) => {
    if (!replyText?.trim()) return;
    setEmails((prev) =>
      prev.map((em) => {
        if (em.id === emailId) {
          return {
            ...em,
            body: em.body + `\n\n--- Outbound Reply (You, Just now) ---\n${replyText}`,
            replied: true,
          };
        }
        return em;
      })
    );
    addToast('JMAP Email Dispatched', 'Reply delivered via RFC 8620 protocol with valid DKIM signature.', 'success');
  };

  const composeNewEmail = ({ to, subject, body }) => {
    if (!to || !subject) return;
    const newId = 'em_' + Date.now();
    const newEm = {
      id: newId,
      sender: to,
      company: to.split('@')[1] || 'External Client',
      subject: subject,
      time: 'Just now',
      unread: false,
      converted: false,
      snippet: body.slice(0, 80) + '...',
      body: body,
      spf: 'PASS',
      dkim: 'VERIFIED',
      dmarc: 'PASS',
      tls: 'TLS 1.3 (AES_256_GCM)',
      messageId: `<msg-${Date.now()}@acme-corp.ultrakin.com>`,
      references: '<outbound-jmap-draft>',
    };
    setEmails((prev) => [newEm, ...prev]);
    setActiveEmailId(newId);
    addToast('Outbound Email Sent', `Dispatched to ${to} with DKIM rsa2048 signing.`, 'success');
  };

  const discussEmailInSpace = (email, channelId = 'client-escalations') => {
    setActiveChannel(channelId);
    setActiveModule('chat');

    const bridgeMsg = {
      id: 'msg_bridge_' + Date.now(),
      sender: 'Mail Bridge Daemon',
      role: 'Native Domain Mail',
      avatar: 'MB',
      avatarBg: 'bg-sky-600',
      time: 'Just now',
      text: `Inbound escalation bridged from ${email.sender}: "${email.subject}". Context and headers synced to #${channelId}.`,
      reactions: { '👀': 1 },
    };

    setMessagesByChannel((prev) => ({
      ...prev,
      [channelId]: [...(prev[channelId] || []), bridgeMsg],
    }));

    addToast('Cross-Module Bridge Active', `Bridged email from ${email.sender} into #${channelId}.`, 'info');
  };

  const addDocComment = (nodeId, text) => {
    if (!text?.trim()) return;
    const newComment = {
      id: 'cm_' + Date.now(),
      author: 'You',
      role: 'Staff Engineer (Active)',
      time: 'Just now',
      text: text.trim(),
    };
    setDocComments((prev) => ({
      ...prev,
      [nodeId]: [...(prev[nodeId] || []), newComment],
    }));
    addToast('Matrix Comment Synced', `Attached discussion thread to #${nodeId} (sub-8ms CRDT merge).`, 'info');
  };

  const addDocChecklistItem = (text) => {
    if (!text?.trim()) return;
    const newItem = {
      id: 'c_' + Date.now(),
      text: text.trim(),
      checked: false,
    };
    setDocChecklists((prev) => [...prev, newItem]);
    addToast('CRDT Block Inserted', 'Added operational item to collaborative spec.', 'success');
  };

  const activeMessages = messagesByChannel[activeChannel] || [];
  const activeEmail = emails.find((e) => e.id === activeEmailId) || emails[0];

  return (
    <WorkspaceContext.Provider
      value={{
        activeModule,
        setActiveModule,
        activeChannel,
        setActiveChannel,
        channels,
        activeMessages,
        sendMessage,
        isAgentTyping,
        proposalStatus,
        setProposalStatus,
        approveProposal,
        emails,
        activeEmail,
        setActiveEmailId,
        convertEmailToTask,
        sendEmailReply,
        composeNewEmail,
        discussEmailInSpace,
        docChecklists,
        toggleChecklist,
        docComments,
        addDocComment,
        addDocChecklistItem,
        isHuddleActive,
        setIsHuddleActive,
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
        kanbanTasks,
        toasts,
        addToast,
        isDemoDrawerOpen,
        openDemoDrawer,
        closeDemoDrawer,
        complianceModalItem,
        setComplianceModalItem,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
