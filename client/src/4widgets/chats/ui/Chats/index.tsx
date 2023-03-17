import { useEffect, memo } from "react";
import { useAppDispatch, useTypedSelector } from "@shared/hooks";

import { chatsModel } from "@entities/chat";
import { selectAuthUserId } from "@entities/auth";

import socket from "@shared/config/api/socket";

import { Chat } from "../Chat";

// interface ChatsProps {}

const Chats = () => {
  const dispatch = useAppDispatch();
  const userId = useTypedSelector(selectAuthUserId) as number;

  useEffect(() => {
    const updateLastMessageListner = ({ data }: { data: Message[] }) => {
      dispatch(
        chatsModel.actions.updateChat({
          id: data[0].chatId,
          changes: { lastMessage: data[0] },
        }),
      );
    };

    socket.on("ON_MESSAGE", updateLastMessageListner);

    return () => {
      socket.off("ON_MESSAGE", updateLastMessageListner);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(chatsModel.fetchChats(userId));
  }, [dispatch, userId]);

  const chats = useTypedSelector(chatsModel.selectAll);
  const isChatsLoading = useTypedSelector(chatsModel.selectLoading);

  return (
    <section>
      {isChatsLoading === "loading" ? (
        <div>Скелетон чатов</div>
      ) : (
        chats &&
        chats.map((chat) => <Chat key={chat.chatId} chatId={chat.chatId} />)
      )}
    </section>
  );
};

const MemoChats = memo(Chats);

export { Chats, MemoChats };
