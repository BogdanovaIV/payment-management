import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useToast } from "../contexts/ToastContext";
import { handleRequestError } from "../utils/errorHandler";

const UserProfileDataContext = createContext();
const SetUserProfileDataContext = createContext();

export const useUserProfileData = () => useContext(UserProfileDataContext);
export const useSetUserProfileData = () =>
  useContext(SetUserProfileDataContext);

export const UserProfileDataProvider = ({ children }) => {
  const { t } = useTranslation();
  const [userProfileData, setUserProfileData] = useState(null);

  const currentUser = useCurrentUser();

  const showToast = useToast();

  useEffect(() => {
    const handleMount = async () => {
      try {
        if (currentUser) {
          const { data } = await axiosReq.get(
            `/user-profiles/${currentUser?.profile_id}/`
          );
          setUserProfileData(data);
        } else {
          setUserProfileData(null);
        }
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.log(err);
        }
        handleRequestError(err, showToast, t);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <UserProfileDataContext.Provider value={userProfileData}>
      <SetUserProfileDataContext.Provider value={setUserProfileData}>
        {children}
      </SetUserProfileDataContext.Provider>
    </UserProfileDataContext.Provider>
  );
};
