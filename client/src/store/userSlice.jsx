import { createSlice } from "@reduxjs/toolkit";

// The initial state of the user slice
const initialState = {
  user: null,
  userHasAccess: JSON.parse(localStorage.getItem("userHasAccess")) || false,
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  savedRecipes: JSON.parse(localStorage.getItem("savedRecipes")) || false,
};

/**
 * The userSlice function manages the user state.
 * @param {Object} state The current state
 * @param {Object} action The action to be executed
 * @returns {Object} The new state
 */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
      localStorage.setItem("isLoggedIn", JSON.stringify(action.payload));
    },
    setUserHasAccess(state, action) {
      state.userHasAccess = action.payload;
      localStorage.setItem("userHasAccess", JSON.stringify(action.payload));
    },
    setSavedRecipes(state, action) {
      state.savedRecipes = action.payload;
      localStorage.setItem("savedRecipes", JSON.stringify(action.payload));
    },
  },
});

export const { setUser, setIsLoggedIn, setUserHasAccess, setSavedRecipes } =
  userSlice.actions;

export default userSlice.reducer;
