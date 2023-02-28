import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import { UserService } from "../../../7shared/services/user";
import { PostService } from "../../../7shared/services/post";

import { postModel } from "../../../6entities/post";
import { userModel } from "../../../6entities/user";
import { mediaModel } from "../../../6entities/media";

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
  void,
  number,
  { rejectValue: ResponseError }
>("profile/getPosts", async (userId, { dispatch }) => {
  try {
    const response = await PostService.fetchPosts({ filter: { userId } });
    const { data } = response;
    dispatch(postModel.actions.setAllPosts(data.posts));
    dispatch(userModel.actions.upsertUsers(data.relationships.users));
    dispatch(mediaModel.actions.upsertMedias(data.relationships.media));
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
    if (!error.response) {
      throw err;
    }
    // return rejectWithValue(error.response.data);
  }
});

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
    dispatch(mediaModel.actions.upsertMedias(data.relationships.media));
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
    if (!error.response) {
      throw err;
    }
    // return rejectWithValue(error.response.data);
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
