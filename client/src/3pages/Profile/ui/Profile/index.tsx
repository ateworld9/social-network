import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

import { API_PREFIX } from "@shared/config";
import { useTypedSelector } from "@shared/hooks";

import { selectAuthUserRole } from "@entities/auth";
import { UserAvatar, Username } from "@entities/user";

import s from "./profile.module.css";

type ProfileProps = {
  userId: UserId;
  username: User["username"];
  email: User["email"];
  phone: User["phone"];

  name: User["name"];
  surname: User["surname"];
  avatar: User["avatar"];
  cover: User["cover"];
  about: User["about"];

  isAuthUser: boolean;
};

const Profile = ({
  isAuthUser,
  username,
  email,
  phone,
  name,
  surname,
  avatar,
  cover,
  about,
}: ProfileProps) => {
  const navigate = useNavigate();
  const authUserRole = useTypedSelector(selectAuthUserRole);
  return (
    <section className={s.profileContainer}>
      <div className={s.coverContainer}>
        <img
          src={
            cover
              ? `${API_PREFIX}/public/images/${cover}`
              : "https://picsum.photos/1920/768"
          }
          draggable="false"
          alt="cover"
          className={s.cover}
        />
      </div>
      <div className={s.avatarContainer}>
        <UserAvatar filename={avatar} alt="avatar" className={s.avatar} />
      </div>
      <div className={s.userCard}>
        <div />
        <div className={s.userInfo}>
          <Username name={name} surname={surname} username={username} tag />
          <span>{about}</span>
          <ul className={s.userInfoList}>
            {email && (
              <li className={s.userInfoItem}>
                <EmailOutlinedIcon />
                <span>{email}</span>
              </li>
            )}
            {phone && (
              <li className={s.userInfoItem}>
                <LocalPhoneOutlinedIcon />
                <span>{phone}</span>
              </li>
            )}
          </ul>
        </div>
        <div>
          {(authUserRole === "admin" || isAuthUser) && (
            <Button
              size="small"
              startIcon={<EditIcon />}
              className={s.editButton}
              onClick={() => navigate("/edit")}
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
