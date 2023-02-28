import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const mediasAdapter = createEntityAdapter<Media>({
  selectId: (media) => media.mediaId,
});
const initialState = mediasAdapter.getInitialState<{}>({});

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    addMedia: mediasAdapter.addOne,
    addMedias: mediasAdapter.addMany,
    setMedia: mediasAdapter.setOne,
    setMedias: mediasAdapter.setMany,
    setAllMedias: mediasAdapter.setAll,
    removeMedia: mediasAdapter.removeOne,
    removeMedias: mediasAdapter.removeMany,
    removeAllMedias: mediasAdapter.removeAll,
    updateMedia: mediasAdapter.updateOne,
    updateMedias: mediasAdapter.updateMany,
    upsertMedia: mediasAdapter.upsertOne,
    upsertMedias: mediasAdapter.upsertMany,
  },
  // extraReducers: (builder) =>{}
});

export const { reducer, actions } = mediaSlice;

export const { selectAll, selectById, selectEntities, selectIds, selectTotal } =
  mediasAdapter.getSelectors<RootState>((state) => state.medias);
