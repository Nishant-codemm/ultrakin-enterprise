import React, { createContext, useCallback, useContext, useRef, useState, memo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/cn';
import BrowserFrame from '../BrowserFrame';
import UltrakinLogo from '../primitives/UltrakinLogo';
import {
  PRODUCT_ICON_CONFIG,
  CENTER,
  NODE_PORTS,
  PATH_HERO_CROSS_SECTION,
  FEEDER_PATHS,
} from '../../data/integrationData';

/* ─── 3D Tilt Context for synchronized perspective parallax ─── */
const TiltContext = createContext({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

/* ─── Cursor-tracking 3D tilt wrapper for the whole orbit card ─── */
function TiltCard({ children, className }) {
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  const handleMove = useCallback((e) => {
    if (reduceMotion) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width;
    const dy = (e.clientY - rect.top) / rect.height;
    // Ultra subtle, premium tilt (max ±3.5deg)
    setTilt({
      rx: (0.5 - dy) * 3.5,
      ry: (dx - 0.5) * 4.5,
      gx: dx * 100,
      gy: dy * 100,
      active: true,
    });
  }, [reduceMotion]);

  const handleLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });
  }, []);

  return (
    <TiltContext.Provider value={tilt}>
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn('relative hidden sm:block', className)}
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          style={{
            transform: tilt.active
              ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.006)`
              : 'rotateX(0.8deg) rotateY(-1deg) scale(1)',
            transition: tilt.active
              ? 'transform 120ms ease-out'
              : 'transform 600ms cubic-bezier(0.16,1,0.3,1)',
            transformOrigin: '50% 50%',
            willChange: 'transform',
            borderRadius: '1.25rem',
          }}
        >
          {children}

          {/* Soft edge spotlight */}
          {tilt.active && !reduceMotion && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-0 transition-opacity duration-300"
              style={{
                opacity: tilt.active ? 1 : 0,
                background: `radial-gradient(
                  circle at ${tilt.gx}% ${tilt.gy}%,
                  rgba(140,148,255,0.08) 0%,
                  transparent 50%
                )`,
                mixBlendMode: 'screen',
              }}
            />
          )}
        </div>
      </div>
    </TiltContext.Provider>
  );
}

/* ─── Ultra-thin Travelling Photon Bead along Master Topological Spine ─── */
function ConvergingPhotonNode({ d, color, duration = 6.8 }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeDasharray="6 380"
      filter="url(#subtle-particle-glow)"
      initial={{ strokeDashoffset: 386, opacity: 0 }}
      animate={{
        strokeDashoffset: [386, -38],
        opacity: [0, 0.95, 0.95, 0],
      }}
      transition={{
        strokeDashoffset: { duration, repeat: Infinity, ease: 'linear', repeatDelay: 0.6 },
        opacity: { duration, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6, times: [0, 0.1, 0.9, 1] },
      }}
    />
  );
}

/* ─── Reusable Concentric Orbital Ring Component ─── */
function ConcentricOrbitalRing({ rx, ry, strokeDasharray, opacity }) {
  const tilt = useContext(TiltContext);
  return (
    <ellipse
      cx={CENTER[0] + (tilt.active ? (tilt.gx - 50) * 0.05 : 0)}
      cy={CENTER[1] + (tilt.active ? (tilt.gy - 50) * 0.04 : 0)}
      rx={rx}
      ry={ry}
      fill="none"
      stroke="rgba(165,180,252,0.15)"
      strokeWidth="0.65"
      strokeDasharray={strokeDasharray}
      style={{ opacity, transition: 'stroke 300ms ease' }}
    />
  );
}

/* ─── Reusable Topology Spline Branch Component ─── */
function TopologySpline({ d, isActive, isGuide = false }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={isActive ? 'url(#topo-spline-active)' : isGuide ? 'rgba(140,148,255,0.10)' : 'rgba(140,148,255,0.14)'}
      strokeWidth={isActive ? 0.85 : 0.52}
      strokeDasharray={isActive ? 'none' : isGuide ? '2 6' : '2 5'}
      className="transition-all duration-300"
    />
  );
}

/* ─── Hardware Interface Port Socket Component ─── */
function HardwarePortSocket({ cx, cy, isActive, color = '#818cf8', label }) {
  return (
    <g className="transition-all duration-300">
      <circle
        cx={cx}
        cy={cy}
        r={isActive ? 4.2 : 2.8}
        fill="#0c1018"
        stroke={isActive ? color : 'rgba(165,180,252,0.32)'}
        strokeWidth={isActive ? 1.3 : 0.8}
      />
      <circle
        cx={cx}
        cy={cy}
        r={isActive ? 2.2 : 1.3}
        fill={isActive ? color : 'rgba(165,180,252,0.65)'}
      />
      {label && <title>{label}</title>}
    </g>
  );
}

/* ─── 3D Magnetic Node Button with Authentic Product Icon Badge ─── */
function NodeButton({ item, isSelected, isHovered, onHover, onLeave, onClick }) {
  const nodeRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [magneticTilt, setMagneticTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const iconConfig = PRODUCT_ICON_CONFIG[item.name] || {
    icon: Sparkles,
    bg: 'bg-indigo-600',
    glow: '#6366f1',
  };
  const Icon = iconConfig.icon;

  const handleMouseMove = useCallback((e) => {
    if (reduceMotion) return;
    const el = nodeRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setMagneticTilt({
      rx: -dy * 5,
      ry: dx * 5,
      gx: ((e.clientX - rect.left) / rect.width) * 100,
      gy: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, [reduceMotion]);

  const handleMouseLeave = useCallback(() => {
    setMagneticTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
    onLeave();
  }, [onLeave]);

  const [x, y] = item.point;

  return (
    <motion.div
      key={item.name}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'absolute',
        left: `${(x / 620) * 100}%`,
        top: `${(y / 420) * 100}%`,
        translateX: '-50%',
        translateY: '-24px', // Pins center of 48px icon box precisely on (x, y)
        zIndex: isSelected ? 30 : isHovered ? 25 : 20,
      }}
    >
      <div
        ref={nodeRef}
        style={{
          transform: `perspective(360px) rotateX(${magneticTilt.rx}deg) rotateY(${magneticTilt.ry}deg)`,
          transition: isHovered ? 'transform 100ms ease-out' : 'transform 450ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <motion.button
          type="button"
          aria-pressed={isSelected}
          onClick={onClick}
          onMouseMove={handleMouseMove}
          onMouseEnter={onHover}
          onMouseLeave={handleMouseLeave}
          animate={{
            scale: isHovered ? 1.05 : isSelected ? 1.03 : 1,
            y: isHovered ? -3 : isSelected ? -1 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 28,
            mass: 0.9,
          }}
          className={cn(
            'group flex flex-col items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer',
            isSelected ? 'text-white' : 'text-slate-300 hover:text-white',
          )}
        >
          {/* Outer Node Box (48px x 48px) with Specular Rim & Glow */}
          <div
            className={cn(
              'relative flex h-[48px] w-[48px] items-center justify-center rounded-[14px] border transition-all duration-200 overflow-hidden',
              isSelected
                ? 'border-white/35 bg-[#141b2b]'
                : isHovered
                ? 'border-white/25 bg-[#101524]'
                : 'border-white/[0.09] bg-[#0c1018]/90 hover:border-white/20',
            )}
            style={{
              boxShadow: isSelected
                ? `0 0 0 1px ${iconConfig.glow}44, 0 8px 24px -4px ${iconConfig.glow}66, inset 0 1px 0 rgba(255,255,255,0.18)`
                : isHovered
                ? `0 0 0 1px ${iconConfig.glow}33, 0 6px 18px -4px ${iconConfig.glow}44, inset 0 1px 0 rgba(255,255,255,0.12)`
                : '0 4px 12px -3px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Inner Product Icon Badge */}
            <div
              className={cn(
                'flex h-[32px] w-[32px] items-center justify-center rounded-[9px] shadow-[0_1px_3px_rgba(0,0,0,0.35)] transition-transform duration-150 group-hover:scale-105',
                iconConfig.bg,
              )}
            >
              <Icon size={17} strokeWidth={2} className="text-white shrink-0" />
            </div>

            {/* Specular gloss top sheen */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[14px] bg-gradient-to-b from-white/[0.08] to-transparent" />
          </div>

          {/* Physical Edge Connector Pin Socket (protruding directly on active card border) */}
          {x < 310 && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-[4px] top-[24px] -translate-y-1/2 z-30 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#0a0d14] border border-white/30 shadow-[0_0_6px_rgba(0,0,0,0.9)]"
            >
              <span
                className={cn(
                  'h-1 w-1 rounded-full transition-all duration-200',
                  isSelected || isHovered ? 'scale-125' : 'opacity-85'
                )}
                style={{
                  backgroundColor: item.color,
                  boxShadow: isSelected || isHovered ? `0 0 6px ${item.color}` : 'none',
                }}
              />
            </span>
          )}
          {x > 310 && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-[4px] top-[24px] -translate-y-1/2 z-30 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#0a0d14] border border-white/30 shadow-[0_0_6px_rgba(0,0,0,0.9)]"
            >
              <span
                className={cn(
                  'h-1 w-1 rounded-full transition-all duration-200',
                  isSelected || isHovered ? 'scale-125' : 'opacity-85'
                )}
                style={{
                  backgroundColor: item.color,
                  boxShadow: isSelected || isHovered ? `0 0 6px ${item.color}` : 'none',
                }}
              />
            </span>
          )}
          {x === 310 && y < 210 && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 -bottom-[4px] -translate-x-1/2 z-30 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#0a0d14] border border-white/30 shadow-[0_0_6px_rgba(0,0,0,0.9)]"
            >
              <span
                className={cn(
                  'h-1 w-1 rounded-full transition-all duration-200',
                  isSelected || isHovered ? 'scale-125' : 'opacity-85'
                )}
                style={{
                  backgroundColor: item.color,
                  boxShadow: isSelected || isHovered ? `0 0 6px ${item.color}` : 'none',
                }}
              />
            </span>
          )}
          {x === 310 && y > 210 && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 -top-[4px] -translate-x-1/2 z-30 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#0a0d14] border border-white/30 shadow-[0_0_6px_rgba(0,0,0,0.9)]"
            >
              <span
                className={cn(
                  'h-1 w-1 rounded-full transition-all duration-200',
                  isSelected || isHovered ? 'scale-125' : 'opacity-85'
                )}
                style={{
                  backgroundColor: item.color,
                  boxShadow: isSelected || isHovered ? `0 0 6px ${item.color}` : 'none',
                }}
              />
            </span>
          )}

          {/* Node Label */}
          <span
            className={cn(
              'whitespace-nowrap text-[9.5px] font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] transition-colors',
              isSelected ? 'text-white font-semibold' : 'text-slate-300 group-hover:text-white',
            )}
          >
            {item.name}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}

function OrbitalTopologyMap({
  visible,
  current,
  selectedCat,
  activeNode,
  hoveredNode,
  setHoveredNode,
  setSelected,
  inView,
}) {
  const reduceMotion = useReducedMotion();
  const tilt = useContext(TiltContext);

  const isSpacesActive = activeNode === 'Spaces';
  const isTasksActive = activeNode === 'Tasks';
  const isMasterSpineActive = isSpacesActive || isTasksActive;

  return (
    <TiltCard>
      <BrowserFrame
        address="workspace.ultrakin.app/topology/mesh"
        tabTitle="Ultrakin · Connected Tools & Integrations Topology"
      >
        <div
          className="relative h-[430px] overflow-hidden select-none"
          style={{
            background: tilt.active
              ? `radial-gradient(ellipse 85% 75% at ${tilt.gx}% ${tilt.gy}%, rgba(55,62,150,0.16) 0%, rgba(15,19,28,0.94) 55%, #080b12 100%)`
              : 'radial-gradient(ellipse 80% 70% at 50% 48%, rgba(50,56,140,0.14) 0%, rgba(15,19,28,0.94) 55%, #080b12 100%)',
            transition: tilt.active ? 'none' : 'background 600ms ease',
          }}
          aria-label="Connected tools map"
        >
          {/* ── SVG layer: CONVERGING VECTOR TOPOLOGY SYSTEM ── */}
          <svg
            viewBox="0 0 620 420"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label={`Connected vector topology for ${selectedCat.toLowerCase()}`}
          >
            <defs>
              {/* Subtle base spline gradient */}
              <linearGradient id="topo-spline-base" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#818cf8" stopOpacity=".38" />
                <stop offset="1" stopColor="#a5b4fc" stopOpacity=".24" />
              </linearGradient>

              {/* Active highlighted topology gradient */}
              <linearGradient id="topo-spline-active" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#c7d2fe" stopOpacity=".95" />
                <stop offset="1" stopColor="#818cf8" stopOpacity=".65" />
              </linearGradient>

              {/* Core radial soft field */}
              <radialGradient id="orbit-core">
                <stop stopColor="#6366f1" stopOpacity=".16" />
                <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
              </radialGradient>

              {/* Subtle particle glow */}
              <filter id="subtle-particle-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="0.7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ── LAYER 1: Background Subtle Coordinate Field ── */}
            <ConcentricOrbitalRing rx="270" ry="120" strokeDasharray="2 8" opacity={0.16} />
            <ConcentricOrbitalRing rx="190" ry="85" strokeDasharray="none" opacity={0.2} />
            <ConcentricOrbitalRing rx="86" ry="54" strokeDasharray="2 6" opacity={0.25} />
            <circle cx={CENTER[0]} cy={CENTER[1]} r="80" fill="url(#orbit-core)" />

            {/* Subtle Circuit Bus Substrate Grid */}
            <g opacity={0.06} stroke="rgba(165,180,252,0.8)" strokeWidth="0.6">
              <line x1="112" y1="40" x2="112" y2="380" strokeDasharray="2 6" />
              <line x1="510" y1="40" x2="510" y2="380" strokeDasharray="2 6" />
              <line x1="40" y1="78" x2="580" y2="78" strokeDasharray="2 6" />
              <line x1="40" y1="340" x2="580" y2="340" strokeDasharray="2 6" />
            </g>

            {/* ── LAYER 2: Shared Arterial Conduit Highway (Dual-Trace Bus at Y=210) ── */}
            <g>
              {/* Primary Bus Conduit */}
              <line
                x1="60"
                y1="210"
                x2="266"
                y2="210"
                stroke="rgba(165,180,252,0.25)"
                strokeWidth="1.2"
              />
              <line
                x1="354"
                y1="210"
                x2="560"
                y2="210"
                stroke="rgba(165,180,252,0.25)"
                strokeWidth="1.2"
              />
              {/* Secondary Telemetry Micro-Rail */}
              <line
                x1="80"
                y1="213"
                x2="264"
                y2="213"
                stroke="rgba(140,148,255,0.08)"
                strokeWidth="0.6"
                strokeDasharray="3 6"
              />
              <line
                x1="356"
                y1="213"
                x2="540"
                y2="213"
                stroke="rgba(140,148,255,0.08)"
                strokeWidth="0.6"
                strokeDasharray="3 6"
              />
            </g>

            {/* ── LAYER 3: Harmonic Enterprise Bus Topology (Passive Guide Grid) ── */}
            <g opacity={0.45}>
              {visible.map((item) => {
                const feederD = FEEDER_PATHS[item.name];
                if (!feederD) return null;
                return (
                  <TopologySpline
                    key={`feeder-guide-${item.name}`}
                    d={feederD}
                    isActive={false}
                    isGuide={true}
                  />
                );
              })}
            </g>

            {/* ── LAYER 4: The Hero Cross-Sectional Arterial Trunk (Global Spine) ── */}
            <path
              d={PATH_HERO_CROSS_SECTION}
              data-workline-anchor="integration-spine"
              fill="none"
              stroke={isMasterSpineActive ? 'url(#topo-spline-active)' : 'url(#topo-spline-base)'}
              strokeWidth={isMasterSpineActive ? 1.6 : 1.15}
              className="transition-all duration-300"
            />

            {/* ── LAYER 5: Active Highlight & Converging Photon along Selected Feeder Artery ── */}
            {visible.map((item) => {
              const feederD = FEEDER_PATHS[item.name];
              const isActive = item.name === activeNode;
              if (!feederD || !isActive) return null;
              return (
                <React.Fragment key={`active-feeder-group-${item.name}`}>
                  <path
                    d={feederD}
                    fill="none"
                    stroke="url(#topo-spline-active)"
                    strokeWidth={1.4}
                    className="transition-all duration-300"
                  />
                  {inView && !reduceMotion && (
                    <ConvergingPhotonNode
                      d={feederD}
                      color="#c7d2fe"
                      duration={2.2}
                    />
                  )}
                </React.Fragment>
              );
            })}

            {/* ── LAYER 6: Continuous Travelling Photon Bead along Master Arterial Trunk ── */}
            {inView && !reduceMotion && (
              <ConvergingPhotonNode
                d={PATH_HERO_CROSS_SECTION}
                color="#c7d2fe"
                duration={6.5}
              />
            )}

            {/* ── LAYER 7: Engineered Combiner Manifold Hubs (West & East) ── */}
            {/* West Combiner Junction Node (218, 210) */}
            <g className="transition-all duration-300">
              <rect
                x="214"
                y="206"
                width="8"
                height="8"
                rx="2"
                fill="#0c1018"
                stroke={['Spaces', 'Ukin agent', 'GitHub', 'Forms', 'Lists'].includes(activeNode) ? '#818cf8' : 'rgba(165,180,252,0.4)'}
                strokeWidth="1"
              />
              <circle
                cx="218"
                cy="210"
                r="1.5"
                fill={['Spaces', 'Ukin agent', 'GitHub', 'Forms', 'Lists'].includes(activeNode) ? '#c7d2fe' : 'rgba(165,180,252,0.6)'}
              />
              <text
                x="218"
                y="198"
                textAnchor="middle"
                fill="#818cf8"
                fillOpacity="0.45"
                fontSize="6.5"
                fontFamily="monospace"
                letterSpacing="0.08em"
              >
                INGRESS · 40G
              </text>
            </g>

            {/* East Combiner Junction Node (402, 210) */}
            <g className="transition-all duration-300">
              <rect
                x="398"
                y="206"
                width="8"
                height="8"
                rx="2"
                fill="#0c1018"
                stroke={['Meetings', 'Tasks', 'Calendar', 'PostHog', 'MCP tools', 'Journeys'].includes(activeNode) ? '#818cf8' : 'rgba(165,180,252,0.4)'}
                strokeWidth="1"
              />
              <circle
                cx="402"
                cy="210"
                r="1.5"
                fill={['Meetings', 'Tasks', 'Calendar', 'PostHog', 'MCP tools', 'Journeys'].includes(activeNode) ? '#c7d2fe' : 'rgba(165,180,252,0.6)'}
              />
              <text
                x="402"
                y="198"
                textAnchor="middle"
                fill="#818cf8"
                fillOpacity="0.45"
                fontSize="6.5"
                fontFamily="monospace"
                letterSpacing="0.08em"
              >
                EGRESS · 100G
              </text>
            </g>

            {/* ── LAYER 8: Node Edge Ports on Card Boundaries ── */}
            {visible.map((item) => {
              const port = NODE_PORTS[item.name] || item.point;
              const isHovered = item.name === hoveredNode;
              const isSelected = item.name === current.name;
              const isPortActive = isHovered || isSelected;

              return (
                <HardwarePortSocket
                  key={`node-port-${item.name}`}
                  cx={port[0]}
                  cy={port[1]}
                  isActive={isPortActive}
                  color={item.color}
                  label={`${item.name} edge port`}
                />
              );
            })}
          </svg>

          {/* ── Center logo core with Machined Hardware Intake Ports ── */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: hoveredNode ? 1.018 : 1,
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            style={{
              filter: hoveredNode
                ? 'drop-shadow(0 0 28px rgba(120,122,255,0.45))'
                : 'drop-shadow(0 0 20px rgba(120,122,255,0.25))',
              transition: 'filter 350ms ease',
            }}
          >
            {/* The Core Chassis */}
            <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-[1.7rem] border border-white/[0.16] bg-[linear-gradient(145deg,#1e2540,#0d1118_68%)] shadow-[0_30px_60px_-20px_rgba(0,0,0,.95),inset_0_1px_0_rgba(255,255,255,.16),inset_0_-1px_0_rgba(144,148,255,.15)]">
              {/* Specular sheen */}
              <span className="pointer-events-none absolute inset-x-2 top-1.5 h-1/3 rounded-t-2xl bg-gradient-to-b from-white/[0.09] to-transparent" />
              <UltrakinLogo size={38} />

              {/* Status LED: Core Active */}
              <span className="absolute top-2.5 right-2.5 flex h-2 w-2 items-center justify-center">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              </span>

              {/* Physical West Intake Port (Ingress Bus Receiver) */}
              <div
                className={cn(
                  'absolute -left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-2.5 h-5 rounded-l-sm border border-r-0 transition-all duration-300',
                  ['Spaces', 'Ukin agent', 'GitHub', 'Forms', 'Lists'].includes(activeNode)
                    ? 'border-indigo-400 bg-indigo-950/90 shadow-[0_0_8px_rgba(129,140,248,0.7)]'
                    : 'border-white/20 bg-[#0c1018]'
                )}
                title="West Ingress Bus Intake"
              >
                <span
                  className={cn(
                    'w-1 h-2 rounded-full transition-all duration-300',
                    ['Spaces', 'Ukin agent', 'GitHub', 'Forms', 'Lists'].includes(activeNode)
                      ? 'bg-indigo-300 shadow-[0_0_6px_#c7d2fe]'
                      : 'bg-slate-500/70'
                  )}
                />
              </div>

              {/* Physical East Intake Port (Egress Bus Receiver) */}
              <div
                className={cn(
                  'absolute -right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-2.5 h-5 rounded-r-sm border border-l-0 transition-all duration-300',
                  ['Meetings', 'Tasks', 'Calendar', 'PostHog', 'MCP tools', 'Journeys'].includes(activeNode)
                    ? 'border-indigo-400 bg-indigo-950/90 shadow-[0_0_8px_rgba(129,140,248,0.7)]'
                    : 'border-white/20 bg-[#0c1018]'
                )}
                title="East Egress Bus Intake"
              >
                <span
                  className={cn(
                    'w-1 h-2 rounded-full transition-all duration-300',
                    ['Meetings', 'Tasks', 'Calendar', 'PostHog', 'MCP tools', 'Journeys'].includes(activeNode)
                      ? 'bg-indigo-300 shadow-[0_0_6px_#c7d2fe]'
                      : 'bg-slate-500/70'
                  )}
                />
              </div>

              {/* Physical North Intake Port (Direct Mail Ingress) */}
              <div
                className={cn(
                  'absolute left-1/2 -top-2 -translate-x-1/2 flex items-center justify-center h-2.5 w-5 rounded-t-sm border border-b-0 transition-all duration-300',
                  activeNode === 'Mail'
                    ? 'border-indigo-400 bg-indigo-950/90 shadow-[0_0_8px_rgba(129,140,248,0.7)]'
                    : 'border-white/20 bg-[#0c1018]'
                )}
                title="North Ingress Port"
              >
                <span
                  className={cn(
                    'h-1 w-2 rounded-full transition-all duration-300',
                    activeNode === 'Mail'
                      ? 'bg-indigo-300 shadow-[0_0_6px_#c7d2fe]'
                      : 'bg-slate-500/70'
                  )}
                />
              </div>

              {/* Physical South Intake Port (Direct Docs Ingress) */}
              <div
                className={cn(
                  'absolute left-1/2 -bottom-2 -translate-x-1/2 flex items-center justify-center h-2.5 w-5 rounded-b-sm border border-t-0 transition-all duration-300',
                  activeNode === 'Docs'
                    ? 'border-indigo-400 bg-indigo-950/90 shadow-[0_0_8px_rgba(129,140,248,0.7)]'
                    : 'border-white/20 bg-[#0c1018]'
                )}
                title="South Ingress Port"
              >
                <span
                  className={cn(
                    'h-1 w-2 rounded-full transition-all duration-300',
                    activeNode === 'Docs'
                      ? 'bg-indigo-300 shadow-[0_0_6px_#c7d2fe]'
                      : 'bg-slate-500/70'
                  )}
                />
              </div>
            </div>
          </motion.div>

          {/* ── Surrounding Miniature Product Nodes ── */}
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <NodeButton
                key={item.name}
                item={item}
                isSelected={item.name === current.name}
                isHovered={item.name === hoveredNode}
                onHover={() => setHoveredNode(item.name)}
                onLeave={() => setHoveredNode(null)}
                onClick={() => setSelected(item.name)}
              />
            ))}
          </AnimatePresence>
        </div>
      </BrowserFrame>
    </TiltCard>
  );
}

export default memo(OrbitalTopologyMap);
