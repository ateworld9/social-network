/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FC, useState } from "react";
import { Link } from "react-router-dom";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";

import type { Post as IPost } from "../../models/Post";

import Comments from "./Comments";

import s from "./post.module.css";

type PostType = IPost;

const Post: FC<PostType> = ({
  userId,
  username,
  profilePic,
  text,
  media,
  comments,
}) => {
  const [commentOpen, setCommentOpen] = useState(false);

  // TEMPORARY
  const liked = false;
  return (
    <div className={s.post}>
      <div className={s.container}>
        <div className={s.user}>
          <div className={s.userInfo}>
            <img src={profilePic ?? "/assets/noAvatar.png"} alt="avatar" />
            <div className={s.details}>
              <Link
                to={`/profile/${userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className={s.namespan}>{username}</span>
              </Link>
              <span className={s.date}>1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className={s.content}>
          <p>{text}</p>
          {media && <img src={media} alt="post pic" />}
          {/* add image skeleton loader */}
        </div>
        <div className={s.info}>
          <div className={s.item}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div className={s.item} onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {comments.length || "0"} Comments
          </div>
          <div className={s.item}>
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments comments={comments} />}
      </div>
    </div>
  );
};

export default Post;
