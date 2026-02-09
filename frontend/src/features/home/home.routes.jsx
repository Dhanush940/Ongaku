import React, { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import { HOME } from "../../constants/routes";
import { PublicLayout } from "../../routes/layouts";
import FeatureErrorBoundary from "../../routes/FeatureErrorBoundary";
import { HomeSkeleton } from "../../components/common/Skeletons";

// Lazy-loaded home page
const HomePage = lazy(() => import("./pages/HomePage"));

/**
 * Home feature routes.
 * 
 * Route: /
 * Layout: PublicLayout (accessible to all users)
 * 
 * Export pattern: JSX fragment with feature-level error boundary and suspense
 */
const HomeRoutes = (
  <Route element={<PublicLayout />}>
    <Route
      index
      element={
        <FeatureErrorBoundary featureName="Home">
          <Suspense fallback={<HomeSkeleton />}>
            <HomePage />
          </Suspense>
        </FeatureErrorBoundary>
      }
    />
  </Route>
);

export default HomeRoutes;
