import type { AxiosResponse } from "axios";

import $api from "../config/api/http";

type FetchCommentsResponse = {
  comments: CommentT[];
  relationships: {
    users: User[];
    media: Media[];
  };
};

const CommentService = {
  async postComment(FormData: {
    postId: PostId;
    userId: UserId;
    text: string;
    mediaIds?: number[];
  }): Promise<AxiosResponse<FetchCommentsResponse>> {
    return $api.post<FetchCommentsResponse>("/comments", FormData);
  },
};

export default CommentService;
