import type { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { LikeService } from "@shared/services/like";

import { postModel } from "@entities/post";

export const fetchLike = createAsyncThunk<
  {},
  PostId,
  { rejectValue: ResponseError }
>("posts/like", async (postId, { dispatch, rejectWithValue, getState }) => {
  try {
    const state = getState() as RootState;
    const authUserId = state.auth.user?.userId;
    const post = state.posts.entities[postId] as Post;
    const response = await LikeService.fetchLike({
      userId: authUserId,
      postId,
    });

    let likes = post.likes.slice();
    if (response.data === 1) {
      likes = likes.filter((like) => like.userId !== authUserId);
    } else {
      likes.push(response.data);
    }

    dispatch(
      postModel.actions.updatePost({
        id: postId,
        changes: {
          liked: !post.liked,
          likes,
        },
      }),
    );

    return {};
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});
