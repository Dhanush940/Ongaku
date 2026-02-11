/**
 * Route Constants
 * Centralized route path definitions to avoid hardcoded strings.
 * Use these constants throughout the app for navigation and route definitions.
 */

// Auth routes
export const AUTH = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",
  ACTIVATION: "/activation/:activation_token",
};

// Home routes
export const HOME = {
  ROOT: "/",
};

// Playlist routes
export const PLAYLISTS = {
  ROOT: "/playlists",
  DETAILS: "/playlists/:id",
};

// Helper functions to generate dynamic paths
export const getPlaylistDetailsPath = (id) => `/playlists/${id}`;
export const getResetPasswordPath = (token) => `/reset-password/${token}`;
export const getActivationPath = (token) => `/activation/${token}`;

// All routes (for reference)
export const ROUTES = {
  ...HOME,
  ...AUTH,
  ...PLAYLISTS,
};

export default ROUTES;
