import React, { useState, useEffect } from 'react';
import { WorkspaceContext } from './WorkspaceContextStore';
let toastSeq = 0;

export function WorkspaceProvider({ children }) {
  // Navigation & Active Module
  const [activeModule, setActiveModule] = useState('chat');
  const [activeChannel, setActiveChannel] = useState('general-arch');

  // Enterprise Demo & Sales Drawer State (Week 5 Deliverable)
  const [isDemoDrawerOpen, setIsDemoDrawerOpen] = useState(false);
  const openDemoDrawer = () => setIsDemoDrawerOpen(true);
  const closeDemoDrawer = () => setIsDemoDrawerOpen(false);

  // Compliance Inspector Modal State (Week 5 Trust Center Deliverable)
  const [complianceModalItem, setComplianceModalItem] = useState(null);

  // Channels metadata
  const [channels] = useState([
    { id: 'general-arch', name: 'general-arch', unread: 0, topic: 'Launch planning, updates, and team decisions' },
    { id: 'client-escalations', name: 'client-escalations', unread: 2, topic: 'Customer questions and follow-up' },
    { id: 'cluster-eu-04', name: 'launch-checklist', unread: 0, topic: 'Release notes, rollout checks, and team handoffs' },
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
        text: 'We saw a few timeouts during the launch rehearsal. Should we review the token refresh change before rollout?',
        reactions: { '👍': 3, '🚀': 2 },
      },
      {
        id: 'msg_2',
        sender: 'Sara Chen',
        role: 'Principal Infra Engineer',
        avatar: 'SC',
        avatarBg: 'bg-emerald-600',
        time: '10:40 AM',
        text: 'Agreed. I linked the change and added the rollout checks to the launch checklist.',
        reactions: { '🎉': 4 },
      },
    ],
    'client-escalations': [
      {
        id: 'msg_esc_1',
        sender: 'Launch team inbox',
        role: 'Sample inbox',
        avatar: 'MG',
        avatarBg: 'bg-sky-600',
        time: '10:32 AM',
        text: 'Incoming client email: "Intermittent timeout during token authentication". Added to the sample inbox for team review.',
        reactions: { '👀': 2 },
      },
    ],
    'cluster-eu-04': [
      {
        id: 'msg_cl_1',
        sender: 'Sentinel Bot',
        role: 'Workspace update',
        avatar: 'SB',
        avatarBg: 'bg-purple-600',
        time: '10:35 AM',
        text: 'The launch checklist is up to date. Sara added the rollout notes for team review.',
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
      snippet: 'Hi team, we are seeing intermittent timeouts on the launch environment...',
      body: `Hi Ultrakin Engineering Team,

Our production monitoring has detected intermittent SSL handshake timeouts on the launch environment over the past 45 minutes.

Around 12% of inbound API client requests are receiving 504 Gateway Timeouts. This is affecting our customer-facing checkout pipelines.

Could you please confirm if there is an active cluster failover underway or if this is related to the recent TLS 1.3 token cache migration?

Urgent escalation from:
David Vance
VP of Infrastructure, Acme Corp
david@acmecorp.com | +1 (555) 019-2834`,
      spf: 'SAMPLE',
      dkim: 'SAMPLE',
      dmarc: 'SAMPLE',
      tls: 'SAMPLE',
      messageId: '<20261020-093112.5849.acme@mail.acmecorp.com>',
      references: '<inbound-mail-8841>',
    },
    {
      id: 'em_102',
      sender: 'elena@fintechscale.io',
      company: 'FintechScale',
      subject: 'Question about security documentation for rollout',
      time: '09:14 AM',
      unread: false,
      converted: true,
      replied: true,
      snippet: 'We are completing a vendor review for our rollout. Please provide...',
      body: `Hi Ultrakin Security Team,

Our compliance team is completing a vendor review for our upcoming rollout.

Could you please share the current security documentation and details about the controls available on our plan?

Best regards,
Elena Rostova
Head of Compliance & Security, FintechScale.io`,
      spf: 'SAMPLE',
      dkim: 'SAMPLE',
      dmarc: 'SAMPLE',
      tls: 'SAMPLE',
      messageId: '<20261020-081402.1932.fintech@mail.fintechscale.io>',
      references: '<inbound-mail-8839>',
    },
    {
      id: 'em_103',
      sender: 'marcus.vance@uberlogistics.de',
      company: 'UberLogistics DE',
      subject: 'Question about email threading and data residency',
      time: 'Yesterday',
      unread: false,
      converted: false,
      replied: false,
      snippet: 'Can you share details about mailbox and transcript data residency...',
      body: `Guten Tag,

We are evaluating Ultrakin to replace both Slack Enterprise and Google Workspace for our 1,200 European logistics coordinators.

Can your team share where mailbox data, conversations, and Huddle transcripts are stored, and whether data is replicated across regions?

Mit freundlichen Grüßen,
Marcus Vance
Director of IT Operations, UberLogistics DE`,
      spf: 'SAMPLE',
      dkim: 'SAMPLE',
      dmarc: 'SAMPLE',
      tls: 'SAMPLE',
      messageId: '<20261019-152204.4910.uber@mail.uberlogistics.de>',
      references: '<inbound-mail-8812>',
    },
  ]);
  const [activeEmailId, setActiveEmailId] = useState('em_101');

  // Living Docs State
  const [docChecklists, setDocChecklists] = useState([
    { id: 'c1', text: 'Review the token refresh change in PR #1042', checked: true },
    { id: 'c2', text: 'Confirm the rollout owner', checked: true },
    { id: 'c3', text: 'Share the release notes with support', checked: true },
    { id: 'c4', text: 'Review the launch checklist with the team', checked: true },
    { id: 'c5', text: 'Confirm launch readiness', checked: false },
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
        text: 'The team reviewed the launch environment and documented the next rollout checks.',
      },
    ],
  });

  // Live Huddle & Transcription Engine State (Sprint Week 5 Deliverables)
  const [isHuddleActive, setIsHuddleActive] = useState(true);
  const [huddleMuted, setHuddleMuted] = useState(false);
  const [huddleScreenShareActive, setHuddleScreenShareActive] = useState(false);
  const [huddleTranscript, setHuddleTranscript] = useState([
    { id: 'tr_1', speaker: 'Alex Mercer', role: 'CTO', time: '10:41 AM', text: "Let's review the timeout reports. What did we decide in the launch thread?" },
    { id: 'tr_2', speaker: 'Sara Chen', role: 'Infra Lead', time: '10:42 AM', text: "I linked the token refresh change in PR #1042 and added the rollout checks to the checklist." },
    { id: 'tr_3', speaker: 'Ukin Agent', role: 'Workspace assistant', time: '10:42 AM', isAgent: true, text: 'I found a follow-up in this discussion and prepared a task linked to the conversation for review.' },
    { id: 'tr_4', speaker: 'Marcus Lindqvist', role: 'VP Eng', time: '10:43 AM', text: 'I added the rollout checks to the handoff. The team can review them before the next release.' },
  ]);
  const [huddleTaskSynced, setHuddleTaskSynced] = useState(false);
  const [huddleDocSynced, setHuddleDocSynced] = useState(false);

  // Sample tasks across four board columns.
  const [kanbanTasks, setKanbanTasks] = useState([
    {
      id: 'tsk_1',
      col: 'backlog',
      title: 'Investigate intermittent SSL handshake timeouts on EU cluster',
      description: 'Review the launch environment logs and summarize the recent timeout reports.',
      source: 'From Mailbox',
      sourceType: 'mail',
      sourceId: 'em_101',
      priority: 'P1',
      time: '10m ago',
      assignee: 'Sara Chen',
      assigneeAvatar: 'SC',
      subtasks: [
        { id: 'st_1', text: 'Review token refresh behavior', done: true },
        { id: 'st_2', text: 'Review the related environment logs', done: false },
        { id: 'st_3', text: 'Share an update with the customer team', done: false },
      ],
      auditLog: [
        { time: '10:32 AM', actor: 'Ukin assistant', action: 'Summarized a message from the sample inbox' },
        { time: '10:35 AM', actor: 'Sara Chen', action: 'Assigned to self and tagged Priority P1' },
      ],
    },
    {
      id: 'tsk_2',
      col: 'in_progress',
      title: 'Revert token caching logic & bump TTL to 3600s in PR #1042',
      description: 'Review the cache eviction change and confirm the follow-up plan with the team.',
      source: 'From Huddle #18',
      sourceType: 'huddle',
      sourceId: 'huddle_18',
      priority: 'P0',
      time: 'Active',
      assignee: 'Sara Chen',
      assigneeAvatar: 'SC',
      prLinked: 'PR #1042',
      subtasks: [
        { id: 'st_4', text: 'Hotfix branch checkout & cherry-pick', done: true },
        { id: 'st_5', text: 'Run integration test suite against staging Redis', done: true },
        { id: 'st_6', text: 'Deploy canary pods to eu-central-1', done: false },
      ],
      auditLog: [
        { time: '10:42 AM', actor: 'Ukin AI Speech Scribe', action: 'Commitment extracted from audio utterance by Sara Chen' },
        { time: '10:44 AM', actor: 'Alex Mercer', action: 'Approved P0 urgency status' },
      ],
    },
    {
      id: 'tsk_3',
      col: 'review',
      title: 'Prepare the security review response',
      description: 'Customer asked about security controls and supporting documentation.',
      source: 'From Space #compliance',
      sourceType: 'chat',
      sourceId: 'client-escalations',
      priority: 'P2',
      time: '1h ago',
      assignee: 'Elena Rostova',
      assigneeAvatar: 'ER',
      subtasks: [
        { id: 'st_7', text: 'Review the action history', done: true },
        { id: 'st_8', text: 'Draft risk assessment signoff package', done: true },
      ],
      auditLog: [
        { time: '09:20 AM', actor: 'Elena Rostova', action: 'Card created from space discussion' },
      ],
    },
    {
      id: 'tsk_4',
      col: 'done',
      title: 'Finalize the launch handoff',
      description: 'The team reviewed the rollout notes and linked the release checklist.',
      source: 'Closed by Commit',
      sourceType: 'commit',
      sourceId: 'commit_8a129',
      priority: 'P2',
      time: 'Yesterday',
      assignee: 'Alex Mercer',
      assigneeAvatar: 'AM',
      subtasks: [
        { id: 'st_9', text: 'Review launch notes with the team', done: true },
        { id: 'st_10', text: 'Share the handoff with support', done: true },
      ],
      auditLog: [
        { time: 'Yesterday', actor: 'Alex Mercer', action: 'Closed via merge commit #0736535' },
      ],
    },
  ]);

  // Kanban Task Inspector Drawer State
  const [selectedKanbanTask, setSelectedKanbanTask] = useState(null);
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);

  const openTaskDrawer = (task) => {
    setSelectedKanbanTask(task);
    setIsTaskDrawerOpen(true);
  };

  const closeTaskDrawer = () => {
    setIsTaskDrawerOpen(false);
  };

  const moveKanbanTask = (taskId, targetCol) => {
    setKanbanTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const audit = {
            time: 'Just now',
            actor: 'Sara Chen (You)',
            action: `Shifted column to [${targetCol.toUpperCase()}]`,
          };
          return {
            ...t,
            col: targetCol,
            auditLog: [audit, ...(t.auditLog || [])],
          };
        }
        return t;
      })
    );

    // If active in drawer, keep updated
    setSelectedKanbanTask((prev) => {
      if (prev && prev.id === taskId) {
        return {
          ...prev,
          col: targetCol,
          auditLog: [
            { time: 'Just now', actor: 'Sara Chen (You)', action: `Shifted column to [${targetCol.toUpperCase()}]` },
            ...(prev.auditLog || []),
          ],
        };
      }
      return prev;
    });

    addToast('Task updated', `Moved to ${targetCol.replace('_', ' ').toUpperCase()} in the sample workspace.`, 'success');
  };

  const updateKanbanTask = (taskId, updates) => {
    setKanbanTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
    );
    setSelectedKanbanTask((prev) => (prev && prev.id === taskId ? { ...prev, ...updates } : prev));
    addToast('Task updated', 'Changes saved in the sample workspace.', 'info');
  };

  const toggleKanbanSubtask = (taskId, subtaskId) => {
    setKanbanTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextSubs = (t.subtasks || []).map((st) =>
            st.id === subtaskId ? { ...st, done: !st.done } : st
          );
          return { ...t, subtasks: nextSubs };
        }
        return t;
      })
    );
    setSelectedKanbanTask((prev) => {
      if (prev && prev.id === taskId) {
        const nextSubs = (prev.subtasks || []).map((st) =>
          st.id === subtaskId ? { ...st, done: !st.done } : st
        );
        return { ...prev, subtasks: nextSubs };
      }
      return prev;
    });
  };

  // Sprint Week 6: Visual Automations State (DAG Engine & Tarjan Cycle Rejection)
  const [automationsWorkflows, setAutomationsWorkflows] = useState([
    {
      id: 'wf_p0_triage',
      name: 'Auto-Triage P0 Escalations to SRE & Space',
      description: 'Triggered when a new urgent email or form submission needs team review.',
      active: true,
      runCount: 1428,
      lastRun: '2m ago',
      nodes: [
        {
          id: 'n_trigger_1',
          type: 'trigger',
          title: 'Inbound Email Received',
          category: 'Trigger',
          icon: 'Mail',
          x: 40,
          y: 120,
          config: { filter: 'Subject contains [URGENT] or [P0]', source: 'Sample inbox' },
        },
        {
          id: 'n_cond_1',
          type: 'condition',
          title: 'Evaluate Priority SLA',
          category: 'Condition',
          icon: 'Shield',
          x: 360,
          y: 120,
          config: { rule: 'Priority == P0 AND Sender Domain is Enterprise' },
        },
        {
          id: 'n_action_1',
          type: 'action',
          title: 'Spawn P0 Kanban Task',
          category: 'Action',
          icon: 'CheckSquare',
          x: 680,
          y: 50,
          config: { column: 'in_progress', assignee: 'Sara Chen', tag: 'SRE-Incident' },
        },
        {
          id: 'n_action_2',
          type: 'action',
          title: 'Notify #incident-war-room',
          category: 'Action',
          icon: 'MessageSquare',
          x: 680,
          y: 200,
          config: { space: '#incident-war-room', mention: '@channel', alertAudio: true },
        },
      ],
      edges: [
        { id: 'e1', from: 'n_trigger_1', to: 'n_cond_1' },
        { id: 'e2', from: 'n_cond_1', to: 'n_action_1' },
        { id: 'e3', from: 'n_cond_1', to: 'n_action_2' },
      ],
    },
    {
      id: 'wf_huddle_doc',
      name: 'Synthesize Huddle Audio to Living RFC',
      description: 'Turns Huddle notes into a document comment for the team to review.',
      active: true,
      runCount: 614,
      lastRun: '18m ago',
      nodes: [
        {
          id: 'n_trig_huddle',
          type: 'trigger',
          title: 'WebRTC Huddle Concluded',
          category: 'Trigger',
          icon: 'Radio',
          x: 40,
          y: 120,
          config: { source: 'Huddle notes' },
        },
        {
          id: 'n_cond_tokens',
          type: 'condition',
          title: 'Review notes before sharing',
          category: 'Condition',
          icon: 'Sparkles',
          x: 360,
          y: 120,
          config: { threshold: 'Human review required' },
        },
        {
          id: 'n_act_rfc',
          type: 'action',
          title: 'Commit to Living Doc RFC-2026',
          category: 'Action',
          icon: 'FileText',
          x: 680,
          y: 120,
          config: { docId: 'doc_rfc_2026', format: 'Document comment' },
        },
      ],
      edges: [
        { id: 'eh1', from: 'n_trig_huddle', to: 'n_cond_tokens' },
        { id: 'eh2', from: 'n_cond_tokens', to: 'n_act_rfc' },
      ],
    },
  ]);

  const [activeWorkflowId, setActiveWorkflowId] = useState('wf_p0_triage');
  const [isAutomationsTesting, setIsAutomationsTesting] = useState(false);
  const [activeExecutionStep, setActiveExecutionStep] = useState(null);
  const [executionLogs, setExecutionLogs] = useState([
    {
      id: 'ex_1',
      time: '10:31 AM',
      workflow: 'Auto-Triage P0 Escalations',
      duration: 'Sample run',
      status: 'SUCCESS',
      summary: 'Sample email reviewed → Task created → Space updated',
    },
    {
      id: 'ex_2',
      time: '10:44 AM',
      workflow: 'Synthesize Huddle Audio to Living RFC',
      duration: 'Sample run',
      status: 'SUCCESS',
      summary: 'Huddle notes summarized → Shared document updated',
    },
  ]);

  // Tarjan Cycle Rejection Checker: returns true if adding (fromId -> toId) introduces a directed cycle
  const hasDirectedPath = (fromId, toId, edges) => {
    if (fromId === toId) return true;
    const visited = new Set();
    const queue = [fromId];

    while (queue.length > 0) {
      const curr = queue.shift();
      if (curr === toId) return true;
      if (!visited.has(curr)) {
        visited.add(curr);
        const nextNodes = edges.filter((e) => e.from === curr).map((e) => e.to);
        for (const next of nextNodes) {
          queue.push(next);
        }
      }
    }
    return false;
  };

  const addWorkflowEdge = (fromId, toId) => {
    const activeWf = automationsWorkflows.find((w) => w.id === activeWorkflowId);
    if (!activeWf) return false;

    // Check if path exists from toId back to fromId
    if (hasDirectedPath(toId, fromId, activeWf.edges)) {
      addToast('Connection not added', 'This link would create a loop in the sample workflow.', 'error');
      return false;
    }

    // Edge is acyclic - safe to add
    const newEdge = { id: `e_${fromId}_${toId}`, from: fromId, to: toId };
    setAutomationsWorkflows((prev) =>
      prev.map((w) =>
        w.id === activeWorkflowId ? { ...w, edges: [...w.edges, newEdge] } : w
      )
    );
    addToast('Workflow updated', 'Added a connection to the sample workflow.', 'success');
    return true;
  };

  const testAutomationsWorkflow = () => {
    if (isAutomationsTesting) return;
    setIsAutomationsTesting(true);
    addToast('Workflow simulation started', 'Testing the sample workflow with a simulated urgent message.', 'info');

    // Step 1: Trigger fires
    setActiveExecutionStep('trigger');
    setTimeout(() => {
      // Step 2: Condition evaluates
      setActiveExecutionStep('condition');
      setTimeout(() => {
        // Step 3: Actions execute
        setActiveExecutionStep('action');
        setTimeout(() => {
          setActiveExecutionStep('complete');
          setIsAutomationsTesting(false);

          // Add execution record
          const newLog = {
            id: 'ex_' + Date.now(),
            time: 'Just now',
            workflow: 'Auto-Triage P0 Escalations',
            duration: 'Sample run',
            status: 'SUCCESS',
            summary: 'Sample urgent message reviewed → Task created → Space updated',
          };
          setExecutionLogs((prev) => [newLog, ...prev]);

          addToast('Workflow simulation complete', 'The sample steps finished successfully.', 'success');
          setTimeout(() => setActiveExecutionStep(null), 3000);
        }, 800);
      }, 800);
    }, 800);
  };

  // Toasts / Telemetry Feed
  const [toasts, setToasts] = useState([]);

  const addToast = (title, desc, type = 'info') => {
    toastSeq = (toastSeq + 1) % 1000000;
    const id = `t_${Date.now()}_${toastSeq}_${Math.random().toString(36).slice(2, 6)}`;
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

    addToast('Message sent', `Added to #${channelId} in the sample workspace.`, 'info');

    // Trigger AI Agent reaction after 800ms
    setTimeout(() => {
      setIsAgentTyping(true);
      setTimeout(() => {
        setIsAgentTyping(false);
        const agentResponse = {
          id: 'msg_agent_' + Date.now(),
          sender: 'Ukin Agent',
          role: 'Workspace assistant',
          avatar: 'UA',
          avatarBg: 'bg-indigo-600',
          time: 'Just now',
          isAgent: true,
          proposal: {
            title: 'Review launch checklist',
            desc: 'Confirm the handoff details with the launch team.',
            commit: 'PR #1042',
            checks: 'Ready for team review',
            status: 'pending',
          },
          text: 'I connected the launch discussion to its follow-up task and prepared the checklist for your review.',
          reactions: {},
        };
        setMessagesByChannel((prev) => ({
          ...prev,
          [channelId]: [...(prev[channelId] || []), agentResponse],
        }));
        setProposalStatus('pending');
    addToast('Agent suggestion ready', 'A sample follow-up is ready for your review.', 'warning');
      }, 1200);
    }, 600);
  };

  const approveProposal = (channelId = activeChannel) => {
    setProposalStatus('approved');
    addToast('Suggestion approved', 'The sample task was updated and linked to the conversation.', 'success');

    const executionMsg = {
      id: 'msg_exec_' + Date.now(),
      sender: 'Ukin Agent',
      role: 'Workspace assistant',
      avatar: 'UA',
      avatarBg: 'bg-indigo-600',
      time: 'Just now',
      isAgent: true,
      text: '✅ The rollout checklist is ready. The team reviewed the follow-up and closed the sample incident.',
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
      col: 'backlog',
      title: `Escalation: ${email.subject}`,
      description: email.snippet || email.body.slice(0, 140),
      source: `From ${email.sender}`,
      sourceType: 'mail',
      sourceId: email.id,
      priority: 'P0',
      time: 'Just now',
      assignee: 'Sara Chen',
      assigneeAvatar: 'SC',
      subtasks: [
        { id: 'st_e1', text: 'Triage customer SLA error logs', done: false },
        { id: 'st_e2', text: 'Dispatch response to client executive', done: false },
      ],
      auditLog: [
        { time: 'Just now', actor: 'Sara Chen', action: `Converted email from ${email.sender} into P0 task` },
      ],
    };
    setKanbanTasks((prev) => [newTask, ...prev]);
    addToast('Email converted to task', `Created a sample task from ${email.sender}'s message.`, 'success');
  };

  const syncHuddleCommitment = () => {
    setHuddleTaskSynced(true);
    const huddleTask = {
      id: 'tsk_huddle_' + Date.now(),
      col: 'in_progress',
      title: 'Huddle follow-up: review rollout checks',
      description: 'A sample action from the Huddle notes, ready for team review.',
      source: 'From Huddle #18',
      sourceType: 'huddle',
      sourceId: 'huddle_18',
      priority: 'P0',
      time: 'Just now',
      assignee: 'Sara Chen',
      assigneeAvatar: 'SC',
      prLinked: 'PR #1042',
      subtasks: [
        { id: 'st_h1', text: 'Revert token cache TTL to 3600s in PR #1042', done: true },
        { id: 'st_h2', text: 'Review launch environment checks', done: true },
      ],
      auditLog: [
        { time: 'Just now', actor: 'Ukin assistant', action: 'Created from the sample Huddle notes' },
      ],
    };
    setKanbanTasks((prev) => [huddleTask, ...prev]);
    addToast('Huddle follow-up created', 'Added a sample task from the Huddle notes.', 'success');
  };

  // Sprint Week 5: Live Streaming Speech Simulation
  const simulateHuddleUtterance = (speaker = 'Sara Chen', text = 'The rollout checks are ready. I linked them to the launch checklist for review.') => {
    const newTr = {
      id: 'tr_' + Date.now(),
      speaker: speaker,
      role: speaker === 'Sara Chen' ? 'Infra Lead' : speaker === 'Marcus Lindqvist' ? 'VP Eng' : 'CTO',
      time: 'Just now',
      text: text,
      isAgent: false,
    };
    setHuddleTranscript((prev) => [...prev, newTr]);
    addToast('Huddle note added', `Added a sample note from ${speaker} to the conversation.`, 'info');
  };

  // Sprint Week 5: Synthesize Huddle to Living Doc
  const synthesizeHuddleToDoc = () => {
    setHuddleDocSynced(true);
    const newComment = {
      id: 'cm_huddle_' + Date.now(),
      author: 'Ukin assistant',
      role: 'Workspace assistant',
      time: 'Just now',
      text: 'Huddle summary: Sara Chen and Alex Mercer reviewed the token refresh update and agreed to add rollout checks to the launch checklist.',
    };
    setDocComments((prev) => ({
      ...prev,
      'node_huddle_summary': [newComment],
    }));
    addToast('Huddle summary added', 'Added the sample summary to the shared document.', 'success');
  };

  const toggleChecklist = (id) => {
    setDocChecklists((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
    addToast('Checklist updated', 'The sample checklist was updated for the workspace.', 'info');
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
    addToast('Sample reply sent', 'The reply was added to the sample conversation.', 'success');
  };

  const composeNewEmail = ({ to, subject, body }) => {
    if (!to || !subject) return;
    const newId = 'em_' + Date.now();
    const newEm = {
      id: newId,
      sender: to,
      company: to.split('@')[1] || 'External contact',
      subject: subject,
      time: 'Just now',
      unread: false,
      converted: false,
      snippet: body.slice(0, 80) + '...',
      body: body,
      spf: 'SAMPLE',
      dkim: 'SAMPLE',
      dmarc: 'SAMPLE',
      tls: 'Sample header',
      messageId: `<sample-message-${Date.now()}>`,
      references: '<outbound-mail-draft>',
    };
    setEmails((prev) => [newEm, ...prev]);
    setActiveEmailId(newId);
    addToast('Sample email created', `Added a draft for ${to} to the sample inbox.`, 'success');
  };

  const discussEmailInSpace = (email, channelId = 'client-escalations') => {
    setActiveChannel(channelId);
    setActiveModule('chat');

    const bridgeMsg = {
      id: 'msg_bridge_' + Date.now(),
      sender: 'Ukin assistant',
      role: 'Workspace assistant',
      avatar: 'MB',
      avatarBg: 'bg-sky-600',
      time: 'Just now',
      text: `Linked the message from ${email.sender}: "${email.subject}" to #${channelId} in the sample workspace.`,
      reactions: { '👀': 1 },
    };

    setMessagesByChannel((prev) => ({
      ...prev,
      [channelId]: [...(prev[channelId] || []), bridgeMsg],
    }));

    addToast('Message linked', `Added the email context to #${channelId} in the sample workspace.`, 'info');
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
    addToast('Comment added', `Attached the discussion to #${nodeId} in the sample document.`, 'info');
  };

  const addDocChecklistItem = (text) => {
    if (!text?.trim()) return;
    const newItem = {
      id: 'c_' + Date.now(),
      text: text.trim(),
      checked: false,
    };
    setDocChecklists((prev) => [...prev, newItem]);
    addToast('Document updated', 'Added an item to the shared sample document.', 'success');
  };

  const activeMessages = messagesByChannel[activeChannel] || [];
  const activeEmail = emails.find((e) => e.id === activeEmailId) || emails[0];

  // Sprint Week 7: Universal ⌘K Command Palette & Keyboard Shortcuts
  const [isSearchPaletteOpen, setIsSearchPaletteOpen] = useState(false);
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false);

  const openSearchPalette = () => setIsSearchPaletteOpen(true);
  const closeSearchPalette = () => setIsSearchPaletteOpen(false);

  useEffect(() => {
    const handleGlobalShortcuts = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchPaletteOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === '/' || e.code === 'Slash' || e.key === '?')) {
        e.preventDefault();
        setIsKeyboardModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalShortcuts);
    return () => window.removeEventListener('keydown', handleGlobalShortcuts);
  }, []);

  // ── Navigation Morph & Section Scroll-Spy ──
  const [activeSection, setActiveSection] = useState('hero');
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroEl = document.getElementById('hero');
      // Keep the full navigation until the Hero section has completely left view.
      const isHeroInView = heroEl
        ? heroEl.getBoundingClientRect().bottom > 0
        : false;
      setIsHeroVisible(isHeroInView);

      const sectionIds = ['hero', 'workflows', 'features', 'platform', 'security', 'evaluation', 'faq'];
      const scrollPosition = scrollY + window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

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
        selectedKanbanTask,
        setSelectedKanbanTask,
        isTaskDrawerOpen,
        openTaskDrawer,
        closeTaskDrawer,
        moveKanbanTask,
        updateKanbanTask,
        toggleKanbanSubtask,
        automationsWorkflows,
        activeWorkflowId,
        setActiveWorkflowId,
        isAutomationsTesting,
        activeExecutionStep,
        executionLogs,
        addWorkflowEdge,
        testAutomationsWorkflow,
        toasts,
        addToast,
        isDemoDrawerOpen,
        openDemoDrawer,
        closeDemoDrawer,
        complianceModalItem,
        setComplianceModalItem,
        isSearchPaletteOpen,
        openSearchPalette,
        closeSearchPalette,
        isKeyboardModalOpen,
        setIsKeyboardModalOpen,
        activeSection,
        setActiveSection,
        isHeroVisible,
        scrollToSection,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
