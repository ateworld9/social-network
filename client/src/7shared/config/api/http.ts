import axios from "axios";

import { API_BASE } from "../constants";
import type { AuthResponse } from "../../services/auth";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_BASE,
});

$api.interceptors.request.use(
  (config) => {
    if (config && config.headers) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.log("ошибка в перехватчике запроса", error);
    // Сделайте что-нибудь с ошибкой запроса
    return Promise.reject(error);
  },
);

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config.isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${API_BASE}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return await $api.request(originalRequest);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log("Не авторизован", err);
      }
    }
    throw error;
  },
);

export default $api;
