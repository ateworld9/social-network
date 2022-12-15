import { createSlice } from "@reduxjs/toolkit";

import type { Post } from "../../models/Post";
import { fetchPosts } from "./homeThunks";

type Hometate = {
  posts?: Post[];
  isPostsLoading: boolean;
  error: string | null | undefined;
};

const homeSlice = createSlice({
  name: "home",
  initialState: {
    profile: undefined,
    posts: undefined,
    isLoading: true,
    isPostsLoading: true,
    error: "",
  } as Hometate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isPostsLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isPostsLoading = false;
      state.error = "";
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      // state.profile = null;
      state.isPostsLoading = false;
    });
  },
});

export default homeSlice.reducer;
