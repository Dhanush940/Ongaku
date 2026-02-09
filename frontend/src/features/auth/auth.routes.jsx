import React, { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import { AUTH } from "../../constants/routes";
import { GuestLayout, PublicLayout } from "../../routes/layouts";
import FeatureErrorBoundary from "../../routes/FeatureErrorBoundary";
import { AuthFormSkeleton } from "../../components/common/Skeletons";

// Lazy-loaded auth pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const ActivationPage = lazy(() => import("./pages/ActivationPage"));

// Auth form wrapper with suspense and error boundary
const AuthPageWrapper = ({ children }) => (
  <FeatureErrorBoundary featureName="Authentication">
    <Suspense
      fallback={
        <div className="w-screen h-screen bg-black flex items-center justify-center">
          <AuthFormSkeleton />
        </div>
      }
    >
      {children}
    </Suspense>
  </FeatureErrorBoundary>
);

/**
 * Auth feature routes.
 * 
 * Routes:
 * - /login (guest-only)
 * - /signup (guest-only)
 * - /forgot-password (guest-only)
 * - /reset-password/:token (guest-only)
 * - /activation/:token (public)
 * 
 * Layout: GuestLayout redirects authenticated users away from auth pages
 * Export pattern: JSX fragment with feature-level error boundary and suspense
 */
const AuthRoutes = (
  <>
    {/* Guest-only routes - redirect if already logged in */}
    <Route element={<GuestLayout />}>
      <Route
        path={AUTH.LOGIN}
        element={
          <AuthPageWrapper>
            <LoginPage />
          </AuthPageWrapper>
        }
      />
      <Route
        path={AUTH.SIGNUP}
        element={
          <AuthPageWrapper>
            <SignupPage />
          </AuthPageWrapper>
        }
      />
      <Route
        path={AUTH.FORGOT_PASSWORD}
        element={
          <AuthPageWrapper>
            <ForgotPasswordPage />
          </AuthPageWrapper>
        }
      />
      <Route
        path={AUTH.RESET_PASSWORD}
        element={
          <AuthPageWrapper>
            <ResetPasswordPage />
          </AuthPageWrapper>
        }
      />
    </Route>

    {/* Public route - accessible to anyone with valid token */}
    <Route element={<PublicLayout />}>
      <Route
        path={AUTH.ACTIVATION}
        element={
          <AuthPageWrapper>
            <ActivationPage />
          </AuthPageWrapper>
        }
      />
    </Route>
  </>
);

export default AuthRoutes;
