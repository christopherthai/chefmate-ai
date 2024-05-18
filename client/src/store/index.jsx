import { configureStore } from "@reduxjs/toolkit";
import { navbarReducer } from "../store/reducers/navbarReducer";

/**
 * The Redux store for the application.
 * @type {object}
 * @property {object} reducer - The reducer object.
 * @property {object} navbar - The navbar reducer.
 * @exports store
 */
export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
  },
});
