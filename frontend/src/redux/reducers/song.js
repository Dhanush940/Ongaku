import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  isLoading: true,
};

export const songReducer = createReducer(initialState, {
  LoadSongsRequest: (state) => {
    state.isLoading = true;
  },
  LoadSongsSuccess: (state, action) => {
    state.isLoading = false;
    state.songs = action.payload;
    state.error = false;
  },
  LoadSongsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
});
