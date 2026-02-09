import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import RouteLoader from "./RouteLoader";
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
 * - Layouts handle cross-cutting concerns (auth, loading)
 * - Suspense provides loading states for lazy-loaded components
 * - ErrorBoundary catches and handles rendering errors
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
 */
const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          {/* Home routes */}
          {HomeRoutes}

          {/* Auth routes */}
          {AuthRoutes}

          {/* Playlist routes */}
          {PlaylistRoutes}

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
