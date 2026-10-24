import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by Atelier Luxe ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F5F2EC] flex flex-col items-center justify-center p-8 text-center text-[#292722] font-sans">
          <div className="max-w-md space-y-6">
            <span className="text-[10px] uppercase tracking-[0.26em] font-mono text-[#777765] block">
              Atelier Luxe · Notice
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#292722]">
              Refining the Atmosphere
            </h2>
            <p className="text-sm text-[#34332F]/80 font-light leading-relaxed">
              An unexpected condition occurred while rendering the environment. The workspace is active and can be re-initialized below.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#292722] text-[#F5F2EC] hover:bg-[#777765] transition-colors cursor-pointer"
              >
                Reload Monograph
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
