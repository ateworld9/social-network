import {
  ChangeEvent,
  useRef,
  useState,
  useEffect,
  useCallback,
  memo,
} from "react";
import classNames from "classnames";
import { AxiosProgressEvent } from "axios";

import { TextField } from "@mui/material";

import { MemoAttachFileButton } from "./AttachFileButton";
import { MemoPreview } from "./Preview";
import { MemoSendButton } from "./SendButton";

import MediaService from "../../services/media";

import s from "./index.module.css";

const MemoTextField = memo(TextField);

const ContentInput = ({
  label,
  placeholder,
  handler,
  className,
}: ContentInputProps) => {
  const [text, setText] = useState("");
  const textRef = useRef("");
  textRef.current = text;

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e?.target.value);
  }, []);

  const [isDragImage, setIsDragImage] = useState(false);
  const [images, setImages] = useState<Media[]>([]);

  const imagesRef = useRef<Media[]>([]);
  imagesRef.current = images;
  const [preview, setPreview] = useState<string[]>([]);

  const progressInfosRef = useRef<ProgressInfo[]>([]);
  const [progressInfos, setProgressInfos] = useState<ProgressInfo[]>([]);

  useEffect(() => {
    const dragenter = (e: Event) => {
      e.stopPropagation();
      setIsDragImage(true);
    };
    // MAY BE WARNING
    window.addEventListener("dragenter", dragenter);

    const dragover = (e: Event) => {
      e.preventDefault();
    };
    window.addEventListener("dragover", dragover);
    const drop = (e: Event) => {
      e.preventDefault();
      setIsDragImage(false);
    };
    window.addEventListener("drop", drop);
    // const dragleave = (e: Event) => {
    //   console.log("leave");

    //   // setIsDragImage(false);
    // };
    // window.addEventListener("dragleave", dragleave);
    return () => {
      window.addEventListener("dragenter", dragenter);

      window.removeEventListener("dragover", dragover);
      window.removeEventListener("drop", drop);
      // window.removeEventListener("dragleave", dragleave);
    };
  }, []);

  useEffect(() => {
    return () => {
      preview.forEach((el) => URL.revokeObjectURL(el));
    };
  }, [preview]);

  const handleFiles = useCallback(async (files: FileList) => {
    if (files?.length) {
      const newFilesArr = Array.from(files);

      const allFilesProgress = progressInfosRef.current.concat(
        newFilesArr.map((file) => ({
          percentage: 0,
          fileName: file.name,
        })),
      );
      progressInfosRef.current = allFilesProgress;

      const objectUrls = newFilesArr.map((el: File) => URL.createObjectURL(el));
      setPreview((prev) => [...prev, ...objectUrls]);

      const upload = (file: File, idx: number) => {
        const progressInfosss = [...progressInfosRef.current];

        return MediaService.postImage(file, (event: AxiosProgressEvent) => {
          if (typeof event.total === "number") {
            progressInfosss[idx].percentage = Math.round(
              (100 * event.loaded) / event.total,
            );
            setProgressInfos(progressInfosss);
          }
        })
          .then((resp) => {
            setImages((prev) => [...prev, resp.data]);
          })
          .catch(() => {
            allFilesProgress[idx].percentage = 0;
            setProgressInfos(allFilesProgress);
          });
      };

      Promise.all(newFilesArr.map((file, i) => upload(file, i)));
    }
  }, []);
  const onSelectFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles],
  );
  const onDeleteFile = useCallback((src: string) => {
    let idx: number;
    setPreview((prev) =>
      prev.filter((el, i) => {
        if (el === src) {
          idx = i;
          return false;
        }
        return true;
      }),
    );
    setImages((prev) => prev.filter((el, i) => idx !== i));
    setProgressInfos((prev) => {
      const newProgressInfos = prev.filter((el, i) => idx !== i);
      progressInfosRef.current = newProgressInfos;
      return newProgressInfos;
    });
  }, []);

  const handleSend = useCallback(() => {
    if (textRef.current.length > 0 || imagesRef.current.length > 0) {
      handler(textRef.current, imagesRef.current);
      setText("");
      setImages([]);
      setPreview([]);
      setProgressInfos([]);
      progressInfosRef.current = [];
    }
  }, [handler]);

  return (
    <section
      className={classNames(s.container, className)}
      onDragEnter={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDragOver={(e) => {
        // Подсветить
        e.stopPropagation();
        e.preventDefault();
      }}
      onDrop={(e) => {
        handleFiles(e.dataTransfer.files);
        setIsDragImage(false);
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {isDragImage ? (
        <div>Drop Files here</div>
      ) : (
        <>
          <form className={s.formContainer}>
            <MemoAttachFileButton onSelectFile={onSelectFile} />
            <MemoTextField
              label={label}
              placeholder={placeholder}
              size="small"
              autoFocus
              multiline
              fullWidth
              value={text}
              onChange={handleChange}
            />
            <MemoSendButton handleSend={handleSend} />
          </form>
          {preview.length > 0 && (
            <MemoPreview
              preview={preview}
              progressInfos={progressInfos}
              onDeleteFile={onDeleteFile}
            />
          )}
        </>
      )}
    </section>
  );
};

const MemoContentInput = memo(ContentInput);

export { ContentInput, MemoContentInput };
