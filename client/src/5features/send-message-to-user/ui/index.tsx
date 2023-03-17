import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

import { useTypedSelector, useAppDispatch } from "@shared/hooks";
import { ChatService } from "@shared/services/chat";

import { selectAuthUserId } from "@entities/auth";
import { chatsModel } from "@entities/chat";
import { userModel } from "@entities/user";

import s from "./index.module.css";

const SendMessageButton = ({ toUserId }: SendMessageButtonProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authUserId = useTypedSelector(selectAuthUserId) as number;

  const handleOnClick = async () => {
    try {
      const res = await ChatService.fetchCreateChat(
        {
          type: "dialog",
          chatName: "",
        },
        [
          { userId: authUserId, role: "member" },
          { userId: toUserId, role: "member" },
        ],
      );
      dispatch(chatsModel.actions.addChat(res.data.data[0]));
      dispatch(userModel.actions.addUsers(res.data.relationships.users));
      navigate(`/chat/${res.data.data[0].chatId}`);
    } catch (error) {
      console.log("error while creating new dialog", error);
    }
  };

  return (
    <Button
      size="small"
      type="button"
      color="primary"
      onClick={handleOnClick}
      className={s.button}
    >
      Send Message
    </Button>
  );
};

const MemoSendMessageButton = memo(SendMessageButton);

export { SendMessageButton, MemoSendMessageButton };
