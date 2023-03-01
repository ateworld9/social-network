import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AuthResponse } from "@shared/services/auth";

import {
  fetchLogin,
  fetchRegistration,
  fetchLogout,
  fetchCheckAuth,
} from "./authThunks";

type AuthState = {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null | undefined;
};

const authPending = (state: AuthState) => {
  state.isLoading = true;
};
const authFullfiled = (
  state: AuthState,
  action: PayloadAction<AuthResponse>,
) => {
  state.user = action.payload.user;
  state.token = action.payload.accessToken;
  state.isAuth = true;
  state.isLoading = false;
  state.error = "";
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuth: false,
    isLoading: false,
    error: "",
  } as AuthState,
  reducers: {
    cleanAuthError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchLogin.pending, authPending);
    builder.addCase(fetchLogin.fulfilled, authFullfiled);
    builder.addCase(fetchLogin.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      state.user = null;
      state.token = null;
      state.isAuth = false;
      state.isLoading = false;
    });
    builder.addCase(fetchRegistration.pending, authPending);
    builder.addCase(fetchRegistration.fulfilled, authFullfiled);
    builder.addCase(fetchRegistration.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      state.user = null;
      state.token = null;
      state.isAuth = false;
      state.isLoading = false;
    });
    builder.addCase(fetchLogout.pending, authPending);
    builder.addCase(fetchLogout.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(fetchLogout.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      state.isLoading = false;
    });
    builder.addCase(fetchCheckAuth.fulfilled, authFullfiled);
  },
});

export const { cleanAuthError } = authSlice.actions;
export default authSlice.reducer;
