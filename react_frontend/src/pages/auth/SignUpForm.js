import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import bgImageStyles from "../../styles/BgImage.module.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import backgroundImage from "../../assets/signup.jpg";

import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const { username, password1, password2, firstName, lastName, email } =
    signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Map the state to the field names expected by the API
    const mappedData = {
      ...signUpData,
      first_name: signUpData.firstName,
      last_name: signUpData.lastName,
    };
    try {
      await axios.post("/dj-rest-auth/registration/", mappedData);
      history.push("/signin");
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
          <Container >
            <h1 className={styles.Header}>sign up</h1>
            <Link className={styles.Link} to="/signin">
              Do you already have an account? Then please <span>Sign in</span>{" "}
              instead.
            </Link>
          </Container>
        </Row>
        <Row>
          <Col className="my-auto offset-lg-3" lg={6}>
            <Container className="p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label className="d-none">username</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.username?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group controlId="firstName">
                  <Form.Label className="d-none">First name</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.first_name?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group controlId="lastName">
                  <Form.Label className="d-none">Last name</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.last_name?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group controlId="email">
                  <Form.Label className="d-none">Email</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.email?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group controlId="password1">
                  <Form.Label className="d-none">Password</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="password"
                    placeholder="Password"
                    name="password1"
                    value={password1}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.password1?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    {message}
                  </Alert>
                ))}

                <Form.Group controlId="password2">
                  <Form.Label className="d-none">Confirm password</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    value={password2}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.password2?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    {message}
                  </Alert>
                ))}

                <Button
                  className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Blue}`}
                  type="submit"
                >
                  Sign up
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
