import type { AxiosResponse } from "axios";

import $api from "../config/api/http";

type FetchUsersResponse = {
  data: User[];
  meta?: {
    count?: number;
  };
};

const UserService = {
  async fetchUserById(userId: UserId): Promise<AxiosResponse<User>> {
    return $api.get<User>(`/users/${userId}`);
  },

  async fetchUserByQuery(
    fields: Partial<User>,
  ): Promise<AxiosResponse<User[]>> {
    return $api.get<User[]>(`/users`, {
      params: {
        filter: {
          fields,
        },
        page: {
          limit: 1,
          offset: 0,
        },
      },
    });
  },

  async fetchUsers(
    fields?: Filter<User>,
    limit: number = 10,
    offset: number = 0,
  ): Promise<AxiosResponse<FetchUsersResponse>> {
    return $api.get<FetchUsersResponse>(`/users`, {
      params: {
        filter: fields,
        page: {
          limit,
          offset,
        },
      },
    });
  },

  async fetchUserUpdate(
    userId: UserId,
    authUserId: UserId,
    user?: Partial<User>,
    avatar?: MediaId,
    cover?: MediaId,
  ): Promise<AxiosResponse<User>> {
    return $api.patch<User>(`/users/${userId}`, {
      authUserId,
      user,
      avatar,
      cover,
    });
  },

  async fetchUserContacts(
    userId: UserId,
    limit: number = 10,
    offset: number = 0,
  ): Promise<AxiosResponse<FetchUsersResponse>> {
    return $api.get<FetchUsersResponse>(`/contacts/${userId}`, {
      params: {
        // filter: {
        //   filter,
        // },
        page: {
          limit,
          offset,
        },
      },
    });
  },

  async fetchAddToContacts(
    currentUserId: number,
    addedUserId: number,
  ): Promise<AxiosResponse<FetchUsersResponse>> {
    return $api.post<FetchUsersResponse>("/contacts", {
      currentUserId,
      addedUserId,
    });
  },
};

export { UserService };
