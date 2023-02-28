import { combineReducers, configureStore } from "@reduxjs/toolkit";

import home from "../../3pages/Home/home.slice";
import { profilePageModel } from "../../3pages/Profile";
import { contactsPageModel } from "../../3pages/Contacts";

import auth from "../../6entities/auth/model/auth.slice";
import { userModel } from "../../6entities/user";
import { mediaModel } from "../../6entities/media";
import { postModel } from "../../6entities/post";
import { commentModel } from "../../6entities/comment";
import { chatsModel } from "../../6entities/chat";
import { messageModel } from "../../6entities/message";

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
