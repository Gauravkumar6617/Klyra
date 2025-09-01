// src/Features/Auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, RegisterPayload, User, LoginPayload } from "./authType";
import axiosInstance from "../../utils/axiosInstance";
import { AxiosError } from "axios";

// --- Register Thunk ---
export const registerUser = createAsyncThunk<
  { user: User; token: string },
  RegisterPayload
>(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/auth/registerUser", userData);
      return response.data as { user: User; token: string };
    } catch (err) {
      console.error("Register error:", err); // <--- log the full error
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Register failed");
    }
  }
);


// --- Login Thunk ---
export const loginUser = createAsyncThunk<
  { user: User; token: string }, // return type
  LoginPayload
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/auth/loginUser", credentials);
    return response.data as { user: User; token: string };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

// --- Initial State ---
const storedToken = localStorage.getItem("token");

const initialState: AuthState = {
  user: null,
  token: storedToken,
  loading: false,
  error: null,
};

// --- Slice ---
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // --- Register Cases ---
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // --- Login Cases ---
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
