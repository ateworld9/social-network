import { memo, useEffect } from "react";

import { useAppDispatch, useTypedSelector } from "@shared/hooks";
import { ContentInput } from "@shared/ui/ContentInput";
import socket from "@shared/config/api/socket";

import { selectAuthUserId } from "@entities/auth";
import { messageModel } from "@entities/message";

import ChatHeader from "../ChatHeader";
import { MessagesContainer } from "../MessagesContainer";

import s from "./index.module.css";

const ChatWidget = ({ chatId }: ChatWidgetProps) => {
  const dispatch = useAppDispatch();
  const userId = useTypedSelector(selectAuthUserId);

  useEffect(() => {
    dispatch(messageModel.actions.removeAllMessages());
    dispatch(messageModel.actions.setLoading("loading"));
    socket.emit("GET_CHAT_MESSAGES", {
      filter: { chatId },
      page: { limit: 10, offset: 0 },
    });

    const getMessagesListener = ({ data, meta }: MesssageResponse) => {
      dispatch(messageModel.actions.setMessages(data));
      dispatch(messageModel.actions.setLoading("succeeded"));
      dispatch(messageModel.actions.setCount(Number(meta?.count ?? 0)));
    };

    socket.on("GET_CHAT_MESSAGES", getMessagesListener);
    return () => {
      socket.off("GET_CHAT_MESSAGES", getMessagesListener);
    };
  }, [dispatch, chatId]);

  useEffect(() => {
    const recieveMessageListner = ({ data, meta }: MesssageResponse) => {
      if (data[0].chatId === +chatId) {
        dispatch(messageModel.actions.setMessage(data[0]));
        dispatch(messageModel.actions.setCount(Number(meta?.count ?? 0)));
      }
    };
    socket.on("ON_MESSAGE", recieveMessageListner);
    return () => {
      socket.off("ON_MESSAGE", recieveMessageListner);
    };
  }, [dispatch, chatId]);

  const handler = (text: string, images: Media[]) => {
    socket.emit(
      "ON_MESSAGE",
      {
        chatId,
        fromUserId: userId,
        text,
      },
      images.map((image) => image.mediaId),
    );
  };

  return (
    <section className={s.container}>
      <ChatHeader chatId={chatId} />
      <MessagesContainer chatId={chatId} />
      <ContentInput
        label="Message"
        placeholder="Write message..."
        handler={handler}
        className={s.contentInput}
      />
    </section>
  );
};

const MemoChatWidget = memo(ChatWidget);

export { ChatWidget, MemoChatWidget };
