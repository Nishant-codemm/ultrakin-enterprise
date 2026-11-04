/**
 * WorkspaceContextStore.js
 * Isolated React Context store for Ultrakin workspace state.
 * Separated from provider implementation to preserve Vite React Fast Refresh boundaries.
 */
import { createContext } from 'react';

export const WorkspaceContext = createContext(null);
