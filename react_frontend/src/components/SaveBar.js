import React from "react";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import btnStyles from "../styles/Button.module.css";

/**
 * SaveBar Component
 *
 * Renders a cancel and optional save button. The cancel button triggers 
 * `handleCancelClick` or navigates back if undefined. The save button 
 * is shown based on `showSave`.
 *
 * Props:
 * @param {Function} [handleCancelClick] - Custom cancel handler (defaults to history back).
 * @param {boolean} [showSave=true] - Whether to display the save button.
 */
const SaveBar = ({ handleCancelClick, showSave = true }) => {
  const { t } = useTranslation();
  const history = useHistory();
  if (handleCancelClick === undefined) {
    handleCancelClick = () => history.goBack();
  }

  return (
    <div className={btnStyles.ButtonGroup}>
      <Button
        className={`${btnStyles.ButtonTransparent} ${btnStyles.RedTransparent}`}
        onClick={handleCancelClick}
      >
        <i className="fa-solid fa-circle-xmark"></i>
        {t("button.cancel")}
      </Button>
      {showSave && (
        <Button
          className={`${btnStyles.ButtonTransparent} ${btnStyles.GreenTransparent}`}
          type="submit"
        >
          <i className="fa-solid fa-floppy-disk"></i>
          {t("button.save")}
        </Button>
      )}
    </div>
  );
};

export default SaveBar;
