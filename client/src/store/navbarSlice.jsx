import { createSlice } from "@reduxjs/toolkit";

// The initial state of the navbar slice
const initialState = {
  isSidebarCollapsed: false,
  isSidebarOpen: false,
  width: 220,
  prevIsMobile: false,
};

/**
 * The navbarSlice function manages the navbar state.
 * @param {Object} state The current state
 * @param {Object} action The action to be executed
 * @returns {Object} The new state
 */
const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setIsSidebarCollapsed(state, action) {
      state.isSidebarCollapsed = action.payload;
    },
    setIsSidebarOpen(state, action) {
      state.isSidebarOpen = action.payload;
    },
    setWidth(state, action) {
      state.width = action.payload;
    },
    setPrevIsMobile(state, action) {
      state.prevIsMobile = action.payload;
    },
  },
});

export const {
  setIsSidebarCollapsed,
  setIsSidebarOpen,
  setWidth,
  setPrevIsMobile,
} = navbarSlice.actions;

export default navbarSlice.reducer;
