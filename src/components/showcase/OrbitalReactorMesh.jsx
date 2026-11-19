import React, { memo, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useTime, useTransform } from 'framer-motion';
import { cn } from '../../lib/cn';
import UltrakinLogo from '../primitives/UltrakinLogo';
import { PRODUCT_ICON_CONFIG } from '../../data/integrationData';
import {
  ORBITAL_CENTER,
  compileOrbitalConfig,
  getOrbitalPosition,
  getSatelliteScale,
  getSatelliteOpacity,
  getSatelliteZIndex,
} from '../../lib/orbitalUtils';

/* ─── Built-in Satellites Configuration (Planetary Core Ecosystem) ─── */
const RAW_BUILT_IN_CONFIGS = {
  // Inner Transverse Orbit α (Tilt: -14°, Tau: 54s, Opposition delta: 180°)
  Mail: {
    ring: 1,
    a: 138,
    b: 60,
    tilt: -14,
    period: 54,
    initialPhase: 260, // North quadrant
    color: '#dc2626',
    glow: 'rgba(220,38,38,0.55)',
  },
  Docs: {
    ring: 1,
    a: 138,
    b: 60,
    tilt: -14,
    period: 54,
    initialPhase: 80, // South quadrant
    color: '#2563eb',
    glow: 'rgba(37,99,235,0.55)',
  },

  // Mid Equatorial Orbit β (Tilt: +12°, Tau: 72s, Opposition delta: 180°)
  Spaces: {
    ring: 2,
    a: 196,
    b: 86,
    tilt: 12,
    period: 72,
    initialPhase: 185, // West quadrant
    color: '#5c5bd6',
    glow: 'rgba(92,91,214,0.55)',
  },
  Tasks: {
    ring: 2,
    a: 196,
    b: 86,
    tilt: 12,
    period: 72,
    initialPhase: 5, // East quadrant
    color: '#10b981',
    glow: 'rgba(16,185,129,0.55)',
  },

  // Outer Inclined Orbit γ (Tilt: -24°, Tau: 92s, Trine constellation: 120° equidistant)
  Meetings: {
    ring: 3,
    a: 232,
    b: 98,
    tilt: -24,
    period: 92,
    initialPhase: 40, // North-East
    color: '#059669',
    glow: 'rgba(5,150,105,0.55)',
  },
  'Ukin agent': {
    ring: 3,
    a: 232,
    b: 98,
    tilt: -24,
    period: 92,
    initialPhase: 160, // South-West
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.55)',
  },
  Calendar: {
    ring: 3,
    a: 232,
    b: 98,
    tilt: -24,
    period: 92,
    initialPhase: 280, // South-East
    color: '#d97706',
    glow: 'rgba(217,119,6,0.55)',
  },
};

/* ─── Extension Satellites Configuration (Open Protocol Ecosystem) ─── */
const RAW_EXTENSION_CONFIGS = {
  // Inner Transverse Orbit α (Tilt: -14°, Tau: 56s, Opposition delta: 180°)
  GitHub: {
    ring: 1,
    a: 138,
    b: 60,
    tilt: -14,
    period: 56,
    initialPhase: 260, // North quadrant
    color: '#181d24',
    glow: 'rgba(148,163,184,0.65)',
  },
  Journeys: {
    ring: 1,
    a: 138,
    b: 60,
    tilt: -14,
    period: 56,
    initialPhase: 80, // South quadrant
    color: '#c026d3',
    glow: 'rgba(192,38,211,0.65)',
  },

  // Mid Equatorial Orbit β (Tilt: +12°, Tau: 74s, Opposition delta: 180°)
  Lists: {
    ring: 2,
    a: 196,
    b: 86,
    tilt: 12,
    period: 74,
    initialPhase: 185, // West quadrant
    color: '#10b981',
    glow: 'rgba(16,185,129,0.65)',
  },
  'MCP tools': {
    ring: 2,
    a: 196,
    b: 86,
    tilt: 12,
    period: 74,
    initialPhase: 5, // East quadrant
    color: '#0284c7',
    glow: 'rgba(2,132,199,0.65)',
  },

  // Outer Inclined Orbit γ (Tilt: -24°, Tau: 92s, Opposition delta: 180°)
  PostHog: {
    ring: 3,
    a: 232,
    b: 98,
    tilt: -24,
    period: 92,
    initialPhase: 40, // North-East
    color: '#ea580c',
    glow: 'rgba(234,88,12,0.65)',
  },
  Forms: {
    ring: 3,
    a: 232,
    b: 98,
    tilt: -24,
    period: 92,
    initialPhase: 220, // South-West
    color: '#2563eb',
    glow: 'rgba(37,99,235,0.65)',
  },
};

