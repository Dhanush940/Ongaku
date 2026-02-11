import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadSongs, deleteSongFromDatabase } from "./songThunks";
import { logoutUser } from "../auth/userThunks";
import type { Song, SongState } from "./types";

const initialState: SongState = {
  songs: [],
  isLoading: true,
  error: null,
  deleteLoading: false,
  deleteError: null,
  successMessage: null,
};

const songSlice = createSlice({
  name: "songs", // Store key
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.deleteError = null;
    },
    clearMessages: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load Songs
      .addCase(loadSongs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadSongs.fulfilled, (state, action: PayloadAction<Song[]>) => {
        state.isLoading = false;
        state.songs = action.payload; // array of Songs
        state.error = null;
      })
      .addCase(loadSongs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Failed to load songs";
      })
      
      // Delete Song
      .addCase(deleteSongFromDatabase.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteSongFromDatabase.fulfilled, (state, action: PayloadAction<Song>) => {
        state.deleteLoading = false;
        // Optimistic update
        state.songs = state.songs.filter((item) => item._id !== action.payload._id);
        state.deleteError = null;
      })
      .addCase(deleteSongFromDatabase.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = (action.payload as string) || "Failed to delete song";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.songs = [];
        state.isLoading = false;
        state.error = null;
        state.deleteLoading = false;
        state.deleteError = null;
        state.successMessage = null;
      });
  },
});

export const { clearErrors, clearMessages } = songSlice.actions;

export default songSlice.reducer;
