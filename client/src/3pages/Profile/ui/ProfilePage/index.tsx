import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useTypedSelector } from "@shared/hooks";
import { ContentInput } from "@shared/ui/ContentInput";

import { selectAuthUserId } from "@entities/auth";

import { sendPost } from "@features/send-post";

import { Posts } from "@widgets/post";

import {
  fetchUserProfile,
  selectProfile,
  selectProfileLoading,
} from "../../../../6entities/profile/model";
import Profile from "../Profile";

import s from "./index.module.css";

const ProfilePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userId = useParams().userId as string;
  const authedUserId = useTypedSelector(selectAuthUserId) as number;

  useEffect(() => {
    dispatch(fetchUserProfile(+userId));
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
    <section>profile skeleton</section>
  ) : (
    <>
      {profile ? (
        <Profile
          isAuthUser={+profile.userId === authedUserId}
          userId={profile.userId}
          username={profile.username}
          email={profile.email}
          phone={profile.phone}
          name={profile.name}
          surname={profile.surname}
          avatar={profile?.avatar}
          cover={profile?.cover}
          about={profile.about}
        />
      ) : (
        <div>profile is not loaded</div>
      )}

      {+userId === authedUserId && (
        <ContentInput
          handler={handler}
          className={s.contentInput}
          label="Post"
          placeholder="Write here..."
        />
      )}
      <Posts fetchOptions={{ filter: { userId } }} />
    </>
  );
};

export { ProfilePage };
