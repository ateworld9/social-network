import { useLayoutEffect, useRef } from "react";
import { useTypedSelector } from "../../../../7shared/hooks";

import MessagesSkeleton from "../MessagesSkeleton";
import { MemoMessage } from "../Message";

import s from "./MessagesContainer.module.css";
import { messageModel } from "../../../../6entities/message";
import { selectAuthUserId } from "../../../../6entities/auth";

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
          <MemoMessage
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
