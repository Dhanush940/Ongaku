import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logoutUser } from "../auth/userThunks";
import type { PlayerState, CurrentSong } from "./types";

const initialState: PlayerState = {
  currentSong: null,
};

const playerSlice = createSlice({
  name: "player", // Standardized renamed from "storage" to "player"
  initialState,
  reducers: {
    addToStorage: (state, action: PayloadAction<CurrentSong>) => {
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
