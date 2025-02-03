import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import SpinnerSecondary from "../../components/Spinners";

import styles from "../../styles/Home.module.css";
import bgImageStyles from "../../styles/BgImage.module.css";
import backgroundImage from "../../assets/home.jpg";

const Home = () => {
  const currentUser = useCurrentUser();

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  if (currentUser === undefined) {
    return <SpinnerSecondary />;
  }

  return (
    <section className={bgImageStyles.BgImage} style={backgroundStyle}>
      <Container>
        <h1 className={styles.Header}>Welcome to CBC Management</h1>

        {!currentUser ? (
          <>
            <p>
              If you already have an account, please{" "}
              <Link to="/signin">
                <span>Sign in</span>
              </Link>
              , otherwise please{" "}
              <Link to="/signup">
                <span>Sign up</span>
              </Link>{" "}
              to create an account.
            </p>{" "}
          </>
        ) : !currentUser?.checked ? (
          <>
            <p>
              Your profile is pending verification by an administrator. Once
              verified, you will have full access to all features available to you.
            </p>
          </>
        ) : (
          <> </>
        )}
      </Container>
    </section>
  );
};

export default Home;
