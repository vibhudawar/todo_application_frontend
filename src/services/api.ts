import axios, {type AxiosResponse} from "axios";
import type {APIResponse} from "../types/api";
import {LOCAL_BASE_URL} from "./contants";

// Create axios instance
const api = axios.create({
 baseURL: LOCAL_BASE_URL,
 timeout: 10000,
 withCredentials: true,
 headers: {
  "Content-Type": "application/json",
 },
});

// Request interceptor to add auth token
api.interceptors.request.use(
 (config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
   config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
 },
 (error) => {
  return Promise.reject(error);
 }
);

// Response interceptor for error handling
api.interceptors.response.use(
 (response: AxiosResponse<APIResponse>) => {
  return response;
 },
 (error) => {
  // Handle 401 unauthorized - clear auth data but let React Router handle navigation
  if (error.response?.status === 401) {
   localStorage.removeItem("authToken");
   localStorage.removeItem("user");
   // Don't force redirect here - let the AuthContext handle it through React Router
  }
  return Promise.reject(error);
 }
);

export default api;
