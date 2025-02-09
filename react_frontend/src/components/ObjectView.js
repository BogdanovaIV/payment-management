import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import bgImageStyles from "../styles/BgImage.module.css";
import inputStyles from "../styles/Input.module.css";
import headerStyles from "../styles/Header.module.css";
import styles from "../styles/ObjectView.module.css";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { postData } from "../api/axiosURL";

import SaveBar from "./SaveBar";

const ObjectView = ({ data, setData, fields, url, headerName, typeView }) => {
  const [errors, setErrors] = useState({});

  const history = useHistory();

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
        <Row>
          <Container>
            <h1 className={headerStyles.Header}>{headerName}</h1>
          </Container>
        </Row>
        <Row>
          <Col className="my-auto offset-lg-2" lg={8}>
            <Container className="p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  {fields.map(
                    ({
                      id,
                      name,
                      type,
                      placeholder,
                      rows,
                      options,
                      plaintext,
                      readOnly,
                    }) => (
                      <Form.Group controlId={id} key={id} as={Row}>
                        <Form.Label
                          column
                          sm={3}
                          className={`text-end fw-bold ${styles.Label}`}
                        >
                          {placeholder}
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Control
                            className={inputStyles.InputObject}
                            as={type === "select" ? "select" : undefined}
                            type={type !== "select" ? type : undefined}
                            rows={rows !== undefined ? rows : 1}
                            plaintext={
                              plaintext !== undefined ? plaintext : undefined
                            }
                            readOnly={
                              readOnly !== undefined ? readOnly : undefined
                            }
                            placeholder={placeholder}
                            name={name}
                            value={data[name]}
                            onChange={handleChange}
                          >
                            {options?.map((option, index) => (
                              <option key={`${name}${index}`} value={option[0]}>
                                {option[1]}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>

                        {errors[name]?.map((message, idx) => (
                          <Alert variant="warning" key={idx}>
                            {message}
                          </Alert>
                        ))}
                      </Form.Group>
                    )
                  )}
                </Form.Group>

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

export default ObjectView;
