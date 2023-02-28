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
const initialState = postsAdapter.getInitialState<{}>({});

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
  // extraReducers: (builder) =>{}
});

export const { reducer, actions } = postSlice;

export const { selectAll, selectById, selectEntities, selectIds, selectTotal } =
  postsAdapter.getSelectors<RootState>((state) => state.posts);
