/* eslint-disable import/no-cycle */
import { createSlice } from "@reduxjs/toolkit";

import { fetchUserProfile, updateUserProfile } from "./profileThunks";

type ProfileState = {
  profile?: User;
  isLoading: boolean;
  error: string | null | undefined;
};

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: undefined,
    isLoading: true,
    error: "",
  } as ProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      state.isLoading = false;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      state.isLoading = false;
    });
  },
});

export const { reducer, actions } = profileSlice;
