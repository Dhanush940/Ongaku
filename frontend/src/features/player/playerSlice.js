import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../auth/userThunks";

const initialState = {
  currentSong: null,
};

const playerSlice = createSlice({
  name: "player", // Standardized renamed from "storage" to "player"
  initialState,
  reducers: {
    addToStorage: (state, action) => {
      // "addToStorage" preserved for backward compatibility
      state.currentSong = action.payload;
    },
    removeFromStorage: (state) => {
      state.currentSong = null;
    },
    // Add playback state reducers here (play, pause, etc)
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.currentSong = null;
    });
  },
});

export const { addToStorage, removeFromStorage } = playerSlice.actions;

export default playerSlice.reducer;
