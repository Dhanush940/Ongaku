import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backend_server } from "../../config";

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backend_server}/user/getuser`, {
        withCredentials: true,
      });

      if (!data.user) {
         return rejectWithValue(data.message || "Failed to load user");
      }
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backend_server}/user/login-user`,
        { email, password },
        { withCredentials: true }
      );
      
      // Assuming backend returns { success: true, user: {...}, token: ... }
      if (!data.success || !data.user) {
        return rejectWithValue(data.message || "Login failed");
      }
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backend_server}/user/logout`, {
        withCredentials: true,
      });
      
      if (!data.success) {
        return rejectWithValue(data.message || "Logout failed");
      }
      return data.message;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backend_server}/user/create-user`,
        userData, // { name, email, password, avatar }
        { withCredentials: true }
      );
      
      if (!data.success) {
        return rejectWithValue(data.message || "Registration failed");
      }
      return data.message; // "Please check email..."
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
