export const SET_DELETE_RECIPE_DELETE_MESSAGE =
  "SET_DELETE_RECIPE_DELETE_MESSAGE";

/**
 * Sets the value of deleteMessage in the Redux store.
 * @param {boolean} deleteMessage - The new value for deleteMessage.
 * @returns {object} - The action object with type and payload properties.
 */
export const setDeleteRecipeDeleteMessage = (deleteMessage) => ({
  type: SET_DELETE_RECIPE_DELETE_MESSAGE,
  payload: deleteMessage,
});
