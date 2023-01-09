import type { AxiosResponse } from "axios";

import type { User } from "../../@types/User";

import $api from "../http/api";

export interface AuthResponse {
  user: User;
  accessToken: string;
  refresToken: string;
}

class AuthService {
  static async login(
    body: Pick<User, "username" | "password">,
  ): Promise<AxiosResponse<AuthResponse>> {
    const { username, password } = body;
    return $api.post<AuthResponse>("/login", { username, password });
  }

  static async registration(
    body: Pick<User, "username" | "name" | "email" | "password">,
  ): Promise<AxiosResponse<AuthResponse>> {
    const { username, email, password, name } = body;
    return $api.post<AuthResponse>("/registration", {
      username,
      email,
      password,
      name,
    });
  }

  static async logout(): Promise<AxiosResponse<{ message: string }>> {
    return $api.post("/logout");
  }
}

export default AuthService;
