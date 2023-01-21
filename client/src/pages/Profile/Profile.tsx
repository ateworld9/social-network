import { FC } from "react";

// import {useAppSelector} from '@hooks/redux';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PinterestIcon from "@mui/icons-material/Pinterest";
import PlaceIcon from "@mui/icons-material/Place";
import TwitterIcon from "@mui/icons-material/Twitter";

import type { User } from "../../@types/User";

// import Posts from "@components/Posts";

import s from "./profile.module.css";

type ProfileProps = Pick<User, "profilePic" | "name" | "surname" | "username">;

const Profile: FC<ProfileProps> = ({ profilePic, name, surname, username }) => {
  return (
    <>
      <div className={s.images}>
        <div className={s.coverContainer}>
          <img
            src="https://picsum.photos/1500/1500"
            alt="cover"
            className={s.cover}
          />
        </div>
        <div className={s.avatarContainer}>
          <img
            src={profilePic.filepath || "/assets/noAvatar.png"}
            alt="avatar"
            className={s.avatar}
          />
        </div>
      </div>
      <div className={s.profileContainer}>
        <div className={s.userInfo}>
          <div className={s.left}>
            <a href="http://facebook.com">
              <FacebookTwoToneIcon className={s.icon} />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon className={s.icon} />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon className={s.icon} />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon className={s.icon} />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon className={s.icon} />
            </a>
          </div>
          <div className={s.center}>
            {name && surname && (
              <span className={s.fullname}>
                {name} {surname}
              </span>
            )}
            <span className={s.username}>{username}</span>
            <div className={s.info}>
              <div className={s.item}>
                <PlaceIcon />
                <span>Russia</span>
              </div>
              <div className={s.item}>
                <LanguageIcon />
                <span />
              </div>
            </div>
            <button type="button">follow</button>
          </div>
          <div className={s.right}>
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
