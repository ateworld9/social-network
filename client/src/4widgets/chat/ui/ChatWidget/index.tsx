import { useEffect, memo } from "react";

import { useAppDispatch, useTypedSelector } from "@shared/hooks";
import { ContentInput } from "@shared/ui/ContentInput";
import socket from "@shared/config/api/socket";

import { selectAuthUserId } from "@entities/auth";
import { messageModel } from "@entities/message";

import ChatHeader from "../ChatHeader";
import s from "./index.module.css";
import MessagesContainer from "../MessagesContainer";

const ChatWidget = ({ chatId }: ChatWidgetProps) => {
  const dispatch = useAppDispatch();

  const userId = useTypedSelector(selectAuthUserId);
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

  useEffect(() => {
    socket.emit("GET_CHAT_MESSAGES", chatId);
    dispatch(messageModel.actions.setLoading("loading"));

    const getMessagesListener = ({
      data,
    }: {
      data: Message[];
      relationships?: { media: Media[] };
    }) => {
      dispatch(messageModel.actions.setAllMessages(data));
      dispatch(messageModel.actions.setLoading("succeeded"));
    };

    socket.once("GET_CHAT_MESSAGES", getMessagesListener);

    const recieveMessageListner = ({
      data,
    }: {
      data: Message[];
      relationships?: { media: Media[] };
    }) => {
      // TODO: play notification sound
      if (data[0].chatId === +chatId) {
        dispatch(messageModel.actions.addMessage(data[0]));
      }
    };

    socket.on("ON_MESSAGE", recieveMessageListner);

    return () => {
      socket.off("ON_MESSAGE", recieveMessageListner);
    };
  }, [dispatch, chatId]);

  return (
    <section className={s.container}>
      <ChatHeader chatId={+chatId} />
      <MessagesContainer />
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
