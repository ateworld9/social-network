import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AxiosError } from "axios";

import { PostService } from "@shared/services/post";

import { userModel } from "@entities/user";
import { postModel } from "@entities/post";
import { commentModel } from "@entities/comment";

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
  "posts/getPosts",
  async (
    { filter, limit, offset },
    { dispatch, rejectWithValue, getState },
  ) => {
    try {
      const response = await PostService.fetchPosts({
        filter,
        page: { limit, offset },
      });
      const { data } = response;

      const state = getState() as RootState;
      const authUserId = state.auth.user?.userId as UserId;

      const posts = data.posts.map((post) => ({
        ...post,
        liked: !!post.likes.find((like) => +like.userId === +authUserId),
      }));

      dispatch(postModel.actions.setAllPosts(posts));
      dispatch(postModel.actions.setPostsCount(+data.meta.count));
      dispatch(userModel.actions.addUsers(data.relationships.users));
      dispatch(commentModel.actions.addComments(data.relationships.comments));
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

export const fetchMorePosts = createAsyncThunk<
  {},
  FetchPropsArgs,
  { rejectValue: ResponseError }
>(
  "posts/getMorePosts",
  async (
    { filter, limit, offset },
    { dispatch, rejectWithValue, getState },
  ) => {
    try {
      const response = await PostService.fetchPosts({
        filter,
        page: { limit, offset },
      });
      const { data } = response;

      const state = getState() as RootState;
      const authUserId = state.auth.user?.userId as UserId;

      const posts = data.posts.map((post) => ({
        ...post,
        liked: !!post.likes.find((like) => +like.userId === +authUserId),
      }));

      dispatch(postModel.actions.upsertPosts(posts));
      dispatch(postModel.actions.setPostsCount(+data.meta.count));
      dispatch(userModel.actions.addUsers(data.relationships.users));
      dispatch(commentModel.actions.addComments(data.relationships.comments));
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
