import React from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import instructionStyles from "../styles/Instruction.module.css";
import btnStyles from "../styles/Button.module.css";

const Instruction = ({
  instructionBody = "",
  showInstruction,
  setShowInstruction,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      dialogClassName={instructionStyles.ContainerModal}
      show={showInstruction}
      onHide={() => setShowInstruction(false)}
    >
      <Modal.Header className={instructionStyles.HeaderModal} closeButton>
        <Modal.Title className={instructionStyles.TitleModal}>
          {t("button.instruction")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={instructionStyles.BodyModal}>
        {instructionBody}
      </Modal.Body>
      <Modal.Footer className={instructionStyles.FooterModal}>
        <Button
          className={`${btnStyles.ButtonTransparent} ${btnStyles.BlueTransparent}`}
          onClick={() => setShowInstruction(false)}
        >
          <i className="fa-solid fa-circle-xmark"></i>
          {t("button.close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Instruction;
