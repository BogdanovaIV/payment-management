import React, { useEffect, useState, useMemo } from "react";

import { useHistory, useParams } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import bgImageStyles from "../../styles/BgImage.module.css";
import inputStyles from "../../styles/Input.module.css";
import headerStyles from "../../styles/Header.module.css";
import btnStyles from "../../styles/Button.module.css";

import backgroundImage from "../../assets/user-profile.jpg";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import SaveBar from "../../components/SaveBar";
import { axiosReq } from "../../api/axiosDefaults";
import { useToast } from "../../contexts/ToastContext";
import { handleRequestError } from "../../utils/errorHandler";
import { useRedirect } from "../../hooks/useRedirect";
import Instruction from "../../components/Instruction";

const UserPasswordForm = () => {
  useRedirect("loggedOut");
  const { t } = useTranslation();
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const showToast = useToast();
  const [showInstruction, setShowInstruction] = useState(false);

  const [userData, setUserData] = useState({
    old_password: "",
    new_password1: "",
    new_password2: "",
  });

  const arrayFields = (t) => [
    {
      id: "old_password",
      name: "old_password",
      type: "password",
      placeholder: t("auth.old_password"),
    },
    {
      id: "new_password1",
      name: "new_password1",
      type: "password",
      placeholder: t("auth.new_password"),
    },
    {
      id: "new_password2",
      name: "new_password2",
      type: "password",
      placeholder: t("auth.confirm_new_password"),
    },
  ];

  const fields = useMemo(() => arrayFields(t), [t]);

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setUserData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      // redirect user if they are not the owner of this profile
      history.push("/");
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.put("/user-profiles/password/change/", userData);
      history.goBack();
      showToast(t("toast.success_change_password"), "success");
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.log(err.response);
      }
      setErrors(err.response?.data);
      handleRequestError(err, showToast, t);
    }
  };

  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }),
    []
  );

  const instructionBody = (
    <>
      <p>{t("instructions.user_change_password.introduction")}</p>
      <ol>
        <li>
          <strong>{t("instructions.user_change_password.filling_out")}</strong>
          <ul>
            <li>
              <Trans
                i18nKey="instructions.user_change_password.filling_out_desc1"
                components={[<strong />]}
              />
            </li>
            <li>
              <Trans
                i18nKey="instructions.user_change_password.filling_out_desc2"
                components={[<strong />]}
              />
            </li>
            <li>
              <Trans
                i18nKey="instructions.user_change_password.filling_out_desc3"
                components={[<strong />]}
              />
            </li>
            <li>{t("instructions.user_change_password.filling_out_desc4")}</li>
          </ul>
        </li>
        <li>
          <strong>{t("instructions.user_change_password.submitting")}</strong>
          <ul>
            <li>
              <Trans
                i18nKey="instructions.user_change_password.submitting_desc1"
                components={[<strong />]}
              />
            </li>
            <li>{t("instructions.user_change_password.submitting_desc2")}</li>
            <li>{t("instructions.user_change_password.submitting_desc3")}</li>
          </ul>
        </li>
      </ol>
    </>
  );

  return (
    <section className={bgImageStyles.BgImage} style={backgroundStyle}>
      <Container className="pt-2">
        <Row>
          <Container>
            <Row className="justify-content-center">
              <h1 className={headerStyles.Header}>
                {t("auth.edit_user_password")}
              </h1>
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
            <Container className="p-4">
              <Form onSubmit={handleSubmit}>
                {fields.map(({ id, name, type, placeholder }) => (
                  <Form.Group controlId={id} key={id}>
                    <Form.Label className="d-none">{placeholder}</Form.Label>
                    <Form.Control
                      className={inputStyles.Input}
                      type={type}
                      placeholder={placeholder}
                      name={name}
                      value={userData[name]}
                      onChange={handleChange}
                    />
                    {errors[name]?.map((message, idx) => (
                      <Alert variant="warning" key={idx}>
                        {message}
                      </Alert>
                    ))}
                  </Form.Group>
                ))}
                <SaveBar />
                {errors.non_field_errors?.map((message, idx) => (
                  <Alert key={idx} variant="warning" className="mt-3">
                    {message}
                  </Alert>
                ))}
              </Form>
            </Container>
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
};

export default UserPasswordForm;
