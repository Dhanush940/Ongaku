import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/background-loader.json";

/**
 * RouteLoader component displayed during lazy route loading.
 * Uses the same animation as the main Loader for consistency.
 */
const RouteLoader: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default RouteLoader;
