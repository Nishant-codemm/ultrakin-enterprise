import React, { createContext, useCallback, useContext, useRef, useState, memo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/cn';
import BrowserFrame from '../BrowserFrame';
import UltrakinLogo from '../primitives/UltrakinLogo';
import OrbitalReactorMesh from './OrbitalReactorMesh';
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
        {selectedCat === 'Built in' || selectedCat === 'Extension examples' ? (
          <OrbitalReactorMesh
            visible={visible}
            current={current}
            activeNode={activeNode}
            hoveredNode={hoveredNode}
            setHoveredNode={setHoveredNode}
            setSelected={setSelected}
            inView={inView}
            selectedCat={selectedCat}
          />
        ) : null}
      </BrowserFrame>
    </TiltCard>
  );
}

export default memo(OrbitalTopologyMap);
