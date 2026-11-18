import React, { memo } from 'react';
import OrbitalReactorMesh from './OrbitalReactorMesh';

/**
 * AdaptiveMeshIntelligence
 * Proxies to the flagship living orbital vector engine with Extension examples configuration.
 */
function AdaptiveMeshIntelligence(props) {
  return <OrbitalReactorMesh {...props} selectedCat="Extension examples" />;
}

export default memo(AdaptiveMeshIntelligence);
