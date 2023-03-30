import { useState, useEffect, useLayoutEffect, useRef, memo } from "react";

import { useAppDispatch, useTypedSelector } from "@shared/hooks";
import socket from "@shared/config/api/socket";

import { messageModel } from "@entities/message";
import { selectAuthUserId } from "@entities/auth";

import MessagesSkeleton from "../MessagesSkeleton";
import { Message } from "../Message";

import s from "./MessagesContainer.module.css";

const MESSAGES_PER_PAGE = 10;

const MessagesContainer = ({ chatId }: MessagesContainerProps) => {
  const dispatch = useAppDispatch();
  const listRef = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);
  const loading = useTypedSelector(messageModel.selectLoading);
  const count = useTypedSelector(messageModel.selectCount);
  const messageIds = useTypedSelector(messageModel.selectIds) as MessageId[];
  const authUserId = useTypedSelector(selectAuthUserId) as number;

  useLayoutEffect(() => {
    const node = listRef.current as HTMLDivElement;
    if (node.children[9]) node.children[9].scrollIntoView();
  }, [loading]);

  useEffect(() => {
    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        if (page * MESSAGES_PER_PAGE < count) {
          dispatch(messageModel.actions.setLoading("lazy"));
          socket.emit("GET_CHAT_MESSAGES", {
            filter: { chatId },
            page: {
              limit: MESSAGES_PER_PAGE,
              offset: page * MESSAGES_PER_PAGE,
            },
          });
          setPage((prev) => prev + 1);
        }
      }
    };
    const option = {
      root: null,
      rootMargin: "",
      threshold: 1,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    const node = loader.current as HTMLDivElement;
    observer.observe(node);
    return () => {
      observer.unobserve(node);
    };
  }, [dispatch, chatId, count, page]);

  return (
    <main ref={listRef} className={s.messagesContainer}>
      {loading === "loading" && <MessagesSkeleton />}
      <div ref={loader} className={s.last} />
      {!!messageIds.length &&
        messageIds.map((messageId) => (
          <Message
            key={messageId}
            messageId={messageId}
            authUserId={authUserId}
          />
        ))}
    </main>
  );
};

const MemoMessagesContainer = memo(MessagesContainer);
export { MessagesContainer, MemoMessagesContainer };
