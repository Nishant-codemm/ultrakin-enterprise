import React, { memo, useId } from 'react';
import { motion, useReducedMotion, useTime, useTransform } from 'framer-motion';
import UltrakinLogo from '../primitives/UltrakinLogo';
import { PRODUCT_ICON_CONFIG } from '../../data/integrationData';

/* ─── Center Routing Engine Coordinate ─── */
const CENTER = { x: 310, y: 210 };

/* ─── Extension Node Physics & Topology Parameters ─── */
const EXTENSION_NODES_CONFIG = {
  GitHub: {
    baseX: 135,
    baseY: 95,
    ampX: 4.5,
    ampY: 5.5,
    freqX: (2 * Math.PI) / 16, // 16s period: slow, confident
    freqY: (2 * Math.PI) / 14,
    phaseX: 0.4,
    phaseY: 1.2,
    color: '#94a3b8',
    glow: 'rgba(148,163,184,0.5)',
    quadrant: 'west',
    depthZ: 0.55, // foreground
    role: 'Code Context',
  },
  Lists: {
    baseX: 95,
    baseY: 215,
    ampX: 5.0,
    ampY: 4.0,
    freqX: (2 * Math.PI) / 11, // 11s period: structured cadence
    freqY: (2 * Math.PI) / 12,
    phaseX: 1.8,
    phaseY: 2.6,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.5)',
    quadrant: 'west',
    depthZ: -0.1, // mid-ground
    role: 'State Tracking',
  },
  Forms: {
    baseX: 145,
    baseY: 335,
    ampX: 5.5,
    ampY: 5.0,
    freqX: (2 * Math.PI) / 13, // 13s period: reactive intake
    freqY: (2 * Math.PI) / 15,
    phaseX: 3.2,
    phaseY: 0.8,
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.5)',
    quadrant: 'west',
    depthZ: -0.45, // background layer
    role: 'Signal Intake',
  },
  PostHog: {
    baseX: 485,
    baseY: 90,
    ampX: 5.0,
    ampY: 6.0,
    freqX: (2 * Math.PI) / 9.5, // 9.5s period: telemetry pulse
    freqY: (2 * Math.PI) / 10.5,
    phaseX: 2.1,
    phaseY: 3.7,
    color: '#ea580c',
    glow: 'rgba(234,88,12,0.55)',
    quadrant: 'east',
    depthZ: 0.3, // mid-foreground
    role: 'Live Telemetry',
  },
  'MCP tools': {
    baseX: 525,
    baseY: 210,
    ampX: 6.0,
    ampY: 4.5,
    freqX: (2 * Math.PI) / 7.5, // 7.5s period: agile intelligence micro-flux
    freqY: (2 * Math.PI) / 8.5,
    phaseX: 0.9,
    phaseY: 1.5,
    color: '#0284c7',
    glow: 'rgba(2,132,199,0.55)',
    quadrant: 'east',
    depthZ: 0.75, // foreground bridge
    role: 'Model Gateway',
  },
  Journeys: {
    baseX: 475,
    baseY: 335,
    ampX: 6.5,
    ampY: 5.5,
    freqX: (2 * Math.PI) / 14, // 14s period: fluid lifecycle drift
    freqY: (2 * Math.PI) / 13,
    phaseX: 4.1,
    phaseY: 2.2,
    color: '#c026d3',
    glow: 'rgba(192,38,211,0.5)',
    quadrant: 'east',
    depthZ: -0.35, // background layer
    role: 'Workflow Mesh',
  },
};

/* ─── Static Ambient Coordinates for Background Particles ─── */
const AMBIENT_PARTICLES = [
  { x: 80, y: 130, r: 1.1, o: 0.22 },
  { x: 220, y: 55, r: 1.3, o: 0.28 },
  { x: 400, y: 60, r: 1.0, o: 0.25 },
  { x: 550, y: 130, r: 1.2, o: 0.24 },
  { x: 65, y: 285, r: 1.0, o: 0.2 },
  { x: 225, y: 370, r: 1.2, o: 0.26 },
  { x: 395, y: 375, r: 1.1, o: 0.25 },
  { x: 555, y: 280, r: 1.3, o: 0.28 },
  { x: 210, y: 160, r: 0.9, o: 0.18 },
  { x: 410, y: 160, r: 0.9, o: 0.18 },
  { x: 210, y: 260, r: 0.9, o: 0.18 },
  { x: 410, y: 260, r: 0.9, o: 0.18 },
];

