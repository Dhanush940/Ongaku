import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import playlistService from "./services/playlistService";
import type { Song } from "../song/types";
import type { Playlist } from "./types";

interface ThunkConfig {
  rejectValue: string;
}

interface RemoveSongPayload {
  playlistId: string;
  songToBeRemoved: Song;
}

export const createPlaylist = createAsyncThunk<Playlist, string, ThunkConfig>(
  "playlist/createPlaylist",
  async (playlistName, { rejectWithValue }) => {
    try {
      const data = await playlistService.createPlaylist(playlistName);

      if (!data.success || !data.playlist) {
        return rejectWithValue(data.message || "Failed to create playlist");
      }
      return data.playlist;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const getPlaylists = createAsyncThunk<Playlist[], void, ThunkConfig>(
  "playlist/getPlaylists",
  async (_, { rejectWithValue }) => {
    try {
      const data = await playlistService.getPlaylists();

      if (!data.success || !data.playlistNames) {
        return rejectWithValue(data.message || "Failed to fetch playlists");
      }
      return data.playlistNames;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const deletePlaylist = createAsyncThunk<Playlist, Playlist, ThunkConfig>(
  "playlist/deletePlaylist",
  async (playlist, { rejectWithValue }) => {
    try {
      const data = await playlistService.deletePlaylist(playlist._id);

      if (!data.success || !data.deletedPlaylist) {
        return rejectWithValue(data.message || "Failed to delete playlist");
      }
      return data.deletedPlaylist;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const addSongsInPlaylist = createAsyncThunk<
  { playlist: Playlist; songs: Song[] },
  { filteredSongs: Song[]; playlist: Playlist },
  ThunkConfig
>(
  "playlist/addSongsInPlaylist",
  async ({ filteredSongs, playlist }, { rejectWithValue }) => {
    try {
      const data = await playlistService.addSongs({ filteredSongs, playlist });

      if (!data.success || !data.data) {
        return rejectWithValue(data.message || "Failed to add songs");
      }
      return { playlist, songs: data.data };
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const renamePlaylist = createAsyncThunk<
  { currentPlaylist: Playlist; updatedPlaylist: Playlist },
  { name: string; playlist: Playlist },
  ThunkConfig
>(
  "playlist/renamePlaylist",
  async ({ name, playlist }, { rejectWithValue }) => {
    try {
      const data = await playlistService.renamePlaylist({ playlist, name });

      if (!data.success || !data.updatedPlaylist) {
        return rejectWithValue(data.error || "Failed to rename playlist");
      }
      return {
        currentPlaylist: playlist,
        updatedPlaylist: data.updatedPlaylist,
      };
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const removeSongFromPlaylist = createAsyncThunk<
  { updatedPlaylist: Playlist },
  RemoveSongPayload,
  ThunkConfig
>(
  "playlist/removeSongFromPlaylist",
  async ({ playlistId, songToBeRemoved }, { rejectWithValue }) => {
    try {
      const data = await playlistService.removeSongFromPlaylist({
        playlistId,
        songToBeRemoved,
      });

      if (!data.success || !data.updatedPlaylist) {
        return rejectWithValue(data.message || "Failed to remove song");
      }
      return { updatedPlaylist: data.updatedPlaylist };
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);
