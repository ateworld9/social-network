import type { AxiosResponse } from "axios";
import type { User } from "../../models/User";

import $api from "../http/api";

// export interface UserResponse {
//   user: User;
// }

class UserService {
  static async fetchUserById(userId: number): Promise<AxiosResponse<User>> {
    return $api.get<User>(`/user?userId=${userId}`);
  }

  static async fetchUserByQuery(
    fields: Partial<User>,
  ): Promise<AxiosResponse<User>> {
    const queryArr = Object.entries(fields).map(
      ([key, value]) => `${key}=${value}`,
    );
    const queryStr = queryArr.join("&");

    return $api.get<User>(`/user?${queryStr}`);
  }

  static async fetchUsers(
    fields: Partial<User>,
    limit: number = 10,
    offset: number = 0,
  ): Promise<AxiosResponse<User[]>> {
    const queryArr = Object.entries(fields).map(
      ([key, value]) => `${key}=${value}`,
    );
    let queryStr = queryArr.join("&");
    queryStr += "&";

    return $api.get<User[]>(
      `/users?${queryArr.length && queryStr}limit=${limit}&offset=${offset}`,
    );
  }
}

export default UserService;
