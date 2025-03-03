import { validateField } from "./validation";
import { Trans } from "react-i18next";

const mockTranslate = (key) => key;

describe("validateField function", () => {
  /**
   * Tests validation logic for the "user_profile" form.
   */
  describe("user_profile validation", () => {
    const validate = validateField("user_profile", mockTranslate, Trans);
    /**
     * Ensures first_name and last_name fields:
     * - Are required.
     * - Do not exceed 20 characters.
     */
    test("validates first_name and last_name correctly", () => {
      expect(validate("first_name", "")).toEqual({
        i18nKey: "validation.required",
      });
      expect(validate("last_name", "a".repeat(21))).toMatchObject({
        i18nKey: "validation.more_than",
        values: {
          length: "20",
        },
      });
      expect(validate("first_name", "John")).toBe("");
    });
    /**
     * Ensures email field:
     * - Matches valid email format.
     */
    test("validates email correctly", () => {
      expect(validate("email", "invalid-email")).toEqual({
        i18nKey: "validation.invalid_email",
      });
      expect(validate("email", "valid@example.com")).toBe("");
    });
  });
  /**
   * Tests validation logic for the "partner" form.
   */
  describe("partner validation", () => {
    const validate = validateField("partner", mockTranslate, Trans);
    /**
     * Ensures trade_name:
     * - Is required.
     * - Does not exceed 255 characters.
     */
    test("validates trade_name correctly", () => {
      expect(validate("trade_name", "")).toEqual({
        i18nKey: "validation.required",
      });
      expect(validate("trade_name", "a".repeat(256))).toMatchObject({
        i18nKey: "validation.more_than",
        values: {
          length: "255",
        },
      });
      expect(validate("trade_name", "John")).toBe("");
    });
    /**
     * Ensures bin:
     * - Is required.
     * - Does not exceed 20 characters.
     */
    test("validates bin correctly", () => {
      expect(validate("bin", "")).toEqual({
        i18nKey: "validation.required",
      });
      expect(validate("bin", "a".repeat(21))).toMatchObject({
        i18nKey: "validation.more_than",
        values: {
          length: "20",
        },
      });
      expect(validate("bin", "12345")).toBe("");
    });
    /**
     * Ensures full_name:
     * - Does not exceed 255 characters.
     */
    test("validates full_name correctly", () => {
      expect(validate("full_name", "John".repeat(100))).toMatchObject({
        i18nKey: "validation.more_than",
        values: {
          length: "255",
        },
      });
      expect(validate("full_name", "John")).toBe("");
    });
    /**
     * Ensures contact_person:
     * - Is required.
     * - Does not exceed 255 characters.
     */
    test("validates contact_person correctly", () => {
      expect(validate("contact_person", "")).toEqual({
        i18nKey: "validation.required",
      });
      expect(validate("contact_person", "John".repeat(100))).toMatchObject({
        i18nKey: "validation.more_than",
        values: {
          length: "255",
        },
      });
      expect(validate("contact_person", "John")).toBe("");
    });
    /**
     * Ensures phone_number:
     * - Does not exceed 255 characters.
     * - Matches a valid phone number format.
     */
    test("validates phone_number correctly", () => {
      expect(validate("phone_number", "123".repeat(100))).toMatchObject({
        i18nKey: "validation.more_than",
        values: {
          length: "255",
        },
      });
      expect(validate("phone_number", "invalid-phone")).toEqual({
        i18nKey: "validation.phone_number",
      });
      expect(validate("phone_number", "+123456789")).toBe("");
    });
    /**
     * Ensures unspecified fields are valid.
     */
    test("validates another_field correctly", () => {
      expect(validate("another_field", "another_field")).toBe("");
    });
  });
  /**
   * Tests validation logic for the "payment_request" form.
   */
  describe("payment_request validation", () => {
    const validate = validateField("payment_request", mockTranslate, Trans);
    /**
     * Ensures payment_priority:
     * - Is between 1 and 10.
     */
    test("validates payment_priority correctly", () => {
      expect(validate("payment_priority", 0)).toMatchObject({
        i18nKey: "validation.more_than",
      });
      expect(validate("payment_priority", 5)).toBe("");
    });
    /**
     * Ensures invoice_number and invoice_date:
     * - Are required.
     */
    test("validates invoice_number and invoice_date correctly", () => {
      expect(validate("invoice_number", "")).toEqual({
        i18nKey: "validation.required",
      });
      expect(validate("invoice_date", "")).toEqual({
        i18nKey: "validation.required",
      });
      expect(validate("invoice_number", "11111")).toBe("");
      expect(validate("invoice_date", "01.01.1980")).toBe("");
    });
    /**
     * Ensures payer and recipient:
     * - Must contain an ID.
     */
    test("validates payer and recipient correctly", () => {
      expect(validate("payer", {})).toEqual({
        i18nKey: "validation.required",
      });
      expect(validate("recipient", { id: 1 })).toBe("");
    });
    /**
     * Ensures invoice_amount and payment_amount:
     * - Must be greater than or equal to 0.
     */
    test("validates invoice_amount and payment_amount correctly", () => {
      expect(validate("invoice_amount", -1)).toMatchObject({
        i18nKey: "validation.more_than",
        values: {
          length: "0",
        },
      });
      expect(validate("invoice_amount", 100)).toBe("");
    });
    /**
     * Ensures unspecified fields are valid.
     */
    test("validates another_field correctly", () => {
      expect(validate("another_field", "another_field")).toBe("");
    });
  });
  /**
   * Tests validation when an unknown form name is passed.
   */
  describe("not exist validation", () => {
    const validate = validateField("another", mockTranslate, Trans);
    /**
     * Ensures unknown fields return undefined.
     */
    test("validates another_field correctly", () => {
      expect(validate("another_field", "another_field")).toBe(undefined);
    });
  });
});
