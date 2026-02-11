import axiosInstance from "../../../api/axios";
import type { Song } from "../types";
import type { Playlist } from "../../playlist/types";

interface DeleteSongResponse {
  success: boolean;
  message?: string;
  deletedSong?: Song;
  playlists?: Playlist[];
}

interface LoadSongsResponse {
  success: boolean;
  message?: string;
  songs?: Song[];
}

const getSongs = async () => {
  const response = await axiosInstance.get<LoadSongsResponse>("/song/getSongs");
  return response.data;
};

const deleteSong = async (id: string) => {
  const response = await axiosInstance.delete<DeleteSongResponse>(
    `/song/deleteSong/${id}`,
  );
  return response.data;
};

const createSong = async (payload: {
  title: string;
  name: string;
  song: string;
  image: string;
}) => {
  const response = await axiosInstance.post<{ message: string }>(
    "/song/create-song",
    payload,
  );
  return response.data;
};

const songService = {
  getSongs,
  deleteSong,
  createSong,
};

export default songService;
