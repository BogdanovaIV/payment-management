import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../utils/localStorage";
import flagEn from "../assets/flag-en.png";
import flagKk from "../assets/flag-kk.png";
import flagRu from "../assets/flag-ru.png";
import styles from "../styles/LanguageSelector.module.css";

const languageOptions = {
  en: { label: "English", value: "en", flag: flagEn },
  kk: { label: "Қазақ", value: "kk", flag: flagKk },
  ru: { label: "Русский", value: "ru", flag: flagRu },
};


/**
 * LanguageSelector Component
 *
 * A dropdown for switching between English, Kazakh, and Russian.  
 * Updates the app's language using `i18next`, saves the selection in local storage,  
 * and updates Axios headers for API requests.
 *
 * @returns {JSX.Element} Language selection dropdown.
 */
const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentLang = i18n.language || "en";

  const changeLanguage = (lng) => {
    axios.defaults.headers['Accept-Language'] = lng;
    axiosReq.defaults.headers['Accept-Language'] = lng;
    axiosRes.defaults.headers['Accept-Language'] = lng;
    i18n.changeLanguage(lng);
    setLanguage(lng);
    setDropdownOpen(false);
  };

  useEffect(() => {
    document.documentElement.lang = i18n.language || "en";
  }, [i18n.language]);

  return (
    <div className="dropdown align-content-center">
      <button
        className="btn dropdown-toggle p-1"
        type="button"
        id="dropdownMenuButton"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img
          src={languageOptions[currentLang].flag}
          alt={languageOptions[currentLang].label}
          className={styles.ImgFlag}
        />
      </button>
      {dropdownOpen && (
        <ul
          className={`dropdown-menu ${styles.DropdownMenu} show text-center`}
          aria-labelledby="dropdownMenuButton"
        >
          {Object.keys(languageOptions).map(
            (lng) =>
              lng !== currentLang && (
                <li
                  key={lng}
                  onClick={() => changeLanguage(languageOptions[lng].value)}
                >
                  <button
                    className={`dropdown-item align-content-center ${styles.DropdownItem}`}
                  >
                    <img
                      src={languageOptions[lng].flag}
                      alt={languageOptions[lng].label}
                      className={styles.ImgFlagInside}
                    />
                  </button>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
