import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import CommentService from "../../../7shared/services/comment";

import { commentModel } from "../../../6entities/comment";
import { userModel } from "../../../6entities/user";
import { mediaModel } from "../../../6entities/media";
import { postModel } from "../../../6entities/post";

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
      dispatch(userModel.actions.upsertUsers(data.relationships.users));
    }
    if (data.relationships.media) {
      dispatch(mediaModel.actions.upsertMedias(data.relationships.media));
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
