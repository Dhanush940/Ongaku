import React from "react";

/**
 * Skeleton loader components for feature-level loading states.
 * Use these instead of a single global loader for better UX.
 */

// Generic skeleton pulse animation
const SkeletonPulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-zinc-800 rounded ${className}`} />
);

// Card skeleton for playlist/song cards
export const CardSkeleton = () => (
  <div className="p-1.5 my-2">
    <div className="flex flex-col bg-[#151515] p-1 w-40 h-40 rounded-sm">
      <SkeletonPulse className="w-full h-full" />
    </div>
    <SkeletonPulse className="w-24 h-4 mt-2" />
    <SkeletonPulse className="w-16 h-3 mt-1" />
  </div>
);

// Grid of card skeletons
export const CardGridSkeleton = ({ count = 6 }) => (
  <div className="flex flex-wrap gap-4 p-4">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

// Playlist page skeleton
export const PlaylistSkeleton = () => (
  <div className="w-full h-full px-14 py-5">
    <SkeletonPulse className="w-48 h-12 mb-6" />
    <SkeletonPulse className="w-36 h-10 mb-6" />
    <CardGridSkeleton count={6} />
  </div>
);

// Auth form skeleton
export const AuthFormSkeleton = () => (
  <div className="w-full max-w-md p-8 bg-zinc-900 rounded-lg">
    <SkeletonPulse className="w-32 h-8 mx-auto mb-8" />
    <div className="space-y-4">
      <SkeletonPulse className="w-full h-12" />
      <SkeletonPulse className="w-full h-12" />
      <SkeletonPulse className="w-full h-12" />
    </div>
    <SkeletonPulse className="w-full h-12 mt-6" />
  </div>
);

// Home page skeleton
export const HomeSkeleton = () => (
  <div className="w-full h-full">
    <SkeletonPulse className="w-full h-16 mb-4" />
    <CardGridSkeleton count={8} />
  </div>
);

// Feature-specific suspense wrapper
export const FeatureSuspense = ({ children, fallback }) => (
  <React.Suspense fallback={fallback}>
    {children}
  </React.Suspense>
);

export default {
  CardSkeleton,
  CardGridSkeleton,
  PlaylistSkeleton,
  AuthFormSkeleton,
  HomeSkeleton,
  FeatureSuspense,
};
