import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import bgImageStyles from "../../styles/BgImage.module.css";
import inputStyles from "../../styles/Input.module.css";
import headerStyles from "../../styles/Header.module.css";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import backgroundImage from "../../assets/user-profile.jpg";

import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useParams } from "react-router";
import { useSetUserProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import SaveBar from "../../components/SaveBar";

import { useToast } from "../../contexts/ToastContext";
import { handleRequestError } from "../../utils/errorHandler";

const UserProfileEditForm = () => {
  const { t } = useTranslation();
  const setUserProfileData = useSetUserProfileData();
  const currentUser = useCurrentUser();
  const showToast = useToast();

  const { id } = useParams();

  const [profileData, setProfileData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const fields = [
    {
      id: "username",
      name: "username",
      nameBackend: "username",
      type: "text",
      placeholder: t("auth.username"),
      readOnly: true,
    },
    {
      id: "firstName",
      name: "firstName",
      nameBackend: "first_name",
      type: "text",
      placeholder: t("auth.first_name"),
      readOnly: false,
    },
    {
      id: "lastName",
      name: "lastName",
      nameBackend: "last_name",
      type: "text",
      placeholder: t("auth.last_name"),
      readOnly: false,
    },
    {
      id: "email",
      name: "email",
      nameBackend: "email",
      type: "email",
      placeholder: t("auth.email"),
      readOnly: false,
    },
  ];

  const [errors, setErrors] = useState({});

  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosRes.get(`/user-profiles/${id}/`);
          setProfileData({
            username: data.username,
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
          });
        } catch (err) {
          if (process.env.NODE_ENV === "development") {
            console.log(err);
          }
          handleRequestError(err, showToast);
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Map the state to the field names expected by the API
    const mappedData = {
      ...profileData,
      first_name: profileData.firstName,
      last_name: profileData.lastName,
    };
    try {
      const { data } = await axiosReq.put(`/user-profiles/${id}/`, mappedData);
      setUserProfileData(data);
      history.goBack();
      showToast(t("toast.success_edit_profile"), "success");
    } catch (err) {
      setErrors(err.response?.data);
      handleRequestError(err, showToast);
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
        <Row>
          <Col className="my-auto offset-lg-2" lg={8}>
            <Container className="p-4">
              <Form onSubmit={handleSubmit}>
                {fields.map(
                  ({ id, name, nameBackend, type, placeholder, readOnly }) => (
                    <Form.Group controlId={id} key={id}>
                      <Form.Label className="d-none">{placeholder}</Form.Label>
                      <Form.Control
                        className={inputStyles.Input}
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        value={profileData[name]}
                        readOnly={readOnly}
                        onChange={handleChange}
                      />
                      {errors[nameBackend]?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                          {message}
                        </Alert>
                      ))}
                    </Form.Group>
                  )
                )}

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

export default UserProfileEditForm;
