export interface User {
 id: string;
 name: string;
 email: string;
 is_active: boolean;
 created_at: string;
 updated_at: string;
}

export interface AuthState {
 user: User | null;
 token: string | null;
 isAuthenticated: boolean;
 isLoading: boolean;
 error: string | null;
}

export interface UserSignup {
 name: string;
 email: string;
 password: string;
}

export interface UserLogin {
 email: string;
 password: string;
}

export interface AuthToken {
 access_token: string;
 token_type: string;
 expires_in: number;
}

export interface AuthResponse {
 user: User;
 token: AuthToken;
}
