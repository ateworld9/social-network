import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AxiosError } from "axios";
import type { ResponseError } from "../../app/http/api";
import type { User } from "../../@types/User";

import UserService from "../../app/services/user";

type FetchPropsArgs = {
  fields: Partial<User> | null;
  limit?: number;
  offset?: number;
};

export const fetchUserContacts = createAsyncThunk<
  User[],
  { userId: number },
  { rejectValue: ResponseError }
>("contacts/fetchContacts", async ({ userId }, thunkAPI) => {
  try {
    const response = await UserService.fetchUserContacts(userId);
    return response.data.data;
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
    if (!error.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchUsersSearch = createAsyncThunk<
  User[],
  FetchPropsArgs,
  { rejectValue: ResponseError }
>("contacts/fetchUsersSearch", async ({ fields, limit, offset }, thunkAPI) => {
  try {
    const response = await UserService.fetchUsers(fields, limit, offset);
    return response.data.data;
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
    if (!error.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchAddToContacts = createAsyncThunk<
  User[],
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
      return response.data.data;
    } catch (err) {
      const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
