import React from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import instructionStyles from "../styles/Instruction.module.css";
import btnStyles from "../styles/Button.module.css";

/**
 * Instruction Component
 *
 * This component renders a modal dialog to display instructional content.
 * It supports internationalization using `react-i18next` and is styled with Bootstrap.
 *
 * Props:
 * - `instructionBody` (string, optional): The instructional text or content to be displayed inside the modal. Defaults to an empty string.
 * - `showInstruction` (boolean): Determines whether the modal is visible.
 * - `setShowInstruction` (function): A function to update the visibility state of the modal.
 *
 * Features:
 * - Uses `react-bootstrap` Modal for structured and responsive UI.
 * - Supports internationalized button text via `useTranslation()`.
 * - Styled using external CSS modules.
 *
 * Behavior:
 * - Clicking the close button or the "Close" action hides the modal.
 * - The modal content dynamically updates based on `instructionBody`.
 */
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
