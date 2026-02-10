import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backend_server } from "../../config";

export const createPlaylist = createAsyncThunk(
  "playlist/createPlaylist",
  async (playlistName, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backend_server}/playlist/createPlaylist`,
        { playlistName },
        { withCredentials: true }
      );
      
      if (!data.success || !data.playlist) {
        return rejectWithValue(data.message || "Failed to create playlist");
      }
      return data.playlist;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getPlaylists = createAsyncThunk(
  "playlist/getPlaylists",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${backend_server}/playlist/getPlaylists`, 
        { withCredentials: true }
      );
      
      if (!data.success || !data.playlistNames) {
        return rejectWithValue(data.message || "Failed to fetch playlists");
      }
      return data.playlistNames;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deletePlaylist = createAsyncThunk(
  "playlist/deletePlaylist",
  async (playlist, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${backend_server}/playlist/deletePlaylist/${playlist._id}`,
        { withCredentials: true }
      );
      
      if (!data.success || !data.deletedPlaylist) {
        return rejectWithValue(data.message || "Failed to delete playlist");
      }
      return data.deletedPlaylist;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addSongsInPlaylist = createAsyncThunk(
  "playlist/addSongsInPlaylist",
  async ({ filteredSongs, playlist }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backend_server}/playlist/addSongs`,
        { filteredSongs, playlist },
        { withCredentials: true }
      );
      
      if (!data.success || !data.data) {
        return rejectWithValue(data.message || "Failed to add songs");
      }
      return { playlist, songs: data.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const renamePlaylist = createAsyncThunk(
  "playlist/renamePlaylist",
  async ({ name, playlist }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${backend_server}/playlist/renamePlaylist`,
        { playlist, name },
        { withCredentials: true }
      );
      
      if (!data.success || !data.updatedPlaylist) {
        return rejectWithValue(data.error || "Failed to rename playlist");
      }
      return {
        currentPlaylist: playlist,
        updatedPlaylist: data.updatedPlaylist,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeSongFromPlaylist = createAsyncThunk(
  "playlist/removeSongFromPlaylist",
  async ({ playlistId, songToBeRemoved }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${backend_server}/playlist/removeSongFromPlaylist`,
        { playlistId, songToBeRemoved },
        { withCredentials: true }
      );
      
      if (!data.success || !data.updatedPlaylist) {
        return rejectWithValue(data.message || "Failed to remove song");
      }
      return { updatedPlaylist: data.updatedPlaylist };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
