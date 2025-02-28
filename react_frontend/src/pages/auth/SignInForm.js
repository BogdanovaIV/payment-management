import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import bgImageStyles from "../../styles/BgImage.module.css";
import inputStyles from "../../styles/Input.module.css";
import headerStyles from "../../styles/Header.module.css";

import backgroundImage from "../../assets/signin.jpg";

import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/localStorage";
import { useToast } from "../../contexts/ToastContext";
import { handleRequestError } from "../../utils/errorHandler";
import { useRedirect } from "../../hooks/useRedirect";
import { validateAll, validateField } from "../../utils/validation";

function SignInForm() {
  useRedirect("loggedIn");
  const { t } = useTranslation();
  const setCurrentUser = useSetCurrentUser();
  const showToast = useToast();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const fields = [
    {
      id: "username",
      name: "username",
      type: "text",
      placeholder: t("auth.username"),
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: t("auth.password"),
    },
  ];

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newErrors = {};
    Object.keys(signInData).forEach((key) => {
      const errorMessage = validateField("sign_in")(key, signInData[key]);
      if (errorMessage) newErrors[key] = errorMessage ? [errorMessage] : [];
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...newErrors,
      }));
      return;
    }

    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.push("/");
      showToast(t("toast.success_log_in"), "success");
    } catch (err) {
      setErrors(
        Object.fromEntries(
          Object.entries(err.response?.data).map(([key, value]) => [
            key,
            Array.isArray(value)
              ? value.map((item) => ({ i18nKey: item }))
              : value,
          ])
        )
      );
      handleRequestError(err, showToast, t);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const errorMessage = validateField("sign_in")(name, value);
    if (errorMessage !== undefined) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage ? [errorMessage] : [],
      }));
    }
    if (errors.non_field_errors) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        non_field_errors: [],
      }));
    }
    setSignInData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
            <h1 className={headerStyles.Header}>{t("auth.sign_in")}</h1>
            <Link className={styles.Link} to="/signup">
              {t("auth.sign_in_prompt")} <span>{t("auth.sign_up_now")}</span>
            </Link>
          </Container>
        </Row>
        <Row>
          <Col className="my-auto offset-lg-3" lg={6}>
            <Container>
              <Form onSubmit={handleSubmit}>
                {fields.map(({ id, name, type, placeholder }) => (
                  <Form.Group controlId={id} key={id}>
                    <Form.Label className="d-none">{placeholder}</Form.Label>
                    <Form.Control
                      className={inputStyles.Input}
                      type={type}
                      placeholder={placeholder}
                      name={name}
                      value={signInData[name]}
                      onChange={handleChange}
                    />
                    {errors[name]?.map((message, idx) => (
                      <Alert variant="warning" key={idx}>
                        <Trans
                          i18nKey={message.i18nKey}
                          values={message.values}
                        />
                      </Alert>
                    ))}
                  </Form.Group>
                ))}

                <Button
                  className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Blue}`}
                  type="submit"
                >
                  {t("auth.sign_in")}
                </Button>
                {errors.non_field_errors?.map((message, idx) => (
                  <Alert key={idx} variant="warning" className="mt-3">
                    <Trans i18nKey={message.i18nKey} values={message.values} />
                  </Alert>
                ))}
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SignInForm;
