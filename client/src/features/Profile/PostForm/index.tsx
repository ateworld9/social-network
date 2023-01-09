import { AxiosProgressEvent } from "axios";
import { useState, ChangeEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { Media } from "../../../@types/Media";
import MediaService from "../../../app/services/media";
import { useAppDispatch, useTypedSelector } from "../../../hooks/store";

import {
  setFileLoadingProgress,
  resetFileLoadingProgress,
} from "../profileSlice";
import { sendPost } from "../profileThunks";

import s from "./postForm.module.css";

interface PostFormI {
  text: string;
}

const PostForm = () => {
  const dispatch = useAppDispatch();
  const { fileLoadingProgress } = useTypedSelector((state) => state.profile);
  const [images, setImages] = useState<Media[]>([]);
  const [imageError, setImageError] = useState("");
  const imageInput = useRef<HTMLInputElement>(null);

  const { reset, register, handleSubmit } = useForm<PostFormI>();

  const userId = useTypedSelector((state) => state.auth.user?.userId) as number;

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (files?.length) {
      const formData = new FormData();
      formData.append("image", files[0], files[0].name);

      const response = await MediaService.postImage(
        formData,
        (ProgressEvent: AxiosProgressEvent) => {
          if (ProgressEvent.total) {
            dispatch(
              setFileLoadingProgress(
                Math.ceil(ProgressEvent.loaded / ProgressEvent.total) * 100,
              ),
            );
          }
        },
      );
      setImages((prev) => [...prev, response.data]);
    } else {
      setImageError("you have to choose an image");
    }
  };

  const onFormSubmit = (data: PostFormI) => {
    dispatch(
      sendPost({
        userId,
        text: data.text,
        mediaIds: images.map((image) => +image.mediaId),
      }),
    );

    reset();
    setImageError("");
    setImages([]);
    dispatch(resetFileLoadingProgress());
  };

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit(onFormSubmit)}>
        <input
          className={s.input}
          type="text"
          placeholder="What's new?"
          {...register("text", { required: "Post can`t be empty" })}
        />
        <input
          ref={imageInput}
          name="image"
          type="file"
          multiple
          onChange={(e) => handleImageChange(e)}
        />

        {fileLoadingProgress && (
          <p style={{ color: "green" }}>{fileLoadingProgress} loaded</p>
        )}
        {imageError && <p style={{ color: "red" }}>{imageError}</p>}

        <button className={s.submit} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default PostForm;
