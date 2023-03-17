import type { AxiosProgressEvent } from "axios";
import { useRef, useState } from "react";
import { Dialog, Button, LinearProgress } from "@mui/material";

import MediaService from "@shared/services/media";

import s from "./Modal.module.css";

const UpdateUserModal = ({
  open,
  onClose,
  handler,
  title,
}: UpdateUserModalProps) => {
  const [image, setImage] = useState<Media>();
  const [preview, setPreview] = useState<string>();
  const progressRef = useRef<number>();
  const [progress, setProgress] = useState<number>();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      progressRef.current = 0;
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      await MediaService.postImage(file, (event: AxiosProgressEvent) => {
        if (typeof event.total === "number") {
          setProgress((100 * event.loaded) / event.total);
        }
      }).then((resp) => {
        setImage(resp.data);
      });
    }
  };

  const handleSave = () => {
    handler(image?.mediaId);
    onClose();
  };

  return (
    <Dialog open={!!open} onClose={onClose}>
      <div className={s.container}>
        {title && <h3>{title}</h3>}
        {preview && (
          <img
            src={preview}
            alt="preview upload"
            className={open === "avatar" ? s.previewAvatar : s.previewCover}
          />
        )}
        {progress && <LinearProgress variant="determinate" value={progress} />}
        <input type="file" accept="image/*" onChange={handleFile} />
        <Button size="small" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Dialog>
  );
};

export { UpdateUserModal };
