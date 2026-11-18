/**
 * Orbital Coordinate Geometry & Keplerian Kinematics Utilities
 * Precomputes orbital constants and provides high-performance coordinate transforms.
 */

export const ORBITAL_CENTER = Object.freeze({ x: 310, y: 210 });
export const ORBITAL_VIEWBOX = Object.freeze({ width: 620, height: 420 });

/**
 * Precomputes angular velocity, initial phase radians, and 2D rotation matrix coefficients.
 * Calling this once per configuration eliminates redundant trigonometric computations on each tick.
 */
export function compileOrbitalConfig(rawConfig) {
  const { tilt, period, initialPhase } = rawConfig;
  const omega = (2 * Math.PI) / period;
  const radPhase = (initialPhase * Math.PI) / 180;
  const radTilt = (tilt * Math.PI) / 180;
  const cosT = Math.cos(radTilt);
  const sinT = Math.sin(radTilt);

  return Object.freeze({
    ...rawConfig,
    omega,
    radPhase,
    radTilt,
    cosT,
    sinT,
  });
}

/**
 * Evaluates real-time coordinate offsets relative to orbital center.
 * @param {Object} config - Compiled orbital configuration
 * @param {number} tSec - Time in seconds
 * @returns {{ x: number, y: number, deltaX: number, deltaY: number, z: number }}
 */
export function getOrbitalPosition(config, tSec) {
  const theta = config.radPhase + config.omega * tSec;
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);

  // Un-rotated elliptical coordinate offsets
  const u = config.a * cosTheta;
  const v = config.b * sinTheta;

  // 2D rotation by orbital plane inclination angle
  const deltaX = u * config.cosT - v * config.sinT;
  const deltaY = u * config.sinT + v * config.cosT;
  const z = sinTheta; // Normalized depth factor in [-1, 1]

  return {
    x: ORBITAL_CENTER.x + deltaX,
    y: ORBITAL_CENTER.y + deltaY,
    deltaX,
    deltaY,
    z,
  };
}

/**
 * Computes depth-aware scaling boost for satellite pucks.
 */
export function getSatelliteScale(z, isHovered, isSelected) {
  const depthScale = 1.0 + z * 0.08;
  const activeBoost = isHovered ? 1.12 : isSelected ? 1.06 : 1.0;
  return depthScale * activeBoost;
}

/**
 * Computes atmospheric depth opacity.
 */
export function getSatelliteOpacity(z, reduceMotion) {
  if (reduceMotion) return 1.0;
  return 0.75 + (z + 1.0) * 0.125;
}

/**
 * Computes 3D z-depth layering index.
 */
export function getSatelliteZIndex(z, isHovered, isSelected, reduceMotion) {
  if (isSelected) return 35;
  if (isHovered) return 30;
  if (reduceMotion) return 22;
  return z > 0 ? 25 : 12; // z > 0: in front of core (z=20); z < 0: behind core
}
