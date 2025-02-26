import {
  getParametersByName,
  getIDFromItem,
  getNameByNameTable,
} from "./selectFormParameters";
import {
  getPartnersUrl,
  getUserProfileUrl,
  getPaymentRequestsUrl,
} from "../api/axiosURL";

jest.mock("../api/axiosURL");

describe("getParametersByName", () => {
  const mockTranslate = (key) => key;
  beforeEach(() => {
    getPartnersUrl.mockImplementation(() => "mockPartnersUrl");
    getUserProfileUrl.mockImplementation(() => "mockUserProfileUrl");
    getPaymentRequestsUrl.mockImplementation(() => "mockPaymentRequestsUrl");
  });

  /**
   * Tests whether getParametersByName returns the correct URL and column structure
   * when provided with a valid table name.
   */
  test("returns correct URL and columns for 'partner'", () => {
    const result = getParametersByName("partner", mockTranslate);
    expect(result.url).toBe("mockPartnersUrl");
    expect(result.columns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ accessor: "trade_name" }),
        expect.objectContaining({ accessor: "bin" }),
        expect.objectContaining({ accessor: "partner_type_display" }),
        expect.objectContaining({ accessor: "is_own" }),
      ])
    );
  });

  test("returns correct URL and columns for 'user_profile'", () => {
    const result = getParametersByName("user_profile", mockTranslate);
    expect(result.url).toBe("mockUserProfileUrl");
    expect(result.columns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ accessor: "full_name" }),
      ])
    );
  });

  test("returns correct URL and columns for 'payment_request'", () => {
    const result = getParametersByName("payment_request", mockTranslate);
    expect(result.url).toBe("mockPaymentRequestsUrl");
    expect(result.columns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ accessor: "payer_trade_name" }),
        expect.objectContaining({ accessor: "recipient_trade_name" }),
      ])
    );
  });

  /**
   * Tests whether getParametersByName returns default empty values
   * when an unknown table name is provided.
   */
  test("returns default empty values for unknown table", () => {
    const result = getParametersByName("unknown", mockTranslate);
    expect(result).toEqual({ url: "", columns: "" });
  });
});

describe("getIDFromItem", () => {
  /**
   * Tests whether getIDFromItem correctly extracts the ID for 'partner' table items.
   */
  test("returns correct ID for 'partner'", () => {
    expect(getIDFromItem("partner", { id: 123 })).toBe(123);
  });

  /**
   * Tests whether getIDFromItem correctly extracts the user_id for 'user_profile' table items.
   */
  test("returns correct user_id for 'user_profile'", () => {
    expect(getIDFromItem("user_profile", { user_id: 456 })).toBe(456);
  });

  /**
   * Tests whether getIDFromItem returns an empty string when an unknown table name is provided.
   */
  test("returns empty string for unknown table", () => {
    expect(getIDFromItem("unknown", { id: 789 })).toBe("");
  });
});

describe("getNameByNameTable", () => {
  /**
   * Tests whether getNameByNameTable returns the correct name field accessor for 'partner'.
   */
  test("returns 'trade_name' for 'partner'", () => {
    expect(getNameByNameTable("partner")).toBe("trade_name");
  });

  /**
   * Tests whether getNameByNameTable returns the correct name field accessor for 'user_profile'.
   */
  test("returns 'full_name' for 'user_profile'", () => {
    expect(getNameByNameTable("user_profile")).toBe("full_name");
  });

  /**
   * Tests whether getNameByNameTable returns an empty string when an unknown table name is provided.
   */
  test("returns empty string for unknown table", () => {
    expect(getNameByNameTable("unknown")).toBe("");
  });
});
