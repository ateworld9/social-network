/* eslint-disable import/no-cycle */
import { createSlice } from "@reduxjs/toolkit";

import type { User } from "../../@types/User";
import type { Post } from "../../@types/Post";

import { fetchUserPosts, fetchUserProfile, sendPost } from "./profileThunks";

type ProfileState = {
  profile?: User;
  isLoading: boolean;

  posts: Post[];
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

    posts: [],
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
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isPostsLoading = false;
      state.error = "";
    });
    builder.addCase(fetchUserPosts.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      state.isPostsLoading = false;
    });

    builder.addCase(sendPost.pending, (state) => {
      state.isPostLoading = true;
    });
    builder.addCase(sendPost.fulfilled, (state, action) => {
      state.posts.unshift(action.payload);
      state.isPostLoading = false;
      state.error = "";
    });
    builder.addCase(sendPost.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      state.isPostLoading = false;
    });
  },
});

export const { setFileLoadingProgress, resetFileLoadingProgress } =
  profileSlice.actions;
export default profileSlice.reducer;
