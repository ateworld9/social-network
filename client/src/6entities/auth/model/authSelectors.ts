export const selectAuthUser = (state: RootState) => {
  if (state.auth.user) {
    return state.auth.user;
  }
  return null;
};

export const selectAuthUserId = (state: RootState) => {
  if (state.auth.user) {
    return state.auth.user.userId;
  }
  return null;
};

export const selectAuthUserRole = (state: RootState) => {
  if (state.auth.user) {
    return state.auth.user.role;
  }
  return null;
};
