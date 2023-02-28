import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.userId,
});
const initialState = usersAdapter.getInitialState();

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: usersAdapter.addOne,
    addUsers: usersAdapter.addMany,
    setUser: usersAdapter.setOne,
    setUsers: usersAdapter.setMany,
    setAllUsers: usersAdapter.setAll,
    removeUser: usersAdapter.removeOne,
    removeUsers: usersAdapter.removeMany,
    removeAllUsers: usersAdapter.removeAll,
    updateUser: usersAdapter.updateOne,
    updateUsers: usersAdapter.updateMany,
    upsertUser: usersAdapter.upsertOne,
    upsertUsers: usersAdapter.upsertMany,
  },
  // extraReducers: (builder) => {},
});

export const { reducer, actions } = userSlice;

export const { selectAll, selectById, selectEntities, selectIds, selectTotal } =
  usersAdapter.getSelectors<RootState>((state) => state.users);
