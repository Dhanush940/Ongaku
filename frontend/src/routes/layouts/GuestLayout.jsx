import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * GuestLayout - Layout wrapper for guest-only routes (login, signup).
 * Redirects authenticated users away from auth pages.
 */
const GuestLayout = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const location = useLocation();

  // Wait for auth state to resolve
  if (loading) {
    return null;
  }

  // Redirect authenticated users to their intended destination or home
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default GuestLayout;
