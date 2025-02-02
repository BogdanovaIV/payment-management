import React, { useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import bgImageStyles from "../../styles/BgImage.module.css";

import backgroundImage from "../../assets/signin.jpg";

import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      
      setCurrentUser(data.user);  
      setTokenTimestamp(data);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
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
            <h1 className={styles.Header}>sign in</h1>
            <Link className={styles.Link} to="/signup">
              Don't have an account? <span>Sign up now!</span>
            </Link>
          </Container>
        </Row>
        <Row>
          <Col className="my-auto offset-lg-3" lg={6}>
            <Container>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label className="d-none">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    className={styles.Input}
                    value={username}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.username?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    {message}
                  </Alert>
                ))}

                <Form.Group controlId="password">
                  <Form.Label className="d-none">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    className={styles.Input}
                    value={password}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.password?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    {message}
                  </Alert>
                ))}
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Blue}`}
                  type="submit"
                >
                  Sign in
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
}

export default SignInForm;
