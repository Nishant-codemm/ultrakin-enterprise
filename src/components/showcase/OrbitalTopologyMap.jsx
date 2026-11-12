import React, { createContext, useCallback, useRef, useState, memo } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/cn';
import BrowserFrame from '../BrowserFrame';
import OrbitalReactorMesh from './OrbitalReactorMesh';
import AdaptiveMeshIntelligence from './AdaptiveMeshIntelligence';

/* ─── 3D Tilt Context for synchronized perspective parallax ─── */
const TiltContext = createContext({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

/* ─── Cursor-tracking 3D tilt wrapper for the showcase frame ─── */
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
  return (
    <TiltCard>
      <BrowserFrame
        address="workspace.ultrakin.app/topology/mesh"
        tabTitle="Ultrakin · Connected Tools & Integrations Topology"
      >
        {selectedCat === 'Extension examples' ? (
          <AdaptiveMeshIntelligence
            visible={visible}
            current={current}
            activeNode={activeNode}
            hoveredNode={hoveredNode}
            setHoveredNode={setHoveredNode}
            setSelected={setSelected}
            inView={inView}
          />
        ) : (
          <OrbitalReactorMesh
            visible={visible}
            current={current}
            activeNode={activeNode}
            hoveredNode={hoveredNode}
            setHoveredNode={setHoveredNode}
            setSelected={setSelected}
            inView={inView}
          />
        )}
      </BrowserFrame>
    </TiltCard>
  );
}

export default memo(OrbitalTopologyMap);
