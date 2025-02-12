import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import { useTable } from "react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getData, getNextPage } from "../api/axiosURL";
import styles from "../styles/ObjectSelect.module.css";
import SpinnerSecondary from "./Spinners";

import { useToast } from "../contexts/ToastContext";
import { handleRequestError } from "../utils/errorHandler";

const ObjectSelect = ({
  show,
  setSelectedItem,
  handleClose,
  url,
  columns,
  queryKey,
}) => {
  const { t } = useTranslation();
  const showToast = useToast();
  const [query, setQuery] = useState("");

  const handleRowClick = (object) => {
    setSelectedItem(object);
    handleClose();
  };
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, refetch } =
    useInfiniteQuery({
      queryKey: [[queryKey], query],
      queryFn: async ({ pageParam = null }) => {
        try {
          const filters = !!query ? { search: query } : undefined;
          const response = pageParam
            ? await getNextPage(pageParam)
            : await getData(url, filters);
          return response.data;
        } catch (err) {
          if (process.env.NODE_ENV === "development") {
            console.log(err);
          }
          handleRequestError(err, showToast, t);
        }
      },
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    });
  const objects = data?.pages.flatMap((page) => page.results) || [];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: objects });

  const tableBodyRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage || isFetching) return;

    const tableBody = tableBodyRef.current;
    if (!tableBody) return;
    const lastRow = tableBody.lastElementChild;
    if (!lastRow) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "100px", threshold: 1.0 }
    );

    observer.observe(lastRow);

    return () => {
      if (lastRow) observer.unobserve(lastRow);
    };
  }, [hasNextPage, isFetching, fetchNextPage, data, show]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    refetch();
  };
  return (
    <Modal show={show} onHide={handleClose} dialogClassName={styles.Modal}>
      <Modal.Header closeButton>
        <Modal.Title>Select an Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className={styles.Main}>
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Control
              value={query}
              onChange={handleQueryChange}
              type="text"
              className="mr-sm-2"
              placeholder="Search"
            />
          </Form>
          {isLoading ? (
            <SpinnerSecondary />
          ) : (
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
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ObjectSelect;
