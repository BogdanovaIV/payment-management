import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../utils/utils";

import flagEn from "../assets/flag-en.png";
import flagKz from "../assets/flag-kz.png";
import flagRu from "../assets/flag-ru.png";

import styles from "../styles/LanguageSelector.module.css";

const languageOptions = {
  en: { label: "English", value: "en", flag: flagEn },
  kz: { label: "Қазақ", value: "kz", flag: flagKz },
  ru: { label: "Русский", value: "ru", flag: flagRu },
};

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentLang = i18n.language || "en";

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng.key);
    setDropdownOpen(false);
  };

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
          style={{ width: "24px", height: "16px" }}
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
                      style={{ width: "24px", height: "16px" }}
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
