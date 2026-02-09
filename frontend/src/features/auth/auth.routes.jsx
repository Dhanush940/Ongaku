import { lazy } from "react";
import { Route } from "react-router-dom";
import { GuestLayout } from "../../routes/layouts";

// Lazy-loaded auth pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const ActivationPage = lazy(() => import("./pages/ActivationPage"));

/**
 * Auth feature routes.
 * Guest-only routes are wrapped in GuestLayout to redirect authenticated users.
 * Activation route is public (can be accessed by anyone with the token).
 */
const AuthRoutes = (
  <>
    {/* Guest-only routes - redirect if already logged in */}
    <Route element={<GuestLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
    </Route>

    {/* Public route - accessible to anyone with valid token */}
    <Route path="/activation/:activation_token" element={<ActivationPage />} />
  </>
);

export default AuthRoutes;
