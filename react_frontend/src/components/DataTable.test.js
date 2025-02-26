import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "./DataTable";

describe("DataTable Component", () => {
  const mockHandleRowClick = jest.fn();

  const mockHeaderGroups = [
    {
      getHeaderGroupProps: () => ({}),
      headers: [
        {
          getHeaderProps: () => ({}),
          render: () => <span>Column 1</span>,
        },
        {
          getHeaderProps: () => ({}),
          render: () => <span>Column 2</span>,
        },
      ],
    },
  ];

  const mockRows = [
    {
      getRowProps: () => ({ key: "row-1" }),
      original: { id: 1, name: "Row 1" },
      cells: [
        {
          getCellProps: () => ({
            key: "cell-1",
            column: { width: "100px", minWidth: "50px", maxWidth: "150px" },
          }),
          render: () => <span>Cell 1</span>,
          column: { width: "100px", minWidth: "50px", maxWidth: "150px" },
        },
      ],
    },
  ];
  /**
   * Ensures the table displays column headers and row data correctly.
   */
  test("renders table with headers and rows", () => {
    render(
      <DataTable
        getTableProps={() => ({})}
        getTableBodyProps={() => ({})}
        headerGroups={mockHeaderGroups}
        rows={mockRows}
        prepareRow={() => {}}
        tableBodyRef={null}
        handleRowClick={mockHandleRowClick}
        isFetching={false}
      />
    );

    // Check headers
    expect(screen.getByText("Column 1")).toBeInTheDocument();
    expect(screen.getByText("Column 2")).toBeInTheDocument();

    // Check row content
    expect(screen.getByText("Cell 1")).toBeInTheDocument();
  });

  /**
   * Verifies that clicking a row calls `handleRowClick` with the correct row data.
   */
  test("handles row click", () => {
    render(
      <DataTable
        getTableProps={() => ({})}
        getTableBodyProps={() => ({})}
        headerGroups={mockHeaderGroups}
        rows={mockRows}
        prepareRow={() => {}}
        tableBodyRef={null}
        handleRowClick={mockHandleRowClick}
        isFetching={false}
      />
    );

    const row = screen.getByText("Cell 1").closest("tr");
    fireEvent.click(row);

    expect(mockHandleRowClick).toHaveBeenCalledWith({ id: 1, name: "Row 1" });
  });

  /**
   * Checks if the loading spinner appears when data is being fetched.
   */
  test("shows spinner when isFetching is true", () => {
    render(
      <DataTable
        getTableProps={() => ({})}
        getTableBodyProps={() => ({})}
        headerGroups={mockHeaderGroups}
        rows={mockRows}
        prepareRow={() => {}}
        tableBodyRef={null}
        handleRowClick={mockHandleRowClick}
        isFetching={true}
      />
    );

    expect(screen.queryByText("Loading...")).toBeInTheDocument();
  });

  /**
   * Ensures the spinner is hidden when `isFetching` is false.
   */
  test("does not show spinner when isFetching is false", () => {
    render(
      <DataTable
        getTableProps={() => ({})}
        getTableBodyProps={() => ({})}
        headerGroups={mockHeaderGroups}
        rows={mockRows}
        prepareRow={() => {}}
        tableBodyRef={null}
        handleRowClick={mockHandleRowClick}
        isFetching={false}
      />
    );

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  /**
   * Ensures clicking a row triggers `handleRowClick` with the correct data.
   */
  test("calls handleRowClick with the correct row data when a row is clicked", () => {
    render(
      <DataTable
        getTableProps={() => ({})}
        getTableBodyProps={() => ({})}
        headerGroups={mockHeaderGroups}
        rows={mockRows}
        prepareRow={() => {}}
        tableBodyRef={null}
        handleRowClick={mockHandleRowClick}
        isFetching={false}
      />
    );

    // Click the row
    const firstRow = screen.getByText("Cell 1").closest("tr");
    fireEvent.click(firstRow);

    expect(mockHandleRowClick).toHaveBeenCalledWith({ id: 1, name: "Row 1" });

    expect(mockHandleRowClick).toHaveBeenCalledTimes(1);
  });
});
