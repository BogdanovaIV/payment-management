import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import axios from "axios";

import { axiosReq, axiosRes } from "../api/axiosDefaults";
import {
  removeTokenTimestamp,
  setTokenAccessExpiration,
  shouldRefreshToken,
} from "../utils/localStorage";
import { useToast } from "../contexts/ToastContext";
import { handleRequestError } from "../utils/errorHandler";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState(undefined);
  const history = useHistory();
  const showToast = useToast();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosRes.get("/dj-rest-auth/user/");
        setCurrentUser(data);
      } catch (err) {
        setCurrentUser(null);
        if (process.env.NODE_ENV === "development") {
          console.log(err);
        }
        handleRequestError(err, showToast, t);
      }
    };
    handleMount();
  }, []);

  useMemo(() => {
    const requestInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            const response = await axios.post("/dj-rest-auth/token/refresh/");
            setTokenAccessExpiration(response.data);
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
            handleRequestError(err, showToast, t);
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    let isRefreshing = false;
    const responseInterceptor = axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401 && !isRefreshing && shouldRefreshToken()) {
          try {
            const response = await axios.post("/dj-rest-auth/token/refresh/");
            setTokenAccessExpiration(response.data);
            isRefreshing = false;
          } catch (err) {
            isRefreshing = false;
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
            handleRequestError(err, showToast, t);
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
