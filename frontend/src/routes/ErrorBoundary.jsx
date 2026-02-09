import React, { Component } from "react";
import { Link } from "react-router-dom";

/**
 * ErrorBoundary component to catch and handle routing/rendering errors.
 * Provides a fallback UI and recovery options.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    console.error("Route Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
          <p className="text-zinc-400 mb-6">
            We encountered an unexpected error. Please try again.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-3 bg-green-600 rounded-full hover:bg-green-500 transition-colors"
            >
              Reload Page
            </button>
            <Link
              to="/"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-3 bg-zinc-700 rounded-full hover:bg-zinc-600 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
