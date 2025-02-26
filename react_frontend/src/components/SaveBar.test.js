import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";
import SaveBar from "./SaveBar";

describe("SaveBar Component", () => {
  /**
   * Tests if the SaveBar component renders the cancel and save buttons.
   */
  test("renders cancel and save buttons", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <SaveBar />
        </MemoryRouter>
      </I18nextProvider>
    );

    expect(screen.getByText(i18n.t("button.cancel"))).toBeInTheDocument();
    expect(screen.getByText(i18n.t("button.save"))).toBeInTheDocument();
  });

  /**
   * Tests if clicking the cancel button triggers the provided handleCancelClick function.
   */
  test("calls handleCancelClick when cancel button is clicked", () => {
    const handleCancelClick = jest.fn();
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <SaveBar handleCancelClick={handleCancelClick} />
        </MemoryRouter>
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText(i18n.t("button.cancel")));
    expect(handleCancelClick).toHaveBeenCalled();
  });

  /**
   * Tests if the save button is not rendered when showSave is set to false.
   */
  test("does not render save button when showSave is false", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <SaveBar showSave={false} />
        </MemoryRouter>
      </I18nextProvider>
    );

    expect(screen.queryByText(i18n.t("button.save"))).not.toBeInTheDocument();
  });
});
