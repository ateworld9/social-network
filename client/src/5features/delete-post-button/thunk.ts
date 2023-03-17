import type { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { PostService } from "@shared/services/post";

import { postModel } from "@entities/post";

export const fetchDeletePost = createAsyncThunk<
  {},
  PostId,
  { rejectValue: ResponseError }
>("posts/delete", async (postId, { dispatch, rejectWithValue, getState }) => {
  try {
    const state = getState() as RootState;
    const authUserId = state.auth.user?.userId;
    const response = await PostService.deletePost(postId, authUserId);

    if (response.status === 200) {
      dispatch(postModel.actions.removePost(postId));
      // add snackbar notification
    } else {
      // add snackbar notification
    }

    return {};
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});
