import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import styles from "../styles/Spinners.module.css";

/**
 * SpinnerSecondary Component
 * 
 * Renders a Bootstrap secondary spinner inside a container to indicate loading.
 * 
 * @returns {JSX.Element} A styled loading spinner.
 */
const SpinnerSecondary = () => {
  return (
    <Container>
      <div className={`pt-1 ${styles.Spinner}`}>
        <Spinner animation="border" variant="secondary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </Container>
  );
};

export default SpinnerSecondary;
