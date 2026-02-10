import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backend_server } from "../../config";
// Assuming playlistSlice.js has been created and exports the action
import { updatePlaylistsSongsSuccess } from "../playlist/playlistSlice";

export const loadSongs = createAsyncThunk(
  "song/loadSongs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${backend_server}/song/getSongs`, 
        { withCredentials: true }
      );
      
      if (!data.success || !data.songs) {
         return rejectWithValue(data.message || "Failed to load songs");
      }
      return data.songs;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteSongFromDatabase = createAsyncThunk(
  "song/deleteSong",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${backend_server}/song/deleteSong/${id}`,
        { withCredentials: true }
      );
      
      // Update playlists as they might contain the deleted song
      if (data.playlists) {
         dispatch(updatePlaylistsSongsSuccess(data.playlists));
      }
      
      if (!data.deletedSong) {
          return rejectWithValue(data.message || "Failed to delete song");
      }
      return data.deletedSong;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
