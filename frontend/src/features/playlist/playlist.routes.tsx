import React, { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import { PLAYLISTS } from "../../constants/routes";
import { ProtectedLayout } from "../../routes/layouts";
import FeatureErrorBoundary from "../../routes/FeatureErrorBoundary";
import { PlaylistSkeleton } from "../../shared/components/ui/Skeletons";

// Lazy-loaded playlist layout and pages
const PlaylistLayout = lazy(() => import("./layouts/PlaylistLayout"));
const PlaylistPage = lazy(() => import("./pages/PlaylistPage"));
const PlaylistDetailsPage = lazy(() => import("./pages/PlaylistDetailsPage"));

// Playlist page wrapper with suspense
const PlaylistPageWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PlaylistSkeleton />}>
    {children}
  </Suspense>
);

/**
 * Playlist feature routes.
 * 
 * Route structure (nested):
 * /playlists           - Playlist list (index)
 * /playlists/:id       - Playlist details
 * 
 * Layout hierarchy:
 * ProtectedLayout → PlaylistLayout → Page Content
 * 
 * All routes are:
 * - Protected via ProtectedLayout (requires authentication)
 * - Share common UI via PlaylistLayout (sidebar, header, player)
 * - Wrapped in feature-level error boundary
 * 
 * Export pattern: JSX fragment with feature-level error boundary and suspense
 */
const PlaylistRoutes = (
  <Route element={<ProtectedLayout />}>
    <Route
      path={PLAYLISTS.ROOT}
      element={
        <FeatureErrorBoundary featureName="Playlists">
          <Suspense fallback={<PlaylistSkeleton />}>
            <PlaylistLayout />
          </Suspense>
        </FeatureErrorBoundary>
      }
    >
      {/* Index route - /playlists */}
      <Route
        index
        element={
          <PlaylistPageWrapper>
            <PlaylistPage />
          </PlaylistPageWrapper>
        }
      />
      {/* Detail route - /playlists/:id */}
      <Route
        path=":id"
        element={
          <PlaylistPageWrapper>
            <PlaylistDetailsPage />
          </PlaylistPageWrapper>
        }
      />
    </Route>
  </Route>
);

export default PlaylistRoutes;
