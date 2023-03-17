import { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

import socket from "@shared/config/api/socket";
import { useAppDispatch, useTypedSelector } from "@shared/hooks";
import { ContentInput } from "@shared/ui/ContentInput";

import { selectAuthUserId } from "@entities/auth";
import { chatsModel } from "@entities/chat";

import { Chat } from "../Chat";

import s from "./index.module.css";

type SharePostModalProps = {
  postId: PostId;
};

export const SharePostModal = ({ postId }: SharePostModalProps) => {
  const dispatch = useAppDispatch();

  const userId = useTypedSelector(selectAuthUserId) as number;
  useEffect(() => {
    dispatch(chatsModel.fetchChats(userId));
  }, [dispatch, userId]);

  const [chat, setChat] = useState<any>();

  const chats = useTypedSelector(chatsModel.selectAll);

  const handleSend = (text: string, images: Media[]) => {
    socket.emit(
      "ON_MESSAGE",
      {
        chatId: 1, // TODO:
        fromUserId: userId,
        text,
        postId,
      },
      images.map((image) => image.mediaId),
    );
  };

  return (
    <div className={s.modal}>
      <Autocomplete
        size="small"
        renderInput={(params) => <TextField {...params} label="Chat" />}
        options={chats}
        renderOption={Chat}
        getOptionLabel={(option) => String(option.members[0].userId)}
        value={chat}
        onChange={(e, value) => {
          setChat(value);
        }}
      />
      <ContentInput
        label="Message"
        placeholder="Write message..."
        handler={handleSend}
      />
    </div>
  );
};
