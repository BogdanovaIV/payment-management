import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useUserProfileData } from "../contexts/ProfileDataContext";
import { shouldRefreshToken } from "../utils/localStorage";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();
  const userProfileData = useUserProfileData();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handleMount = async () => {
      try {
        setIsLoading(true);
        if (shouldRefreshToken()) {
          await axios.post("/dj-rest-auth/token/refresh/");
        }
        setIsLoading(false);
        // if user is logged in, the code below will run or the user isn't checked

        if (
          !isLoading &&
          (userAuthStatus === "loggedIn" || !userProfileData?.checked)
        ) {
          history.push("/");
        }
      } catch (err) {
        // if user is not logged in, the code below will run
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };
    handleMount();
  }, [history, userAuthStatus, userProfileData]);
};
