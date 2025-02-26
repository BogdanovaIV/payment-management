import { waitFor } from "@testing-library/react";
import {
  setTokenTimestamp,
  shouldRefreshToken,
  existRefreshToken,
  removeTokenTimestamp,
  setTokenAccessExpiration,
  getLanguage,
  setLanguage,
} from "./localStorage";
import jwtDecode from "jwt-decode";

jest.mock("jwt-decode", () => jest.fn());

describe("Token utilities", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  /**
   * Tests if setTokenTimestamp correctly stores the refresh token expiration in localStorage.
   */
  test("setTokenTimestamp stores refresh token expiration in localStorage", () => {
    const mockData = { refresh: "mockRefreshToken" };
    jwtDecode.mockReturnValue({ exp: 123456 });

    setTokenTimestamp(mockData);
    expect(localStorage.getItem("refreshTokenTimestamp")).toBe("123456");
  });

  /**
   * Tests if shouldRefreshToken returns true when the current time exceeds the expiration time.
   */
  test("shouldRefreshToken returns true if current time exceeds expiration", () => {
    const pastTime = new Date(Date.now() - 1000).toISOString();
    localStorage.setItem("tokenAccessExpiration", pastTime);
    localStorage.setItem("refreshTokenTimestamp", "123456");
    waitFor(() => {
      expect(shouldRefreshToken()).toBe(true);
      done();
    });
  });

  /**
   * Tests if shouldRefreshToken returns false when the expiration time is in the future.
   */
  test("shouldRefreshToken returns false if expiration time is in the future", () => {
    const futureTime = new Date(Date.now() + 100000).toISOString();
    localStorage.setItem("tokenAccessExpiration", futureTime);
    expect(shouldRefreshToken()).toBe(false);
  });

  /**
   * Tests if existRefreshToken returns true when a refresh token timestamp is stored in localStorage.
   */
  test("existRefreshToken returns true when refresh token timestamp exists", () => {
    localStorage.setItem("refreshTokenTimestamp", "123456");
    expect(existRefreshToken()).toBe(true);
  });

  /**
   * Tests if existRefreshToken returns false when there is no refresh token timestamp in localStorage.
   */
  test("existRefreshToken returns false when refresh token timestamp is missing", () => {
    expect(existRefreshToken()).toBe(false);
  });

  /**
   * Tests if removeTokenTimestamp correctly clears token-related timestamps from localStorage.
   */
  test("removeTokenTimestamp clears token timestamps from localStorage", () => {
    localStorage.setItem("refreshTokenTimestamp", "123456");
    localStorage.setItem("tokenAccessExpiration", "789101");

    removeTokenTimestamp();
    expect(localStorage.getItem("refreshTokenTimestamp")).toBeNull();
    expect(localStorage.getItem("tokenAccessExpiration")).toBeNull();
  });

  /**
   * Tests if setTokenAccessExpiration correctly stores the access token expiration in localStorage.
   */
  test("setTokenAccessExpiration stores access expiration in localStorage", () => {
    const mockData = { access_expiration: "987654" };
    setTokenAccessExpiration(mockData);
    expect(localStorage.getItem("tokenAccessExpiration")).toBe("987654");
  });

  /**
   * Tests if getLanguage correctly retrieves the stored language preference from localStorage.
   */
  test("getLanguage retrieves language from localStorage", () => {
    localStorage.setItem("lang", "en");
    expect(getLanguage()).toBe("en");
  });

  /**
   * Tests if setLanguage correctly stores the language preference in localStorage.
   */
  test("setLanguage stores language in localStorage", () => {
    setLanguage("fr");
    expect(localStorage.getItem("lang")).toBe("fr");
  });
});
