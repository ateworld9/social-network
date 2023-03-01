import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

import { useTypedSelector, useAppDispatch } from "../../../7shared/hooks";
import { ChatService } from "../../../7shared/services/chat";

import { selectAuthUserId } from "../../../6entities/auth";
import { chatsModel } from "../../../6entities/chat";
import { userModel } from "../../../6entities/user";

const SendMessageButton = ({
  // fromUserId,
  toUserId,
}: SendMessageButtonProps) => {
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
      dispatch(chatsModel.actions.upsertChat(res.data.data[0]));
      dispatch(userModel.actions.upsertUsers(res.data.relationships.users));
      navigate(`/chat/${res.data.data[0].chatId}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("error while creating new dialog", error);
    }
  };

  return <Button onClick={handleOnClick}>Send Message</Button>;
};

const MemoSendMessageButton = memo(SendMessageButton);

export { SendMessageButton, MemoSendMessageButton };
