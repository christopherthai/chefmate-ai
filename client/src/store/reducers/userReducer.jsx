import { SET_USER, SET_IS_LOGGED_IN } from "../actions/userActions";

/**
 * The loadState function retrieves the state from local storage.
 * @returns {Object} The state object
 * @returns {undefined} If the state is not found
 * @returns {undefined} If an error occurs
 */
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

/**
 * The saveState function saves the state to local storage.
 * @param {Object} state The state object
 * @returns {undefined}
 */
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    console.error("Error saving state");
  }
};

// Load the state from local storage if it exists or set it to null
const persistedState = loadState();

// Set the initial state of the user reducer
const initialState = persistedState
  ? persistedState
  : {
      user: null,
      isLoggedIn: false,
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
      break;
    default:
      nextState = state;
  }

  // Save the state to local storage
  saveState(nextState);

  return nextState;
};
