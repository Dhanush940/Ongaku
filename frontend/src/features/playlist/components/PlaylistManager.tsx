import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlinePlus } from "react-icons/ai";
import { MdLibraryMusic } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylists } from "../playlistThunks";
import { toast } from "react-toastify";

import PlaylistCard from "./PlaylistCard";
import CreatePlaylistModal from "./modals/CreatePlaylistModal";
import type { AppDispatch, RootState } from "../../../store/store";

/**
 * PlaylistManager - Displays and manages user playlists.
 * Header and layout are provided by PlaylistLayout.
 */
const PlaylistManager: React.FC = () => {
  const { t } = useTranslation('playlist');
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const { playlists } = useSelector((state: RootState) => state.playlist);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getPlaylists());
    }
  }, [dispatch, isAuthenticated]);

  const handleCreateClick = () => {
    if (isAuthenticated) {
      setIsCreateModalOpen(true);
    } else {
      toast.error(t('login_to_create_playlist'));
    }
  };

  return (
    <div className="text-white w-full h-full px-6 sm:px-14 py-5 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{t('playlists')}</h1>
        
        {/* Create Button (Top Right) */}
        {playlists?.length > 0 && (
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-black px-4 py-2 rounded-full font-medium active:scale-95 transition-all shadow-lg"
              onClick={handleCreateClick}
            >
              <AiOutlinePlus size={20} />
              <span>{t('new_playlist')}</span>
            </button>
            
            {/* Modal positioned relative to button or global? The original was relative. Let's make it fixed/modal for better UX */}
            <CreatePlaylistModal 
              isOpen={isCreateModalOpen} 
              onClose={() => setIsCreateModalOpen(false)} 
            />
          </div>
        )}
      </div>

      {playlists?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-6 overflow-y-auto pb-20 max-h-[calc(100vh-200px)] custom-scrollbar">
          {playlists.map((playlist) => (
             <PlaylistCard key={playlist._id} playlist={playlist} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="w-full h-[60vh] flex flex-col justify-center items-center text-zinc-400 gap-6">
          <MdLibraryMusic size={120} className="text-zinc-700 animate-pulse" />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">{t('no_playlists')}</h2>
            <p className="text-zinc-500 mb-6">{t('create_first_playlist')}</p>
            
            <div className="relative">
              <button
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-black px-6 py-3 rounded-full font-bold text-lg active:scale-95 transition-all shadow-xl hover:shadow-orange-500/20"
                onClick={handleCreateClick}
              >
                <AiOutlinePlus size={24} />
                <span>{t('create_new_playlist')}</span>
              </button>
               {/* Modal for empty state */}
               {!playlists?.length && (
                 <CreatePlaylistModal 
                    isOpen={isCreateModalOpen} 
                    onClose={() => setIsCreateModalOpen(false)} 
                 />
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistManager;
