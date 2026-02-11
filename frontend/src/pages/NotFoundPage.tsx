import React from "react";
import { Link } from "react-router-dom";
import { MdMusicOff } from "react-icons/md";
import { HOME } from "../constants/routes";

/**
 * NotFoundPage - 404 error page displayed for invalid routes.
 */
const NotFoundPage: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white">
      <MdMusicOff size={80} className="text-zinc-600 mb-4" />
      <h1 className="text-7xl font-bold mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-zinc-400 mb-8 text-center max-w-md px-4">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to={HOME.ROOT}
        className="px-8 py-3 bg-green-600 rounded-full hover:bg-green-500 transition-colors font-semibold active:scale-95"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

