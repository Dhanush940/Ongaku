import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadUser } from "../features/auth/userThunks";
import { loadSongs } from "../features/song/songThunks";
import { getPlaylists } from "../features/playlist/playlistThunks";
import type { User } from "../features/auth/types";
import type { AppDispatch } from "./store";

/**
 * bootstrapApp
 * 
 * Centralized initialization logic.
 * 1. Checks if a user is authenticated (loadUser)
 * 2. If authenticated, loads dependent data (songs, playlists)
 * 3. Handles guest mode gracefully (stops loading private data if auth fails)
 */
export const bootstrapApp = createAsyncThunk<User | unknown, void, { dispatch: AppDispatch }>(
  "app/bootstrapApp",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // 1. Attempt to load the user (auth check)
      // unwrap() will throw if loadUser rejects (e.g., 401/403)
      const user = await dispatch(loadUser()).unwrap();

      // 2. If successful, user is logged in. Load content.
      // Using Promise.all for parallel execution to speed up startup
      if (user) {
        await Promise.all([
          dispatch(loadSongs()),
          dispatch(getPlaylists())
        ]);
      }
      
      return user;
    } catch (error) {
      // If loadUser fails, we assume guest mode.
      // We do NOT load songs/playlists as per requirement.
      // We pass the error along but this is arguably a "success" for a guest bootstrap.
      return rejectWithValue(error);
    }
  }
);
