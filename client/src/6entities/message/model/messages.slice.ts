import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";

const messagesAdapter = createEntityAdapter<Message>({
  selectId: (message) => message.messageId,
  sortComparer: (a, b) => a.messageId - b.messageId,
});
const initialState = messagesAdapter.getInitialState<{
  loading: LoadingState;
  count: number;
  error: any;
}>({
  loading: "loading",
  count: 0,
  error: null,
});

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    setMessage: messagesAdapter.setOne,
    setMessages: messagesAdapter.setMany,
    setAllMessages: messagesAdapter.setAll,
    removeMessage: messagesAdapter.removeOne,
    removeMessages: messagesAdapter.removeMany,
    removeAllMessages: messagesAdapter.removeAll,
    updateMessage: messagesAdapter.updateOne,
    updateMessages: messagesAdapter.updateMany,
    upsertMessage: messagesAdapter.upsertOne,
    upsertMessages: messagesAdapter.upsertMany,
    setLoading(state, action: PayloadAction<LoadingState>) {
      state.loading = action.payload;
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },
  // extraReducers: (builder) =>{}
});

export const { reducer, actions } = messageSlice;

export const selectLoading = (state: RootState) => state.messages.loading;
export const selectCount = (state: RootState) => state.messages.count;

export const { selectAll, selectById, selectEntities, selectIds, selectTotal } =
  messagesAdapter.getSelectors<RootState>((state) => state.messages);
