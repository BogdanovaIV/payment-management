import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { useUserProfileData } from "../contexts/ProfileDataContext";
import { useToast } from "../contexts/ToastContext";
import { shouldRefreshToken, existRefreshToken } from "../utils/localStorage";
import { handleRequestError } from "../utils/errorHandler";

export const useRedirect = (userAuthStatus) => {
  const { t } = useTranslation();
  const history = useHistory();
  const showToast = useToast();
  const userProfileData = useUserProfileData();
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const handleMount = async () => {
      try {
        if (!existRefreshToken()) {
          throw new Error(t("toast.error_not_authorized"));
        }
        setIsLoading(true);
        if (shouldRefreshToken()) {
          await axios.post("/dj-rest-auth/token/refresh/");
        }
        setIsLoading(false);
      
        if (
          !isLoading &&
          (userAuthStatus === "loggedIn" || !userProfileData?.checked)
        ) {
          setShouldRedirect(true);
          history.push("/");
        }
      } catch (err) {
        
        if (userAuthStatus === "loggedOut") {
          setShouldRedirect(true);
          history.push("/");
        }
        if (!err.response){
          showToast(err.message);
        } else {
          handleRequestError(err, showToast, t);
        }
      } finally {
        setIsLoading(false);
      }
    };
    handleMount();
  }, [history, userAuthStatus, userProfileData]);
  return { isLoading, shouldRedirect };
};
