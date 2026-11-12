import React, { memo, useId } from 'react';
import { motion, useReducedMotion, useTime, useTransform } from 'framer-motion';
import UltrakinLogo from '../primitives/UltrakinLogo';
import { PRODUCT_ICON_CONFIG } from '../../data/integrationData';

/* ─── Celestial Orbital Parameters ─── */
const CENTER = { x: 310, y: 210 };

/* Built-in satellites (7 nodes) */
const BUILT_IN_ORBITAL_CONFIGS = {
  // Inner Orbital Ring α (Tau = 54s, Tilt: -14°)
  Mail: {
    ring: 1,
    a: 138,
    b: 64,
    tilt: -14,
    period: 54, // seconds for full orbit
    initialPhase: 260, // degrees (top-north quadrant)
    color: '#dc2626',
    glow: 'rgba(220,38,38,0.5)',
  },
  Docs: {
    ring: 1,
    a: 138,
    b: 64,
    tilt: -14,
    period: 54,
    initialPhase: 80, // degrees (bottom-south quadrant)
    color: '#2563eb',
    glow: 'rgba(37,99,235,0.5)',
  },

  // Mid Equatorial Operations Ring β (Tau = 72s, Tilt: +12°)
  Spaces: {
    ring: 2,
    a: 208,
    b: 92,
    tilt: 12,
    period: 72,
    initialPhase: 185, // degrees (west quadrant)
    color: '#5c5bd6',
    glow: 'rgba(92,91,214,0.5)',
  },
  Tasks: {
    ring: 2,
    a: 208,
    b: 92,
    tilt: 12,
    period: 72,
    initialPhase: 5, // degrees (east quadrant)
    color: '#10b981',
    glow: 'rgba(16,185,129,0.5)',
  },

  // Outer Inclined Telemetry Ring γ (Tau = 92s, Tilt: -24°)
  Meetings: {
    ring: 3,
    a: 268,
    b: 118,
    tilt: -24,
    period: 92,
    initialPhase: 40, // degrees (north-east quadrant)
    color: '#059669',
    glow: 'rgba(5,150,105,0.5)',
  },
  Calendar: {
    ring: 3,
    a: 268,
    b: 118,
    tilt: -24,
    period: 92,
    initialPhase: 300, // degrees (south-east quadrant)
    color: '#d97706',
    glow: 'rgba(217,119,6,0.5)',
  },
  'Ukin agent': {
    ring: 3,
    a: 268,
    b: 118,
    tilt: -24,
    period: 92,
    initialPhase: 190, // degrees (south-west quadrant)
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.5)',
  },
};

/* Extension example satellites (6 nodes across 3 orbital shells) */
const EXTENSION_ORBITAL_CONFIGS = {
  // Inner Shell α — Tilt: -18°, Tau: 58s
  GitHub: {
    ring: 1,
    a: 138,
    b: 60,
    tilt: -18,
    period: 58,
    initialPhase: 255, // north quadrant
    color: '#64748b',
    glow: 'rgba(100,116,139,0.5)',
  },
  Journeys: {
    ring: 1,
    a: 138,
    b: 60,
    tilt: -18,
    period: 58,
    initialPhase: 75, // south quadrant
    color: '#c026d3',
    glow: 'rgba(192,38,211,0.5)',
  },

  // Mid Shell β — Tilt: +8°, Tau: 76s
  Lists: {
    ring: 2,
    a: 208,
    b: 90,
    tilt: 8,
    period: 76,
    initialPhase: 182, // west quadrant
    color: '#10b981',
    glow: 'rgba(16,185,129,0.5)',
  },
  'MCP tools': {
    ring: 2,
    a: 208,
    b: 90,
    tilt: 8,
    period: 76,
    initialPhase: 2, // east quadrant
    color: '#0284c7',
    glow: 'rgba(2,132,199,0.5)',
  },

  // Outer Shell γ — Tilt: -26°, Tau: 96s
  PostHog: {
    ring: 3,
    a: 268,
    b: 116,
    tilt: -26,
    period: 96,
    initialPhase: 42, // north-east
    color: '#ea580c',
    glow: 'rgba(234,88,12,0.5)',
  },
  Forms: {
    ring: 3,
    a: 268,
    b: 116,
    tilt: -26,
    period: 96,
    initialPhase: 215, // south-west
    color: '#2563eb',
    glow: 'rgba(37,99,235,0.5)',
  },
};

