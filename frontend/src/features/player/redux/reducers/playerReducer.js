import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  currentSong: sessionStorage.getItem("currentSong")
    ? JSON.parse(sessionStorage.getItem("currentSong"))
    : {},
};

export const playerReducer = createReducer(initialState, {
  addToStorage: (state, action) => {
    state.currentSong = action.payload;
  },
  addToStorageFailed: (state, action) => {
    state.addstorageError = action.payload;
  },
  removeFromStorageSong: (state) => {
    state.currentSong = {};
  },
  removeFromStorageSongFailed: (state, action) => {
    state.removeStorageError = action.payload;
  },
});
