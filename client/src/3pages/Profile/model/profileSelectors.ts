export const selectProfile = (state: RootState) => state.profilePage.profile;
export const selectProfileLoading = (state: RootState) =>
  state.profilePage.isLoading;
