import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const UserProfileDataContext = createContext();
const SetUserProfileDataContext = createContext();

export const useUserProfileData = () => useContext(UserProfileDataContext);
export const useSetUserProfileData = () =>
  useContext(SetUserProfileDataContext);

export const UserProfileDataProvider = ({ children }) => {
  const [userProfileData, setUserProfileData] = useState(null);

  const currentUser = useCurrentUser();

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
        console.log(err);
      }
    };
  
    handleMount();
  }, [currentUser]);

  return (
    <UserProfileDataContext.Provider value={userProfileData}>
      <SetUserProfileDataContext.Provider
        value={setUserProfileData}
      >
        {children}
      </SetUserProfileDataContext.Provider>
    </UserProfileDataContext.Provider>
  );
};
