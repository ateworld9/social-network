import Comments from '@components/Comments';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import {FC, useState} from 'react';
import {Link} from 'react-router-dom';

import styles from './post.module.scss';

type PostType = {
  id: number;
  userId: number;
  name: string;
  profilePic: string;
  text: string;
  img: string;
};

export const Post: FC<PostType> = ({userId, name, profilePic, text, img}) => {
  const [commentOpen, setCommentOpen] = useState(false);

  //TEMPORARY
  const liked = false;
  return (
    <div className={styles.post}>
      <div className={styles.container}>
        <div className={styles.user}>
          <div className={styles.userInfo}>
            <img src={profilePic} alt="avatar" />
            <div className={styles.details}>
              <Link
                to={`/profile/${userId}`}
                style={{textDecoration: 'none', color: 'inherit'}}
              >
                <span className={styles.namespan}>{name}</span>
              </Link>
              <span className={styles.date}>1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className={styles.content}>
          <p>{text}</p>
          <img src={img} alt="post image" />
          {/* add image skeleton loader */}
        </div>
        <div className={styles.info}>
          <div className={styles.item}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div
            className={styles.item}
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className={styles.item}>
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
