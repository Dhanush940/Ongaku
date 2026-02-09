import { lazy } from "react";
import { Route } from "react-router-dom";

// Lazy-loaded home page
const HomePage = lazy(() => import("./pages/HomePage"));

/**
 * Home feature routes.
 * Public route - accessible to both authenticated and guest users.
 */
const HomeRoutes = (
  <Route index element={<HomePage />} />
);

export default HomeRoutes;
