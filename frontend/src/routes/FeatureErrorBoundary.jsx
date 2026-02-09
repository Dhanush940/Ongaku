import React, { Component } from "react";
import { Link } from "react-router-dom";
import { HOME } from "../constants/routes";

/**
 * FeatureErrorBoundary - Reusable error boundary for feature-level isolation.
 * Prevents errors in one feature from crashing the entire app.
 * 
 * Usage:
 * <FeatureErrorBoundary featureName="Playlist">
 *   <PlaylistRoutes />
 * </FeatureErrorBoundary>
 */
class FeatureErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error for monitoring (can integrate with error tracking service)
    console.error(`[${this.props.featureName || "Feature"} Error]:`, error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { featureName = "This section", children } = this.props;

    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[400px] bg-zinc-900 flex flex-col items-center justify-center text-white rounded-lg p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">
            {featureName} encountered an error
          </h2>
          <p className="text-zinc-400 mb-6 text-center max-w-md">
            Something went wrong. You can try again or go back to the home page.
          </p>
          <div className="flex gap-4">
            <button
              onClick={this.handleRetry}
              className="px-6 py-2 bg-green-600 rounded-full hover:bg-green-500 transition-colors"
            >
              Try Again
            </button>
            <Link
              to={HOME.ROOT}
              className="px-6 py-2 bg-zinc-700 rounded-full hover:bg-zinc-600 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default FeatureErrorBoundary;
