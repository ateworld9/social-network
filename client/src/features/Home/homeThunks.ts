import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AxiosError } from "axios";
import type { ResponseError } from "../../app/http/api";
import type { Post } from "../../models/Post";

import PostService from "../../app/services/post";

type FetchPropsArgs = {
  fields: Partial<Post>;
  limit?: number;
  offset?: number;
};

export const fetchPosts = createAsyncThunk<
  Post[],
  FetchPropsArgs,
  { rejectValue: ResponseError }
>("home/getPosts", async ({ fields, limit, offset }, thunkAPI) => {
  try {
    const response = await PostService.fetchPosts(fields, limit, offset);
    return response.data;
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
    if (!error.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const feasdftchUsasdferPosts = createAsyncThunk<
  Post[],
  number,
  { rejectValue: ResponseError }
>("home/getPosts", async (userId, thunkAPI) => {
  try {
    const response = await PostService.fetchPosts({ userId });
    return response.data;
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
    if (!error.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