/* ─── Synaptic Vector Spline Generator ─── */
function getRoutingSpline(nodeName, coords) {
  const { x, y } = coords;
  switch (nodeName) {
    case 'GitHub':
      return `M ${x} ${y} C ${x + 65} ${y + 15}, ${CENTER.x - 75} ${CENTER.y - 20}, ${CENTER.x} ${CENTER.y}`;
    case 'Lists':
      return `M ${x} ${y} C ${x + 75} ${y}, ${CENTER.x - 60} ${CENTER.y}, ${CENTER.x} ${CENTER.y}`;
    case 'Forms':
      return `M ${x} ${y} C ${x + 65} ${y - 15}, ${CENTER.x - 75} ${CENTER.y + 20}, ${CENTER.x} ${CENTER.y}`;
    case 'PostHog':
      return `M ${x} ${y} C ${x - 65} ${y + 15}, ${CENTER.x + 75} ${CENTER.y - 20}, ${CENTER.x} ${CENTER.y}`;
    case 'MCP tools':
      return `M ${x} ${y} C ${x - 75} ${y}, ${CENTER.x + 60} ${CENTER.y}, ${CENTER.x} ${CENTER.y}`;
    case 'Journeys':
      return `M ${x} ${y} C ${x - 65} ${y - 15}, ${CENTER.x + 75} ${CENTER.y + 20}, ${CENTER.x} ${CENTER.y}`;
    default:
      return `M ${x} ${y} L ${CENTER.x} ${CENTER.y}`;
  }
}

