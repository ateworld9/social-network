export const selectAuthUserId = (state: RootState) => {
  if (state.auth.user) {
    return state.auth.user.userId;
  }
  return null;
};
