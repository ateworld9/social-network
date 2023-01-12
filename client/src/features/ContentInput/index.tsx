// import { AxiosProgressEvent } from "axios";
import { ChangeEvent, FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Media } from "../../@types/Media";
import MediaService from "../../app/services/media";
import { API_BASE } from "../../app/http/api";
import s from "./contentInput.module.css";

interface ContentInputI {
  onFormSubmit: () => any;
}

interface ContentInputFormI {
  text: string;
}

const ContentInput: FC<ContentInputI> = ({ onFormSubmit }) => {
  const imageInput = useRef<HTMLInputElement>(null);
  const { register, handleSubmit } = useForm<ContentInputFormI>();
  const [images, setImages] = useState<Media[]>([]);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (files?.length) {
      console.log("Files", files);

      const formData = new FormData();
      formData.append("image", files[0], files[0].name);

      const response = await MediaService.postImage(
        formData,
        // (ProgressEvent: AxiosProgressEvent) => {
        //   if (ProgressEvent.total) {
        //     dispatch(
        //       setFileLoadingProgress(
        //         Math.ceil(ProgressEvent.loaded / ProgressEvent.total) * 100,
        //       ),
        //     );
        //   }
        // },
      );
      setImages((prev) => [...prev, response.data]);
    }
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
          accept="image/*"
        />
        {/* {images.length && (
          <div className="prewiev">
            {images.map((img, i) => (
              <img
                // eslint-disable-next-line react/no-array-index-key
                key={`${img.filename} ${i}`}
                src={`${API_BASE}/${img.filename}`}
                alt="uploadedImage"
              />
            ))}
          </div>
        )} */}

        {/* {fileLoadingProgress && (
          <p style={{ color: "green" }}>{fileLoadingProgress} loaded</p>
        )} */}

        <button className={s.submit} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ContentInput;