/* ─── Extension Node Component ─── */
function ExtensionNode({
  item,
  config,
  time,
  isSelected,
  isHovered,
  onHover,
  onLeave,
  onClick,
  reduceMotion,
}) {
  const iconConfig = PRODUCT_ICON_CONFIG[item.name];
  const Icon = iconConfig?.icon;

  const x = useTransform(time, (ms) => {
    if (reduceMotion) return config.baseX;
    const t = ms / 1000;
    return config.baseX + config.ampX * Math.sin(config.freqX * t + config.phaseX);
  });

  const y = useTransform(time, (ms) => {
    if (reduceMotion) return config.baseY;
    const t = ms / 1000;
    return config.baseY + config.ampY * Math.cos(config.freqY * t + config.phaseY);
  });

  const depthScale = 1.0 + config.depthZ * 0.06;
  const depthOpacity = 0.82 + (config.depthZ + 0.5) * 0.12;

  const scale = useTransform(time, () => {
    const activeBoost = isHovered ? 1.12 : isSelected ? 1.06 : 1.0;
    return depthScale * activeBoost;
  });

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        x,
        y,
        scale,
        opacity: isSelected || isHovered ? 1.0 : depthOpacity,
        zIndex: isSelected ? 35 : isHovered ? 30 : config.depthZ > 0 ? 25 : 15,
      }}
      className="pointer-events-auto"
    >
      <div style={{ transform: 'translate(-50%, -50%)' }}>
        <button
          type="button"
          aria-pressed={isSelected}
          onClick={onClick}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          className="group relative flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full cursor-pointer"
        >
          {/* Adaptive Lens Halo with Neural Tick Marks */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2 rounded-full border transition-all duration-300"
            style={{
              borderColor: isSelected || isHovered ? config.glow : 'rgba(56,189,248,0.14)',
              boxShadow: isSelected || isHovered ? `0 0 16px ${config.glow}` : 'none',
              borderStyle: isSelected || isHovered ? 'solid' : 'dashed',
            }}
          />

          {/* Node Chassis */}
          <div
            className="relative flex h-[38px] w-[38px] items-center justify-center rounded-full border transition-all duration-200 shadow-[0_8px_20px_rgba(0,0,0,0.7)]"
            style={{
              borderColor: isSelected
                ? 'rgba(255,255,255,0.45)'
                : isHovered
                ? 'rgba(255,255,255,0.3)'
                : 'rgba(255,255,255,0.14)',
              backgroundColor: isSelected
                ? '#121826'
                : isHovered
                ? '#0f1420'
                : 'rgba(10,14,22,0.92)',
            }}
          >
            {/* Inner Core Icon Badge */}
            <div
              className="flex h-[24px] w-[24px] items-center justify-center rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.5)] transition-transform duration-150 group-hover:scale-105"
              style={{ backgroundColor: config.color }}
            >
              {Icon && <Icon size={13} strokeWidth={2.2} className="text-white shrink-0" />}
            </div>

            {/* Specular Highlight Arc */}
            <span className="pointer-events-none absolute inset-x-1.5 top-0.5 h-1/2 rounded-t-full bg-gradient-to-b from-white/25 to-transparent" />
          </div>

          {/* Service Name Label */}
          <span
            className="mt-1.5 whitespace-nowrap text-[9.5px] font-medium tracking-wide transition-colors duration-150 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
            style={{
              color: isSelected ? '#ffffff' : isHovered ? '#e2e8f0' : '#94a3b8',
              fontWeight: isSelected || isHovered ? 600 : 500,
            }}
          >
            {item.name}
          </span>
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Neural Routing Vector Branch with Flowing Telemetry ─── */
function RoutingSplineBranch({
  nodeName,
  config,
  time,
  isActive,
  color,
  reduceMotion,
}) {
  const pathD = useTransform(time, (ms) => {
    if (reduceMotion) {
      return getRoutingSpline(nodeName, { x: config.baseX, y: config.baseY });
    }
    const t = ms / 1000;
    const x = config.baseX + config.ampX * Math.sin(config.freqX * t + config.phaseX);
    const y = config.baseY + config.ampY * Math.cos(config.freqY * t + config.phaseY);
    return getRoutingSpline(nodeName, { x, y });
  });

  return (
    <g className="transition-opacity duration-300">
      {/* Background Neural Vector Trace */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={isActive ? color : 'rgba(148,163,184,0.18)'}
        strokeWidth={isActive ? '2.4' : '0.85'}
        strokeOpacity={isActive ? 0.35 : 0.4}
        strokeLinecap="round"
      />

      {/* High-Energy Synaptic Center Core */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={isActive ? '#ffffff' : 'rgba(165,180,252,0.35)'}
        strokeWidth={isActive ? '1.2' : '0.6'}
        strokeOpacity={isActive ? 0.9 : 0.25}
        strokeLinecap="round"
      />

      {/* Continuous Live Telemetry Packet Stream */}
      {!reduceMotion && (
        <motion.path
          d={pathD}
          fill="none"
          stroke={isActive ? '#ffffff' : color}
          strokeWidth={isActive ? '1.8' : '1.1'}
          strokeDasharray={isActive ? '6 20' : '4 32'}
          strokeLinecap="round"
          className="transition-all duration-300"
          style={{
            opacity: isActive ? 0.95 : 0.35,
            animation: isActive
              ? 'telemetryStream 1.8s linear infinite'
              : 'telemetryStream 4.2s linear infinite',
          }}
        />
      )}
    </g>
  );
}

/* ─── Lateral Synaptic Bridges (Inter-Node Neural Cross-Flow) ─── */
function LateralNeuralBridges({ time, reduceMotion }) {
  const bridgeD1 = useTransform(time, (ms) => {
    const t = reduceMotion ? 0 : ms / 1000;
    const gh = EXTENSION_NODES_CONFIG.GitHub;
    const ls = EXTENSION_NODES_CONFIG.Lists;
    const ghX = gh.baseX + gh.ampX * Math.sin(gh.freqX * t + gh.phaseX);
    const ghY = gh.baseY + gh.ampY * Math.cos(gh.freqY * t + gh.phaseY);
    const lsX = ls.baseX + ls.ampX * Math.sin(ls.freqX * t + ls.phaseX);
    const lsY = ls.baseY + ls.ampY * Math.cos(ls.freqY * t + ls.phaseY);
    return `M ${ghX} ${ghY} Q ${(ghX + lsX) / 2 - 25} ${(ghY + lsY) / 2} ${lsX} ${lsY}`;
  });

  const bridgeD2 = useTransform(time, (ms) => {
    const t = reduceMotion ? 0 : ms / 1000;
    const ls = EXTENSION_NODES_CONFIG.Lists;
    const fm = EXTENSION_NODES_CONFIG.Forms;
    const lsX = ls.baseX + ls.ampX * Math.sin(ls.freqX * t + ls.phaseX);
    const lsY = ls.baseY + ls.ampY * Math.cos(ls.freqY * t + ls.phaseY);
    const fmX = fm.baseX + fm.ampX * Math.sin(fm.freqX * t + fm.phaseX);
    const fmY = fm.baseY + fm.ampY * Math.cos(fm.freqY * t + fm.phaseY);
    return `M ${lsX} ${lsY} Q ${(lsX + fmX) / 2 - 25} ${(lsY + fmY) / 2} ${fmX} ${fmY}`;
  });

  const bridgeD3 = useTransform(time, (ms) => {
    const t = reduceMotion ? 0 : ms / 1000;
    const ph = EXTENSION_NODES_CONFIG.PostHog;
    const mcp = EXTENSION_NODES_CONFIG['MCP tools'];
    const phX = ph.baseX + ph.ampX * Math.sin(ph.freqX * t + ph.phaseX);
    const phY = ph.baseY + ph.ampY * Math.cos(ph.freqY * t + ph.phaseY);
    const mcpX = mcp.baseX + mcp.ampX * Math.sin(mcp.freqX * t + mcp.phaseX);
    const mcpY = mcp.baseY + mcp.ampY * Math.cos(mcp.freqY * t + mcp.phaseY);
    return `M ${phX} ${phY} Q ${(phX + mcpX) / 2 + 25} ${(phY + mcpY) / 2} ${mcpX} ${mcpY}`;
  });

  const bridgeD4 = useTransform(time, (ms) => {
    const t = reduceMotion ? 0 : ms / 1000;
    const mcp = EXTENSION_NODES_CONFIG['MCP tools'];
    const jr = EXTENSION_NODES_CONFIG.Journeys;
    const mcpX = mcp.baseX + mcp.ampX * Math.sin(mcp.freqX * t + mcp.phaseX);
    const mcpY = mcp.baseY + mcp.ampY * Math.cos(mcp.freqY * t + mcp.phaseY);
    const jrX = jr.baseX + jr.ampX * Math.sin(jr.freqX * t + jr.phaseX);
    const jrY = jr.baseY + jr.ampY * Math.cos(jr.freqY * t + jr.phaseY);
    return `M ${mcpX} ${mcpY} Q ${(mcpX + jrX) / 2 + 25} ${(mcpY + jrY) / 2} ${jrX} ${jrY}`;
  });

  return (
    <g stroke="rgba(148,163,184,0.12)" strokeWidth="0.75" fill="none" strokeDasharray="3 5">
      <motion.path d={bridgeD1} />
      <motion.path d={bridgeD2} />
      <motion.path d={bridgeD3} />
      <motion.path d={bridgeD4} />
    </g>
  );
}

/* ─── Main Adaptive Mesh Intelligence Component ─── */
function AdaptiveMeshIntelligence({
  visible,
  current,
  activeNode: _activeNode,
  hoveredNode,
  setHoveredNode,
  setSelected,
  inView: _inView,
}) {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const time = useTime();

  // Active or hovered extension target
  const activeTargetName = hoveredNode || current?.name || 'GitHub';
  const activeConfig = EXTENSION_NODES_CONFIG[activeTargetName];
  const isWestActive = activeConfig?.quadrant === 'west';
  const isEastActive = activeConfig?.quadrant === 'east';

  return (
    <div className="relative h-[430px] w-full overflow-hidden select-none bg-[radial-gradient(ellipse_80%_75%_at_50%_50%,#0f172a_0%,#090d16_70%,#04060a_100%)]">
      {/* ── CSS KEYFRAMES FOR TELEMETRY STREAM PACKETS ── */}
      <style>{`
        @keyframes telemetryStream {
          from { stroke-dashoffset: 48; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* ── SVG LAYER: Adaptive Intelligence Lattice ── */}
      <svg
        viewBox="0 0 620 420"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full pointer-events-none"
        role="img"
        aria-label="Ultrakin Adaptive Intelligence Mesh"
      >
        <defs>
          {/* Gravitational Core Flux Gradient */}
          <radialGradient id={`mesh-core-flux-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.32" />
            <stop offset="45%" stopColor="#3b82f6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>

          {/* Ambient Intelligence Field Contours */}
          <radialGradient id={`ambient-field-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.08" />
            <stop offset="60%" stopColor="#6366f1" stopOpacity="0.03" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Layer 1: Ambient Background Telemetry Dust & Field Contours ── */}
        <circle cx={CENTER.x} cy={CENTER.y} r="185" fill={`url(#ambient-field-${id})`} />

        {/* Faint Concentric Neural Field Contours */}
        <g stroke="rgba(56,189,248,0.06)" strokeWidth="0.6" fill="none">
          <circle cx={CENTER.x} cy={CENTER.y} r="130" strokeDasharray="3 8" />
          <circle cx={CENTER.x} cy={CENTER.y} r="190" strokeDasharray="2 10" />
          <circle cx={CENTER.x} cy={CENTER.y} r="250" strokeDasharray="4 12" />
          <line x1="70" y1={CENTER.y} x2="550" y2={CENTER.y} strokeDasharray="2 8" />
        </g>

        {/* Floating Telemetry Dust Micro-Stars */}
        {AMBIENT_PARTICLES.map((p, idx) => (
          <circle
            key={`ambient-p-${idx}`}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill="#94a3b8"
            opacity={p.o}
          />
        ))}

        {/* ── Layer 2: Lateral Synaptic Bridges (Inter-Node Mesh Cross-Flow) ── */}
        <LateralNeuralBridges time={time} reduceMotion={reduceMotion} />

        {/* ── Layer 3: Synaptic Routing Splines (Nodes to Ultrakin Core) ── */}
        {visible.map((item) => {
          const config = EXTENSION_NODES_CONFIG[item.name];
          if (!config) return null;
          const isActive = item.name === activeTargetName;

          return (
            <RoutingSplineBranch
              key={`spline-${item.name}`}
              nodeName={item.name}
              config={config}
              time={time}
              isActive={isActive}
              color={config.color}
              reduceMotion={reduceMotion}
            />
          );
        })}

        {/* ── Layer 4: Central Ambient Gravitational Flux ── */}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={hoveredNode ? 115 : 95}
          fill={`url(#mesh-core-flux-${id})`}
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {/* ── LAYER 5: Fixed Central Ultrakin Core Routing Engine ── */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
        <div
          className="relative flex h-[82px] w-[82px] items-center justify-center rounded-[1.6rem] border shadow-[0_24px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300"
          style={{
            borderColor: hoveredNode
              ? 'rgba(56,189,248,0.5)'
              : 'rgba(255,255,255,0.16)',
            background: 'linear-gradient(145deg, #0e1e38, #070e1b 70%)',
            boxShadow: hoveredNode
              ? '0 0 32px -4px rgba(2,132,199,0.5), 0 20px 40px -10px rgba(0,0,0,0.9)'
              : '0 0 20px -6px rgba(2,132,199,0.25), 0 16px 36px -10px rgba(0,0,0,0.85)',
          }}
        >
          {/* Specular Sheen */}
          <span className="pointer-events-none absolute inset-x-2 top-1.5 h-1/3 rounded-t-2xl bg-gradient-to-b from-white/[0.12] to-transparent" />

          {/* Central Ultrakin Core Icon */}
          <UltrakinLogo size={36} />

          {/* Active Reactor LED Status Light */}
          <span className="absolute top-2.5 right-2.5 flex h-2 w-2 items-center justify-center">
            <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
          </span>

          {/* West Ingress Routing Port */}
          <span
            className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-5 w-1.5 rounded-l-xs border transition-all duration-300"
            style={{
              backgroundColor: isWestActive ? '#0284c7' : 'rgba(2,132,199,0.4)',
              borderColor: isWestActive ? '#38bdf8' : 'rgba(56,189,248,0.5)',
              boxShadow: isWestActive ? '0 0 10px #38bdf8' : 'none',
            }}
          />

          {/* East Egress Routing Port */}
          <span
            className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-5 w-1.5 rounded-r-xs border transition-all duration-300"
            style={{
              backgroundColor: isEastActive ? '#0284c7' : 'rgba(2,132,199,0.4)',
              borderColor: isEastActive ? '#38bdf8' : 'rgba(56,189,248,0.5)',
              boxShadow: isEastActive ? '0 0 10px #38bdf8' : 'none',
            }}
          />

          {/* Cardinal North & South Flanges */}
          <span className="absolute left-1/2 -top-1.5 -translate-x-1/2 h-1.5 w-4 rounded-t-xs bg-cyan-600/50 border border-cyan-400/60" />
          <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 h-1.5 w-4 rounded-b-xs bg-cyan-600/50 border border-cyan-400/60" />
        </div>
      </div>

      {/* ── LAYER 6: Autonomous Floating Extension Nodes ── */}
      {visible.map((item) => {
        const config = EXTENSION_NODES_CONFIG[item.name];
        if (!config) return null;

        return (
          <ExtensionNode
            key={item.name}
            item={item}
            config={config}
            time={time}
            isSelected={item.name === current.name}
            isHovered={item.name === hoveredNode}
            onHover={() => setHoveredNode(item.name)}
            onLeave={() => setHoveredNode(null)}
            onClick={() => setSelected(item.name)}
            reduceMotion={reduceMotion}
          />
        );
      })}
    </div>
  );
}

export default memo(AdaptiveMeshIntelligence);
