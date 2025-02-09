import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import bgImageStyles from "../styles/BgImage.module.css";
import inputStyles from "../styles/Input.module.css";
import btnStyles from "../styles/Button.module.css";
import headerStyles from "../styles/Header.module.css";
import styles from "../styles/ObjectView.module.css";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import { postData, getData } from "../api/axiosURL";

import SaveBar from "./SaveBar";

const ObjectView = ({ data, setData, fields, url, objectName, typeView }) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});

  const { id } = useParams();

  const history = useHistory();

  const handleEditClick = () => {
    history.push(`${url}add`);
  };

  useEffect(() => {
    const handleMount = async () => {
      if (typeView !== "add") {
        try {
          const response = await getData(`${url}${id}/`);
          console.log(response.data);
          setData(response.data);
        } catch (err) {
          if (process.env.NODE_ENV === "development") {
            console.log(err);
          }
        }
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (typeView === "add") {
        const response = await postData(url, data);
        history.push(`${url}${response.data.id}`);
      }
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <section className={`${bgImageStyles.BgImage} ${styles.BgBlueGradient}`}>
      <Container className="pt-2">
        <Row className=" offset-lg-1 align-items-center justify-content-between text-center text-lg-start flex-column flex-lg-row">
          <Col xs={12} lg className="text-center">
            <h1 className={`${headerStyles.Header} m-0`}>{objectName}</h1>
          </Col>
          <Col
            xs={12}
            lg={2}
            className="text-lg-end mt-2 mt-lg-0"
          >
            <Button
              className={`${btnStyles.ButtonTransparent} ${btnStyles.GreenTransparent}`}
              onClick={() => handleEditClick()}
            >
              <i className="fa-solid fa-circle-plus"></i> {t("button.edit")}
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Container>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  {fields.map((item, itemIndex) => (
                    <Row key={itemIndex} className="align-items-end">
                      {item.map(
                        ({
                          id,
                          name,
                          type,
                          placeholder,
                          rows,
                          options,
                          readOnly,
                          as,
                        }) => (
                          <Col key={id} md={item.length === 1 ? 12 : 6}>
                            <Form.Group controlId={id}>
                              {type === "checkbox" ? (
                                <>
                                  <Form.Check
                                    label={placeholder}
                                    className={inputStyles.CheckBoxObject}
                                    readOnly={typeView === "view" || readOnly}
                                    name={name}
                                    value={data[name]}
                                    onChange={handleChange}
                                  >
                                    {options?.map((option, index) => (
                                      <option
                                        key={`${name}${index}`}
                                        value={option[0]}
                                      >
                                        {option[1]}
                                      </option>
                                    ))}
                                  </Form.Check>
                                </>
                              ) : (
                                <>
                                  <Form.Label className={styles.Label}>
                                    {placeholder}
                                  </Form.Label>
                                  <Form.Control
                                    className={inputStyles.InputObject}
                                    as={as}
                                    type={type !== "select" ? type : undefined}
                                    rows={rows || 1}
                                    readOnly={typeView === "view" || readOnly}
                                    placeholder={placeholder}
                                    name={name}
                                    value={data[name]}
                                    onChange={handleChange}
                                  >
                                    {options?.map((option, index) => (
                                      <option
                                        key={`${name}${index}`}
                                        value={option[0]}
                                      >
                                        {option[1]}
                                      </option>
                                    ))}
                                  </Form.Control>
                                </>
                              )}

                              {errors[name]?.map((message, idx) => (
                                <Alert
                                  variant="warning"
                                  key={idx}
                                  className="mt-2"
                                >
                                  {message}
                                </Alert>
                              ))}
                            </Form.Group>
                          </Col>
                        )
                      )}
                    </Row>
                  ))}
                </Form.Group>
                {typeView === "view" ? (
                  <></>
                ) : (
                  <>
                    <SaveBar />
                    {errors.non_field_errors?.map((message, idx) => (
                      <Alert key={idx} variant="warning" className="mt-3">
                        {message}
                      </Alert>
                    ))}
                  </>
                )}
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ObjectView;
