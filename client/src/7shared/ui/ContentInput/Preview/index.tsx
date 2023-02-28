import { memo } from "react";

import { IconButton, CircularProgress } from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

import s from "./index.module.css";

const AttachedImage = ({ src, loading, onDeleteFile }: AttachedImageProps) => {
  return (
    <li className={s.preview} draggable={false}>
      <img
        className={s.previewImage}
        src={src}
        alt="preview"
        draggable={false}
      />
      <div className={s.delete}>
        <IconButton onClick={() => onDeleteFile(src)}>
          <DisabledByDefaultIcon />
        </IconButton>
      </div>
      {loading !== 100 && (
        <div className={s.progressContainer}>
          <CircularProgress
            variant="determinate"
            value={loading}
            className={s.progress}
          />
        </div>
      )}
    </li>
  );
};

const MemoAttachedImage = memo(AttachedImage);

export { AttachedImage, MemoAttachedImage };

const Preview = ({ preview, progressInfos, onDeleteFile }: PreviewProps) => {
  return (
    <ul className={s.previewContainer}>
      {preview?.map((el, i) => (
        <AttachedImage
          key={el}
          src={el}
          loading={progressInfos[i]?.percentage ?? undefined}
          onDeleteFile={onDeleteFile}
        />
      ))}
    </ul>
  );
};

const MemoPreview = memo(Preview);

export { Preview, MemoPreview };
