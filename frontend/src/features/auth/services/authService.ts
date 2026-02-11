import axiosInstance from "../../../api/axios";
import type { LoginPayload, RegisterPayload, AuthResponse } from "../types";

const getUser = async () => {
  const response = await axiosInstance.get<AuthResponse>("/user/getuser");
  return response.data;
};

const loginUser = async (payload: LoginPayload) => {
  const response = await axiosInstance.post<AuthResponse>(
    "/user/login-user",
    payload,
  );
  return response.data;
};

const logoutUser = async () => {
  const response = await axiosInstance.get<AuthResponse>("/user/logout");
  return response.data;
};

const registerUser = async (payload: RegisterPayload) => {
  const response = await axiosInstance.post<AuthResponse>(
    "/user/create-user",
    payload,
  );
  return response.data;
};

const activateUser = async (activation_token: string) => {
  const response = await axiosInstance.post<AuthResponse>("/user/activation", {
    activation_token,
  });
  return response.data;
};

const forgotPassword = async (payload: { fullName: string; email: string }) => {
  const response = await axiosInstance.post<AuthResponse>(
    "/user/forgotPassword",
    payload,
  );
  return response.data;
};

const resetPassword = async (payload: {
  password: string;
  token: string | undefined;
  generatedPassword: string;
}) => {
  const response = await axiosInstance.post<AuthResponse>(
    "/user/resetPassword",
    payload,
  );
  return response.data;
};

const authService = {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  activateUser,
  forgotPassword,
  resetPassword,
};

export default authService;
