import cn from "classnames";
import { memo } from "react";
import { Link } from "react-router-dom";

import { useTypedSelector } from "../../../../7shared/hooks";

import { MemoMessageLayout, messageModel } from "../../../../6entities/message";
import { userModel } from "../../../../6entities/user";

import s from "./Message.module.css";

type MessageProps = { messageId: MessageId; authUserId: UserId };

const Message = ({ messageId, authUserId }: MessageProps) => {
  const message = useTypedSelector((state) =>
    messageModel.selectById(state, messageId),
  );

  const fromUserId = message?.fromUserId as number;

  const user = useTypedSelector((state) =>
    userModel.selectById(state, fromUserId),
  );

  return message ? (
    <div
      className={cn(
        s.message,
        message.fromUserId === authUserId ? s.self : null,
      )}
    >
      <Link to={`/profile/${user?.userId}`}>
        <img
          src={user?.profilePic?.filepath ?? "/assets/noAvatar.png"}
          alt="avatar"
          className={s.messageAvatar}
        />
      </Link>

      <div className={s.messageContent}>
        <div className={s.messageTextSmall}>
          <Link to={`/profile/${user?.userId}`}>
            {user?.name && user?.surname ? (
              <span className={s.fullname}>
                {user.name} {user.surname}
              </span>
            ) : (
              <span className={s.username}>{user?.username}</span>
            )}
          </Link>
        </div>
        <MemoMessageLayout
          text={message.text}
          time={message.createdAt}
          medias={message.medias}
        />
      </div>
    </div>
  ) : (
    <div>message is not loaded</div>
  );
};
const MemoMessage = memo(Message);

export { Message, MemoMessage };
