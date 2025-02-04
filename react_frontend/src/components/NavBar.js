import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import SpinnerSecondary from "./Spinners";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import { useUserProfileData } from "../contexts/ProfileDataContext";

const NavBar = () => {
  const { t } = useTranslation();
  const currentUser = useCurrentUser();
  const UserProfileData = useUserProfileData();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signout"
      >
        <i className="fas fa-arrow-right-from-bracket"></i>
        {t("auth.sign_out")}
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/user-profiles/${currentUser?.profile_id}`}
      >
        <i className="fa-solid fa-user-gear"></i>
        {UserProfileData?.full_name}
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-arrow-right-to-bracket"></i>
        {t("auth.sign_in")}
      </NavLink>

      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fas fa-user-plus"></i>
        {t("auth.sign_up")}
      </NavLink>
    </>
  );

  if (currentUser === undefined) {
    return <SpinnerSecondary />;
  }

  return (
    <Navbar
      expanded={expanded}
      className={`pb-1 pt-1 ${styles.NavBar}`}
      expand="md"
      fixed="top"
    >
      <Container className={styles.FlexStartToggle}>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <div className={`${styles.ToggleContainer} ${styles.FlexStartToggle}`}>
          <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-left">
              <NavLink
                exact
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/"
              >
                <i className="fas fa-home-user"></i>
                {t("home.home")}
              </NavLink>
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
          <LanguageSelector />
        </div>
      </Container>
    </Navbar>
  );
};
export default NavBar;
