import { createSlice } from "@reduxjs/toolkit";
import {
  createPlaylist,
  getPlaylists,
  deletePlaylist,
  addSongsInPlaylist,
  renamePlaylist,
  removeSongFromPlaylist,
} from "./playlistThunks";
import { logoutUser } from "../auth/userThunks";

const initialState = {
  playlists: [],
  isLoading: true,
  error: null,
  loadingFetchPlaylists: false,
  deleteLoading: false,
  deleteError: null,
  loadingBeforeAddingSongs: false,
  errorAddingSongs: null,
  successMessage: null,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    updatePlaylistsSongsSuccess: (state, action) => {
      state.playlists = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
      state.deleteError = null;
      state.errorAddingSongs = null;
    },
    clearMessages: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Create Playlist ---
      .addCase(createPlaylist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playlists.push(action.payload);
        state.error = null;
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to create playlist";
      })

      // --- Get Playlists ---
      .addCase(getPlaylists.pending, (state) => {
        state.loadingFetchPlaylists = true;
      })
      .addCase(getPlaylists.fulfilled, (state, action) => {
        state.loadingFetchPlaylists = false;
        state.playlists = action.payload;
        state.error = null;
      })
      .addCase(getPlaylists.rejected, (state, action) => {
        state.loadingFetchPlaylists = false;
        state.error = action.payload || "Failed to load playlists";
      })

      // --- Delete Playlist ---
      .addCase(deletePlaylist.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.deleteLoading = false;
        if (action.payload) {
          state.playlists = state.playlists.filter(
            (item) => item._id !== action.payload._id
          );
        }
        state.deleteError = null;
      })
      .addCase(deletePlaylist.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload || "Failed to delete playlist";
      })

      // --- Add Songs ---
      .addCase(addSongsInPlaylist.pending, (state) => {
        state.loadingBeforeAddingSongs = true;
      })
      .addCase(addSongsInPlaylist.fulfilled, (state, action) => {
        state.loadingBeforeAddingSongs = false;
        const index = state.playlists.findIndex(
          (item) => item._id === action.payload.playlist._id
        );
        if (index !== -1) {
           state.playlists[index].playlistSongs = action.payload.songs;
        }
        state.errorAddingSongs = null;
        state.successMessage = "Songs added successfully";
      })
      .addCase(addSongsInPlaylist.rejected, (state, action) => {
        state.loadingBeforeAddingSongs = false;
        state.errorAddingSongs = action.payload || "Failed to add songs";
      })

      // --- Rename Playlist ---
      .addCase(renamePlaylist.fulfilled, (state, action) => {
        const index = state.playlists.findIndex(
          (item) => item._id === action.payload.currentPlaylist._id
        );
        if (index !== -1) {
          state.playlists[index] = action.payload.updatedPlaylist;
        }
      })
      
      // --- Remove Song ---
      .addCase(removeSongFromPlaylist.fulfilled, (state, action) => {
        const index = state.playlists.findIndex(
          (item) => item._id === action.payload.updatedPlaylist._id
        );
        if (index !== -1) {
          state.playlists[index] = action.payload.updatedPlaylist;
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        // Clear all playlist state on logout
        state.playlists = [];
        state.error = null;
        state.successMessage = null;
        state.loadingFetchPlaylists = false;
        state.deleteLoading = false;
        state.deleteError = null;
        state.loadingBeforeAddingSongs = false;
        state.errorAddingSongs = null;
      });
  },
});

export const { updatePlaylistsSongsSuccess, clearErrors, clearMessages } =
  playlistSlice.actions;

export default playlistSlice.reducer;
