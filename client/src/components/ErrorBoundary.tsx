import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 999999,
          background: "#1a1a2e",
          color: "#fff",
          padding: "2rem",
          fontFamily: "monospace",
          overflow: "auto",
        }}>
          <h1 style={{ color: "#ff6b6b", fontSize: "1.5rem" }}>Error</h1>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.85rem", lineHeight: 1.5 }}>
            {this.state.error?.message}
          </pre>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.75rem", color: "#aaa", marginTop: "1rem" }}>
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
