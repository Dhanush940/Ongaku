import axios, { AxiosInstance } from "axios";
import { backend_server } from "../config";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: backend_server,
  withCredentials: true,
});

export default axiosInstance;
