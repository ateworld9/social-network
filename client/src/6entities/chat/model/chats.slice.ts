import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";

const chatsAdapter = createEntityAdapter<Chat>({
  selectId: (chat) => chat.chatId,
});
const initialState = chatsAdapter.getInitialState<{
  loading: LoadingState;
  error: any;
}>({
  loading: "idle",
  error: null,
});

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat: chatsAdapter.addOne,
    addChats: chatsAdapter.addMany,
    setChat: chatsAdapter.setOne,
    setChats: chatsAdapter.setMany,
    setAllChats: chatsAdapter.setAll,
    removeChat: chatsAdapter.removeOne,
    removeChats: chatsAdapter.removeMany,
    removeAllChats: chatsAdapter.removeAll,
    updateChat: chatsAdapter.updateOne,
    updateChats: chatsAdapter.updateMany,
    upsertChat: chatsAdapter.upsertOne,
    upsertChats: chatsAdapter.upsertMany,
    setLoading(state, action: PayloadAction<LoadingState>) {
      state.loading = action.payload;
    },
  },
  // extraReducers: (builder) =>{}
});

export const { reducer, actions } = chatsSlice;

export const selectLoading = (state: RootState) => state.chats.loading;

export const { selectAll, selectById, selectEntities, selectIds, selectTotal } =
  chatsAdapter.getSelectors<RootState>((state) => state.chats);
