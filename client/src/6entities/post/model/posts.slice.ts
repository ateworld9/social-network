import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";

const postsAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.postId,
  sortComparer: (postA, postB) =>
    Date.parse(postB.createdAt) - Date.parse(postA.createdAt),
});
const initialState = postsAdapter.getInitialState<{
  loading: LoadingState;
  error: any;
  count: number;
}>({
  loading: "idle",
  error: null,
  count: 0,
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: postsAdapter.addOne,
    addPosts: postsAdapter.addMany,
    setPost: postsAdapter.setOne,
    setPosts: postsAdapter.setMany,
    setAllPosts: postsAdapter.setAll,
    removePost: postsAdapter.removeOne,
    removePosts: postsAdapter.removeMany,
    removeAllPosts: postsAdapter.removeAll,
    updatePost: postsAdapter.updateOne,
    updatePosts: postsAdapter.updateMany,
    upsertPost: postsAdapter.upsertOne,
    upsertPosts: postsAdapter.upsertMany,

    setPostsCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },

    updatePostComments(
      state,
      action: PayloadAction<{ postId: PostId; commentId: CommentId }>,
    ) {
      const { postId, commentId } = action.payload;
      const post = state.entities[postId];
      if (post) {
        if (post.comments) {
          post?.comments.push(commentId);
        } else {
          post.comments = [commentId];
        }
      }
    },
  },
  extraReducers: (builder) => {
    // TODO: WARNING
    builder.addCase("posts/getPosts/pending", (state) => {
      state.loading = "loading";
    });
    builder.addCase("posts/getPosts/fulfilled", (state) => {
      state.loading = "succeeded";
    });
    builder.addCase("posts/getNextPosts/pending", (state) => {
      state.loading = "lazy";
    });
    builder.addCase("posts/getNextPosts/fulfilled", (state) => {
      state.loading = "succeeded";
    });
  },
});

export const { reducer, actions } = postSlice;

export const { selectAll, selectById, selectEntities, selectIds, selectTotal } =
  postsAdapter.getSelectors<RootState>((state) => state.posts);

export const selectLoading = (state: RootState) => state.posts.loading;
export const selectCount = (state: RootState) => state.posts.count;
