import { SET_DELETE_RECIPE_DELETE_MESSAGE } from "../actions/recipeActions";

// Set the initial state of the recipe reducer
const initialState = {
  deleteMessage: false,
};

/**
 * The recipeReducer function manages the recipe state.
 * @param {Object} state The current state
 * @param {Object} action The action to be executed
 * @returns {Object} The new state
 */
export const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DELETE_RECIPE_DELETE_MESSAGE:
      return {
        ...state,
        deleteMessage: action.payload,
      };
    default:
      return state;
  }
};
