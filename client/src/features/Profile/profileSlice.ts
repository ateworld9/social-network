import { createSlice } from "@reduxjs/toolkit";

import type { User } from "../../models/User";
import type { Post } from "../../models/Post";
import { fetchUserPosts, fetchUserProfile } from "./profileThunks";

type ProfileState = {
  profile?: User;
  posts?: Post[];
  isLoading: boolean;
  isPostsLoading: boolean;
  error: string | null | undefined;
};

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: undefined,
    posts: undefined,
    isLoading: true,
    isPostsLoading: true,
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
      // state.profile = null;
      state.isPostsLoading = false;
    });
  },
});

export default profileSlice.reducer;
