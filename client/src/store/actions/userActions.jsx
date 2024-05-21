export const SET_USER = "SET_USER";
export const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN";
export const SET_USER_HAS_ACCESS = "SET_USER_HAS_ACCESS";
export const SET_SAVED_RECIPES = "SET_SAVED_RECIPES";

/**
 * Sets the user in the Redux store.
 * @function
 * @param {Object} user - The user object
 * @returns {Object}
 */
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

/**
 * Sets the logged in status in the Redux store.
 * @function
 * @param {boolean} isLoggedIn - The logged in status
 * @returns {Object}
 */
export const setIsLoggedIn = (isLoggedIn) => ({
  type: SET_IS_LOGGED_IN,
  payload: isLoggedIn,
});

/**
 * Sets the user access status in the Redux store.
 * @function
 * @param {boolean} userHasAccess - The user access status
 * @returns {Object}
 */
export const setUserHasAccess = (userHasAccess) => ({
  type: SET_USER_HAS_ACCESS,
  payload: userHasAccess,
});

/**
 * Sets the saved recipes in the Redux store.
 * @function
 * @param {boolean} savedRecipes - The saved recipes
 * @returns {Object}
 */
export const setSavedRecipes = (savedRecipes) => ({
  type: SET_SAVED_RECIPES,
  payload: savedRecipes,
});
