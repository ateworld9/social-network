import type { AxiosResponse } from "axios";

import $api from "../config/api/http";

export interface AuthResponse {
  user: User;
  accessToken: string;
  refresToken: string;
}

const AuthService = {
  async login(
    body: Pick<User, "username" | "password">,
  ): Promise<AxiosResponse<AuthResponse>> {
    const { username, password } = body;
    return $api.post<AuthResponse>("/login", { username, password });
  },
  async registration(
    body: Pick<User, "username" | "name" | "email" | "password">,
  ): Promise<AxiosResponse<AuthResponse>> {
    const { username, email, password, name } = body;
    return $api.post<AuthResponse>("/registration", {
      username,
      email,
      password,
      name,
    });
  },
  async logout(): Promise<AxiosResponse<{ message: string }>> {
    return $api.post("/logout");
  },
};

export { AuthService };