/* Unified config selector */
function getOrbitalConfig(itemName, selectedCat) {
  if (selectedCat === 'Extension examples') {
    return EXTENSION_ORBITAL_CONFIGS[itemName] || null;
  }
  return BUILT_IN_ORBITAL_CONFIGS[itemName] || null;
}

/* ─── Mathematical 3D-to-2D Coordinate Calculator ─── */
function getOrbitalCoords(config, tSec) {
  const { a, b, tilt, period, initialPhase } = config;
  const omega = (2 * Math.PI) / period;
  const radPhase = (initialPhase * Math.PI) / 180;
  const theta = radPhase + omega * tSec;

  // Un-rotated elliptical coordinates
  const u = a * Math.cos(theta);
  const v = b * Math.sin(theta);

  // Rotate in 2D by orbital plane tilt angle
  const radTilt = (tilt * Math.PI) / 180;
  const cosT = Math.cos(radTilt);
  const sinT = Math.sin(radTilt);

  const x = CENTER.x + u * cosT - v * sinT;
  const y = CENTER.y + u * sinT + v * cosT;
  const z = Math.sin(theta); // Normalized depth [-1, 1]

  return { x, y, z };
}

/* ─── Floating Service Satellite Node Component ─── */
function SatelliteNode({
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

  const staticCoords = getOrbitalCoords(config, 0);

  const x = useTransform(time, (ms) => {
    if (reduceMotion) return staticCoords.x;
    return getOrbitalCoords(config, ms / 1000).x;
  });

  const y = useTransform(time, (ms) => {
    if (reduceMotion) return staticCoords.y;
    return getOrbitalCoords(config, ms / 1000).y;
  });

  const scale = useTransform(time, (ms) => {
    if (reduceMotion) return isHovered ? 1.12 : isSelected ? 1.06 : 1;
    const { z } = getOrbitalCoords(config, ms / 1000);
    const depthScale = 1.0 + z * 0.08;
    const activeBoost = isHovered ? 1.12 : isSelected ? 1.06 : 1;
    return depthScale * activeBoost;
  });

  const opacity = useTransform(time, (ms) => {
    if (reduceMotion) return 1;
    const { z } = getOrbitalCoords(config, ms / 1000);
    return 0.75 + (z + 1) * 0.125; // range: [0.75, 1.0]
  });

  const zIndex = useTransform(time, (ms) => {
    if (isSelected) return 35;
    if (isHovered) return 30;
    if (reduceMotion) return 22;
    const { z } = getOrbitalCoords(config, ms / 1000);
    return z > 0 ? 25 : 12; // Z-depth sorting: >0 in front of core (z=20), <0 behind core!
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
        opacity,
        zIndex,
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
          className="group relative flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-full cursor-pointer"
        >
          {/* Concentric Telemetry Orbit Halo */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2 rounded-full border transition-all duration-300"
            style={{
              borderColor: isSelected || isHovered ? config.glow : 'rgba(165,180,252,0.12)',
              boxShadow: isSelected || isHovered ? `0 0 14px ${config.glow}` : 'none',
              borderStyle: isSelected || isHovered ? 'solid' : 'dashed',
            }}
          />

          {/* Satellite Puck Chassis */}
          <div
            className="relative flex h-[38px] w-[38px] items-center justify-center rounded-full border transition-all duration-200 shadow-[0_6px_18px_rgba(0,0,0,0.65)]"
            style={{
              borderColor: isSelected
                ? 'rgba(255,255,255,0.45)'
                : isHovered
                ? 'rgba(255,255,255,0.3)'
                : 'rgba(255,255,255,0.14)',
              backgroundColor: isSelected
                ? '#141a29'
                : isHovered
                ? '#101522'
                : 'rgba(12,16,24,0.92)',
            }}
          >
            {/* Inner Product Icon Core */}
            <div
              className="flex h-[24px] w-[24px] items-center justify-center rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-transform duration-150 group-hover:scale-105"
              style={{ backgroundColor: config.color }}
            >
              {Icon && <Icon size={13} strokeWidth={2.2} className="text-white shrink-0" />}
            </div>

            {/* Specular Highlight Arc */}
            <span className="pointer-events-none absolute inset-x-1.5 top-0.5 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent" />
          </div>

          {/* Satellite Telemetry Label */}
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

/* ─── Active Orbital Laser Chord Beam (Node to Center) ─── */
function ActiveLaserBeam({ config, time, color, reduceMotion }) {
  const pathD = useTransform(time, (ms) => {
    const tSec = reduceMotion ? 0 : ms / 1000;
    const { x, y } = getOrbitalCoords(config, tSec);
    return `M ${x} ${y} L ${CENTER.x} ${CENTER.y}`;
  });

  return (
    <g>
      {/* Outer Soft Ambient Beam Glow */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="3.2"
        strokeOpacity="0.25"
        strokeLinecap="round"
      />
      {/* Inner Crisp High-Energy Laser Core */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeOpacity="0.85"
        strokeLinecap="round"
      />
    </g>
  );
}

/* ─── Main Orbital Reactor Mesh Component ─── */
function OrbitalReactorMesh({
  visible,
  current,
  activeNode: _activeNode,
  hoveredNode,
  setHoveredNode,
  setSelected,
  inView: _inView,
  selectedCat,
}) {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const time = useTime();

  // Focus beam connects to hovered satellite if present, otherwise active/selected satellite
  const targetNodeName = hoveredNode || current?.name;
  const targetConfig = targetNodeName ? getOrbitalConfig(targetNodeName, selectedCat) : null;

  /* Per-category ring configuration */
  const isExt = selectedCat === 'Extension examples';
  const ring3 = isExt ? { tilt: -26, rx: 268, ry: 116, color1: 'rgba(234,88,12,', color2: 'rgba(234,88,12,', ticks: [0, 45, 90, 135, 180, 225, 270, 315] } : { tilt: -24, rx: 268, ry: 118, color1: 'rgba(56,189,248,', color2: 'rgba(56,189,248,', ticks: [0, 45, 90, 135, 180, 225, 270, 315] };
  const ring2 = isExt ? { tilt: 8, rx: 208, ry: 90, color1: 'rgba(2,132,199,', color2: 'rgba(2,132,199,', ticks: [0, 60, 120, 180, 240, 300] } : { tilt: 12, rx: 208, ry: 92, color1: 'rgba(99,102,241,', color2: 'rgba(99,102,241,', ticks: [0, 60, 120, 180, 240, 300] };
  const ring1 = isExt ? { tilt: -18, rx: 138, ry: 60, color1: 'rgba(192,38,211,', color2: 'rgba(192,38,211,', ticks: [0, 90, 180, 270] } : { tilt: -14, rx: 138, ry: 64, color1: 'rgba(244,63,94,', color2: 'rgba(244,63,94,', ticks: [0, 90, 180, 270] };

  return (
    <div className="relative h-[430px] w-full overflow-hidden select-none bg-[radial-gradient(ellipse_80%_75%_at_50%_50%,#111625_0%,#080b12_70%,#05070a_100%)]">
      {/* ── SVG LAYER: Scientific Coordinate System & Orbital Rails ── */}
      <svg
        viewBox="0 0 620 420"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full pointer-events-none"
        role="img"
        aria-label="Ultrakin Orbital Integration System"
      >
        <defs>
          {/* Gravitational Core Flux Gradient */}
          <radialGradient id={`core-flux-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.32" />
            <stop offset="45%" stopColor="#4f46e5" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </radialGradient>

          {/* Core Specular Sheen Gradient */}
          <linearGradient id={`core-sheen-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#1e2540" />
            <stop offset="0.65" stopColor="#0d1118" />
          </linearGradient>

          {/* Coordinate Tick Filter */}
          <filter id={`glow-${id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Layer 1: Celestial Sphere Grid & Latitude Reference Rails ── */}
        <g opacity="0.08" stroke="rgba(165,180,252,0.8)" strokeWidth="0.6">
          <line x1="310" y1="30" x2="310" y2="390" strokeDasharray="3 6" />
          <line x1="60" y1="210" x2="560" y2="210" strokeDasharray="3 6" />
          <circle cx="310" cy="210" r="195" fill="none" strokeDasharray="2 8" />
        </g>

        {/* ── Layer 2: 3 Inclined Orbital Rings ── */}

        {/* Ring 3: Outer */}
        <g transform={`rotate(${ring3.tilt} 310 210)`}>
          <ellipse
            cx="310" cy="210" rx={ring3.rx} ry={ring3.ry}
            fill="none"
            stroke={targetConfig?.ring === 3 ? `${ring3.color1}0.45)` : `${ring3.color1}0.2)`}
            strokeWidth={targetConfig?.ring === 3 ? '1.2' : '0.8'}
            className="transition-colors duration-300"
          />
          {ring3.ticks.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <circle key={`r3-${deg}`} cx={310 + ring3.rx * Math.cos(rad)} cy={210 + ring3.ry * Math.sin(rad)} r="1" fill={`${ring3.color1}0.3)`} />
            );
          })}
        </g>

        {/* Ring 2: Mid */}
        <g transform={`rotate(${ring2.tilt} 310 210)`}>
          <ellipse
            cx="310" cy="210" rx={ring2.rx} ry={ring2.ry}
            fill="none"
            stroke={targetConfig?.ring === 2 ? `${ring2.color1}0.48)` : `${ring2.color1}0.22)`}
            strokeWidth={targetConfig?.ring === 2 ? '1.25' : '0.85'}
            className="transition-colors duration-300"
          />
          {ring2.ticks.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <circle key={`r2-${deg}`} cx={310 + ring2.rx * Math.cos(rad)} cy={210 + ring2.ry * Math.sin(rad)} r="1.2" fill={`${ring2.color1}0.35)`} />
            );
          })}
        </g>

        {/* Ring 1: Inner */}
        <g transform={`rotate(${ring1.tilt} 310 210)`}>
          <ellipse
            cx="310" cy="210" rx={ring1.rx} ry={ring1.ry}
            fill="none"
            stroke={targetConfig?.ring === 1 ? `${ring1.color1}0.48)` : `${ring1.color1}0.22)`}
            strokeWidth={targetConfig?.ring === 1 ? '1.25' : '0.85'}
            className="transition-colors duration-300"
          />
          {ring1.ticks.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <circle key={`r1-${deg}`} cx={310 + ring1.rx * Math.cos(rad)} cy={210 + ring1.ry * Math.sin(rad)} r="1.2" fill={`${ring1.color1}0.35)`} />
            );
          })}
        </g>

        {/* ── Layer 3: Active Optical Laser Chord Beam (Node to Center) ── */}
        {targetConfig && (
          <ActiveLaserBeam
            config={targetConfig}
            time={time}
            color={targetConfig.color}
            reduceMotion={reduceMotion}
          />
        )}

        {/* ── Layer 4: Central Ambient Gravitational Flux ── */}
        <circle
          cx="310"
          cy="210"
          r={hoveredNode ? 115 : 95}
          fill={`url(#core-flux-${id})`}
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {/* ── LAYER 5: Fixed Central Ultrakin Core Reactor ── */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
        <div
          className="relative flex h-[82px] w-[82px] items-center justify-center rounded-[1.6rem] border shadow-[0_24px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300"
          style={{
            borderColor: hoveredNode
              ? 'rgba(165,180,252,0.45)'
              : 'rgba(255,255,255,0.16)',
            background: 'linear-gradient(145deg, #182035, #0b0f16 70%)',
            boxShadow: hoveredNode
              ? '0 0 32px -4px rgba(99,102,241,0.45), 0 20px 40px -10px rgba(0,0,0,0.9)'
              : '0 0 20px -6px rgba(99,102,241,0.25), 0 16px 36px -10px rgba(0,0,0,0.85)',
          }}
        >
          {/* Specular Sheen */}
          <span className="pointer-events-none absolute inset-x-2 top-1.5 h-1/3 rounded-t-2xl bg-gradient-to-b from-white/[0.12] to-transparent" />

          {/* Central Ultrakin Core Icon */}
          <UltrakinLogo size={36} />

          {/* Active Reactor LED Status Light */}
          <span className="absolute top-2.5 right-2.5 flex h-2 w-2 items-center justify-center">
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          </span>

          {/* Telemetry Port Flanges */}
          <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-4 w-1.5 rounded-l-xs bg-indigo-500/50 border border-indigo-400/60" />
          <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-4 w-1.5 rounded-r-xs bg-indigo-500/50 border border-indigo-400/60" />
          <span className="absolute left-1/2 -top-1.5 -translate-x-1/2 h-1.5 w-4 rounded-t-xs bg-indigo-500/50 border border-indigo-400/60" />
          <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 h-1.5 w-4 rounded-b-xs bg-indigo-500/50 border border-indigo-400/60" />
        </div>
      </div>

      {/* ── LAYER 6: Floating Service Satellites ── */}
      {visible.map((item) => {
        const config = getOrbitalConfig(item.name, selectedCat);
        if (!config) return null;

        return (
          <SatelliteNode
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

export default memo(OrbitalReactorMesh);
