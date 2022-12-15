/* eslint-disable no-nested-ternary */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../hooks/store";
import type { User } from "../../models/User";

import Profile from "./Profile";
import { fetchUserPosts, fetchUserProfile } from "./profileThunks";

import Posts from "../Posts";

const ProfileContainer = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const authedUserId = useTypedSelector(
    (state) => state.auth.user?.userId,
  ) as number;

  useEffect(() => {
    dispatch(fetchUserProfile(Number(userId) || authedUserId));
    dispatch(fetchUserPosts(Number(userId) || authedUserId));
  }, [dispatch, userId, authedUserId]);

  const profile = useTypedSelector((state) => state.profile.profile) as User;
  const isLoading = useTypedSelector((state) => state.profile.isLoading);
  const posts = useTypedSelector((state) => state.profile.posts);
  const isPostsLoading = useTypedSelector(
    (state) => state.profile.isPostsLoading,
  );

  return isLoading ? (
    <div>profile skeleton</div>
  ) : (
    <>
      <Profile username={profile.username} profilePic={profile?.profilePic} />
      <Posts posts={posts} isLoading={isPostsLoading} />
    </>
  );
};

export default ProfileContainer;
