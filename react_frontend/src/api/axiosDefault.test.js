import axios from "axios";

jest.mock("../utils/localStorage", () => ({
  getLanguage: jest.fn(() => "kk"),
}));

describe("Axios Defaults Configuration", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.NODE_ENV = "production";
  });

  test("sets baseURL in non-development environment", () => {
    const { axiosReq, axiosRes } = require("./axiosDefaults");
    expect(axiosReq.defaults.baseURL).toBe("/api");
    expect(axiosRes.defaults.baseURL).toBe("/api");
  });

  test("does not set baseURL in development environment", () => {
    process.env.NODE_ENV = "development";
    const { axiosReq, axiosRes } = require("./axiosDefaults");
    expect(axiosReq.defaults.baseURL).toBeUndefined();
    expect(axiosRes.defaults.baseURL).toBeUndefined();
  });

  test("sets Content-Type to multipart/form-data", () => {
    const { axiosReq, axiosRes } = require("./axiosDefaults");
    expect(axiosReq.defaults.headers.post["Content-Type"]).toBe(
      "multipart/form-data"
    );
    expect(axiosRes.defaults.headers.post["Content-Type"]).toBe(
        "multipart/form-data"
      );
  });

  test("enables withCredentials", () => {
    const { axiosReq, axiosRes } = require("./axiosDefaults");
    expect(axiosReq.defaults.withCredentials).toBe(true);
    expect(axiosRes.defaults.withCredentials).toBe(true);
  });

  test("sets Accept-Language from localStorage", () => {
    const { axiosReq, axiosRes } = require("./axiosDefaults");
    expect(axiosReq.defaults.headers["Accept-Language"]).toBe("kk");
    expect(axiosRes.defaults.headers["Accept-Language"]).toBe("kk");
  });

  test("defaults Accept-Language to 'en' if localStorage is empty", () => {
    jest.mock("../utils/localStorage", () => ({
      getLanguage: jest.fn(() => null),
    }));
    const { axiosReq, axiosRes } = require("./axiosDefaults");
    expect(axiosReq.defaults.headers["Accept-Language"]).toBe("en");
    expect(axiosRes.defaults.headers["Accept-Language"]).toBe("en");
  });

  test("creates axiosReq and axiosRes instances", () => {
    const { axiosReq, axiosRes } = require("./axiosDefaults");
    expect(axiosReq).toBeDefined();
    expect(axiosRes).toBeDefined();
    expect(axiosReq).not.toBe(axios);
    expect(axiosRes).not.toBe(axios);
  });
});
