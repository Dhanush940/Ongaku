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
