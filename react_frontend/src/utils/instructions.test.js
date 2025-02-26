import { render, screen } from "@testing-library/react";
import { Trans } from "react-i18next";
import { getInstructionByFormName } from "./instructions";
import i18n from "./i18n";

describe("Instruction utilities", () => {
  /**
   * Tests if the function returns no instructions when an empty form name is provided.
   */
  test("renders default instructions when formName is empty", () => {
    const t = (key) => key;
    render(getInstructionByFormName("", t, Trans));
    expect(
      screen.queryByText(/instructions.object_list.introduction/i)
    ).toBeNull();
  });

  /**
   * Tests if the function renders instructions for the "PartnerList" form.
   */
  test("renders PartnerList instructions", () => {
    const t = (key) => key;
    render(getInstructionByFormName("PartnerList", t, Trans));
    expect(screen.getByText(/partner.*View/i)).toBeInTheDocument();
  });

  /**
   * Tests if the function renders instructions for the "UserProfilePage" form.
   */
  test("renders UserProfilePage instructions", () => {
    const t = (key) => key;
    render(getInstructionByFormName("UserProfilePage", t, Trans));
    expect(screen.getByText(/user profile page*/i)).toBeInTheDocument();
  });

  /**
   * Tests if the function renders instructions for the "UserProfileEditForm" form.
   */
  test("renders UserProfileEditForm instructions", () => {
    const t = (key) => key;
    render(getInstructionByFormName("UserProfileEditForm", t, Trans));
    expect(screen.getByText(/user profile edit page*/i)).toBeInTheDocument();
  });

  /**
   * Tests if the function renders instructions for the "UserPassword" form.
   */
  test("renders UserPassword instructions", () => {
    const t = (key) => key;
    render(getInstructionByFormName("UserPassword", t, Trans));
    expect(
      screen.getByText(/users to change their password*/i)
    ).toBeInTheDocument();
  });

  /**
   * Tests if the function renders instructions for the "SignUpForm" form.
   */
  test("renders SignUpForm instructions", () => {
    const t = (key) => key;
    render(getInstructionByFormName("SignUpForm", t, Trans));
    expect(screen.getByText(/sign-up form*/i)).toBeInTheDocument();
  });

  /**
   * Tests if the function renders instructions for the "PaymentRequestsList" form.
   */
  test("renders PaymentRequestsList instructions", () => {
    const t = (key) => key;
    render(getInstructionByFormName("PaymentRequestsList", t, Trans));
    expect(screen.getAllByText(/payment_request.*List/i)).not.toHaveLength(0);
  });

  /**
   * Tests if the function renders instructions for the "ViewPartnerPage" form.
   */
  test("renders ViewPartnerPage instructions", () => {
    const t = (key) => key;
    render(getInstructionByFormName("ViewPartnerPage", t, Trans));
    expect(screen.getByText(/partner.*View/i)).toBeInTheDocument();
  });

  /**
   * Tests if the function renders instructions for the "ViewPaymentRequestPage" form, including additional notes.
   */
  test("renders ViewPaymentRequestPage instructions with additional notes", () => {
    const t = (key) => key;
    render(getInstructionByFormName("ViewPaymentRequestPage", t, Trans));
    expect(screen.getByText(/payment_request.*View/i)).toBeInTheDocument();
  });

  /**
   * Tests if the function renders instructions for the "AddPartnerPage" form.
   */
  test("renders AddPartnerPage instructions", () => {
    const t = (key) => key;
    render(getInstructionByFormName("AddPartnerPage", t, Trans));
    expect(screen.getByText(/partner form*/i)).toBeInTheDocument();
  });

  /**
   * Tests if the function renders instructions for the "EditPartnerPage" form.
   */
  test("renders EditPartnerPage instructions", () => {
    const t = (key) => key;
    render(getInstructionByFormName("EditPartnerPage", t, Trans));
    expect(screen.getByText(/partner form*/i)).toBeInTheDocument();
  });

  /**
   * Tests if the function renders instructions for the "AddPaymentRequestPage" form.
   */
  test("renders AddPaymentRequestPage instructions", () => {
    const t = (key) => key;
    render(getInstructionByFormName("AddPaymentRequestPage", t, Trans));
    expect(screen.getByText(/payment request form*/i)).toBeInTheDocument();
  });

  /**
   * Tests if the function renders instructions for the "EditPaymentRequestPage" form.
   */
  test("renders EditPaymentRequestPage instructions", () => {
    const t = (key) => key;
    render(getInstructionByFormName("EditPaymentRequestPage", t, Trans));
    expect(screen.getByText(/payment request form*/i)).toBeInTheDocument();
  });

  /**
   * Tests if the function returns an empty fragment when an unknown form name is provided.
   */
  test("returns empty fragment for unknown formName", () => {
    const t = (key) => key;
    const { container } = render(
      getInstructionByFormName("UnknownForm", t, Trans)
    );
    expect(container.firstChild).toBeNull();
  });
});
