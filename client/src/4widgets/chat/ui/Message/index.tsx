import cn from "classnames";
import { memo } from "react";

import { useTypedSelector } from "@shared/hooks";

import { MessageLayout, messageModel } from "@entities/message";
import { UserAvatarLink, userModel, UsernameLink } from "@entities/user";

import s from "./Message.module.css";

type MessageProps = { messageId: MessageId; authUserId: UserId };

const Message = ({ messageId, authUserId }: MessageProps) => {
  const message = useTypedSelector((state) =>
    messageModel.selectById(state, messageId),
  );

  const fromUserId = message?.fromUserId as number;

  const user = useTypedSelector((state) =>
    userModel.selectById(state, fromUserId),
  ) as User;

  return message ? (
    <div
      className={cn(
        s.message,
        message.fromUserId === authUserId ? s.self : null,
      )}
    >
      <div className={s.messageAvatar}>
        <UserAvatarLink filename={user?.avatar} alt="avatar" />
      </div>
      <div className={s.messageUsername}>
        <UsernameLink
          userId={user.userId}
          name={user.name}
          surname={user.surname}
          username={user.username}
        />
      </div>
      <MessageLayout
        className={s.messageLayout}
        text={message.text}
        time={message.createdAt}
        medias={message.medias}
        postId={message.postId}
      />
    </div>
  ) : (
    <div>message is not loaded</div>
  );
};
const MemoMessage = memo(Message);

export { Message, MemoMessage };
