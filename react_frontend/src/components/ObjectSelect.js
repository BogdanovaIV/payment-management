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
import useIsSmallScreen from "../hooks/useIsSmallScreen";
import CardCollection from "./CardCollection";
import DataTable from "./DataTable";

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
  const [isSmallScreen] = useIsSmallScreen();

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
  const cardsRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage || isFetching) return;

    const container = isSmallScreen ? cardsRef.current : tableBodyRef.current;
    if (!container) return;

    const lastRow = container.lastElementChild;
    if (!lastRow) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "100px", threshold: 0.8 }
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
          ) : isSmallScreen ? (
            <CardCollection
              columns={columns}
              cardsRef={cardsRef}
              objects={objects}
              handleRowClick={handleRowClick}
            />
          ) : (
            <DataTable
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
              tableBodyRef={tableBodyRef}
              handleRowClick={handleRowClick}
              isFetching={isFetching}
            />
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ObjectSelect;
