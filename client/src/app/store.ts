import { combineReducers, configureStore } from "@reduxjs/toolkit";

import auth from "../features/auth/authSlice";
import profile from "../features/Profile/profileSlice";
import home from "../features/Home/homeSlice";

const rootReducer = combineReducers({
  auth,
  profile,
  home,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = typeof store; // ReturnType<typeof setupStore>
export type AppDispatch = AppState["dispatch"];

export default store;
