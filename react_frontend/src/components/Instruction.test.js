import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";
import Instruction from "./Instruction";

describe("Instruction Component", () => {
  const setShowInstructionMock = jest.fn();

  const renderComponent = (props = {}) => {
    return render(
      <I18nextProvider i18n={i18n}>
        <Instruction
          showInstruction={true}
          setShowInstruction={setShowInstructionMock}
          {...props}
        />
      </I18nextProvider>
    );
  };
  /**
   * Ensures that the modal displays the given `instructionBody` text.
   * Verifies the presence of the translated instruction title.
   */
  test("renders the instruction modal with provided content", () => {
    renderComponent({ instructionBody: "This is a test instruction" });

    expect(screen.getByText("This is a test instruction")).toBeInTheDocument();
    expect(screen.getByText(i18n.t("button.instruction"))).toBeInTheDocument();
  });

  /**
   * Simulates a user clicking the close button.
   * Ensures the `setShowInstruction` function is called with `false`, hiding the modal.
   */
  test("calls setShowInstruction when clicking the close button", () => {
    renderComponent();

    // Find all buttons with the text "Close"
    const closeButtons = screen.getAllByText(i18n.t("button.close"));

    // Select the last one (footer button)
    const closeButton = closeButtons[closeButtons.length - 1];

    fireEvent.click(closeButton);

    expect(setShowInstructionMock).toHaveBeenCalledWith(false);
  });

  /**
   * Simulates a user clicking outside the modal (on the backdrop).
   * Verifies that the modal closes by checking if `setShowInstruction` is called.
   */
  test("closes the modal when the backdrop is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("dialog"));

    expect(setShowInstructionMock).toHaveBeenCalledWith(false);
  });
});
