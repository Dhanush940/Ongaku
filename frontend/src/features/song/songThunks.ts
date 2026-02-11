import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import songService from "./services/songService";
// Assuming playlistSlice.js has been created and exports the action
import { updatePlaylistsSongsSuccess } from "../playlist/playlistSlice";
import type { Song } from "./types";
import type { Playlist } from "../playlist/types";

interface ThunkConfig {
  rejectValue: string;
}

export const loadSongs = createAsyncThunk<Song[], void, ThunkConfig>(
  "song/loadSongs",
  async (_, { rejectWithValue }) => {
    try {
      const data = await songService.getSongs();

      if (!data.success || !data.songs) {
        return rejectWithValue(data.message || "Failed to load songs");
      }
      return data.songs;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const deleteSongFromDatabase = createAsyncThunk<
  Song,
  string,
  ThunkConfig
>("song/deleteSong", async (id, { dispatch, rejectWithValue }) => {
  try {
    const data = await songService.deleteSong(id);

    // Update playlists as they might contain the deleted song
    if (data.playlists) {
      dispatch(updatePlaylistsSongsSuccess(data.playlists));
    }

    if (!data.deletedSong) {
      return rejectWithValue(data.message || "Failed to delete song");
    }
    return data.deletedSong;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});
