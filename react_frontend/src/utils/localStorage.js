import jwtDecode from "jwt-decode";

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};

export const getLanguage = () => {
  return localStorage.getItem("lang");
};

export const setLanguage = (lng) => {
  localStorage.setItem("lang", lng);
};
