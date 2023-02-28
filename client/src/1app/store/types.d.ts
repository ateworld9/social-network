declare type RootState = ReturnType<typeof import("./index").store.getState>;
declare type AppDispatch = AppState["dispatch"];
declare type LoadingState =
  | "idle" // (fetching not started yet)
  | "loading" // (currently fetching the user)
  | "succeeded" // (user fetched successfully)
  | "failed"; // (user failed to fetch)
