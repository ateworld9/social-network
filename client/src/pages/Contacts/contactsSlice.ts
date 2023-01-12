import { createSlice } from "@reduxjs/toolkit";

import type { User } from "../../@types/User";
import { fetchContacts, fetchUsersSearch } from "./contactsThunks";

type ContactsState = {
  contacts?: User[];
  isContactsLoading: boolean;
  contactsError: string | null | undefined;

  users?: User[];
  isUsersLoading: boolean;
  usersError: string | null | undefined;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: undefined,
    isContactsLoading: false,
    contactsError: "",

    users: undefined,
    isUsersLoading: false,
    usersError: "",
  } as ContactsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state) => {
      state.isContactsLoading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
      state.isContactsLoading = false;
      state.contactsError = "";
    });
    builder.addCase(fetchContacts.rejected, (state, action) => {
      if (action.payload) {
        state.contactsError = action.payload.message;
      }
      state.isContactsLoading = false;
    });

    builder.addCase(fetchUsersSearch.pending, (state) => {
      state.isUsersLoading = true;
    });
    builder.addCase(fetchUsersSearch.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isUsersLoading = false;
      state.usersError = "";
    });
    builder.addCase(fetchUsersSearch.rejected, (state, action) => {
      if (action.payload) {
        state.usersError = action.payload.message;
      }
      state.isUsersLoading = false;
    });
  },
});

export default contactsSlice.reducer;
