import React, { useState, useMemo, memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  GitBranch,
  Play,
  RotateCcw,
  Mail,
  Shield,
  CheckSquare,
  MessageSquare,
  Radio,
  Sparkles,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Layers,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';
import { cn } from '../../lib/cn';

const NODE_HEADER_COLORS = {
  trigger: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  condition: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  action: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
};

const NODE_ICONS = {
  Mail: { icon: Mail, color: 'text-emerald-400' },
  Radio: { icon: Radio, color: 'text-emerald-400' },
  Shield: { icon: Shield, color: 'text-amber-400' },
  Sparkles: { icon: Sparkles, color: 'text-amber-400' },
  CheckSquare: { icon: CheckSquare, color: 'text-sky-400' },
  MessageSquare: { icon: MessageSquare, color: 'text-sky-400' },
  FileText: { icon: FileText, color: 'text-sky-400' },
};

function getNodeIcon(iconName) {
  const item = NODE_ICONS[iconName];
  if (item) {
    const Icon = item.icon;
    return <Icon className={cn('w-4 h-4', item.color)} />;
  }
  return <Layers className="w-4 h-4 text-slate-400" />;
}

function getNodeHeaderColor(type) {
  return NODE_HEADER_COLORS[type] || 'bg-slate-500/15 border-slate-500/30 text-slate-300';
}

function VisualAutomationsCanvas() {
  const reduceMotion = useReducedMotion();
  const {
    automationsWorkflows,
    activeWorkflowId,
    setActiveWorkflowId,
    isAutomationsTesting,
    activeExecutionStep,
    executionLogs,
    addWorkflowEdge,
    testAutomationsWorkflow,
  } = useWorkspace();

  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState('n_trigger_1');

  const activeWorkflow =
    automationsWorkflows.find((w) => w.id === activeWorkflowId) || automationsWorkflows[0];

  const nodeMap = useMemo(() => {
    const map = new Map();
    if (activeWorkflow?.nodes) {
      for (const n of activeWorkflow.nodes) {
        map.set(n.id, n);
      }
    }
    return map;
  }, [activeWorkflow.nodes]);

  const selectedNode =
    nodeMap.get(selectedNodeId) || activeWorkflow?.nodes?.[0] || null;

  // SVG Bezier Curve Generator between two nodes (O(1) node lookup)
  const renderEdgePath = (edge) => {
    const fromNode = nodeMap.get(edge.from);
    const toNode = nodeMap.get(edge.to);
    if (!fromNode || !toNode) return null;

    // Node width is 260px, height is ~110px. Output port is on right middle; input port is on left middle.
    const startX = fromNode.x + 260;
    const startY = fromNode.y + 55;
    const endX = toNode.x;
    const endY = toNode.y + 55;

    const deltaX = Math.max(Math.abs(endX - startX) * 0.5, 40);
    const c1X = startX + deltaX;
    const c1Y = startY;
    const c2X = endX - deltaX;
    const c2Y = endY;

    const pathData = `M ${startX} ${startY} C ${c1X} ${c1Y}, ${c2X} ${c2Y}, ${endX} ${endY}`;

    // Highlight edge during execution steps
    const isStepActive =
      (activeExecutionStep === 'condition' && fromNode.type === 'trigger') ||
      (activeExecutionStep === 'action' && fromNode.type === 'condition');

    return (
      <g key={edge.id}>
        {/* Ambient glow underlay */}
        <path
          d={pathData}
          fill="none"
          stroke={isStepActive ? 'rgba(56, 189, 248, 0.28)' : 'rgba(255, 255, 255, 0.03)'}
          strokeWidth={isStepActive ? '5' : '2'}
          filter={isStepActive ? 'url(#dag-flow-glow)' : undefined}
        />
        {/* Foreground clean path */}
        <path
          d={pathData}
          fill="none"
          stroke={isStepActive ? '#38BDF8' : '#334155'}
          strokeWidth="1.5"
          strokeDasharray={isStepActive ? '6 4' : 'none'}
          className="transition-colors duration-200"
        />
        {/* Gumloop-grade traveling energy pulse along active Bezier spline */}
        {isStepActive && !reduceMotion && (
          <>
            <motion.path
              d={pathData}
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="16 120"
              filter="url(#dag-flow-glow)"
              animate={{ strokeDashoffset: [136, -136] }}
              transition={{ duration: 1.15, repeat: Infinity, ease: 'linear' }}
            />
            <motion.path
              d={pathData}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeDasharray="8 128"
              animate={{ strokeDashoffset: [136, -136] }}
              transition={{ duration: 1.15, repeat: Infinity, ease: 'linear' }}
            />
          </>
        )}
        {/* Terminal and origin anchor points */}
        <circle cx={startX} cy={startY} r="3" fill={isStepActive ? '#38BDF8' : '#64748B'} />
        <circle cx={endX} cy={endY} r="3" fill={isStepActive ? '#38BDF8' : '#64748B'} />
        {/* Reactive reception ping at target port */}
        {isStepActive && !reduceMotion && (
          <motion.circle
            cx={endX}
            cy={endY}
            r="3"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.2"
            animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
            transition={{ duration: 1.15, repeat: Infinity, ease: 'easeOut' }}
            style={{ transformOrigin: `${endX}px ${endY}px` }}
          />
        )}
      </g>
    );
  };

  return (
    <div className="relative flex min-h-[760px] flex-1 select-none flex-col overflow-hidden bg-obsidian-base sm:min-h-[620px] lg:h-full lg:min-h-0">
      {/* Top Automations Toolbar */}
      <div className="flex min-h-14 shrink-0 flex-col items-stretch justify-between gap-3 border-b border-obsidian-border bg-obsidian-canvas px-3 py-2 sm:px-4 lg:flex-row lg:flex-wrap lg:items-center">
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white text-xs sm:text-sm">
              Visual Automations DAG
            </span>
          </div>

          {/* Workflow Picker */}
          <div className="flex max-w-full flex-wrap items-center gap-1 rounded-lg border border-obsidian-border-soft bg-obsidian-base p-1">
            {automationsWorkflows.map((wf) => (
              <button
                key={wf.id}
                type="button"
                onClick={() => {
                  setActiveWorkflowId(wf.id);
                  setSelectedNodeId(wf.nodes[0]?.id || null);
                }}
                className={cn(
                  'px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer truncate max-w-[180px] active:scale-95',
                  activeWorkflowId === wf.id
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                )}
              >
                {wf.name}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls & Simulation Runner */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Tarjan Cycle Rejection Demo Trigger */}
          <button
            type="button"
            onClick={() => {
              // Attempt to link Action -> Trigger dynamically for current workflow to test cycle rejection
              const actionNode = activeWorkflow.nodes.find((n) => n.type === 'action');
              const triggerNode = activeWorkflow.nodes.find((n) => n.type === 'trigger');
              if (actionNode && triggerNode) {
                addWorkflowEdge(actionNode.id, triggerNode.id);
              }
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-slate-300 rounded-lg text-xs font-mono transition-all cursor-pointer active:scale-95"
            title="Attempts to link Action to Trigger to test Tarjan Cycle Rejection"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Test Cycle Rejection</span>
          </button>

          {/* Test Simulation Runner */}
          <button
            type="button"
            disabled={isAutomationsTesting}
            onClick={testAutomationsWorkflow}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm cursor-pointer active:scale-95',
              isAutomationsTesting
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-sky-600 hover:bg-sky-500 text-white'
            )}
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{isAutomationsTesting ? 'Executing DAG...' : 'Test Workflow'}</span>
          </button>
        </div>
      </div>

      {/* Main DAG Node Canvas Surface */}
      <div className="relative flex flex-1 flex-col overflow-hidden md:flex-row">
        <div
          className="relative h-[360px] min-h-0 min-w-0 w-full flex-none cursor-crosshair overflow-auto md:h-auto md:min-h-[480px] md:flex-1"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: '0 0',
          }}
        >
          {/* Dot Grid Background Pattern (#1E293B dots on #07090E base) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 min-w-[1200px] min-h-[800px]"
            style={{
              backgroundImage: 'radial-gradient(#1E293B 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* SVG Connecting Edges Layer */}
          <svg
            className="absolute inset-0 pointer-events-none min-w-[1200px] min-h-[800px] z-10"
            style={{ width: '1200px', height: '800px' }}
          >
            <defs>
              <filter id="dag-flow-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {activeWorkflow.edges.map(renderEdgePath)}
          </svg>

          {/* Nodes Container */}
          <div className="absolute inset-0 min-w-[1200px] min-h-[800px] z-20 p-8">
            {activeWorkflow.nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isExecuting =
                (activeExecutionStep === 'trigger' && node.type === 'trigger') ||
                (activeExecutionStep === 'condition' && node.type === 'condition') ||
                (activeExecutionStep === 'action' && node.type === 'action');

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  style={{
                    position: 'absolute',
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: '260px',
                  }}
                  className={cn(
                    'rounded-xl border bg-obsidian-surface shadow-md shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-200 cursor-pointer select-none relative',
                    isSelected
                      ? 'ring-1 ring-sky-400 border-sky-400 shadow-sm'
                      : 'border-white/[0.08] hover:border-white/[0.16]',
                    isExecuting && 'ring-1 ring-emerald-400 border-emerald-400 scale-[1.01]'
                  )}
                >
                  {/* Subtle execution ambient pulse glow */}
                  {isExecuting && !reduceMotion && (
                    <motion.div
                      className="pointer-events-none absolute -inset-1 rounded-2xl bg-emerald-500/20 blur-sm -z-10"
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: [0.4, 0.85, 0.4] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                      aria-hidden="true"
                    />
                  )}
                  {/* Node Header */}
                  <div
                    className={cn(
                      'px-3 py-2 rounded-t-xl border-b flex items-center justify-between text-xs font-semibold',
                      getNodeHeaderColor(node.type)
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {getNodeIcon(node.icon)}
                      <span className="truncate">{node.title}</span>
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-wider opacity-80">
                      {node.category}
                    </span>
                  </div>

                  {/* Node Body */}
                  <div className="p-3 text-[11px] space-y-1.5 text-slate-300 bg-obsidian-canvas/90 rounded-b-xl">
                    {Object.entries(node.config).map(([key, val]) => (
                      <div key={key} className="flex items-start justify-between gap-2 font-mono">
                        <span className="text-slate-500 capitalize">{key}:</span>
                        <span className="text-slate-200 font-semibold truncate text-right max-w-[150px]">
                          {val.toString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Input Port (Left) */}
                  {node.type !== 'trigger' && (
                    <div
                      className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-obsidian-surface border-2 border-slate-500 flex items-center justify-center hover:scale-125 transition-transform"
                      title="Input Connection Port"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    </div>
                  )}

                  {/* Output Port (Right) */}
                  <div
                    className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-obsidian-surface border-2 border-sky-400 flex items-center justify-center hover:scale-125 transition-transform"
                    title="Output Connection Port"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-300" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Configuration & Execution History Panel (Surface 3.15 Standard) */}
        <div className="flex max-h-[340px] w-full shrink-0 flex-col justify-between overflow-hidden border-t border-obsidian-border bg-obsidian-canvas text-xs md:max-h-none md:w-72 md:border-l md:border-t-0 lg:w-80">
          {/* Panel Top: Selected Node Properties */}
          <div className="p-4 border-b border-obsidian-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-slate-400">
                Node Properties
              </span>
              {selectedNode && (
                <span
                  className={cn(
                    'text-[9px] font-mono px-2 py-0.5 rounded border',
                    getNodeHeaderColor(selectedNode.type)
                  )}
                >
                  {selectedNode.type.toUpperCase()}
                </span>
              )}
            </div>

            {selectedNode ? (
              <div className="space-y-2.5">
                <div>
                  <label className="text-[10px] text-slate-500 font-mono">NODE IDENTIFIER</label>
                  <div className="font-mono text-white text-xs font-semibold">{selectedNode.id}</div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 font-mono">LABEL</label>
                  <div className="text-white font-medium">{selectedNode.title}</div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 font-mono">PARAMETERS</label>
                  <div className="bg-obsidian-base p-2.5 rounded-md border border-obsidian-border-soft font-mono text-[10px] space-y-1.5 text-slate-300">
                    {Object.entries(selectedNode.config).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-indigo-400">{k}: </span>
                        <span className="text-emerald-300">"{v}"</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-slate-500 text-xs py-4 text-center">Click a node on canvas</div>
            )}
          </div>

          {/* Panel Bottom: Execution History Logs */}
          <div className="flex-1 flex flex-col p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase text-slate-400">
                Execution History
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Sample workflow
              </span>
            </div>

            <div className="space-y-2 overflow-y-auto flex-1 font-mono text-[10px]">
              {executionLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-2 rounded bg-obsidian-base border border-obsidian-border-soft space-y-1 hover:border-obsidian-border-strong transition-colors"
                >
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-slate-500">{log.time}</span>
                    <span className="text-emerald-400 font-bold">{log.duration}</span>
                  </div>
                  <div className="text-slate-300 font-sans text-[11px] leading-tight">
                    {log.summary}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Canvas Controls */}
          <div className="p-3 border-t border-obsidian-border bg-obsidian-surface/40 flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono">Zoom: {Math.round(zoomLevel * 100)}%</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.1))}
                className="p-1 hover:text-white rounded hover:bg-white/5 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="p-1 hover:text-white rounded hover:bg-white/5 cursor-pointer"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                className="p-1 hover:text-white rounded hover:bg-white/5 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(VisualAutomationsCanvas);
