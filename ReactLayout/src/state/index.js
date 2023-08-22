
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    images: null,
};

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload.images;
    },
  },
});

export const { setImages } = imagesSlice.actions;
export default imagesSlice.reducer;
