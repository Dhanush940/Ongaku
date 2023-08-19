import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  isLoading: true,
};

export const playlistReducer = createReducer(initialState, {
  createPlaylistRequest: (state) => {
    state.isLoading = true;
  },
  createPlaylistSuccess: (state, action) => {
    state.isLoading = false;

    state.playlists = state.playlists.push(action.payload);

    state.error = false;
  },
  createPlaylistFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  getPlaylistsRequest: (state, action) => {
    state.loadingFetchPlaylists = true;
  },
  getPlaylistsSuccess: (state, action) => {
    state.loadingFetchPlaylists = false;
    state.playlists = action.payload;
  },
  getPlaylistsFail: (state, action) => {
    state.loadingFetchPlaylists = false;
    state.error = action.payload;
  },

  updatePlaylistsSongsSuccess: (state, action) => {
    state.playlists = action.payload;
  },

  deletePlaylistRequest: (state, action) => {
    state.deleteLoading = true;
  },
  deletePlaylistSuccess: (state, action) => {
    state.deleteLoading = false;
    state.playlists = state.playlists.filter(
      (item) => item._id !== action.payload._id
    );
    state.deleteError = false;
  },
  deletePlaylistFail: (state, action) => {
    state.deleteError = action.payload;
  },

  addSongsInPlaylistRequest: (state, action) => {
    state.loadingBeforeAddingSongs = true;
  },
  addSongsInPlaylistSuccess: (state, action) => {
    state.loadingBeforeAddingSongs = false;
    let indexToBeFound;
    let currentPlaylistTOBeUpdated = state.playlists.find((item, index) => {
      if (item._id === action.payload.playlist._id) {
        indexToBeFound = index;
        return true;
      }
      return false;
    });

    currentPlaylistTOBeUpdated.playlistSongs = action.payload.data;
    state.playlists[indexToBeFound] = currentPlaylistTOBeUpdated;
  },
  addSongsInPlaylistFail: (state, action) => {
    state.loadingBeforeAddingSongs = false;
    state.errorAddingSongs = action.paylod;
  },

  renamePlaylistSuccess: (state, action) => {
    let indexToBeUpdated;
    state.playlists.find((item, index) => {
      if (item._id === action.payload.currentPlaylist._id) {
        indexToBeUpdated = index;
        return true;
      }
      return false;
    });
    state.playlists[indexToBeUpdated] = action.payload.updatedPlaylist;
  },

  removeSongsFromPlaylistSuccess: (state, action) => {
    let indexToBeUpdated;
    state.playlists.find((item, index) => {
      if (item._id === action.payload.updatedPlaylist._id) {
        indexToBeUpdated = index;
        return true;
      }
      return false;
    });
    state.playlists[indexToBeUpdated] = action.payload.updatedPlaylist;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
});
