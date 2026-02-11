import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { BsPlay, BsFillArrowRightCircleFill } from "react-icons/bs";
import { BiDotsHorizontalRounded, BiSolidRename } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { RiMusicFill } from "react-icons/ri";
import { getPlaylistDetailsPath } from "../../../constants/routes";
import {
  deletePlaylist,
  renamePlaylist,
} from "../playlistThunks";
import AddSongsToPlaylistModal from "./modals/AddSongsToPlaylistModal";
import type { AppDispatch } from "../../../store/store";
import type { Playlist } from "../types";

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  const { t } = useTranslation("playlist");
  const dispatch = useDispatch<AppDispatch>();
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [showAddSongsModal, setShowAddSongsModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
        setIsRenaming(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRename = () => {
    if (renameValue.trim()) {
      dispatch(renamePlaylist({ name: renameValue, playlist }));
      // Optionally refresh playlists if needed, but reducer should handle state update
      // dispatch(getPlaylists()); 
      setIsRenaming(false);
      setShowMenu(false);
    }
  };

  const startRename = () => {
     setRenameValue(playlist.name);
     setIsRenaming(true);
  };

  const handleDelete = () => {
    if (window.confirm(t('delete_confirmation', { name: playlist.name }))) {
        dispatch(deletePlaylist(playlist));
    }
    setShowMenu(false);
  };

  return (
    <>
      <div
        className="p-1.5 my-2 h-fit hover:bg-neutral-700 relative rounded-md transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col bg-[#151515] p-1 w-40 h-40 text-white rounded-sm group relative shadow-lg">
          {/* Cover Image Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
             <img
                src="/bg-image.png"
                alt=""
                className="w-12 h-12 opacity-50"
             />
          </div>

          {/* Hover Overlay Actions */}
          {isHovered && (
            <>
              {/* Play Button */}
              <Link to={getPlaylistDetailsPath(playlist._id)}>
                <div className="absolute bottom-2 left-2 w-10 h-10 flex justify-center items-center rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all shadow-md z-10 text-black">
                  <BsPlay size={24} className="ml-1" />
                </div>
              </Link>
              
              {/* Menu Meatball Button */}
              <div
                className="absolute top-2 right-2 w-8 h-8 flex justify-center items-center rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 transition-all cursor-pointer z-20"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                  setIsRenaming(false); // Reset rename state on toggle
                }}
              >
                <BiDotsHorizontalRounded size={20} />
              </div>
            </>
          )}

          {/* Context Menu */}
          {showMenu && (
            <div 
              ref={menuRef}
              className="absolute bg-zinc-800 w-40 h-fit -right-12 top-10 rounded-lg shadow-xl py-1 z-30 border border-zinc-700"
            >
              {/* Rename Action */}
              <div className="px-2 py-1">
                {isRenaming ? (
                  <div className="flex items-center gap-1">
                    <input
                      className="w-full bg-zinc-900 border border-zinc-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-green-500"
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      autoFocus
                      onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRename();
                          if (e.key === 'Escape') setIsRenaming(false);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <BsFillArrowRightCircleFill
                      size={18}
                      className="text-green-500 cursor-pointer hover:text-green-400"
                      onClick={(e) => {
                          e.stopPropagation();
                          handleRename();
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className="flex items-center gap-2 p-2 hover:bg-zinc-700 rounded cursor-pointer transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        startRename();
                    }}
                  >
                    <BiSolidRename size={18} className="text-zinc-400" />
                    <span className="text-sm font-medium text-zinc-200">{t('rename_playlist')}</span>
                  </div>
                )}
              </div>

              {/* Delete Action */}
              <div className="px-2 py-1">
                <div
                  className="flex items-center gap-2 p-2 hover:bg-zinc-700 rounded cursor-pointer transition-colors"
                  onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                  }}
                >
                  <AiOutlineDelete size={18} className="text-zinc-400" />
                  <span className="text-sm font-medium text-zinc-200">{t('delete_playlist')}</span>
                </div>
              </div>

              {/* Add Songs Action */}
              <div className="px-2 py-1">
                <div
                  className="flex items-center gap-2 p-2 hover:bg-zinc-700 rounded cursor-pointer transition-colors"
                  onClick={(e) => {
                      e.stopPropagation();
                      setShowAddSongsModal(true);
                      setShowMenu(false);
                  }}
                >
                  <RiMusicFill size={18} className="text-zinc-400" />
                  <span className="text-sm font-medium text-zinc-200">{t('add_songs_btn')}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Playlist Metadata */}
        <div className="mt-3">
          <h3 className="font-bold text-white truncate text-base mb-1" title={playlist.name}>
            {playlist.name}
          </h3>
          <p className="text-zinc-400 text-sm font-medium">
             {t(playlist.playlistSongs?.length > 1 ? 'songs_count_plural' : 'songs_count', { count: playlist.playlistSongs?.length || 0 })}
          </p>
        </div>
      </div>

      {/* Modals */}
      <AddSongsToPlaylistModal 
         isOpen={showAddSongsModal} 
         onClose={() => setShowAddSongsModal(false)}
         playlist={playlist}
      />
    </>
  );
};

export default PlaylistCard;
