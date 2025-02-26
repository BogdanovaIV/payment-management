import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";
import LanguageSelector from "./LanguageSelector";
import { setLanguage } from "../utils/localStorage";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import axios from "axios";

jest.mock("../utils/localStorage", () => ({
  setLanguage: jest.fn(),
  getLanguage: jest.fn(() => "en"),
}));

describe("LanguageSelector Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Ensures the dropdown renders correctly with the current language flag.
   */
  test("renders language selector button with current language flag", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  /**
   * Verifies opening and closing behavior when clicking the button.
   */
  test("opens and closes dropdown when clicking the button", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByRole("list")).toBeInTheDocument();

    // Close dropdown
    fireEvent.click(button);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  /**
   * Confirms language change updates i18next, local storage, and Axios headers.
   */
  test("changes language when clicking a different language option", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /English/i }));
    const languageOption = screen.getByAltText("Қазақ");
    fireEvent.click(languageOption);
    expect(setLanguage).toHaveBeenCalledWith("kk");

    expect(setLanguage).toHaveBeenCalled();
    expect(axios.defaults.headers["Accept-Language"]).toBeDefined();
    expect(axiosReq.defaults.headers["Accept-Language"]).toBeDefined();
    expect(axiosRes.defaults.headers["Accept-Language"]).toBeDefined();
  });
});
