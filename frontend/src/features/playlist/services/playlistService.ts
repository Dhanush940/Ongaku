import axiosInstance from "../../../api/axios";
import type { Playlist } from "../types";
import type { Song } from "../../song/types";

// Re-using the response interface from thunks or defining here if not exported
interface PlaylistResponse {
  success: boolean;
  message?: string;
  playlist?: Playlist;
  playlistNames?: Playlist[];
  deletedPlaylist?: Playlist;
  data?: Song[]; // for adding songs
  updatedPlaylist?: Playlist;
  error?: string;
}

const createPlaylist = async (playlistName: string) => {
  const response = await axiosInstance.post<PlaylistResponse>(
    "/playlist/createPlaylist",
    { playlistName },
  );
  return response.data;
};

const getPlaylists = async () => {
  const response = await axiosInstance.get<PlaylistResponse>(
    "/playlist/getPlaylists",
  );
  return response.data;
};

const deletePlaylist = async (id: string) => {
  const response = await axiosInstance.delete<PlaylistResponse>(
    `/playlist/deletePlaylist/${id}`,
  );
  return response.data;
};

const addSongs = async (payload: {
  filteredSongs: Song[];
  playlist: Playlist;
}) => {
  const response = await axiosInstance.post<PlaylistResponse>(
    "/playlist/addSongs",
    payload,
  );
  return response.data;
};

const renamePlaylist = async (payload: {
  playlist: Playlist;
  name: string;
}) => {
  const response = await axiosInstance.patch<PlaylistResponse>(
    "/playlist/renamePlaylist",
    payload,
  );
  return response.data;
};

const removeSongFromPlaylist = async (payload: {
  playlistId: string;
  songToBeRemoved: Song;
}) => {
  const response = await axiosInstance.patch<PlaylistResponse>(
    "/playlist/removeSongFromPlaylist",
    payload,
  );
  return response.data;
};

const playlistService = {
  createPlaylist,
  getPlaylists,
  deletePlaylist,
  addSongs,
  renamePlaylist,
  removeSongFromPlaylist,
};

export default playlistService;
