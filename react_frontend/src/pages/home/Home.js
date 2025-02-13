import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

import styles from "../../styles/Home.module.css";
import bgImageStyles from "../../styles/BgImage.module.css";

import backgroundImage from "../../assets/home.jpg";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import SpinnerSecondary from "../../components/Spinners";
import { useUserProfileData } from "../../contexts/ProfileDataContext";

const Home = () => {
  const { t } = useTranslation();
  const currentUser = useCurrentUser();
  const userProfileData = useUserProfileData();

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  if (currentUser === undefined || userProfileData === undefined) {
    return <SpinnerSecondary />;
  }

  return (
    <section className={bgImageStyles.BgImage} style={backgroundStyle}>
      <Container>
        <h1 className={styles.Header}>{t("home.welcome_message")}</h1>

        {!currentUser ? (
          <>
            <p>
              {t("home.if_have_account")}{" "}
              <Link to="/signin">
                <span>{t("auth.sign_in")}</span>
              </Link>
              , {t("home.otherwise_sign_up")}{" "}
              <Link to="/signup">
                <span>{t("auth.sign_up")}</span>
              </Link>{" "}
              {t("home.to_create_account")}
            </p>{" "}
          </>
        ) : !userProfileData?.checked ? (
          <>
            <p>{t("home.profile_pending_verification")}</p>
          </>
        ) : (
          <> </>
        )}
      </Container>
    </section>
  );
};

export default Home;
