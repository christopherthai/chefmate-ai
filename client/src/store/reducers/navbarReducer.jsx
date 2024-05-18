import {
  SET_IS_SIDEBAR_COLLAPSED,
  SET_IS_SIDEBAR_OPEN,
  SET_WIDTH,
  SET_PREV_IS_MOBILE,
} from "../actions/navbarActions";

/**
 * The initial state of the navbarReducer.
 * @type {object}
 * @property {boolean} isSidebarCollapsed - The value of isSidebarCollapsed.
 * @property {boolean} isSidebarOpen - The value of isSidebarOpen.
 * @property {number} width - The value of width.
 * @property {boolean} prevIsMobile - The value of prevIsMobile.
 */
const initialState = {
  isSidebarCollapsed: false,
  isSidebarOpen: false,
  width: 220,
  prevIsMobile: false,
};

/**
 * The navbarReducer function manages the navbar state in the Redux store.
 * @param {object} state - The current state of the navbar.
 * @param {object} action - The action to apply to the state.
 * @returns {object} - The new state of the navbar.
 */
export const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_SIDEBAR_COLLAPSED:
      return { ...state, isSidebarCollapsed: action.payload };
    case SET_IS_SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: action.payload };
    case SET_WIDTH:
      return { ...state, width: action.payload };
    case SET_PREV_IS_MOBILE:
      return { ...state, prevIsMobile: action.payload };
    default:
      return state;
  }
};
