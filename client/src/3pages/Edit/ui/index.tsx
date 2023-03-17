import { useEffect, useState } from "react";

// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocalSeeOutlinedIcon from "@mui/icons-material/LocalSeeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import { API_PREFIX } from "@shared/config";
import { useAppDispatch, useTypedSelector } from "@shared/hooks";
import { HtmlTooltip } from "@shared/ui/HtmlTooltip";

import { selectAuthUserId, selectAuthUserRole } from "@entities/auth";
import { UserAvatar, Username } from "@entities/user";
import { profileModel } from "@entities/profile";

import { UpdateUserModal } from "@features/update-user-modal";

import { EditForm } from "@widgets/edit-profile-form";

import s from "./index.module.css";

export const EditPage = () => {
  const dispatch = useAppDispatch();
  const authedUserId = useTypedSelector(selectAuthUserId) as number;
  const authedUserRole = useTypedSelector(selectAuthUserRole);

  useEffect(() => {
    if (authedUserRole !== "admin") {
      dispatch(profileModel.fetchUserProfile(authedUserId));
    }
  }, [dispatch, authedUserId, authedUserRole]);

  const profile = useTypedSelector(profileModel.selectProfile);

  const [showModal, setShowModal] = useState<false | "avatar" | "cover">(false);

  const handler = (mediaId: MediaId) => {
    if (profile) {
      dispatch(
        profileModel.updateUserProfile({
          userId: profile.userId,
          avatar: showModal === "avatar" ? mediaId : undefined,
          cover: showModal === "cover" ? mediaId : undefined,
        }),
      );
    }
  };

  return profile ? (
    <>
      <section className={s.profileContainer}>
        <h1 className={s.header}>Profile</h1>
        <div className={s.coverContainer}>
          <div className={s.coverControls}>
            <Button
              variant="text"
              size="small"
              startIcon={<EditIcon />}
              className={s.editCover}
              onClick={() => {
                setShowModal("cover");
              }}
            >
              Edit Cover
            </Button>
            <input
              // onChange={onSelectFile}
              // ref={fileRef}
              type="file"
              multiple
              accept="image/*"
              className={s.input}
            />
          </div>
          <img
            src={
              profile.cover
                ? `${API_PREFIX}/public/images/${profile.cover}`
                : "https://picsum.photos/1920/768"
            }
            draggable="false"
            alt="cover"
            className={s.cover}
          />
        </div>
        <div className={s.avatarContainer}>
          <div className={s.avatarWrapper}>
            <UserAvatar
              filename={profile.avatar}
              alt="avatar"
              className={s.avatar}
            />
            <div className={s.avatarControls}>
              <HtmlTooltip
                title={
                  <>
                    <Button
                      color="primary"
                      startIcon={<AccountCircleOutlinedIcon />}
                      sx={{ display: "flex" }}
                      onClick={() => {
                        setShowModal("avatar");
                      }}
                    >
                      Update avatar
                    </Button>

                    <Button
                      color="error"
                      startIcon={<DeleteIcon />}
                      sx={{ display: "flex" }}
                    >
                      Delete
                    </Button>
                  </>
                }
              >
                <IconButton>
                  <LocalSeeOutlinedIcon />
                </IconButton>
              </HtmlTooltip>
            </div>
          </div>
        </div>
        <div className={s.userCard}>
          <div />
          <div className={s.userInfo}>
            <Username
              name={profile.name}
              surname={profile.surname}
              username={profile.username}
              tag
            />
          </div>
        </div>
        <UpdateUserModal
          title={
            showModal === "avatar"
              ? "Choose new avatar"
              : "Choose new profile cover"
          }
          open={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          handler={handler}
        />
      </section>
      <EditForm
        userId={profile.userId}
        username={profile.username}
        email={profile.email}
        phone={profile.phone}
        name={profile.name}
        surname={profile.surname}
        about={profile.about}
        city={profile.city}
        birthday={profile.birthday}
      />
    </>
  ) : (
    <section>.... LOADING</section>
  );
};
