import React from "react";
import { render, screen } from "@testing-library/react";
import SpinnerSecondary from "./Spinners";


describe("SpinnerSecondary Component", () => {
  /**
   * Tests if the Spinner component renders in the document.
   */
  test("renders the Spinner component", () => {
    render(<SpinnerSecondary />);
    
    // Check if the spinner is present in the document
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });

   /**
   * Tests if the Spinner component has the correct Bootstrap variant class.
   */
  test("has the correct Bootstrap variant class", () => {
    render(<SpinnerSecondary />);
    
    // Check if the spinner has the correct Bootstrap class
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("spinner-border");
    expect(spinner).toHaveClass("text-secondary");
  });

  /**
   * Tests if the Spinner component contains the loading text for accessibility.
   */
  test("contains the loading text for accessibility", () => {
    render(<SpinnerSecondary />);
    
    // Check if the screen reader text is inside the spinner
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
