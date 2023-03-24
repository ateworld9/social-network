import type { AxiosResponse } from "axios";

import $api from "../config/api/http";

type FetchPostsResponse = {
  posts: Post[];
  relationships: {
    users: User[];
    comments: CommentT[];
  };
  meta: {
    count: number;
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

  async deletePost(postId, userId): Promise<AxiosResponse<1 | 0>> {
    return $api.delete<1 | 0>(`/posts/${postId}`, {
      params: { userId },
    });
  },
};

export { PostService };
