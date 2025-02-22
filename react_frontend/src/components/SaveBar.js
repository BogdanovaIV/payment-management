import React from "react";
import Button from "react-bootstrap/Button";
import btnStyles from "../styles/Button.module.css";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

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
