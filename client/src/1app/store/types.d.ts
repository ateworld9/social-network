declare type RootState = ReturnType<typeof import("./index").store.getState>;
declare type AppDispatch = AppState["dispatch"];
declare type LoadingState =
  | "idle" // (fetching not started yet)
  | "loading" // (currently fetching the entity)
  | "succeeded" // (entity fetched successfully)
  | "lazy" // (entity is loadedfirstly,)
  | "failed"; // (entity failed to fetch)
