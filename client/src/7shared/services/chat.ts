import type { AxiosResponse } from "axios";

import $api from "../config/api/http";

type FetchChatsResponse = {
  data: Chat[];
  relationships: {
    members: Member[];
    users: User[];
  };
  meta?: any;
};

const ChatService = {
  async fetchChats(
    userId: number,
    limit: number = 10,
    offset: number = 0,
  ): Promise<AxiosResponse<FetchChatsResponse>> {
    return $api.get<FetchChatsResponse>(`/chats/${userId}`, {
      params: { limit, offset },
    });
  },
  async fetchCreateChat(
    chatAttrs: { type: Chat["type"]; chatName: Chat["chatName"] },
    members: Array<{ userId: UserId; role: Member["role"] }>,
  ): Promise<AxiosResponse<FetchChatsResponse>> {
    return $api.post<FetchChatsResponse>("/chats", {
      chatAttrs,
      members,
    });
  },
};

export { ChatService };
