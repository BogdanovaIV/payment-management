import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { deleteData } from "../api/axiosURL";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import bgImageStyles from "../styles/BgImage.module.css";
import btnStyles from "../styles/Button.module.css";
import styles from "../styles/ObjectDelete.module.css";
import backgroundImage from "../assets/main-background.jpg";

import { useToast } from "../contexts/ToastContext";
import { handleRequestError } from "../utils/errorHandler";

const ObjectDelete = ({ descriptionObject, url, urlBack }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const showToast = useToast();
  const handleDelete = async () => {
    try {
      await deleteData(url);
      history.push(urlBack);
      showToast(t("toast.success_delete"), "success");
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.log(err);
      }
      handleRequestError(err, showToast, t);
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section className={`${bgImageStyles.BgImage}`} style={backgroundStyle}>
      <Container>
        <Row className="align-items-center flex-column">
          <h1 className={`text-center p-5 ${styles.Header1}`}>
            Are you sure you want to delete this object?
          </h1>
        </Row>
        <Row className="align-items-center flex-column">
          <h2 className={`text-center p-5 ${styles.Header2}`}>
            {descriptionObject}
          </h2>
        </Row>
        <Row className="text-center align-items-center flex-row justify-content-center">
          <Col>
            <Button
              className={`${btnStyles.ButtonTransparent} ${btnStyles.GreenTransparent}`}
              onClick={() => history.goBack()}
            >
              <i className="fa-solid fa-circle-xmark"></i>
              {t("button.cancel")}
            </Button>

            <Button
              className={` ${btnStyles.ButtonTransparent} ${btnStyles.OrangeTransparent}`}
              onClick={() => handleDelete()}
            >
              <i className="fa-solid fa-trash-can"></i>
              {t("button.delete")}
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ObjectDelete;
