import { createSlice } from "@reduxjs/toolkit";

// Set the initial state of the recipe reducer
const initialState = {
  deleteMessage: false,
  searchQuery: "",
  sortCriteria: "All",
};

/**
 * The recipeSlice function manages the recipe state.
 * @param {Object} state The current state
 * @param {Object} action The action to be executed
 * @returns {Object} The new state
 */
const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setDeleteRecipeDeleteMessage(state, action) {
      state.deleteMessage = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortCriteria: (state, action) => {
      state.sortCriteria = action.payload;
    },
  },
});

export const { setDeleteRecipeDeleteMessage, setSearchQuery, setSortCriteria } =
  recipeSlice.actions;

export default recipeSlice.reducer;
