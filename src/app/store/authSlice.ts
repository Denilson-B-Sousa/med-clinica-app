import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "ROLE_PATIENT" | "ROLE_DOCTOR" | "ROLE_ADMIN";


export type AuthUser = {
  email: string;
  role: UserRole;
};

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
};

const token = sessionStorage.getItem("token");

const initialState: AuthState = {
  token: token,
  isAuthenticated: !!token,
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;

      sessionStorage.setItem("token", action.payload);

    },

    logout(state) {
      state.token = null;
      state.isAuthenticated = false;

      sessionStorage.removeItem("token");
    }
  },
});

export const { setToken, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
