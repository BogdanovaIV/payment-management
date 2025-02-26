import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { ToastProvider } from "../contexts/ToastContext";
import ObjectDelete from "./ObjectDelete";
import { deleteData } from "../api/axiosURL";
import { handleRequestError } from "../utils/errorHandler";

import i18n from "../utils/i18n";

jest.mock("../api/axiosURL", () => ({
  deleteData: jest.fn(),
}));

jest.mock("../utils/errorHandler", () => ({
  handleRequestError: jest.fn(),
}));

const mockGoBack = jest.fn();
const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
    goBack: mockGoBack,
  }),
}));

describe("ObjectDelete Component", () => {
  const descriptionObject = "Test Object";
  const url = "/test-url";
  const urlBack = "/back-url";

  const mockShowToast = jest.fn();
  jest.mock("../contexts/ToastContext", () => ({
    useToast: () => mockShowToast,
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Ensures the component renders with the correct text.
   */
  test("renders component with correct text", () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <ObjectDelete
            descriptionObject={descriptionObject}
            url={url}
            urlBack={urlBack}
          />
        </ToastProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Test Object")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to delete this object?")
    ).toBeInTheDocument();
  });

  /**
   * Tests if clicking the delete button triggers the API call and redirects.
   */
  test("calls deleteData and redirects on delete button click", async () => {
    deleteData.mockResolvedValueOnce({});

    render(
      <MemoryRouter>
        <ToastProvider>
          <ObjectDelete
            descriptionObject={descriptionObject}
            url={url}
            urlBack={urlBack}
          />
        </ToastProvider>
      </MemoryRouter>
    );

    // Use button role instead of text in case of localization issues
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() => expect(deleteData).toHaveBeenCalledWith("/test-url"));
    await waitFor(() =>
      expect(mockHistoryPush).toHaveBeenCalledWith("/back-url")
    );
    await waitFor(() => {
      expect(screen.getByText("Successfully deleted!")).toBeInTheDocument();
    });
  });

  /**
   * Ensures error handling works when deletion fails.
   */
  test("handles errors correctly when delete fails", async () => {
    const error = new Error("Delete failed");
    deleteData.mockRejectedValueOnce(error);

    render(
      <MemoryRouter>
        <ToastProvider>
          <ObjectDelete
            descriptionObject={descriptionObject}
            url={url}
            urlBack={urlBack}
          />
        </ToastProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
  });

  /**
   * Checks if clicking the cancel button triggers history.goBack().
   */
  test("calls history.goBack on cancel button click", () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <ObjectDelete
            descriptionObject={descriptionObject}
            url={url}
            urlBack={urlBack}
          />
        </ToastProvider>
      </MemoryRouter>
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  /**
   * Ensures the error is logged in development mode when deletion fails.
   */
  test("logs error when deleteData fails", async () => {
    process.env.NODE_ENV = "development";
    const error = new Error("Delete failed");
    deleteData.mockRejectedValue(error);
    console.log = jest.fn();

    render(
      <MemoryRouter>
        <ToastProvider>
          <ObjectDelete
            descriptionObject={descriptionObject}
            url={url}
            urlBack={urlBack}
          />
        </ToastProvider>
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => expect(console.log).toHaveBeenCalledWith(error));
    await waitFor(() =>
      expect(handleRequestError).toHaveBeenCalledWith(
        error,
        expect.any(Function),
        expect.any(Function)
      )
    );
  });
});
