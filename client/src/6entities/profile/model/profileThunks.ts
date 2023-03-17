import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import { UserService } from "@shared/services/user";
import { updateUser } from "@entities/auth";

export const fetchUserProfile = createAsyncThunk<
  User,
  number,
  { rejectValue: ResponseError }
>("profile/getUser", async (userId, thunkAPI) => {
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

export const updateUserProfile = createAsyncThunk<
  User,
  {
    userId: UserId;
    user?: Partial<User>;
    avatar?: MediaId;
    cover?: MediaId;
  },
  { rejectValue: ResponseError }
>(
  "profile/updateUserProfile",
  async ({ userId, user, avatar, cover }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const authUserId = state.auth.user?.userId as number;
      const response = await UserService.fetchUserUpdate(
        userId,
        authUserId,
        user,
        avatar,
        cover,
      );
      if (userId === authUserId) {
        thunkAPI.dispatch(updateUser(response.data));
      }
      return response.data;
    } catch (err) {
      const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
