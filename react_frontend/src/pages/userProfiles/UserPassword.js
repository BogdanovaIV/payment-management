import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axiosRes from "axios";

import btnStyles from "../../styles/Button.module.css";
import bgImageStyles from "../../styles/BgImage.module.css";
import inputStyles from "../../styles/Input.module.css";
import headerStyles from "../../styles/Header.module.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import backgroundImage from "../../assets/user-profile.jpg";

import { useParams } from "react-router";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const UserPasswordForm = () => {
  const { t } = useTranslation();

  const currentUser = useCurrentUser();

  const { id } = useParams();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });

  const fields = [
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

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
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
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
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
            <h1 className={headerStyles.Header}>{t("auth.edit_user_profile")}</h1>
          </Container>
        </Row>
        <Row>
          <Col className="my-auto offset-lg-3" lg={6}>
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
                <div className={btnStyles.ButtonGroup}>
                  <Button
                    className={`${btnStyles.ButtonTransparent} ${btnStyles.RedTransparent}`}
                    onClick={() => history.goBack()}
                  >
                    <i class="fa-solid fa-circle-xmark"></i>
                    {t("button.cancel")}
                  </Button>

                  <Button
                    className={`${btnStyles.ButtonTransparent} ${btnStyles.GreenTransparent}`}
                    type="submit"
                  >
                    <i class="fa-solid fa-floppy-disk"></i>
                    {t("button.save")}
                  </Button>
                </div>
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

export default UserPasswordForm;
