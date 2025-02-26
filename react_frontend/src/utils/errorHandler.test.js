import { handleRequestError } from "./errorHandler";

describe("handleRequestError", () => {
  let showToast, t;

  beforeEach(() => {
    showToast = jest.fn();
    t = jest.fn((key) => key);
  });

  /**
   * Initializes mock functions before each test.
   */
  test("should log error in development mode", () => {
    process.env.NODE_ENV = "development";
    console.log = jest.fn();

    const err = new Error("Test error");
    handleRequestError(err, showToast, t);

    expect(console.log).toHaveBeenCalledWith(err);
  });

  /**
   * Tests whether errors are logged in development mode.
   */
  test("should handle server unavailable error", () => {
    const err = {};
    handleRequestError(err, showToast, t, "Extra message");
    expect(showToast).toHaveBeenCalledWith(
      "toast.error_server_unavailable Extra message",
      "danger"
    );
  });

  /**
   * Tests handling of an unavailable server error.
   */
  test("should handle 500 error", () => {
    const err = { response: { status: 500 } };
    handleRequestError(err, showToast, t, "Extra message");
    expect(showToast).toHaveBeenCalledWith(
      "toast.error_server_occurred Extra message",
      "danger"
    );
  });

  /**
   * Tests handling of a 500 internal server error.
   */
  test("should handle 400 or 409 error with custom message", () => {
    const err = { response: { status: 400, data: { error: "Custom error" } } };
    handleRequestError(err, showToast, t, "Extra message");
    expect(showToast).toHaveBeenCalledWith(
      "Custom error Extra message",
      "danger"
    );
  });

  /**
   * Tests handling of a 400 or 409 error with a custom error message.
   */
  test("should handle 400 or 409 error with default message", () => {
    const err = { response: { status: 400, data: {} } };
    handleRequestError(err, showToast, t, "Extra message");
    expect(showToast).toHaveBeenCalledWith(
      "toast.error_occurred Extra message",
      "danger"
    );
  });

  /**
   * Tests handling of a 400 or 409 error with a default message when no error message is provided.
   */
  test("should handle 423 error with custom detail message", () => {
    const err = {
      response: { status: 423, data: { detail: "Access denied" } },
    };
    handleRequestError(err, showToast, t, "Extra message");
    expect(showToast).toHaveBeenCalledWith(
      "Access denied Extra message",
      "danger"
    );
  });

  /**
   * Tests handling of a 423 locked error with a custom detail message.
   */
  test("should handle 423 error with default message", () => {
    const err = { response: { status: 423, data: {} } };
    handleRequestError(err, showToast, t, "Extra message");
    expect(showToast).toHaveBeenCalledWith(
      "toast.permission_denied Extra message",
      "danger"
    );
  });

  /**
   * Tests whether error statuses are logged in development mode.
   */
  test("should log error status in development mode", () => {
    process.env.NODE_ENV = "development";
    console.log = jest.fn();

    const err = { response: { status: 404 } };
    handleRequestError(err, showToast, t);

    expect(console.log).toHaveBeenCalledWith(404);
  });

  /**
   * Tests whether error statuses are not logged in production mode.
   */
  test("should not log error status in production mode", () => {
    process.env.NODE_ENV = "production";
    console.log = jest.fn();

    const err = { response: { status: 404 } };
    handleRequestError(err, showToast, t);

    expect(console.log).not.toHaveBeenCalled();
  });
});
