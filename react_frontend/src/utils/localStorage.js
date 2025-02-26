import jwtDecode from "jwt-decode";

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  if (!!localStorage.getItem("refreshTokenTimestamp") && !!localStorage.getItem("tokenAccessExpiration")) {
    const expirationTime = new Date(
      localStorage.getItem("tokenAccessExpiration")
    ).getTime();
    const now = Date.now();
    return now >= expirationTime;
  }
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const existRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};


export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
  localStorage.removeItem("tokenAccessExpiration");
};

export const setTokenAccessExpiration = (data) => {
  localStorage.setItem("tokenAccessExpiration", data?.access_expiration);
};

export const getLanguage = () => {
  return localStorage.getItem("lang");
};

export const setLanguage = (lng) => {
  localStorage.setItem("lang", lng);
};
