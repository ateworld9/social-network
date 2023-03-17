import cn from "classnames";
import s from "./messagesSkeleton.module.css";

const arr: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const MessagesSkeleton = () => {
  return (
    <>
      {arr.map((el, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className={s.message}>
          <figure className={cn(s.messageAvatar, s.loading)} />
          <div>
            <div className={cn(s.messageTextSmall, s.loading)} />
            <div className={cn(s.messageTextLarge, s.loading)} />
          </div>
        </div>
      ))}
    </>
  );
};

export default MessagesSkeleton;
