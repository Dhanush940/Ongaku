import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SongCard from "../../song/components/SongCard";
import Loader from "../../../shared/components/layout/Loader";
import type { RootState } from "../../../store/store";

/**
 * PlaylistDetailsPage - Displays songs within a specific playlist.
 * Layout (sidebar, header, player) is provided by PlaylistLayout.
 */
const PlaylistDetailsPage: React.FC = () => {
  const { t } = useTranslation('playlist');
  const { id } = useParams<{ id: string }>();
  // Assuming user state has loading and isAuthenticated
  const { loading, isAuthenticated } = useSelector((state: RootState) => state.user);
  const { playlists } = useSelector((state: RootState) => state.playlist);

  // Get the current playlist
  const currentPlaylist = playlists?.find((item) => item._id === id);
  const playlistSongs = currentPlaylist?.playlistSongs || [];

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 justify-center sm:justify-between lg:justify-normal">
      {playlistSongs.length < 1 ? (
        <div className="w-full text-white text-center text-2xl mt-2">
          {t('no_songs')}
        </div>
      ) : (
        playlistSongs.map((item, index) => (
          <SongCard
            item={item}
            key={item._id}
            index={index}
            playlists={true}
          />
        ))
      )}
    </div>
  );
};

export default PlaylistDetailsPage;
