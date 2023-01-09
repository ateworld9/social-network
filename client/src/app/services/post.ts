import type { AxiosResponse } from "axios";
import type { Post } from "../../@types/Post";

import $api from "../http/api";

type FetchPostsResponse = {
  data: Post[];
  meta?: any;
};

class PostService {
  static async fetchPosts(
    fields: Partial<Post>,
    limit: number = 10,
    offset: number = 0,
  ): Promise<AxiosResponse<FetchPostsResponse>> {
    const queryArr = Object.entries(fields).map(
      ([key, value]) => `${key}=${value}`,
    );

    let queryStr = queryArr.join("&");
    queryStr += "&";

    return $api.get<FetchPostsResponse>(
      `/posts?${
        String(!!queryArr.length) && queryStr
      }limit=${limit}&offset=${offset}`,
    );
  }

  static async postPost(FormData: {
    userId: number;
    text: string;
    mediaIds?: number[];
  }): Promise<AxiosResponse<Post>> {
    return $api.post<Post>("/posts", FormData);
  }
}

export default PostService;
