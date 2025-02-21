import React, { useEffect, useState, useMemo } from "react";

import { useTranslation, Trans } from "react-i18next";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import styles from "../../styles/UserProfilePage.module.css";
import inputStyles from "../../styles/Input.module.css";
import bgImageStyles from "../../styles/BgImage.module.css";
import btnStyles from "../../styles/Button.module.css";
import headerStyles from "../../styles/Header.module.css";

import backgroundImage from "../../assets/user-profile.jpg";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import SpinnerSecondary from "../../components/Spinners";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useToast } from "../../contexts/ToastContext";
import { handleRequestError } from "../../utils/errorHandler";
import { getUserProfileUrl } from "../../api/axiosURL";
import { useRedirect } from "../../hooks/useRedirect";
import Instruction from "../../components/Instruction";
import { getInstructionByFormName } from "../../utils/instructions";

function UserProfilePage() {
  useRedirect("loggedOut");
  const { t } = useTranslation();
  const currentUser = useCurrentUser();
  const [profile, setProfile] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const showToast = useToast();
  const url = getUserProfileUrl();
  const [showInstruction, setShowInstruction] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    const handleMount = async () => {
      try {
        const { data } = await axiosRes.get(`${url}${id}/`);
        if (isMounted) {
          setProfile(data);
          setHasLoaded(true);
        }
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.log(err);
        }
        handleRequestError(err, showToast, t);
      }
    };
    handleMount();
    return () => {
      isMounted = false;
    };
  }, [id, url, showToast, t]);

  const is_owner = useMemo(
    () => currentUser?.username === profile?.username,
    [currentUser, profile]
  );

  const arrayFields = (t) => [
    {
      id: "username",
      name: "username",
      nameBackend: "username",
      type: "text",
      placeholder: t("auth.username"),
    },
    {
      id: "first_name",
      name: "first_name",
      type: "text",
      placeholder: t("auth.first_name"),
    },
    {
      id: "last_name",
      name: "last_name",
      type: "text",
      placeholder: t("auth.last_name"),
    },
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: t("auth.email"),
    },
  ];

  const fields = useMemo(() => arrayFields(t), [t]);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const instructionBody = getInstructionByFormName("UserProfilePage", t, Trans);

  return (
    <section className={bgImageStyles.BgImage} style={backgroundStyle}>
      <Container className="pt-2">
        <Row className="mb-3">
          <Container>
            <Row className="justify-content-center">
              <h1 className={headerStyles.Header}>{t("auth.user_profile")}</h1>
              <Button
                className={`${btnStyles.ButtonIcon} ${btnStyles.OrangeIcon}`}
                onClick={() => setShowInstruction(true)}
              >
                <i className="fa-solid fa-circle-question" />
              </Button>
            </Row>
          </Container>
        </Row>
        <Row>
          <Col className="my-auto offset-lg-2" lg={8}>
            {is_owner && (
              <Container>
                <div className={btnStyles.ButtonGroup}>
                  <Link
                    className={styles.Link}
                    to={`/user-profiles/${id}/edit`}
                    aria-label="edit-profile"
                  >
                    <i className="fa-solid fa-id-card" />
                    {t("button.edit_profile")}
                  </Link>
                  <Link
                    className={styles.Link}
                    to={`/user-profiles/${id}/edit/password`}
                    aria-label="edit-password"
                  >
                    <i className="fas fa-key" />
                    {t("button.change_password")}
                  </Link>
                </div>
              </Container>
            )}
            {hasLoaded ? (
              <Container>
                <Form>
                  {fields.map(({ id, name, type, placeholder }) => (
                    <Form.Group controlId={id} key={id}>
                      <Form.Label className="d-none">{placeholder}</Form.Label>
                      <Form.Control
                        className={inputStyles.Input}
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        value={profile[name] || ""}
                        readOnly
                      />
                    </Form.Group>
                  ))}
                </Form>
              </Container>
            ) : (
              <SpinnerSecondary />
            )}
          </Col>
        </Row>
      </Container>
      <Instruction
        instructionBody={instructionBody}
        showInstruction={showInstruction}
        setShowInstruction={setShowInstruction}
      />
    </section>
  );
}

export default UserProfilePage;
