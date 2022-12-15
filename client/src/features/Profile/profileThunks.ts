import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { ResponseError } from "../../app/http/api";
import type { User } from "../../models/User";
import type { Post } from "../../models/Post";

import UserService from "../../app/services/user";
import PostService from "../../app/services/post";

export const fetchUserProfile = createAsyncThunk<
  User,
  number,
  { rejectValue: ResponseError }
>("profile/user", async (userId, thunkAPI) => {
  try {
    const response = await UserService.fetchUserById(userId);

    return response.data;
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
    if (!error.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchUserPosts = createAsyncThunk<
  Post[],
  number,
  { rejectValue: ResponseError }
>("profile/getPosts", async (userId, thunkAPI) => {
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

// export const fetchUpdateUser = createAsyncThunk<
//   User,
//   { userId: number; fields: Partial<User> },
//   { rejectValue: ResponseError }
// >("profile/login", async ({ userId, fields }, thunkAPI) => {
//   try {
//     const response = await UserService.fetchUserById(1);
//     return response.data;
//   } catch (err) {
//     const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
//     if (!error.response) {
//       throw err;
//     }
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });
