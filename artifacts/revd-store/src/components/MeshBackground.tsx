import React from 'react';

/**
 * Pure-CSS animated background — zero canvas, zero JS loops.
 * GPU-composited transforms only, extremely lightweight.
 * Replaces: NetworkParticles + heavy Framer Motion orbs.
 */
export default function MeshBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

      {/* Animated radial blobs */}
      <div className="mesh-blob mesh-1" />
      <div className="mesh-blob mesh-2" />
      <div className="mesh-blob mesh-3" />

      {/* Subtle tech-grid overlay */}
      <div className="mesh-grid" />

      {/* Horizontal aurora band */}
      <div className="mesh-aurora" />

    </div>
  );
}
