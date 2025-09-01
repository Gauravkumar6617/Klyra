// src/Features/Auth/authType.ts
export interface RegisterPayload {
    name?: string; // optional because login doesn’t need it
    email: string;
    password: string;
  }
  
  export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface User {
    name?: string;
    email: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }
  