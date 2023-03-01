import { combineReducers, configureStore } from "@reduxjs/toolkit";

import home from "@pages/Home/home.slice";
import { profilePageModel } from "@pages/Profile";
import { contactsPageModel } from "@pages/Contacts";

import auth from "@entities/auth/model/auth.slice";
import { userModel } from "@entities/user";
import { mediaModel } from "@entities/media";
import { postModel } from "@entities/post";
import { commentModel } from "@entities/comment";
import { chatsModel } from "@entities/chat";
import { messageModel } from "@entities/message";

const rootReducer = combineReducers({
  home,
  profilePage: profilePageModel.reducer,
  contactsPage: contactsPageModel.reducer,
  auth,
  users: userModel.reducer,
  medias: mediaModel.reducer,
  posts: postModel.reducer,
  comments: commentModel.reducer,
  chats: chatsModel.reducer,
  messages: messageModel.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
