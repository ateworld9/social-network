/* eslint-disable import/no-cycle */
import { createSlice } from "@reduxjs/toolkit";

import { fetchUserPosts, fetchUserProfile } from "./profileThunks";

type ProfileState = {
  profile?: User;
  isLoading: boolean;

  isPostsLoading: boolean;

  isPostLoading: boolean;
  fileLoadingProgress: number | null;
  error: string | null | undefined;
};

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: undefined,
    isLoading: true,

    isPostsLoading: true,
    isPostLoading: false,

    fileLoadingProgress: null,

    error: "",
  } as ProfileState,
  reducers: {
    setFileLoadingProgress(state, action) {
      state.fileLoadingProgress = action.payload;
    },
    resetFileLoadingProgress(state) {
      state.fileLoadingProgress = null;
    },
  },
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
      // state.profile = null;
      state.isLoading = false;
    });
    builder.addCase(fetchUserPosts.pending, (state) => {
      state.isPostsLoading = true;
    });
    builder.addCase(fetchUserPosts.fulfilled, (state) => {
      state.isPostsLoading = false;
      state.error = "";
    });
    builder.addCase(fetchUserPosts.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      state.isPostsLoading = false;
    });
  },
});

export const { reducer, actions } = profileSlice;
