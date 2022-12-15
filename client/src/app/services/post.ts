import type { AxiosResponse } from "axios";
import type { Post } from "../../models/Post";

import $api from "../http/api";

class PostService {
  static async fetchPosts(
    fields: Partial<Post>,
    limit: number = 10,
    offset: number = 0,
  ): Promise<AxiosResponse<Post[]>> {
    const queryArr = Object.entries(fields).map(
      ([key, value]) => `${key}=${value}`,
    );

    let queryStr = queryArr.join("&");
    queryStr += "&";

    return $api.get<Post[]>(
      `/posts?${
        String(!!queryArr.length) && queryStr
      }limit=${limit}&offset=${offset}`,
    );
  }
}

export default PostService;
