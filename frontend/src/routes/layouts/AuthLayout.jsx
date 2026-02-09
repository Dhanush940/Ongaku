import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import RouteLoader from "../RouteLoader";

/**
 * AuthLayout - Layout wrapper for protected routes.
 * Handles authentication at the layout level, eliminating per-route protection flags.
 * All child routes automatically inherit authentication requirements.
 */
const AuthLayout = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const location = useLocation();

  // Display loader while checking authentication state
  if (loading) {
    return <RouteLoader />;
  }

  // Redirect unauthenticated users to login, preserving intended destination
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render child routes via Outlet
  return <Outlet />;
};

export default AuthLayout;
