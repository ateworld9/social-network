import { createSlice } from "@reduxjs/toolkit";

import { fetchPosts } from "./homeThunks";

type HomeState = {
  posts?: Post[];
  isPostsLoading: boolean;
  error: string | null | undefined;
};

const homeSlice = createSlice({
  name: "home",
  initialState: {
    posts: undefined,
    isPostsLoading: true,
    error: "",
  } as HomeState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isPostsLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state) => {
      // state.posts = action.payload;
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
