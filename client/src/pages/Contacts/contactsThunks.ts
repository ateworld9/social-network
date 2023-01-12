import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AxiosError } from "axios";
import type { ResponseError } from "../../app/http/api";
import type { User } from "../../@types/User";

import UserService from "../../app/services/user";

type FetchPropsArgs = {
  fields: Partial<User>;
  limit?: number;
  offset?: number;
};

// eslint-disable-next-line import/prefer-default-export
export const fetchContacts = createAsyncThunk<
  User[],
  FetchPropsArgs,
  { rejectValue: ResponseError }
>("home/getPosts", async ({ fields, limit, offset }, thunkAPI) => {
  try {
    const response = await UserService.fetchUserContacts(fields, limit, offset);
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
>("home/getPosts", async ({ fields, limit, offset }, thunkAPI) => {
  try {
    const response = await UserService.fetchUsers(null, limit, offset);
    return response.data.data;
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
    if (!error.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
