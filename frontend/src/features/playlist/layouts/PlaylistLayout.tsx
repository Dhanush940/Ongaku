import React from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavigationSidebar from "../../../shared/components/layout/NavigationSidebar";
import Header from "../../../shared/components/layout/Header";
import SongPlayer from "../../player/components/SongPlayer";
import { removeFromStorage } from "../../player/playerSlice";
import type { AppDispatch, RootState } from "../../../store/store";
import type { Song } from "../../song/types";


const PlaylistLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { currentSong } = useSelector((state: RootState) => state.storage);
  const { playlists } = useSelector((state: RootState) => state.playlist);

  // Get current playlist songs for the player (if on details page)
  const getCurrentPlaylistSongs = (): Song[] => {
    const urlParts = window.location.pathname.split("/");
    const playlistId = urlParts[urlParts.length - 1];
    if (playlistId && playlistId !== "playlists") {
      const playlist = playlists?.find((item) => item._id === playlistId);
      return playlist?.playlistSongs || [];
    }
    return [];
  };

  // Cleanup storage on page unload
  window.onbeforeunload = function () {
    dispatch(removeFromStorage());
    return null;
  };

  return (
    <div className="w-screen h-screen bg-black overflow-hidden flex flex-col">
      <div
        className={
          currentSong?.duration === undefined
            ? `flex-1 flex gap-2 p-2 w-full h-full`
            : `flex-1 flex gap-2 p-2 w-full h-[calc(100vh-90px)]`
        }
      >
        {/* Shared Sidebar */}
        <NavigationSidebar />

        {/* Main Content Area */}
        <div className="flex-1 w-full ml-1 sm:ml-0 rounded-md bg-[#1f1f1f] overflow-hidden flex flex-col relative">
          
          {/* Header */}
          <Header />

          {/* Page Content - rendered via Outlet */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
             <Outlet />
          </div>
        </div>
      </div>

      {/* Song Player - visible when a song is playing */}
      {currentSong?.duration && (
        <div className="w-full h-[90px] fixed bottom-0 left-0 z-50 bg-black border-t border-zinc-800">
           <SongPlayer songs={getCurrentPlaylistSongs()} />
        </div>
      )}
    </div>
  );
};

export default PlaylistLayout;
