export const SET_IS_SIDEBAR_COLLAPSED = "SET_IS_SIDEBAR_COLLAPSED";
export const SET_IS_SIDEBAR_OPEN = "SET_IS_SIDEBAR_OPEN";
export const SET_WIDTH = "SET_WIDTH";
export const SET_PREV_IS_MOBILE = "SET_PREV_IS_MOBILE";

/**
 * Sets the value of isSidebarCollapsed in the Redux store.
 * @param {boolean} isSidebarCollapsed - The new value for isSidebarCollapsed.
 * @returns {object} - The action object with type and payload properties.
 */
export const setIsSidebarCollapsed = (isSidebarCollapsed) => ({
  type: SET_IS_SIDEBAR_COLLAPSED,
  payload: isSidebarCollapsed,
});

/**
 * Sets the value of isSidebarOpen in the Redux store.
 * @param {boolean} isSidebarOpen - The new value for isSidebarOpen.
 * @returns {object} - The action object with type and payload properties.
 */
export const setIsSidebarOpen = (isSidebarOpen) => ({
  type: SET_IS_SIDEBAR_OPEN,
  payload: isSidebarOpen,
});

/**
 * Sets the value of width in the Redux store.
 * @param {number} width - The new value for width.
 * @returns {object} - The action object with type and payload properties.
 */
export const setWidth = (width) => ({
  type: SET_WIDTH,
  payload: width,
});

/**
 * Sets the value of prevIsMobile in the Redux store.
 * @param {boolean} prevIsMobile - The new value for prevIsMobile.
 * @returns {object} - The action object with type and payload properties.
 */
export const setPrevIsMobile = (prevIsMobile) => ({
  type: SET_PREV_IS_MOBILE,
  payload: prevIsMobile,
});
