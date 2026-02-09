import { lazy } from "react";
import { Route } from "react-router-dom";
import { AuthLayout } from "../../routes/layouts";
import { PlaylistLayout } from "./layouts";

// Lazy-loaded playlist pages
const PlaylistPage = lazy(() => import("./pages/PlaylistPage"));
const PlaylistDetailsPage = lazy(() => import("./pages/PlaylistDetailsPage"));

/**
 * Playlist feature routes.
 * 
 * Route structure:
 * /playlists           - Playlist list (index)
 * /playlists/:id       - Playlist details
 * 
 * All routes are:
 * - Protected via AuthLayout (requires authentication)
 * - Share common UI via PlaylistLayout (sidebar, header, player)
 */
const PlaylistRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/playlists" element={<PlaylistLayout />}>
      {/* Index route - /playlists */}
      <Route index element={<PlaylistPage />} />
      {/* Detail route - /playlists/:id */}
      <Route path=":id" element={<PlaylistDetailsPage />} />
    </Route>
  </Route>
);

export default PlaylistRoutes;
