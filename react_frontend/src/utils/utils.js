import jwtDecode from "jwt-decode";

export const setTokenTimestamp = (data) => {
  if (data?.refresh) {
    try {
      const refreshTokenTimestamp = jwtDecode(data.refresh).exp;
      localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
    } catch (error) {
      console.error("Error decoding refresh token:", error);
    }
  } else {
    console.warn("Refresh token is missing.");
  }
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