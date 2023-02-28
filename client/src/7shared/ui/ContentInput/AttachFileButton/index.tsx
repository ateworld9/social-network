import { memo, useRef, ChangeEvent } from "react";
import { IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import s from "./index.module.css";

type AttachFileButtonProps = {
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
};

const AttachFileButton = ({ onSelectFile }: AttachFileButtonProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <IconButton
        onClick={() => {
          if (fileRef.current) fileRef.current.click();
        }}
      >
        <AttachFileIcon className={s.icon} />
      </IconButton>
      <input
        onChange={onSelectFile}
        ref={fileRef}
        type="file"
        multiple
        accept="image/*"
        className={s.input}
      />
    </>
  );
};

const MemoAttachFileButton = memo(AttachFileButton);

export { AttachFileButton, MemoAttachFileButton };
