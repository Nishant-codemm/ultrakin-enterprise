import React, { useState } from 'react';
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

export default function VisualAutomationsCanvas() {
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

  const getNodeIcon = (iconName) => {
    switch (iconName) {
      case 'Mail':
        return <Mail className="w-4 h-4 text-emerald-400" />;
      case 'Shield':
        return <Shield className="w-4 h-4 text-amber-400" />;
      case 'CheckSquare':
        return <CheckSquare className="w-4 h-4 text-indigo-400" />;
      case 'MessageSquare':
        return <MessageSquare className="w-4 h-4 text-indigo-400" />;
      case 'Radio':
        return <Radio className="w-4 h-4 text-emerald-400" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'FileText':
        return <FileText className="w-4 h-4 text-indigo-400" />;
      default:
        return <Layers className="w-4 h-4 text-slate-400" />;
    }
  };

  const getNodeHeaderColor = (type) => {
    switch (type) {
      case 'trigger':
        return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300';
      case 'condition':
        return 'bg-amber-500/15 border-amber-500/30 text-amber-300';
      case 'action':
        return 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300';
      default:
        return 'bg-slate-500/15 border-slate-500/30 text-slate-300';
    }
  };

  const selectedNode = activeWorkflow.nodes.find((n) => n.id === selectedNodeId);

  // SVG Bezier Curve Generator between two nodes
  const renderEdgePath = (edge) => {
    const fromNode = activeWorkflow.nodes.find((n) => n.id === edge.from);
    const toNode = activeWorkflow.nodes.find((n) => n.id === edge.to);
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
        {/* Background glow path */}
        <path
          d={pathData}
          fill="none"
          stroke={isStepActive ? 'rgba(99, 102, 241, 0.4)' : 'rgba(255, 255, 255, 0.05)'}
          strokeWidth={isStepActive ? '6' : '3'}
        />
        {/* Foreground sharp path */}
        <path
          d={pathData}
          fill="none"
          stroke={isStepActive ? '#818CF8' : '#6366F1'}
          strokeWidth="2"
          strokeDasharray={isStepActive ? '6 4' : 'none'}
          className={isStepActive ? 'animate-pulse' : ''}
        />
        {/* Terminal arrow point */}
        <circle cx={endX} cy={endY} r="3" fill="#818CF8" />
        <circle cx={startX} cy={startY} r="3" fill="#6366F1" />
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
                onClick={() => setActiveWorkflowId(wf.id)}
                className={cn(
                  'px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer truncate max-w-[180px]',
                  activeWorkflowId === wf.id
                    ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
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
              // Attempt to link Action -> Trigger (which creates a directed cycle)
              addWorkflowEdge('n_action_1', 'n_trigger_1');
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 text-rose-300 rounded text-xs font-mono transition-all cursor-pointer"
            title="Attempts to link Action to Trigger to test Tarjan Cycle Rejection"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Test Cycle Rejection</span>
          </button>

          {/* Test Simulation Runner */}
          <button
            type="button"
            disabled={isAutomationsTesting}
            onClick={testAutomationsWorkflow}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition-all shadow-md cursor-pointer',
              isAutomationsTesting
                ? 'bg-amber-500/30 text-amber-200 border border-amber-500/40 animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
            )}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
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
            {activeWorkflow.edges.map(renderEdgePath)}
          </svg>

          {/* Nodes Container */}
          <div className="absolute inset-0 min-w-[1200px] min-h-[800px] z-20 p-8">
            {activeWorkflow.nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
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
                    'rounded-lg border bg-obsidian-surface shadow-lg transition-all duration-200 cursor-pointer select-none',
                    isSelected
                      ? 'ring-2 ring-indigo-500 border-indigo-400 shadow-indigo-500/20'
                      : 'border-obsidian-border-medium hover:border-white/20',
                    isExecuting && 'ring-2 ring-emerald-400 shadow-emerald-500/30 scale-[1.02]'
                  )}
                >
                  {/* Node Header */}
                  <div
                    className={cn(
                      'px-3 py-2 rounded-t-lg border-b flex items-center justify-between text-xs font-semibold',
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
                  <div className="p-3 text-[11px] space-y-1.5 text-slate-300 bg-obsidian-canvas/90 rounded-b-lg">
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
                      className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-obsidian-surface border-2 border-indigo-400 flex items-center justify-center hover:scale-125 transition-transform"
                      title="Input Connection Port"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-300" />
                    </div>
                  )}

                  {/* Output Port (Right) */}
                  <div
                    className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-obsidian-surface border-2 border-emerald-400 flex items-center justify-center hover:scale-125 transition-transform"
                    title="Output Connection Port"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
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
