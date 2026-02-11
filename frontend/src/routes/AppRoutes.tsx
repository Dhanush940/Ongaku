import React from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import NotFoundPage from "../pages/NotFoundPage";

// Feature-level route imports
import HomeRoutes from "../features/home/home.routes";
import AuthRoutes from "../features/auth/auth.routes";
import PlaylistRoutes from "../features/playlist/playlist.routes";

/**
 * AppRoutes - Central router combining all feature routes.
 * 
 * Architecture:
 * - Feature routes are defined in their respective feature folders
 * - Each feature manages its own lazy loading and error boundaries
 * - Layouts handle cross-cutting concerns (auth, loading)
 * - Global ErrorBoundary catches any uncaught errors
 * 
 * Route Structure:
 * /                          - Home (public)
 * /login                     - Login (guest-only)
 * /signup                    - Signup (guest-only)
 * /forgot-password           - Forgot password (guest-only)
 * /reset-password/:token     - Reset password (guest-only)
 * /activation/:token         - Account activation (public)
 * /playlists                 - Playlist list (protected)
 * /playlists/:id             - Playlist details (protected)
 * 
 * Layout Types:
 * - PublicLayout: No auth checks, accessible to all
 * - GuestLayout: Redirects authenticated users away
 * - ProtectedLayout: Requires authentication
 * 
 * Future Extensibility:
 * - Role-based routing: Add RoleGuard layout
 * - Data loaders: Add loader prop to routes (React Router 6.4+)
 * - Analytics: Add route change listener
 */
const AppRoutes: React.FC = () => {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Home routes (public) */}
        {HomeRoutes}

        {/* Auth routes (guest-only / public) */}
        {AuthRoutes}

        {/* Playlist routes (protected) */}
        {PlaylistRoutes}

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoutes;
