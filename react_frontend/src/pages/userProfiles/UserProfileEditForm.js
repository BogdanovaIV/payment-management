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

import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useSetUserProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import SaveBar from "../../components/SaveBar";
import { useToast } from "../../contexts/ToastContext";
import { handleRequestError } from "../../utils/errorHandler";
import { getUserProfileUrl } from "../../api/axiosURL";
import SpinnerSecondary from "../../components/Spinners";

const UserProfileEditForm = () => {
  const { t } = useTranslation();
  const setUserProfileData = useSetUserProfileData();
  const currentUser = useCurrentUser();
  const showToast = useToast();
  const url = getUserProfileUrl();
  const [hasLoaded, setHasLoaded] = useState(false);

  const { id } = useParams();

  const [profileData, setProfileData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const arrayFields = (t) => [
    {
      id: "username",
      name: "username",
      type: "text",
      placeholder: t("auth.username"),
      readOnly: true,
    },
    {
      id: "first_name",
      name: "first_name",
      type: "text",
      placeholder: t("auth.first_name"),
      readOnly: false,
    },
    {
      id: "last_name",
      name: "last_name",
      type: "text",
      placeholder: t("auth.last_name"),
      readOnly: false,
    },
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: t("auth.email"),
      readOnly: false,
    },
  ];

  const fields = useMemo(() => arrayFields(t), [t]);
  const [errors, setErrors] = useState({});

  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosRes.get(`${url}${id}/`);
          if (isMounted) {
            setProfileData(data);
            setHasLoaded(true);
          }
        } catch (err) {
          if (process.env.NODE_ENV === "development") {
            console.log(err);
          }
          handleRequestError(err, showToast, t);
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
    return () => {
      isMounted = false;
    };
  }, [currentUser, id, showToast, t, url]);

  const handleChange = (event) => {
    setProfileData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosReq.put(`${url}${id}/`, profileData);
      setUserProfileData(data);
      history.goBack();
      showToast(t("toast.success_edit_profile"), "success");
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
            <h1 className={headerStyles.Header}>
              {t("auth.edit_user_profile")}
            </h1>
          </Container>
        </Row>
        {hasLoaded ? (
          <Row>
            <Col className="my-auto offset-lg-2" lg={8}>
              <Container className="p-4">
                <Form onSubmit={handleSubmit} noValidate>
                  {fields.map(({ id, name, type, placeholder, readOnly }) => (
                    <Form.Group controlId={id} key={id}>
                      <Form.Label className="d-none">{placeholder}</Form.Label>
                      <Form.Control
                        className={inputStyles.Input}
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        value={profileData[name] || ""}
                        readOnly={readOnly}
                        onChange={handleChange}
                      />
                      {errors?.[name]?.length > 0 &&
                        errors[name]?.map((message, idx) => (
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
        ) : (
          <SpinnerSecondary />
        )}
      </Container>
    </section>
  );
};

export default UserProfileEditForm;
