import React from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useHistory } from "react-router-dom";

import styles from "../../styles/SignOutForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import bgImageStyles from "../../styles/BgImage.module.css";
import headerStyles from "../../styles/Header.module.css";

import backgroundImage from "../../assets/signout.jpg";

import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

function SignOutForm() {
  const { t } = useTranslation();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section className={bgImageStyles.BgImage} style={backgroundStyle}>
      <Container className="pt-2">
        <Row className="pb-5">
          <Container>
            <h1 className={headerStyles.Header}>{t("auth.sign_out")}</h1>
            <p className={styles.QuestionParagraph}>{t("auth.sign_out_question")}</p>
          </Container>
        </Row>
        <Row className="justify-content-center">
          <Col className="d-flex justify-content-center" lg={6}>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Orange}`}
              onClick={handleSignOut}
            >
              {t("auth.sign_out")}
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SignOutForm;
