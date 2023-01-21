/* eslint-disable import/no-cycle */
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { ResponseError } from "../../app/http/api";
import type { User, UserId } from "../../@types/User";
import type { Post } from "../../@types/Post";

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
    return response.data.data;
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
    if (!error.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const sendPost = createAsyncThunk<
  Post,
  { userId: UserId; text: string; mediaIds?: number[] },
  { rejectValue: ResponseError }
>("profile/sendPost", async (fields, thunkAPI) => {
  try {
    const response = await PostService.postPost(fields);
    return response.data;
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
    if (!error.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// export const uploadImage = createAsyncThunk<
//   Media,
//   {
//     formData: FormData;
//     onUploadProgress: (e: AxiosProgressEvent) => void;
//   },
//   { rejectValue: ResponseError }
// >("profile/uploadImage", async ({ formData, onUploadProgress }, thunkAPI) => {
//   try {
//     const response = await MediaService.postImage(formData, onUploadProgress);
//     return response.data;
//   } catch (err) {
//     const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
//     if (!error.response) {
//       throw err;
//     }
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });
