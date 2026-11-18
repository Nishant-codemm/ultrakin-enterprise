import React from 'react';
import { AlertCircle, RotateCcw, RefreshCw } from 'lucide-react';

/**
 * ErrorBoundary
 * Enterprise-grade React Error Boundary with component-level isolation,
 * dynamic chunk reload recovery, accessible alert telemetry, and fallback retry.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isChunkError: false,
    };
  }

  static getDerivedStateFromError(error) {
    // Check if error is a dynamic import / chunk loading failure (common after new deployments)
    const isChunkError =
      error?.name === 'ChunkLoadError' ||
      /loading chunk/i.test(error?.message || '') ||
      /failed to fetch dynamically imported module/i.test(error?.message || '');

    return {
      hasError: true,
      error,
      isChunkError,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });

    // Optional telemetry callback for production error logging (e.g. Sentry / Datadog)
    if (typeof this.props.onError === 'function') {
      try {
        this.props.onError(error, errorInfo);
      } catch (loggingErr) {
        console.error('Error logging failed:', loggingErr);
      }
    }

    // Auto-reload on chunk mismatch if configured (one-time reload guard)
    try {
      if (this.state.isChunkError && !sessionStorage.getItem('chunk_reload_retry')) {
        sessionStorage.setItem('chunk_reload_retry', '1');
        window.location.reload();
      }
    } catch {
      // Gracefully handle storage access restrictions in hardened iframes
    }
  }

  handleReset = () => {
    try {
      sessionStorage.removeItem('chunk_reload_retry');
    } catch {
      // Storage access safety
    }
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      isChunkError: false,
    });
    if (typeof this.props.onReset === 'function') {
      this.props.onReset();
    }
  };

  handleReload = () => {
    try {
      sessionStorage.removeItem('chunk_reload_retry');
    } catch {
      // Storage access safety
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback({
          error: this.state.error,
          resetErrorBoundary: this.handleReset,
        });
      }

      if (this.props.fallback) {
        return this.props.fallback;
      }

      const componentName = this.props.name || 'Module';

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="flex min-h-[300px] w-full flex-1 flex-col items-center justify-center p-6 text-center select-none"
        >
          <div className="w-full max-w-md rounded-2xl border border-rose-500/20 bg-rose-50/50 p-6 shadow-sm backdrop-blur-sm dark:border-rose-500/30 dark:bg-rose-950/20">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
              <AlertCircle className="h-5 w-5" aria-hidden="true" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
              Unable to load {componentName}
            </h3>

            <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {this.state.isChunkError
                ? 'A newer version of this application may be available. Reloading will sync the latest updates.'
                : 'An unexpected application error occurred in this module. Surrounding workspace surfaces remain safe and operational.'}
            </p>

            {this.state.error && process.env.NODE_ENV !== 'production' && (
              <div className="mt-3 overflow-x-auto rounded-lg bg-black/5 p-2 text-left font-mono text-[10px] text-rose-700 dark:bg-black/30 dark:text-rose-300">
                {this.state.error.toString()}
              </div>
            )}

            <div className="mt-5 flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:bg-white/[0.1]"
              >
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                <span>Retry {componentName}</span>
              </button>

              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                <RefreshCw className="h-3 w-3" aria-hidden="true" />
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
