import React from "react";

import SpinnerSecondary from "./Spinners";

import styles from "../styles/DataTable.module.css";

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
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className={styles.TableHeaderTh}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} ref={tableBodyRef}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => handleRowClick(row.original)}
                  className={styles.ClickableRow}
                >
                  {row.cells.map((cell) => (
                    <td
                      className={styles.TableHeaderTd}
                      {...cell.getCellProps()}
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
