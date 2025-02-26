import React from "react";
import SpinnerSecondary from "./Spinners";
import styles from "../styles/DataTable.module.css";

/**
 * DataTable Component
 *
 * A reusable table component that displays data using react-table.
 * It supports dynamic column widths, row click handling, and loading states.
 *
 * Props:
 * - `getTableProps`: Function providing table props.
 * - `getTableBodyProps`: Function providing tbody props.
 * - `headerGroups`: Array containing table header groups.
 * - `rows`: Array of row data to be displayed.
 * - `prepareRow`: Function to prepare row properties.
 * - `tableBodyRef`: Ref for the table body element.
 * - `handleRowClick`: Callback function triggered when a row is clicked.
 * - `isFetching`: Boolean indicating whether data is loading (displays a spinner).
 *
 * Features:
 * - Displays headers and rows dynamically based on provided data.
 * - Handles row clicks by invoking `handleRowClick`.
 * - Shows a loading spinner when `isFetching` is true.
 */
const DataTable = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
  tableBodyRef,
  handleRowClick,
  isFetching,
}) => {
  return (
    <>
      <div className={styles.TableDiv}>
        <table {...getTableProps()} className={`${styles.Table} table`}>
          <thead className={styles.TableHeader}>
            {headerGroups.map((headerGroup, index) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={`headerGroup${index}`}
              >
                {headerGroup.headers.map((column, colIndex) => (
                  <th
                    key={`column${colIndex}`}
                    className={styles.TableHeaderTh}
                    {...column.getHeaderProps({
                      style: {
                        width: column.width,
                        minWidth: column.minWidth || "auto",
                        maxWidth: column.maxWidth || "auto",
                        flexGrow: 1,
                      },
                    })}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} ref={tableBodyRef}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={`row${rowIndex}`}
                  onClick={() => handleRowClick(row.original)}
                  className={styles.ClickableRow}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={`cell${cellIndex}`}
                      className={styles.TableHeaderTd}
                      {...cell.getCellProps({
                        style: {
                          width: cell.column.width,
                          minWidth: cell.column.minWidth || "auto",
                          maxWidth: cell.column.maxWidth || "auto",
                          flexGrow: 1,
                        },
                      })}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isFetching && <SpinnerSecondary />}
    </>
  );
};

export default DataTable;
