import { memo } from "react";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import s from "./index.module.css";

type SendButtonButtonProps = {
  handleSend: () => void;
};

const SendButton = ({ handleSend }: SendButtonButtonProps) => (
  <IconButton onClick={handleSend}>
    <SendIcon className={s.icon} />
  </IconButton>
);
const MemoSendButton = memo(SendButton);
export { SendButton, MemoSendButton };
