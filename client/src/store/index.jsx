import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbarSlice";
import userReducer from "./userSlice";
import recipeReducer from "./recipeSlice";

/**
 * The Redux store for the application.
 * @type {object}
 * @property {object} reducer - The reducer object.
 * @property {object} navbar - The navbar reducer.
 * @property {object} user - The user reducer.
 * @property {object} recipe - The recipe reducer.
 * @exports store
 */
export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    user: userReducer,
    recipe: recipeReducer,
  },
});
