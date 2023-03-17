import { useTypedSelector } from "@shared/hooks";

import { UserAvatarLink, userModel, UsernameLink } from "@entities/user";

import { SendMessageButton } from "@features/send-message-to-user";

import s from "./Contact.module.css";

type ContactProps = { userId: UserId };

const Contact = ({ userId }: ContactProps) => {
  const contact = useTypedSelector((state) =>
    userModel.selectById(state, userId),
  );

  return contact ? (
    <article className={s.container}>
      <UserAvatarLink
        userId={userId}
        filename={contact.avatar}
        className={s.avatar}
      />
      <div className={s.main}>
        <UsernameLink
          userId={userId}
          name={contact.name}
          surname={contact.surname}
          tag
          username={contact.username}
        />
        <div className={s.controllers}>
          <SendMessageButton toUserId={userId} />
        </div>
      </div>
    </article>
  ) : (
    <div>Contact is not loaded</div>
  );
};

export default Contact;
