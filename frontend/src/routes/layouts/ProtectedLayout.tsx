import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AUTH } from "../../constants/routes";
import RouteLoader from "../RouteLoader";

/**
 * ProtectedLayout - Layout wrapper for routes requiring authentication.
 * Handles auth checks at the layout level, eliminating per-route protection flags.
 * All child routes automatically inherit authentication requirements.
 */
import type { RootState } from "../../store/store";

/**
 * ProtectedLayout - Layout wrapper for routes requiring authentication.
 * Handles auth checks at the layout level, eliminating per-route protection flags.
 * All child routes automatically inherit authentication requirements.
 */
const ProtectedLayout: React.FC = () => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  // Display loader while checking authentication state
  if (loading) {
    return <RouteLoader />;
  }

  // Redirect unauthenticated users to login, preserving intended destination
  if (!isAuthenticated) {
    return <Navigate to={AUTH.LOGIN} state={{ from: location }} replace />;
  }

  // Render child routes via Outlet
  return <Outlet />;
};

export default ProtectedLayout;
