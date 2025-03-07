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
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useSetUserProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import SaveBar from "../../components/SaveBar";
import { useToast } from "../../contexts/ToastContext";
import { handleRequestError } from "../../utils/errorHandler";
import { getUserProfileUrl } from "../../api/axiosURL";
import SpinnerSecondary from "../../components/Spinners";
import { useRedirect } from "../../hooks/useRedirect";
import Instruction from "../../components/Instruction";
import { getInstructionByFormName } from "../../utils/instructions";
import { validateField } from "../../utils/validation";

const UserProfileEditForm = () => {
  const { isLoading, shouldRedirect } = useRedirect("loggedOut");
  const { t } = useTranslation();
  const setUserProfileData = useSetUserProfileData();
  const currentUser = useCurrentUser();
  const showToast = useToast();
  const url = getUserProfileUrl();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);

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
  }, [currentUser, id, url]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const errorMessage = validateField("user_profile")(name, value);
    if (errorMessage !== undefined) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage ? [errorMessage] : [],
      }));
    }

    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let newErrors = {};
    Object.keys(profileData).forEach((key) => {
      const errorMessage = validateField("user_profile")(key, profileData[key]);
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
      const { data } = await axiosReq.put(`${url}${id}/`, profileData);
      setUserProfileData(data);
      history.goBack();
      showToast(t("toast.success_edit_profile"), "success");
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

  if (isLoading || shouldRedirect) {
    return null;
  }

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const instructionBody = getInstructionByFormName(
    "UserProfileEditForm",
    t,
    Trans
  );

  return (
    <section className={bgImageStyles.BgImage} style={backgroundStyle}>
      <Container className="pt-2">
        <Row>
          <Container>
            <Row className="justify-content-center">
              <h1 className={headerStyles.Header}>
                {t("auth.edit_user_profile")}
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
                        disabled={readOnly}
                        onChange={handleChange}
                      />
                      {errors?.[name]?.length > 0 &&
                        errors[name]?.map((message, idx) => (
                          <Alert variant="warning" key={idx}>
                            <Trans
                              i18nKey={message.i18nKey}
                              values={message.values}
                            />
                          </Alert>
                        ))}
                    </Form.Group>
                  ))}

                  <SaveBar />
                  {errors.non_field_errors?.map((message, idx) => (
                    <Alert key={idx} variant="warning" className="mt-3">
                      <Trans
                        i18nKey={message.i18nKey}
                        values={message.values}
                      />
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
      <Instruction
        instructionBody={instructionBody}
        showInstruction={showInstruction}
        setShowInstruction={setShowInstruction}
      />
    </section>
  );
};

export default UserProfileEditForm;
