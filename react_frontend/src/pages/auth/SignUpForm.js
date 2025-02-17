import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import bgImageStyles from "../../styles/BgImage.module.css";
import inputStyles from "../../styles/Input.module.css";

import backgroundImage from "../../assets/signup.jpg";

import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/localStorage";
import { useToast } from "../../contexts/ToastContext";
import { handleRequestError } from "../../utils/errorHandler";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  useRedirect("loggedIn");
  const { t } = useTranslation();
  const setCurrentUser = useSetCurrentUser();
  const showToast = useToast();

  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const fields = [
    {
      id: "username",
      name: "username",
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
    {
      id: "password1",
      name: "password1",
      type: "password",
      placeholder: t("auth.password"),
    },
    {
      id: "password2",
      name: "password2",
      type: "password",
      placeholder: t("auth.confirm_password"),
    },
  ];

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      const { data } = await axios.post("/dj-rest-auth/login/", {
        username: signUpData.username,
        password: signUpData.password1,
      });

      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.push("/");
      showToast(t("toast.success_sign_up"), "success");
    } catch (err) {
      setErrors(err.response?.data);
      handleRequestError(err, showToast, t);
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
        <Row>
          <Container>
            <h1 className={styles.Header}>{t("auth.sign_up")}</h1>
            <Link className={styles.Link} to="/signin">
              <Trans
                i18nKey="auth.already_have_account"
                values={{
                  signIn: t("auth.sign_in"),
                }}
                components={[<span />]}
              />
            </Link>
          </Container>
        </Row>
        <Row>
          <Col className="my-auto offset-lg-3" lg={6}>
            <Container className="p-4">
              <Form onSubmit={handleSubmit}>
                {fields.map(({ id, name, nameBackend, type, placeholder }) => (
                  <Form.Group controlId={id} key={id}>
                    <Form.Label className="d-none">{placeholder}</Form.Label>
                    <Form.Control
                      className={inputStyles.Input}
                      type={type}
                      placeholder={placeholder}
                      name={name}
                      value={signUpData[name]}
                      onChange={handleChange}
                    />
                    {errors[name]?.map((message, idx) => (
                      <Alert variant="warning" key={idx}>
                        {message}
                      </Alert>
                    ))}
                  </Form.Group>
                ))}

                <Button
                  className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Blue}`}
                  type="submit"
                >
                  {t("auth.sign_up")}
                </Button>
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
    </section>
  );
};

export default SignUpForm;
