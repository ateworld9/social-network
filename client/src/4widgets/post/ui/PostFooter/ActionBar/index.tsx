import Button from "@mui/material/Button";

import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";

import { SharePostButton } from "@features/share-post";
import { LikePostButton } from "@features/like-post-button";

import s from "./index.module.css";

const ActionBar = ({
  postId,
  likesCount,
  liked,
  setCommentOpen,
  commentsCount,
}) => {
  return (
    <div className={s.actionBar}>
      <LikePostButton
        postId={postId}
        likesCount={likesCount}
        liked={liked}
        className={s.item}
      />
      <Button
        variant="text"
        startIcon={<TextsmsOutlinedIcon />}
        onClick={() => setCommentOpen((prev) => !prev)}
        className={s.item}
      >
        <span>{commentsCount} Comments</span>
      </Button>
      <SharePostButton postId={postId} className={s.item} />
    </div>
  );
};
export { ActionBar };
