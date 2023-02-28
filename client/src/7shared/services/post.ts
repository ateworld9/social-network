import type { AxiosResponse } from "axios";

import $api from "../config/api/http";

type FetchPostsResponse = {
  posts: Post[];
  relationships: {
    users: User[];
    media: Media[];
    comments: CommentT[];
  };
};

const PostService = {
  async fetchPosts({
    page,
    filter,
  }: RequestQuery<Post>): Promise<AxiosResponse<FetchPostsResponse>> {
    return $api.get<FetchPostsResponse>(`/posts`, {
      params: {
        filter,
        page,
      },
    });
  },

  async postPost(FormData: {
    userId: UserId;
    text: string;
    mediaIds?: number[];
  }): Promise<AxiosResponse<FetchPostsResponse>> {
    return $api.post<FetchPostsResponse>("/posts", FormData);
  },
};

export { PostService };
