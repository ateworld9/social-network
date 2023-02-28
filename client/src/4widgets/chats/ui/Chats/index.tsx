import { useEffect, memo } from "react";
import { useAppDispatch, useTypedSelector } from "../../../../7shared/hooks";

import { chatsModel } from "../../../../6entities/chat";
import { selectAuthUserId } from "../../../../6entities/auth";

import socket from "../../../../7shared/config/api/socket";

import { Chat } from "../Chat";
import { fetchChats } from "../../model/thunks";

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
    dispatch(fetchChats(userId));
  }, [dispatch, userId]);

  const chats = useTypedSelector(chatsModel.selectAll);
  const isChatsLoading = useTypedSelector(chatsModel.selectLoading);

  return (
    <section>
      {isChatsLoading === "loading" ? (
        <div>Скелетон чатов</div>
      ) : (
        chats && chats.map((chat) => <Chat key={chat.chatId} {...chat} />)
      )}
    </section>
  );
};

const MemoChats = memo(Chats);

export { Chats, MemoChats };
