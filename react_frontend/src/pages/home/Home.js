import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

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
      <h1 className={styles.Header}>{t("home.welcome_message")}</h1>

      {!currentUser ? (
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
        </p>
      ) : !userProfileData?.checked ? (
        <p>{t("home.profile_pending_verification")}</p>
      ) : null}

      <Container>
        <Row className={styles.Introduction}>
          <Col xs={12}>
            <div>{t("home.introduction")}</div>
          </Col>
          <Col xs={12} className="text-center">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="me-3"
            >
              <i className="fa-brands fa-facebook fa-2x text-primary"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram fa-2x text-danger"></i>
            </a>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className={styles.CardFeatures}>
            <Card className={styles.Card}>
              <Card.Body className={styles.CardBody}>
                <Card.Title className={styles.CardTitle}>
                  {t("home.features.title")}
                </Card.Title>
                <Card.Text as="div" className={styles.CardText}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <i className="fa-solid fa-user-gear text-primary me-3"></i>
                      <strong>
                        {t("home.features.user_management_title")}:
                      </strong>{" "}
                      {t("home.features.user_management_desc")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="fa-solid fa-lock text-danger me-3"></i>
                      <strong>
                        {t("home.features.secure_requests_title")}:
                      </strong>{" "}
                      {t("home.features.secure_requests_desc")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="fa-solid fa-users text-success me-3"></i>
                      <strong>
                        {t("home.features.multi_user_title")}:
                      </strong>{" "}
                      {t("home.features.multi_user_desc")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="fa-solid fa-clipboard-check text-warning me-3"></i>
                      <strong>{t("home.features.transparent_title")}:</strong>{" "}
                      {t("home.features.transparent_desc")}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} className={styles.CardBenefits}>
            <Card className={styles.Card}>
              <Card.Body className={styles.CardBody}>
                <Card.Title className={styles.CardTitle}>
                  {t("home.benefits.title")}
                </Card.Title>
                <Card.Text as="div" className={styles.CardText}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <i className="fa-solid fa-tasks text-info me-3"></i>
                      <strong>{t("home.benefits.workflow_title")}:</strong>{" "}
                      {t("home.benefits.workflow_desc")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="fa-solid fa-shield-alt text-danger me-3"></i>
                      <strong>{t("home.benefits.access_title")}:</strong>{" "}
                      {t("home.benefits.access_desc")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="fa-solid fa-face-smile text-success me-3"></i>
                      <strong>{t("home.benefits.user_friendly_title")}:</strong>{" "}
                      {t("home.benefits.user_friendly_desc")}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
