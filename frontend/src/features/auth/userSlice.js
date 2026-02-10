import { createSlice } from "@reduxjs/toolkit";
import { loadUser, loginUser, logoutUser, registerUser } from "./userThunks";

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  successMessage: null,
  // Specific loading/error states
  loadingLogin: false,
  errorLogin: null,
  loadingRegister: false,
  errorRegister: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.errorLogin = null;
      state.errorRegister = null;
    },
    clearMessages: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load User
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || "Failed to load user";
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loadingLogin = true;
        state.errorLogin = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loadingLogin = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.errorLogin = null;
        // Optionally set successMessage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingLogin = false;
        state.isAuthenticated = false;
        state.user = null;
        state.errorLogin = action.payload || "Login failed";
      })

      // Logout User
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.successMessage = action.payload; // "Log out successful!"
      })
      
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loadingRegister = true;
        state.errorRegister = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loadingRegister = false;
        state.successMessage = action.payload; // "Please check email..."
        state.errorRegister = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loadingRegister = false;
        state.errorRegister = action.payload || "Registration failed";
      });
  },
});

export const { clearErrors, clearMessages } = userSlice.actions;

export default userSlice.reducer;
