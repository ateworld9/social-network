import dayjs from "dayjs";
import { memo } from "react";
import classNames from "classnames";

import { API_PREFIX } from "@shared/config";

import s from "./MessageLayout.module.css";

type MessageLayoutProps = {
  text: Message["text"];
  time: Message["createdAt"];
  medias: Message["medias"];
  postId: Message["postId"];
  className?: string;
};

const MessageLayout = ({
  text,
  time,
  medias,
  postId,
  className,
}: MessageLayoutProps) => {
  return (
    <div className={classNames(s.container, className)}>
      {text && <p className={s.content}>{text}</p>}
      {medias && medias.length > 0 && (
        <div className={classNames(s.media, "mediaContainer")}>
          {medias &&
            medias.length > 0 &&
            medias.map((el) => (
              <img
                key={el}
                src={`${API_PREFIX}/public/images/${el}`}
                alt="message media"
              />
            ))}
        </div>
      )}
      {postId && <span>{postId}</span>}
      <span className={s.time}>{dayjs(time).format("HH:mm")}</span>
    </div>
  );
};

const MemoMessageLayout = memo(MessageLayout);

export { MessageLayout, MemoMessageLayout };
