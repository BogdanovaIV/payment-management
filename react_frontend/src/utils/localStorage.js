import jwtDecode from "jwt-decode";

/**
 * Sets the refresh token expiration timestamp in localStorage.
 * @param {Object} data - An object containing the refresh token.
 */
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

/**
 * Determines if the access token should be refreshed.
 * @returns {boolean} - Returns `true` if the access token is expired or if a refresh token exists.
 */
export const shouldRefreshToken = () => {
  if (
    !!localStorage.getItem("refreshTokenTimestamp") &&
    !!localStorage.getItem("tokenAccessExpiration")
  ) {
    const expirationTime = new Date(
      localStorage.getItem("tokenAccessExpiration")
    ).getTime();
    const now = Date.now();
    return now >= expirationTime;
  }
  return !!localStorage.getItem("refreshTokenTimestamp");
};

/**
 * Checks if a refresh token timestamp exists in localStorage.
 * @returns {boolean} - Returns `true` if a refresh token timestamp exists.
 */
export const existRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

/**
 * Removes the refresh token timestamp and access token expiration from localStorage.
 */
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
  localStorage.removeItem("tokenAccessExpiration");
};

/**
 * Stores the access token expiration timestamp in localStorage.
 * @param {Object} data - An object containing the access expiration timestamp.
 */
export const setTokenAccessExpiration = (data) => {
  localStorage.setItem("tokenAccessExpiration", data?.access_expiration);
};

/**
 * Retrieves the user's preferred language from localStorage.
 * @returns {string|null} - The stored language preference or `null` if not set.
 */
export const getLanguage = () => {
  return localStorage.getItem("lang");
};

/**
 * Stores the user's preferred language in localStorage.
 * @param {string} lng - The language code to store (e.g., "en", "fr").
 */
export const setLanguage = (lng) => {
  localStorage.setItem("lang", lng);
};
