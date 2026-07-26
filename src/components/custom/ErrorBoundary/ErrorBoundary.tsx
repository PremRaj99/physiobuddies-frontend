import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface the crash in the console instead of silently white-screening.
    console.error('Render error caught by ErrorBoundary:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-[#012a4a]">Something went wrong</h2>
          <p className="text-muted-foreground mb-6 max-w-md text-sm">
            {this.state.error?.message ?? 'An unexpected error occurred while rendering this page.'}
          </p>
          <button
            onClick={this.handleReset}
            className="rounded-md bg-[#014f86] px-4 py-2 font-medium text-white hover:bg-[#013a63]"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
