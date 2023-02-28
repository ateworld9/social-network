import dayjs from "dayjs";
import { memo } from "react";

import { Media } from "../../media";
import s from "./MessageLayout.module.css";

type MessageLayoutProps = {
  text: Message["text"];
  time: Message["createdAt"];
  medias: Message["medias"];
};

const MessageLayout = ({ text, time, medias }: MessageLayoutProps) => {
  return (
    <div className={s.container}>
      {medias && medias.length > 0 && (
        <div className={s.imagesContainer}>
          {medias &&
            medias.length > 0 &&
            medias.map((el) => (
              <div key={el} className={s.imgWrapper}>
                <Media mediaId={el} alt="message media" className={s.image} />
              </div>
            ))}
        </div>
      )}
      <p className={s.content}>{text}</p>
      <span className={s.time}>{dayjs(time).format("HH:mm")}</span>
    </div>
  );
};

const MemoMessageLayout = memo(MessageLayout);

export { MessageLayout, MemoMessageLayout };
