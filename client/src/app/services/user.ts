import type { AxiosResponse } from "axios";
import type { User } from "../../@types/User";

import $api from "../http/api";

type FetchUsersResponse = {
  data: User[];
  meta?: any;
};

class UserService {
  static async fetchUserById(userId: number): Promise<AxiosResponse<User>> {
    return $api.get<User>(`/users/${userId}`);
  }

  static async fetchUserByQuery(
    fields: Partial<User>,
  ): Promise<AxiosResponse<User[]>> {
    const queryArr = Object.entries(fields).map(
      ([key, value]) => `${key}=${value}`,
    );
    const queryStr = queryArr.join("&");

    return $api.get<User[]>(`/users?${queryStr}&limit=1`);
  }

  static async fetchUsers(
    fields: Partial<User> | null,
    limit: number = 10,
    offset: number = 0,
  ): Promise<AxiosResponse<FetchUsersResponse>> {
    let queryArr = [];
    let queryStr = "";
    if (fields) {
      queryArr = Object.entries(fields).map(
        ([key, value]) => `${key}=${value}`,
      );
      queryStr = queryArr.join("&");
      queryStr += "&";
    }

    return $api.get<FetchUsersResponse>(
      `/users?${queryArr.length && queryStr}limit=${limit}&offset=${offset}`,
    );
  }

  static async fetchUserContacts(
    fields: Partial<User> | null,
    limit: number = 10,
    offset: number = 0,
  ): Promise<AxiosResponse<FetchUsersResponse>> {
    return $api.get<FetchUsersResponse>(
      `/users?$limit=${limit}&offset=${offset}`,
    );
  }
}

export default UserService;
