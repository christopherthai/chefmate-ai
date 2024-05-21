import {
  SET_USER,
  SET_IS_LOGGED_IN,
  SET_USER_HAS_ACCESS,
} from "../actions/userActions";

// Set the initial state of the user reducer
const initialState = {
  user: null,
  userHasAccess: JSON.parse(localStorage.getItem("userHasAccess")) || false,
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
};

/**
 * The userReducer function manages the user state.
 * @param {Object} state The current state
 * @param {Object} action The action to be executed
 * @returns {Object} The new state
 */
export const userReducer = (state = initialState, action) => {
  //   let nextState;
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_IS_LOGGED_IN:
      localStorage.setItem("isLoggedIn", JSON.stringify(action.payload));
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case SET_USER_HAS_ACCESS:
      localStorage.setItem("userHasAccess", JSON.stringify(action.payload));
      return {
        ...state,
        userHasAccess: action.payload,
      };
    default:
      return state;
  }
};
