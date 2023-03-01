import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AxiosError } from "axios";

import { ChatService } from "@shared/services/chat";

import { userModel } from "@entities/user";
import { chatsModel } from "@entities/chat";

export const fetchChats = createAsyncThunk<
  {},
  UserId,
  { rejectValue: ResponseError }
>("chatss/fetchChats", async (userId, thunkAPI) => {
  try {
    const response = await ChatService.fetchChats(userId);
    const { data, relationships } = response.data;
    thunkAPI.dispatch(userModel.actions.upsertUsers(relationships.users));
    thunkAPI.dispatch(chatsModel.actions.setChats(data));
    return {};
  } catch (err) {
    const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
    if (!error.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
