import api from "./api";
import type {UserLogin, UserSignup, AuthResponse, User} from "../types/auth";
import type {APIResponse} from "../types/api";

export const authService = {
 // User signup
 async signup(userData: UserSignup): Promise<APIResponse> {
  const response = await api.post<APIResponse>("/auth/signup", userData);
  return response.data;
 },

 // User login
 async login(credentials: UserLogin): Promise<APIResponse<AuthResponse>> {
  const response = await api.post<APIResponse<AuthResponse>>(
   "/auth/login",
   credentials
  );

  if (response.data.success && response.data.data) {
   // Store token and user data
   localStorage.setItem("authToken", response.data.data.token.access_token);
   localStorage.setItem("user", JSON.stringify(response.data.data.user));
  }

  return response.data;
 },

 // Get current user info
 async getCurrentUser(): Promise<APIResponse<User>> {
  const response = await api.get<APIResponse<User>>("/auth/me");
  return response.data;
 },

 // Logout (client-side)
 logout(): void {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
 },

 // Check if user is authenticated
 isAuthenticated(): boolean {
  const token = localStorage.getItem("authToken");
  return !!token;
 },

 // Get stored user data
 getStoredUser(): User | null {
  const userStr = localStorage.getItem("user");
  if (userStr) {
   try {
    return JSON.parse(userStr);
   } catch {
    return null;
   }
  }
  return null;
 },

 // Get stored token
 getStoredToken(): string | null {
  return localStorage.getItem("authToken");
 },
};
