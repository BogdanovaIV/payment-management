import React from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

import backgroundImage from "../../assets/signout.jpg";

import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

function SignOutForm() {
  const setCurrentUser = useSetCurrentUser();

  const history = useHistory();

  const handleSignOut = async () => {
    try {  
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      history.push("/");
    } catch (err) {
      if (process.env.DEBUG === "True") {
        console.log(err);
      }
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section className={styles.BgImage} style={backgroundStyle}>
      <Container className="pt-2">
        <Row className="pb-5">
          <Container>
            <h1 className={styles.Header}>sign out</h1>
            <p className={styles.QuestionParagraph}>
              Are you sure you want to sign out?
            </p>
          </Container>
        </Row>
        <Row className="justify-content-center">
          <Col className="d-flex justify-content-center" lg={6}>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Orange}`}
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SignOutForm;
