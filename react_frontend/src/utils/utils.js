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

  // If access token is present, handle it as well
  if (data?.access) {
    try {
      const accessTokenTimestamp = jwtDecode(data.access).exp;
      localStorage.setItem("accessTokenTimestamp", accessTokenTimestamp);
    } catch (error) {
      console.error("Error decoding access token:", error);
    }
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