import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useTypedSelector } from "@shared/hooks";
import { MemoContentInput } from "@shared/ui/ContentInput";

import { selectAuthUserId } from "@entities/auth";

import { Posts } from "@widgets/post";

import {
  fetchUserPosts,
  fetchUserProfile,
  sendPost,
  selectProfile,
  selectProfileLoading,
} from "../../model";
import Profile from "../Profile";

import s from "./index.module.css";

const ProfilePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userId = useParams().userId as string;
  const authedUserId = useTypedSelector(selectAuthUserId) as number;

  useEffect(() => {
    dispatch(fetchUserProfile(+userId));
    dispatch(fetchUserPosts(+userId));
  }, [dispatch, userId]);

  const profile = useTypedSelector(selectProfile);
  const isLoading = useTypedSelector(selectProfileLoading);

  const handler = (text: string, images: Media[]) => {
    dispatch(
      sendPost({
        userId: authedUserId,
        text,
        mediaIds: images.map((image) => +image.mediaId),
      }),
    );
  };

  return isLoading ? (
    <div>profile skeleton</div>
  ) : (
    <>
      {profile ? (
        <Profile
          username={profile.username}
          name={profile.name}
          surname={profile.surname}
          profilePic={profile?.profilePic}
        />
      ) : (
        <div>profile is not loaded</div>
      )}

      {+userId === authedUserId && (
        <MemoContentInput
          handler={handler}
          className={s.contentInput}
          label="Post"
          placeholder="Write here..."
        />
      )}
      <Posts />
    </>
  );
};

export { ProfilePage };
