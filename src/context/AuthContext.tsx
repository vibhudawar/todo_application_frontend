import {createContext, useContext, useReducer, useEffect} from "react";
import type {ReactNode} from "react";
import type {User, AuthState, UserLogin, UserSignup} from "../types/auth";
import {authService} from "../services/authService";

interface AuthContextType extends AuthState {
 login: (credentials: UserLogin) => Promise<void>;
 signup: (userData: UserSignup) => Promise<void>;
 logout: () => void;
 clearError: () => void;
}

type AuthAction =
 | {type: "SET_LOADING"; payload: boolean}
 | {type: "SET_USER"; payload: User | null}
 | {type: "SET_TOKEN"; payload: string | null}
 | {type: "SET_ERROR"; payload: string | null}
 | {type: "LOGOUT"}
 | {type: "CLEAR_ERROR"};

const initialState: AuthState = {
 user: null,
 token: null,
 isAuthenticated: false,
 isLoading: true,
 error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
 switch (action.type) {
  case "SET_LOADING":
   return {...state, isLoading: action.payload};
  case "SET_USER":
   return {
    ...state,
    user: action.payload,
    isAuthenticated: !!action.payload,
    isLoading: false,
   };
  case "SET_TOKEN":
   return {...state, token: action.payload};
  case "SET_ERROR":
   return {...state, error: action.payload, isLoading: false};
  case "LOGOUT":
   return {
    ...initialState,
    isLoading: false,
   };
  case "CLEAR_ERROR":
   return {...state, error: null};
  default:
   return state;
 }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
 const [state, dispatch] = useReducer(authReducer, initialState);

 // Initialize auth state from localStorage
 useEffect(() => {
  const initAuth = async () => {
   try {
    const storedUser = authService.getStoredUser();
    const storedToken = authService.getStoredToken();

    if (storedUser && storedToken) {
     // Set the user and token first to make the user authenticated
     dispatch({type: "SET_TOKEN", payload: storedToken});
     dispatch({type: "SET_USER", payload: storedUser});

     // Verify token is still valid by fetching current user
     try {
      const response = await authService.getCurrentUser();
      if (response.success && response.data) {
       dispatch({type: "SET_USER", payload: response.data});
      } else {
       // Token invalid, clear auth
       authService.logout();
       dispatch({type: "LOGOUT"});
      }
     } catch {
      // Token invalid, clear auth
      authService.logout();
      dispatch({type: "LOGOUT"});
     }
    } else {
     dispatch({type: "SET_LOADING", payload: false});
    }
   } catch (error) {
    dispatch({
     type: "SET_ERROR",
     payload: "Failed to initialize authentication",
    });
   }
  };

  initAuth();
 }, []);

 const login = async (credentials: UserLogin) => {
  try {
   dispatch({type: "SET_LOADING", payload: true});
   dispatch({type: "CLEAR_ERROR"});

   const response = await authService.login(credentials);

   if (response.success && response.data) {
    dispatch({type: "SET_USER", payload: response.data.user});
    dispatch({type: "SET_TOKEN", payload: response.data.token.access_token});
   } else {
    throw new Error(response.message || "Login failed");
   }
  } catch (error: any) {
   const errorMessage =
    error?.response?.data?.message || error?.message || "Login failed";
   dispatch({type: "SET_ERROR", payload: errorMessage});
   throw error;
  }
 };

 const signup = async (userData: UserSignup) => {
  try {
   dispatch({type: "SET_LOADING", payload: true});
   dispatch({type: "CLEAR_ERROR"});

   const response = await authService.signup(userData);

   if (response.success) {
    dispatch({type: "SET_LOADING", payload: false});
   } else {
    throw new Error(response.message || "Signup failed");
   }
  } catch (error: any) {
   const errorMessage =
    error?.response?.data?.message || error?.message || "Signup failed";
   dispatch({type: "SET_ERROR", payload: errorMessage});
   throw error;
  }
 };

 const logout = () => {
  authService.logout();
  dispatch({type: "LOGOUT"});
 };

 const clearError = () => {
  dispatch({type: "CLEAR_ERROR"});
 };

 const value: AuthContextType = {
  ...state,
  login,
  signup,
  logout,
  clearError,
 };

 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
 const context = useContext(AuthContext);
 if (context === undefined) {
  throw new Error("useAuth must be used within an AuthProvider");
 }
 return context;
}
