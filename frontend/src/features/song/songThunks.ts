import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backend_server } from "../../config";
// Assuming playlistSlice.js has been created and exports the action
import { updatePlaylistsSongsSuccess } from "../playlist/playlistSlice";
import type { Song } from "./types";
import type { Playlist } from "../playlist/types";

interface ThunkConfig {
  rejectValue: string;
}

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

export const loadSongs = createAsyncThunk<Song[], void, ThunkConfig>(
  "song/loadSongs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<LoadSongsResponse>(
        `${backend_server}/song/getSongs`, 
        { withCredentials: true }
      );
      
      if (!data.success || !data.songs) {
         return rejectWithValue(data.message || "Failed to load songs");
      }
      return data.songs;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const deleteSongFromDatabase = createAsyncThunk<Song, string, ThunkConfig>(
  "song/deleteSong",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.delete<DeleteSongResponse>(
        `${backend_server}/song/deleteSong/${id}`,
        { withCredentials: true }
      );
      
      // Update playlists as they might contain the deleted song
      if (data.playlists) {
         dispatch(updatePlaylistsSongsSuccess(data.playlists));
      }
      
      if (!data.deletedSong) {
          return rejectWithValue(data.message || "Failed to delete song");
      }
      return data.deletedSong;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
