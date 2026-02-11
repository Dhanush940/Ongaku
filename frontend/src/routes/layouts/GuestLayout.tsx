import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { HOME } from "../../constants/routes";

/**
 * GuestLayout - Layout wrapper for guest-only routes (login, signup).
 * Redirects authenticated users away from auth pages.
 */
import type { RootState } from "../../store/store";

/**
 * GuestLayout - Layout wrapper for guest-only routes (login, signup).
 * Redirects authenticated users away from auth pages.
 */
const GuestLayout: React.FC = () => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  // Wait for auth state to resolve
  if (loading) {
    return null;
  }

  // Redirect authenticated users to their intended destination or home
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || HOME.ROOT;
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default GuestLayout;
