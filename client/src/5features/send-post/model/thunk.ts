import type { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { PostService } from "@shared/services/post";

import { postModel } from "@entities/post";
import { userModel } from "@entities/user";

export const sendPost = createAsyncThunk<
  void,
  { userId: UserId; text: string; mediaIds?: number[] },
  { rejectValue: ResponseError }
>("profile/sendPost", async (fields, { dispatch }) => {
  try {
    const response = await PostService.postPost(fields);
    const { data } = response;

    dispatch(postModel.actions.addPost(data.posts[0]));
    dispatch(userModel.actions.addUsers(data.relationships.users));
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
    if (!error.response) {
      throw err;
    }
    // return rejectWithValue(error.response.data);
  }
});
