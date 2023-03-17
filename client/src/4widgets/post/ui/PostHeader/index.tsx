import dayjs from "dayjs";
import { memo } from "react";

import { IconButton } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

import { useTypedSelector } from "@shared/hooks";
import { HtmlTooltip } from "@shared/ui/HtmlTooltip";

import { DeletePostButton } from "@features/delete-post-button";

import { selectAuthUserId, selectAuthUserRole } from "@entities/auth";
import { UsernameLink, UserAvatarLink, userModel } from "@entities/user";

import s from "./index.module.css";

const Tooltip = ({ postId }: { postId: PostId }) => (
  <HtmlTooltip title={<DeletePostButton postId={postId} />}>
    <IconButton>
      <MoreVertRoundedIcon />
    </IconButton>
  </HtmlTooltip>
);

const PostHeader = ({ postId, userId, createdAt }: PostHeaderProps) => {
  const authUserId = useTypedSelector(selectAuthUserId);
  const authUserRole = useTypedSelector(selectAuthUserRole);
  const user = useTypedSelector((state) =>
    userModel.selectById(state, userId),
  ) as User;
  return (
    <header className={s.user}>
      <UserAvatarLink userId={userId} filename={user.avatar} />
      <div className={s.userInfo}>
        <UsernameLink
          userId={userId}
          name={user.name}
          surname={user.surname}
          tag
          username={user.username}
        />
        <i>
          <time className={s.date}>{dayjs(createdAt).calendar()}</time>
        </i>
      </div>
      {(authUserId === user.userId || authUserRole === "admin") && (
        <Tooltip postId={postId} />
      )}
    </header>
  );
};

const MemoPostHeader = memo(PostHeader);

export { PostHeader, MemoPostHeader };
