import { createSlice } from "@reduxjs/toolkit";

import { fetchUserContacts, fetchUsersSearch } from "./thunks";

type ContactsState = {
  contactsIds: UserId[];
  isContactsLoading: LoadingState;
  contactsError: string | null | undefined;

  filtredUsers: UserId[];
  isUsersLoading: LoadingState;
  usersError: string | null | undefined;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contactsIds: [],
    isContactsLoading: "idle",
    contactsError: "",

    filtredUsers: [],
    isUsersLoading: "idle",
    usersError: "",
  } as ContactsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserContacts.pending, (state) => {
      state.isContactsLoading = "loading";
    });
    builder.addCase(fetchUserContacts.fulfilled, (state, action) => {
      state.contactsIds = action.payload;
      state.isContactsLoading = "succeeded";
      state.contactsError = "";
    });
    builder.addCase(fetchUserContacts.rejected, (state, action) => {
      if (action.payload) {
        state.contactsError = action.payload.message;
      }
      state.isContactsLoading = "failed";
    });

    builder.addCase(fetchUsersSearch.pending, (state) => {
      state.isUsersLoading = "loading";
    });
    builder.addCase(fetchUsersSearch.fulfilled, (state, action) => {
      state.filtredUsers = action.payload;
      state.isUsersLoading = "succeeded";
      state.usersError = "";
    });
    builder.addCase(fetchUsersSearch.rejected, (state, action) => {
      if (action.payload) {
        state.usersError = action.payload.message;
      }
      state.isUsersLoading = "failed";
    });

    // builder.addCase(fetchAddToContacts.pending, (state) => {});
    // builder.addCase(fetchAddToContacts.fulfilled, (state, action) => {
    //   state.contacts = action.payload;
    //   state.contactsError = "";
    // });
    // builder.addCase(fetchAddToContacts.rejected, (state, action) => {
    //   if (action.payload) {
    //     state.contactsError = action.payload.message;
    //   }
    // });
  },
});

export const { reducer } = contactsSlice;

export const selectContactsIds = (state: RootState) =>
  state.contactsPage.contactsIds;
export const selectFiltredUsersIds = (state: RootState) =>
  state.contactsPage.contactsIds;
