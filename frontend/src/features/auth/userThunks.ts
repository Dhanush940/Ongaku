import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import axiosInstance from "../../api/axios";
import type { User, LoginPayload, AuthResponse, RegisterPayload } from "./types";

interface ThunkConfig {
  rejectValue: string;
}

export const loadUser = createAsyncThunk<User, void, ThunkConfig>(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<AuthResponse>("/user/getuser");

      if (!data.user) {
        return rejectWithValue(data.message || "Failed to load user");
      }
      return data.user;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const loginUser = createAsyncThunk<User, LoginPayload, ThunkConfig>(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<AuthResponse>(
        "/user/login-user",
        { email, password }
      );
      
      // Assuming backend returns { success: true, user: {...}, token: ... }
      if (!data.success || !data.user) {
        return rejectWithValue(data.message || "Login failed");
      }
      return data.user;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const logoutUser = createAsyncThunk<string, void, ThunkConfig>(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<AuthResponse>("/user/logout");
      
      if (!data.success) {
        return rejectWithValue(data.message || "Logout failed");
      }
      return data.message || "Logout successful";
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const registerUser = createAsyncThunk<string, RegisterPayload, ThunkConfig>(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<AuthResponse>(
        "/user/create-user",
        userData // { name, email, password, avatar }
      );
      
      if (!data.success) {
        return rejectWithValue(data.message || "Registration failed");
      }
      return data.message || "Registration successful";
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
