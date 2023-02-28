/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { memo } from "react";

import Button from "@mui/material/Button";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ForwardRoundedIcon from "@mui/icons-material/ForwardRounded";

import s from "./index.module.css";

const PostFooter = ({ setCommentOpen, commentsCount }: PostFooterProps) => {
  const liked = false;
  return (
    <footer className={s.footer}>
      <Button
        className={s.item}
        variant="text"
        color={liked ? "secondary" : "primary"}
        startIcon={
          liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />
        }
      >
        <span>0 Likes</span>
      </Button>
      <Button
        variant="text"
        startIcon={<TextsmsOutlinedIcon />}
        onClick={() => setCommentOpen((prev) => !prev)}
        className={s.item}
      >
        <span>{commentsCount} Comments</span>
      </Button>
      <Button
        variant="text"
        startIcon={<ForwardRoundedIcon />}
        className={s.item}
      >
        Share
      </Button>
    </footer>
  );
};

const MemoPostFooter = memo(PostFooter);
export { PostFooter, MemoPostFooter };
