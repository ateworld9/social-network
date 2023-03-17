import { useLayoutEffect, useRef } from "react";
import { useTypedSelector } from "@shared/hooks";

import { messageModel } from "@entities/message";
import { selectAuthUserId } from "@entities/auth";

import MessagesSkeleton from "../MessagesSkeleton";
import { Message } from "../Message";

import s from "./MessagesContainer.module.css";

// type MessagesContainerProps = {};

const MessagesContainer = () => {
  const listRef = useRef<any>(null);
  const status = useTypedSelector(messageModel.selectLoading);
  const messageIds = useTypedSelector(messageModel.selectIds) as MessageId[];
  const authUserId = useTypedSelector(selectAuthUserId) as number;

  useLayoutEffect(() => {
    const node = listRef.current;
    node.scrollTop = node.scrollHeight;
  }, [status]);

  return (
    <main ref={listRef} className={s.messagesContainer}>
      {status === "loading" ? (
        <MessagesSkeleton />
      ) : (
        messageIds.map((messageId) => (
          <Message
            key={messageId}
            messageId={messageId}
            authUserId={authUserId}
          />
        ))
      )}
    </main>
  );
};

export default MessagesContainer;