/* Precompile all orbital trigonometry at module evaluation time */
const COMPILED_ORBITAL_CONFIGS = Object.freeze(
  Object.fromEntries(
    Object.entries({ ...RAW_BUILT_IN_CONFIGS, ...RAW_EXTENSION_CONFIGS }).map(
      ([key, cfg]) => [key, compileOrbitalConfig(cfg)]
    )
  )
);

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

  const staticPos = getOrbitalPosition(config, 0);

  // Single unified transform per satellite eliminates redundant calculations
  const coords = useTransform(time, (ms) => {
    if (reduceMotion) return staticPos;
    return getOrbitalPosition(config, ms / 1000);
  });

  const x = useTransform(coords, (c) => c.deltaX);
  const y = useTransform(coords, (c) => c.deltaY);
  const scale = useTransform(coords, (c) => getSatelliteScale(c.z, isHovered, isSelected));
  const opacity = useTransform(coords, (c) => getSatelliteOpacity(c.z, reduceMotion));
  const zIndex = useTransform(coords, (c) =>
    getSatelliteZIndex(c.z, isHovered, isSelected, reduceMotion)
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        x,
        y,
        scale,
        opacity,
        zIndex,
        transformOrigin: '50% 19px',
      }}
      className="pointer-events-auto"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          style={{ transform: 'translate(-50%, -19px)' }}
          className="will-change-transform flex flex-col items-center"
        >
          <button
            type="button"
            aria-pressed={isSelected}
            aria-label={`${item.name} (${item.badge || item.category || 'Integration'})`}
            onClick={onClick}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onFocus={onHover}
            onBlur={onLeave}
            className="group relative flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-full cursor-pointer"
          >
          {/* Concentric Telemetry Orbit Halo */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2 rounded-full border transition-all duration-300"
            style={{
              borderColor: isSelected || isHovered ? config.glow : 'rgba(165,180,252,0.12)',
              boxShadow: isSelected || isHovered ? `0 0 16px ${config.glow}` : 'none',
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
    </motion.div>
  );
}

/* ─── Active Orbital Laser Chord Beam (Node to Center) ─── */
function ActiveLaserBeam({ config, time, color, reduceMotion }) {
  const pathD = useTransform(time, (ms) => {
    const tSec = reduceMotion ? 0 : ms / 1000;
    const { x, y } = getOrbitalPosition(config, tSec);
    return `M ${x} ${y} L ${ORBITAL_CENTER.x} ${ORBITAL_CENTER.y}`;
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
  selectedCat = 'Built in',
  activeNode: _activeNode,
  hoveredNode,
  setHoveredNode,
  setSelected,
  inView: _inView,
}) {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const time = useTime();
  const containerRef = useRef(null);
  const [stageScale, setStageScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const width = entry.contentRect.width;
      if (width > 0) {
        setStageScale(Math.min(1, width / 620));
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isExtension = selectedCat === 'Extension examples';
  const defaultTarget = isExtension ? 'GitHub' : 'Spaces';

  // Focus beam connects to hovered satellite if present, otherwise active/selected satellite
  const targetNodeName = hoveredNode || current?.name || defaultTarget;
  const targetConfig =
    COMPILED_ORBITAL_CONFIGS[targetNodeName] || COMPILED_ORBITAL_CONFIGS[defaultTarget];

  // 400ms reactive radial glow ping on satellite activation or focus change
  const [corePing, setCorePing] = useState(false);
  const prevTargetRef = useRef(targetNodeName);

  useEffect(() => {
    if (prevTargetRef.current !== targetNodeName) {
      prevTargetRef.current = targetNodeName;
      setCorePing(true);
      const timer = setTimeout(() => setCorePing(false), 400);
      return () => clearTimeout(timer);
    }
  }, [targetNodeName]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative h-[430px] w-full overflow-hidden select-none flex items-center justify-center transition-colors duration-500',
        isExtension
          ? 'bg-[radial-gradient(ellipse_80%_75%_at_50%_50%,#0e1726_0%,#080c14_70%,#040609_100%)]'
          : 'bg-[radial-gradient(ellipse_80%_75%_at_50%_50%,#111625_0%,#080b12_70%,#05070a_100%)]'
      )}
    >
      {/* ── Fixed Aspect-Ratio Orbital Stage Canvas (Guarantees SVG & DOM 1:1 lock) ── */}
      <div
        className="relative shrink-0"
        style={{
          width: 620,
          height: 420,
          transform: `scale(${stageScale})`,
          transformOrigin: 'center center',
        }}
      >
        {/* ── SVG LAYER: Scientific Coordinate System & Orbital Rails ── */}
        <svg
          viewBox="0 0 620 420"
          className="absolute inset-0 h-full w-full pointer-events-none"
          role="img"
          aria-label={
            isExtension
              ? 'Ultrakin Extension Ecosystem Orbital Topology'
              : 'Ultrakin Built-in Orbital Integration System'
          }
        >
          <defs>
            {/* Gravitational Core Flux Gradient */}
            <radialGradient id={`core-flux-${id}`} cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor={isExtension ? '#0284c7' : '#6366f1'}
                stopOpacity="0.32"
              />
              <stop
                offset="45%"
                stopColor={isExtension ? '#38bdf8' : '#4f46e5'}
                stopOpacity="0.12"
              />
              <stop
                offset="100%"
                stopColor={isExtension ? '#38bdf8' : '#4f46e5'}
                stopOpacity="0"
              />
            </radialGradient>

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
          <g
            opacity="0.08"
            stroke={isExtension ? 'rgba(56,189,248,0.8)' : 'rgba(165,180,252,0.8)'}
            strokeWidth="0.6"
          >
            <line x1="310" y1="30" x2="310" y2="390" strokeDasharray="3 6" />
            <line x1="60" y1="210" x2="560" y2="210" strokeDasharray="3 6" />
            <circle cx="310" cy="210" r="195" fill="none" strokeDasharray="2 8" />
          </g>

          {/* ── Layer 2: 3 Inclined Orbital Rings with Precision Coordinate Ticks ── */}
          {/* Ring 3: Outer Inclined Orbit */}
          <g transform="rotate(-24 310 210)">
            <ellipse
              cx="310"
              cy="210"
              rx="232"
              ry="98"
              fill="none"
              stroke={targetConfig?.ring === 3 ? 'rgba(56,189,248,0.48)' : 'rgba(56,189,248,0.2)'}
              strokeWidth={targetConfig?.ring === 3 ? '1.25' : '0.8'}
              className="transition-colors duration-300"
            />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const tx = 310 + 232 * Math.cos(rad);
              const ty = 210 + 98 * Math.sin(rad);
              return (
                <circle
                  key={`r3-tick-${deg}`}
                  cx={tx}
                  cy={ty}
                  r="1"
                  fill="rgba(56,189,248,0.3)"
                />
              );
            })}
          </g>

          {/* Ring 2: Mid Equatorial Orbit */}
          <g transform="rotate(12 310 210)">
            <ellipse
              cx="310"
              cy="210"
              rx="196"
              ry="86"
              fill="none"
              stroke={
                targetConfig?.ring === 2
                  ? isExtension
                    ? 'rgba(14,165,233,0.52)'
                    : 'rgba(99,102,241,0.48)'
                  : isExtension
                  ? 'rgba(14,165,233,0.22)'
                  : 'rgba(99,102,241,0.22)'
              }
              strokeWidth={targetConfig?.ring === 2 ? '1.25' : '0.85'}
              className="transition-colors duration-300"
            />
            {[0, 60, 120, 180, 240, 300].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const tx = 310 + 196 * Math.cos(rad);
              const ty = 210 + 86 * Math.sin(rad);
              return (
                <circle
                  key={`r2-tick-${deg}`}
                  cx={tx}
                  cy={ty}
                  r="1.2"
                  fill={isExtension ? 'rgba(14,165,233,0.35)' : 'rgba(99,102,241,0.35)'}
                />
              );
            })}
          </g>

          {/* Ring 1: Inner Transverse Orbit */}
          <g transform="rotate(-14 310 210)">
            <ellipse
              cx="310"
              cy="210"
              rx="138"
              ry="60"
              fill="none"
              stroke={
                targetConfig?.ring === 1
                  ? isExtension
                    ? 'rgba(168,85,247,0.52)'
                    : 'rgba(244,63,94,0.48)'
                  : isExtension
                  ? 'rgba(168,85,247,0.22)'
                  : 'rgba(244,63,94,0.22)'
              }
              strokeWidth={targetConfig?.ring === 1 ? '1.25' : '0.85'}
              className="transition-colors duration-300"
            />
            {[0, 90, 180, 270].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const tx = 310 + 138 * Math.cos(rad);
              const ty = 210 + 60 * Math.sin(rad);
              return (
                <circle
                  key={`r1-tick-${deg}`}
                  cx={tx}
                  cy={ty}
                  r="1.2"
                  fill={isExtension ? 'rgba(168,85,247,0.35)' : 'rgba(244,63,94,0.35)'}
                />
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
                ? isExtension
                  ? 'rgba(56,189,248,0.5)'
                  : 'rgba(165,180,252,0.45)'
                : 'rgba(255,255,255,0.16)',
              background: isExtension
                ? 'linear-gradient(145deg, #0e1e38, #070e1b 70%)'
                : 'linear-gradient(145deg, #182035, #0b0f16 70%)',
              boxShadow: hoveredNode
                ? isExtension
                  ? '0 0 32px -4px rgba(2,132,199,0.5), 0 20px 40px -10px rgba(0,0,0,0.9)'
                  : '0 0 32px -4px rgba(99,102,241,0.45), 0 20px 40px -10px rgba(0,0,0,0.9)'
                : isExtension
                ? '0 0 20px -6px rgba(2,132,199,0.25), 0 16px 36px -10px rgba(0,0,0,0.85)'
                : '0 0 20px -6px rgba(99,102,241,0.25), 0 16px 36px -10px rgba(0,0,0,0.85)',
            }}
          >
            {/* Specular Sheen */}
            <span className="pointer-events-none absolute inset-x-2 top-1.5 h-1/3 rounded-t-2xl bg-gradient-to-b from-white/[0.12] to-transparent" />

            {/* 400ms reactive radial glow ping on satellite activation */}
            <AnimatePresence>
              {corePing && !reduceMotion && (
                <motion.span
                  key="core-ping-pulse"
                  initial={{ opacity: 0.85, scale: 0.92 }}
                  animate={{ opacity: 0, scale: 1.45 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    'pointer-events-none absolute -inset-2 rounded-[2rem] border-2',
                    isExtension
                      ? 'border-cyan-400 shadow-[0_0_32px_rgba(56,189,248,0.85)]'
                      : 'border-indigo-400 shadow-[0_0_32px_rgba(99,102,241,0.85)]'
                  )}
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>

            {/* Central Ultrakin Core Icon */}
            <UltrakinLogo size={36} />

            {/* Active Reactor LED Status Light */}
            <span className="absolute top-2.5 right-2.5 flex h-2 w-2 items-center justify-center">
              <span
                className={cn(
                  'absolute h-full w-full rounded-full opacity-60',
                  !reduceMotion && 'animate-ping',
                  isExtension ? 'bg-cyan-400' : 'bg-emerald-400'
                )}
              />
              <span
                className={cn(
                  'relative h-1.5 w-1.5 rounded-full',
                  isExtension
                    ? 'bg-cyan-400 shadow-[0_0_6px_#38bdf8]'
                    : 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
                )}
              />
            </span>

            {/* Telemetry Port Flanges */}
            <span
              className={cn(
                'absolute -left-1.5 top-1/2 -translate-y-1/2 h-4 w-1.5 rounded-l-xs border',
                isExtension
                  ? 'bg-cyan-500/50 border-cyan-400/60'
                  : 'bg-indigo-500/50 border-indigo-400/60'
              )}
            />
            <span
              className={cn(
                'absolute -right-1.5 top-1/2 -translate-y-1/2 h-4 w-1.5 rounded-r-xs border',
                isExtension
                  ? 'bg-cyan-500/50 border-cyan-400/60'
                  : 'bg-indigo-500/50 border-indigo-400/60'
              )}
            />
            <span
              className={cn(
                'absolute left-1/2 -top-1.5 -translate-x-1/2 h-1.5 w-4 rounded-t-xs border',
                isExtension
                  ? 'bg-cyan-500/50 border-cyan-400/60'
                  : 'bg-indigo-500/50 border-indigo-400/60'
              )}
            />
            <span
              className={cn(
                'absolute left-1/2 -bottom-1.5 -translate-x-1/2 h-1.5 w-4 rounded-b-xs border',
                isExtension
                  ? 'bg-cyan-500/50 border-cyan-400/60'
                  : 'bg-indigo-500/50 border-indigo-400/60'
              )}
            />
          </div>
        </div>

        {/* ── LAYER 6: The Floating Service Satellites ── */}
        <AnimatePresence mode="popLayout">
          {visible.map((item) => {
            const config = COMPILED_ORBITAL_CONFIGS[item.name];
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
        </AnimatePresence>
      </div>
    </div>
  );
}

export default memo(OrbitalReactorMesh);
