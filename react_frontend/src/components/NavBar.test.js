import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { UserProfileDataContext } from "../contexts/ProfileDataContext";
import NavBar from "./NavBar";

jest.mock("../hooks/useClickOutsideToggle", () => () => ({
  expanded: false,
  setExpanded: jest.fn(),
  ref: { current: null },
}));

const renderNavBar = (currentUser = null, userProfileData = null) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <CurrentUserContext.Provider value={currentUser}>
          <UserProfileDataContext.Provider value={userProfileData}>
            <NavBar />
          </UserProfileDataContext.Provider>
        </CurrentUserContext.Provider>
      </MemoryRouter>
    </I18nextProvider>
  );
};

describe("NavBar Component", () => {
  /**
   * Tests if the logo and home link are rendered.
   */
  test("renders logo and home link", () => {
    renderNavBar(null, null);
    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });

  /**
   * Tests if the sign-in and sign-up links are shown when logged out.
   */
  test("shows sign-in and sign-up links when logged out", () => {
    renderNavBar(null, null);
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  /**
   * Tests if the user profile and sign-out links are shown when logged in.
   */
  test("shows user profile and logout links when logged in", () => {
    const mockUser = { profile_id: 1 };
    const mockProfileData = { full_name: "John Doe" };
    renderNavBar(mockUser, mockProfileData);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  /**
   * Tests if the navbar menu opens and closes on toggle button click.
   */
  test("opens and closes navbar menu on toggle click", () => {
    renderNavBar(null, null);
    const toggleButton = screen.getByRole("button", {
      name: /toggle navigation/i,
    });
    fireEvent.click(toggleButton);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
