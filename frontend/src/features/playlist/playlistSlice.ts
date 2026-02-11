import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createPlaylist,
  getPlaylists,
  deletePlaylist,
  addSongsInPlaylist,
  renamePlaylist,
  removeSongFromPlaylist,
} from "./playlistThunks";
import { logoutUser } from "../auth/userThunks";
import type { Playlist, PlaylistState } from "./types";

const initialState: PlaylistState = {
  playlists: [],
  loading: true,
  error: null,
  selectedPlaylist: null,
  createPlaylistLoading: false,
  createPlaylistError: null,
  deletePlaylistLoading: false,
  renamePlaylistLoading: false,
  addSongsLoading: false,
  removeSongsLoading: false,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    updatePlaylistsSongsSuccess: (state, action) => {
      state.playlists = action.payload; 
    },
    selectPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.selectedPlaylist = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
      state.createPlaylistError = null;
    },
    clearMessages: () => {
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Create Playlist ---
      .addCase(createPlaylist.pending, (state) => {
        state.createPlaylistLoading = true;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.createPlaylistLoading = false;
        state.playlists.push(action.payload);
        state.error = null;
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.createPlaylistLoading = false;
        state.error = (action.payload) || "Failed to create playlist";
      })

      // --- Get Playlists ---
      .addCase(getPlaylists.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = action.payload;
        state.error = null;
      })
      .addCase(getPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload) || "Failed to load playlists";
      })

      // --- Delete Playlist ---
      .addCase(deletePlaylist.pending, (state) => {
        state.deletePlaylistLoading = true;
      })
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.deletePlaylistLoading = false;
        if (action.payload) {
          state.playlists = state.playlists.filter(
            (item) => item._id !== action.payload._id
          );
        }
      })
      .addCase(deletePlaylist.rejected, (state, action) => {
        state.deletePlaylistLoading = false;
        state.error = (action.payload) || "Failed to delete playlist";
      })

      // --- Add Songs ---
      .addCase(addSongsInPlaylist.pending, (state) => {
        state.addSongsLoading = true;
      })
      .addCase(addSongsInPlaylist.fulfilled, (state, action) => {
        state.addSongsLoading = false;
        const index = state.playlists.findIndex(
          (item) => item._id === action.payload.playlist._id
        );
        if (index !== -1) {
            // Update both songs and playlistSongs to ensure UI updates
            state.playlists[index].songs = action.payload.songs; 
            state.playlists[index].playlistSongs = action.payload.songs;
        }
      })
      .addCase(addSongsInPlaylist.rejected, (state, action) => {
        state.addSongsLoading = false;
        state.error = (action.payload) || "Failed to add songs";
      })

      // --- Rename Playlist ---
      .addCase(renamePlaylist.pending, (state) => {
        state.renamePlaylistLoading = true;
      })
      .addCase(renamePlaylist.fulfilled, (state, action) => {
        state.renamePlaylistLoading = false;
        const index = state.playlists.findIndex(
          (item) => item._id === action.payload.currentPlaylist._id
        );
        if (index !== -1) {
          state.playlists[index] = action.payload.updatedPlaylist;
        }
      })
      .addCase(renamePlaylist.rejected, (state, action) => {
         state.renamePlaylistLoading = false;
         state.error = (action.payload) || "Failed to rename playlist";
      })
      
      // --- Remove Song ---
      .addCase(removeSongFromPlaylist.pending, (state) => {
        state.removeSongsLoading = true;
      })
      .addCase(removeSongFromPlaylist.fulfilled, (state, action) => {
        state.removeSongsLoading = false;
        const index = state.playlists.findIndex(
           (item) => item._id === action.payload.updatedPlaylist._id
        );
        if (index !== -1) {
          state.playlists[index] = action.payload.updatedPlaylist;
        }
      })
      .addCase(removeSongFromPlaylist.rejected, (state, action) => {
         state.removeSongsLoading = false;
         state.error = (action.payload) || "Failed to remove song";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        // Clear all playlist state on logout
        state.playlists = [];
        state.error = null;
        state.loading = false;
        state.createPlaylistLoading = false;
        state.createPlaylistError = null;
        state.deletePlaylistLoading = false;
        state.renamePlaylistLoading = false;
        state.addSongsLoading = false;
        state.removeSongsLoading = false;
        state.selectedPlaylist = null;
      });
  },
});

export const { updatePlaylistsSongsSuccess, clearErrors, clearMessages, selectPlaylist } =
  playlistSlice.actions;

export default playlistSlice.reducer;
