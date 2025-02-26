import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";

describe("NotFound Component", () => {
  /**
   * Test if the 404 header is rendered.
   */
  test("renders 404 header", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  /**
   * Test if the "Oops! Page not found" message is rendered.
   */
  test('renders "Oops! Page not found" message', () => {
    render(<NotFound />);
    expect(screen.getByText("Oops! Page not found.")).toBeInTheDocument();
  });

  /**
   * Test if the descriptive message is rendered.
   */
  test('renders descriptive "Sorry" message', () => {
    render(<NotFound />);
    expect(
      screen.getByText(/Sorry, but the page you are looking for is not found/)
    ).toBeInTheDocument();
  });

  /**
   * Test if the paragraph has the correct text.
   */
  test("renders correct paragraph text", () => {
    render(<NotFound />);
    expect(
      screen.getByText(/Please, make sure you have typed the current url./)
    ).toBeInTheDocument();
  });
});
