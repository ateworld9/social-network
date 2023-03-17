import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import CommentService from "@shared/services/comment";

import { commentModel } from "@entities/comment";
import { userModel } from "@entities/user";
import { postModel } from "@entities/post";

export const sendComment = createAsyncThunk<
  any,
  { postId: PostId; userId: UserId; text: string; mediaIds?: number[] },
  { rejectValue: ResponseError }
>("comments/sendComment", async (fields, { dispatch, rejectWithValue }) => {
  try {
    const response = await CommentService.postComment(fields);
    const { data } = response;

    dispatch(commentModel.actions.addComment(data.comments[0]));
    if (data.relationships.users) {
      dispatch(userModel.actions.addUsers(data.relationships.users));
    }
    // const state = getState()

    dispatch(
      postModel.actions.updatePostComments({
        postId: fields.postId,
        commentId: data.comments[0].commentId,
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
