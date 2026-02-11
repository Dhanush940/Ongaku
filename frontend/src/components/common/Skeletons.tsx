import React from "react";

/**
 * Skeleton loader components for feature-level loading states.
 * Use these instead of a single global loader for better UX.
 */

interface SkeletonPulseProps {
  className?: string;
}

// Generic skeleton pulse animation
const SkeletonPulse: React.FC<SkeletonPulseProps> = ({ className = "" }) => (
  <div className={`animate-pulse bg-zinc-800 rounded ${className}`} />
);

// Card skeleton for playlist/song cards
export const CardSkeleton: React.FC = () => (
  <div className="p-1.5 my-2">
    <div className="flex flex-col bg-[#151515] p-1 w-40 h-40 rounded-sm">
      <SkeletonPulse className="w-full h-full" />
    </div>
    <SkeletonPulse className="w-24 h-4 mt-2" />
    <SkeletonPulse className="w-16 h-3 mt-1" />
  </div>
);

interface CardGridSkeletonProps {
  count?: number;
}

// Grid of card skeletons
export const CardGridSkeleton: React.FC<CardGridSkeletonProps> = ({ count = 6 }) => (
  <div className="flex flex-wrap gap-4 p-4">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

// Playlist page skeleton
export const PlaylistSkeleton: React.FC = () => (
  <div className="w-full h-full px-14 py-5">
    <SkeletonPulse className="w-48 h-12 mb-6" />
    <SkeletonPulse className="w-36 h-10 mb-6" />
    <CardGridSkeleton count={6} />
  </div>
);

// Auth form skeleton
export const AuthFormSkeleton: React.FC = () => (
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
export const HomeSkeleton: React.FC = () => (
  <div className="w-full h-full">
    <SkeletonPulse className="w-full h-16 mb-4" />
    <CardGridSkeleton count={8} />
  </div>
);

interface FeatureSuspenseProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

// Feature-specific suspense wrapper
export const FeatureSuspense: React.FC<FeatureSuspenseProps> = ({ children, fallback }) => (
  <React.Suspense fallback={fallback}>
    {children}
  </React.Suspense>
);

const Skeletons = {
  CardSkeleton,
  CardGridSkeleton,
  PlaylistSkeleton,
  AuthFormSkeleton,
  HomeSkeleton,
  FeatureSuspense,
};

export default Skeletons;
