import React, { useEffect, useState, useMemo } from "react";

import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import bgImageStyles from "../../styles/BgImage.module.css";
import inputStyles from "../../styles/Input.module.css";
import headerStyles from "../../styles/Header.module.css";

import backgroundImage from "../../assets/user-profile.jpg";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import SaveBar from "../../components/SaveBar";
import { axiosReq } from "../../api/axiosDefaults";
import { useToast } from "../../contexts/ToastContext";
import { handleRequestError } from "../../utils/errorHandler";

const UserPasswordForm = () => {
  const { t } = useTranslation();
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const showToast = useToast();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });

  const arrayFields = (t) => [
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
      await axiosReq.post("/dj-rest-auth/password/change/", userData);
      history.goBack();
      showToast(t("toast.success_change_password"), "success");
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.log(err);
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
  return (
    <section className={bgImageStyles.BgImage} style={backgroundStyle}>
      <Container className="pt-2">
        <Row>
          <Container>
            <h1 className={headerStyles.Header}>
              {t("auth.edit_user_password")}
            </h1>
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
    </section>
  );
};

export default UserPasswordForm;
