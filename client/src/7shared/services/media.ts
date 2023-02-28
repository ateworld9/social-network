import type { AxiosProgressEvent, AxiosResponse } from "axios";

import $api from "../config/api/http";

const MediaService = {
  async postImage(
    file: File,
    onUploadProgress?: (e: AxiosProgressEvent) => void,
  ): Promise<AxiosResponse<Media>> {
    const formData = new FormData();
    formData.append("image", file, file.name);

    return $api.post<Media>("/image", formData, {
      onUploadProgress,
    });
  },
};

export default MediaService;
