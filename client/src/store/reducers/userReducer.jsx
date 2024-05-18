import { SET_USER, SET_IS_LOGGED_IN } from "../actions/userActions";

/**
 * Initial state of the user reducer
 * @constant
 * @type {Object}
 */
const initialState = {
  user: null,
  isLoggedIn: false,
};

/**
 * User reducer function
 * @function
 * @param {Object} state - The current state
 * @param {Object} action - The action to be performed
 * @returns {Object}
 */
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};
