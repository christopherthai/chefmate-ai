import {
  SET_USER,
  SET_IS_LOGGED_IN,
  SET_USER_HAS_ACCESS,
} from "../actions/userActions";

/**
 * The loadState function retrieves the isLoggedIn state from local storage.
 * @returns {boolean} The isLoggedIn state
 * @returns {undefined} If the state is not found
 * @returns {undefined} If an error occurs
 */
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("isLoggedIn");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

/**
 * The saveState function saves the isLoggedIn state to local storage.
 * @param {boolean} isLoggedIn The isLoggedIn state
 * @returns {undefined}
 */
const saveState = (isLoggedIn) => {
  try {
    const serializedState = JSON.stringify(isLoggedIn);
    localStorage.setItem("isLoggedIn", serializedState);
  } catch {
    console.error("Error saving state");
  }
};

// Load the isLoggedIn state from local storage if it exists or set it to false
const persistedState = loadState();

// Set the initial state of the user reducer
const initialState = {
  user: null,
  userHasAccess: false,
  isLoggedIn: persistedState !== undefined ? persistedState : false,
};

/**
 * The userReducer function manages the user state.
 * @param {Object} state The current state
 * @param {Object} action The action to be executed
 * @returns {Object} The new state
 */
export const userReducer = (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case SET_USER:
      nextState = {
        ...state,
        user: action.payload,
      };
      break;
    case SET_IS_LOGGED_IN:
      nextState = {
        ...state,
        isLoggedIn: action.payload,
      };
      saveState(action.payload);
      break;
    case SET_USER_HAS_ACCESS:
      nextState = {
        ...state,
        userHasAccess: action.payload,
      };
      break;
    default:
      nextState = state;
  }

  return nextState;
};
