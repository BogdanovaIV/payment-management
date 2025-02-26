import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CardCollection from "../components/CardCollection";

const mockHandleRowClick = jest.fn();
const mockColumns = [
  { Header: "Title", accessor: "title" },
  { Header: "Description", accessor: "description" },
  { Header: "Amount", accessor: "amount", Cell: (val) => `$${val}` },
];

const mockColumnsWitoutAccesssor = [
  { Header: "Title" },
  { Header: "Description", accessor: "description" },
  { Header: "Amount", accessor: "amount", Cell: (val) => `$${val}` },
];

const mockObjects = [
  { id: 1, title: "Card 1", description: "Description 1", amount: 100 },
  { id: 2, title: "Card 2", description: "Description 2", amount: 200 },
];

jest.mock("../contexts/ToastContext", () => ({
  useToast: jest.fn(() => jest.fn()),
}));

describe("CardCollection Component", () => {
  /**
   * Tests whether the correct number of cards is rendered
   * based on the length of the objects array.
   */
  test("renders the correct number of cards", () => {
    render(
      <CardCollection
        columns={mockColumns}
        objects={mockObjects}
        handleRowClick={mockHandleRowClick}
      />
    );
    const cards = screen.getAllByText((content, element) =>
      element.classList.contains("CardTitle")
    );
    expect(cards.length).toBe(mockObjects.length);
  });

  /**
   * Ensures that card titles are displayed correctly
   * based on the provided objects array.
   */
  test("renders card titles correctly", () => {
    render(
      <CardCollection
        columns={mockColumns}
        objects={mockObjects}
        handleRowClick={mockHandleRowClick}
      />
    );
    mockObjects.forEach((obj) => {
      expect(screen.getByText(obj.title)).toBeInTheDocument();
    });
  });

  /**
   * Verifies that when a column lacks an accessor, the default
   * title format "Object {id}" is displayed.
   */
  test("renders card titles without accessor correctly", () => {
    render(
      <CardCollection
        columns={mockColumnsWitoutAccesssor}
        objects={mockObjects}
        handleRowClick={mockHandleRowClick}
      />
    );
    mockObjects.forEach((obj) => {
      expect(screen.getByText(`Object ${obj.id}`)).toBeInTheDocument();
    });
  });

  /**
   * Ensures that clicking a card triggers the handleRowClick
   * function with the correct object as an argument.
   */
  test("calls handleRowClick when a card is clicked", () => {
    render(
      <CardCollection
        columns={mockColumns}
        objects={mockObjects}
        handleRowClick={mockHandleRowClick}
      />
    );
    const card = screen.getByText("Card 1").closest(".card");
    fireEvent.click(card);
    expect(mockHandleRowClick).toHaveBeenCalledWith(mockObjects[0]);
  });
});
