import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { profileModel } from "@entities/profile";
import { contactsPageModel } from "@pages/Contacts";

import auth from "@entities/auth/model/auth.slice";
import { userModel } from "@entities/user";
import { postModel } from "@entities/post";
import { commentModel } from "@entities/comment";
import { chatsModel } from "@entities/chat";
import { messageModel } from "@entities/message";

const rootReducer = combineReducers({
  profilePage: profileModel.reducer,
  contactsPage: contactsPageModel.reducer,
  auth,
  users: userModel.reducer,
  posts: postModel.reducer,
  comments: commentModel.reducer,
  chats: chatsModel.reducer,
  messages: messageModel.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
