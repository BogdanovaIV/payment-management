import React from "react";
import styles from "../styles/NotFound.module.css";

/**
 * NotFound component displays a 404 error page with a message indicating
 * that the requested page could not be found. This is typically shown when
 * a user tries to access a route that does not exist.
 *
 * @returns {JSX.Element} The rendered NotFound component.
 */
const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>Oops! Page not found.</h2>
      <p>
        Sorry, but the page you are looking for is not found. Please, make sure
        you have typed the current url.
      </p>
    </div>
  );
};

export default NotFound;
