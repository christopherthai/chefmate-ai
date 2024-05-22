import { createSlice } from "@reduxjs/toolkit";

// Set the initial state of the recipe reducer
const initialState = {
  deleteMessage: false,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setDeleteRecipeDeleteMessage(state, action) {
      state.deleteMessage = action.payload;
    },
  },
});

export const { setDeleteRecipeDeleteMessage } = recipeSlice.actions;

export default recipeSlice.reducer;
