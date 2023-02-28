import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const commentsAdapter = createEntityAdapter<CommentT>({
  selectId: (comment) => comment.commentId,
});
const initialState = commentsAdapter.getInitialState<{}>({});

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: commentsAdapter.addOne,
    addComments: commentsAdapter.addMany,
    setComment: commentsAdapter.setOne,
    setComments: commentsAdapter.setMany,
    setAllComments: commentsAdapter.setAll,
    removeComment: commentsAdapter.removeOne,
    removeComments: commentsAdapter.removeMany,
    removeAllComments: commentsAdapter.removeAll,
    updateComment: commentsAdapter.updateOne,
    updateComments: commentsAdapter.updateMany,
    upsertComment: commentsAdapter.upsertOne,
    upsertComments: commentsAdapter.upsertMany,
  },
  // extraReducers: (builder) =>{}
});

export const { reducer, actions } = commentSlice;

export const { selectAll, selectById, selectEntities, selectIds, selectTotal } =
  commentsAdapter.getSelectors<RootState>((state) => state.comments);
