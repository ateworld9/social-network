import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AxiosError } from "axios";

import { PostService } from "../../7shared/services/post";

import { userModel } from "../../6entities/user";
import { postModel } from "../../6entities/post";
import { mediaModel } from "../../6entities/media";
import { commentModel } from "../../6entities/comment";

type FetchPropsArgs = {
  filter?: Partial<Post>;
  limit?: number;
  offset?: number;
};

export const fetchPosts = createAsyncThunk<
  {},
  FetchPropsArgs,
  { rejectValue: ResponseError }
>(
  "home/getPosts",
  async ({ filter, limit, offset }, { dispatch, rejectWithValue }) => {
    try {
      const response = await PostService.fetchPosts({
        filter,
        page: { limit, offset },
      });
      const { data } = response;

      dispatch(postModel.actions.setAllPosts(data.posts));
      dispatch(userModel.actions.upsertUsers(data.relationships.users));
      dispatch(mediaModel.actions.upsertMedias(data.relationships.media));
      dispatch(
        commentModel.actions.upsertComments(data.relationships.comments),
      );
      return {};
    } catch (err) {
      const error: AxiosError<ResponseError> = err as AxiosError<ResponseError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  },
);
