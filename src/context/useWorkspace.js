/**
 * useWorkspace.js
 * Type-safe consumer hook for WorkspaceContext.
 * Enforces usage within WorkspaceProvider boundaries.
 */
import { useContext } from 'react';
import { WorkspaceContext } from './WorkspaceContextStore';

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
