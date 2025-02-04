import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import styles from "../../styles/UserProfilePage.module.css";
import inputStyles from "../../styles/Input.module.css";
import bgImageStyles from "../../styles/BgImage.module.css";

import backgroundImage from "../../assets/user-profile.jpg";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import axios from "axios";
import SpinnerSecondary from "../../components/Spinners";
import { Link } from "react-router-dom";

function UserProfilePage() {
  const { t } = useTranslation();
  const currentUser = useCurrentUser();
  const [profile, setProfile] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/user-profiles/${id}/`);
        setProfile(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const is_owner = currentUser?.username === profile?.username;

  const fields = [
    {
      id: "username",
      name: "username",
      nameBackend: "username",
      type: "text",
      placeholder: t("auth.username"),
    },
    {
      id: "firstName",
      name: "firstName",
      nameBackend: "first_name",
      type: "text",
      placeholder: t("auth.first_name"),
    },
    {
      id: "lastName",
      name: "lastName",
      nameBackend: "last_name",
      type: "text",
      placeholder: t("auth.last_name"),
    },
    {
      id: "email",
      name: "email",
      nameBackend: "email",
      type: "email",
      placeholder: t("auth.email"),
    },
  ];

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section className={bgImageStyles.BgImage} style={backgroundStyle}>
      <Container className="pt-2">
        <Row className="mb-3">
          <Container>
            <h1 className={styles.Header}>User profile</h1>
          </Container>
        </Row>
        <Row>
          <Col className="my-auto offset-lg-3" lg={6}>
            {is_owner ? (
              <>
                <Container>
                  <div className={styles.EditBar}>
                    <Link
                      className={styles.Link}
                      to={`/user-profiles/${id}/edit`}
                      aria-label="edit-profile"
                    >
                      <i className="fa-solid fa-id-card" />
                      Edit profile
                    </Link>
                    <Link
                      className={styles.Link}
                      to={`/user-profiles/${id}/edit/password`}
                      aria-label="edit-password"
                    >
                      <i className="fas fa-key" />
                      Change password
                    </Link>
                  </div>
                </Container>
              </>
            ) : (
              <></>
            )}
            {hasLoaded ? (
              <>
                <Container>
                  <Form>
                    {fields.map(
                      ({ id, name, type, nameBackend, placeholder }) => (
                        <Form.Group controlId={id} key={id}>
                          <Form.Label className="d-none">
                            {placeholder}
                          </Form.Label>
                          <Form.Control
                            className={inputStyles.Input}
                            type={type}
                            placeholder={placeholder}
                            name={name}
                            value={profile[nameBackend]}
                            readOnly
                          />
                        </Form.Group>
                      )
                    )}
                  </Form>
                </Container>
              </>
            ) : (
              <>
                <SpinnerSecondary />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default UserProfilePage;
