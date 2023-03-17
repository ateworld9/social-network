import type { AxiosResponse } from "axios";

import $api from "../config/api/http";

const LikeService = {
  async fetchLike(like: Partial<Like>): Promise<AxiosResponse<Like | 1>> {
    return $api.post<any>(`/like`, { like });
  },
};

export { LikeService };
