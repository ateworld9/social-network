import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AxiosError } from "axios";

import { userModel } from "@entities/user";
import { UserService } from "@shared/services/user";

export const fetchUserContacts = createAsyncThunk<
  UserId[],
  { userId: UserId },
  { rejectValue: ResponseError }
>("contacts/fetchContacts", async ({ userId }, thunkAPI) => {
  try {
    const response = await UserService.fetchUserContacts(userId);
    thunkAPI.dispatch(userModel.actions.addUsers(response.data.data));
    return response.data.data.map((user) => user.userId);
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
    if (!error.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchUsersSearch = createAsyncThunk<
  UserId[],
  RequestQuery<User>,
  { rejectValue: ResponseError }
>("contacts/fetchUsersSearch", async ({ filter, page }, thunkAPI) => {
  try {
    const response = await UserService.fetchUsers(
      filter,
      page?.limit ?? 100,
      page?.offset ?? 0,
    );

    thunkAPI.dispatch(userModel.actions.addUsers(response.data.data));

    const userIds = response.data.data.map((user) => user.userId);
    return userIds;
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
    if (!error.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchAddToContacts = createAsyncThunk<
  UserId[],
  { currentUserId: number; addedUserId: number },
  { rejectValue: ResponseError }
>(
  "contacts/fetchAddToContacts",
  async ({ currentUserId, addedUserId }, thunkAPI) => {
    try {
      const response = await UserService.fetchAddToContacts(
        currentUserId,
        addedUserId,
      );
      thunkAPI.dispatch(userModel.actions.addUsers(response.data.data));

      const userIds = response.data.data.map((user) => user.userId);
      return userIds;
    } catch (err) {
      const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
