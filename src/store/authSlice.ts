import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {User, AuthState, UserLogin, UserSignup} from "../types/auth";
import {authService} from "../services/authService";

type AuthSliceState = AuthState;

const initialState: AuthSliceState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const initializeAuth = createAsyncThunk("auth/initializeAuth", async () => {
  try {
    const storedUser = authService.getStoredUser();
    const storedToken = authService.getStoredToken();

    if (storedUser && storedToken) {
      try {
        const response = await authService.getCurrentUser();
        if (response.success && response.data) {
          return {
            user: response.data,
            token: storedToken,
            isAuthenticated: true,
          };
        } else {
          authService.logout();
          return {user: null, token: null, isAuthenticated: false};
        }
      } catch {
        authService.logout();
        return {user: null, token: null, isAuthenticated: false};
      }
    } else {
      return {user: null, token: null, isAuthenticated: false};
    }
  } catch {
    throw new Error("Failed to initialize authentication");
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: UserLogin) => {
    const response = await authService.login(credentials);

    if (response.success && response.data) {
      return {
        user: response.data.user,
        token: response.data.token.access_token,
      };
    } else {
      throw new Error(response.message || "Login failed");
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData: UserSignup) => {
    const response = await authService.signup(userData);

    if (response.success) {
      return;
    } else {
      throw new Error(response.message || "Signup failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = action.payload.isAuthenticated;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to initialize authentication";
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Signup failed";
      });
  },
});

export const {logout, clearError, setUser, setToken} = authSlice.actions;

export const selectUser = (state: {auth: AuthSliceState}) => state.auth.user;
export const selectToken = (state: {auth: AuthSliceState}) => state.auth.token;
export const selectIsAuthenticated = (state: {auth: AuthSliceState}) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: {auth: AuthSliceState}) =>
  state.auth.isLoading;
export const selectAuthError = (state: {auth: AuthSliceState}) =>
  state.auth.error;

export default authSlice.reducer;