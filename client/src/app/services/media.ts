import type { AxiosProgressEvent, AxiosResponse } from "axios";
import { Media } from "../../@types/Media";

import $api from "../http/api";

class MediaService {
  static async postImage(
    FormData: FormData,
    onUploadProgress?: (e: AxiosProgressEvent) => void,
  ): Promise<AxiosResponse<Media>> {
    return $api.post<Media>("/image", FormData, {
      onUploadProgress,
    });
  }
}

export default MediaService;
