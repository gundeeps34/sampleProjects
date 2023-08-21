import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  categories: null,
  recipes: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setCategories: (state, action) => {
      state.categories = action.payload.categories;
    },
    setRecipes: (state, action) => {
      state.recipes = action.payload.recipes;
    },
    setLikes: (state, action) => {
      state.user = action.payload.user;
      state.likes = action.payload.likes;
    },
    setLike: (state, action) => {
      const updatedLikes = state.user.likes.map((like) => {
        if (like.name === action.payload.like.name) return action.payload.like;
        return like;
      });
      state.likes = updatedLikes;
    },
  },
});

export const { setLogin, setLogout, setCategories, setLike, setLikes, setRecipes } = authSlice.actions;
export default authSlice.reducer;
