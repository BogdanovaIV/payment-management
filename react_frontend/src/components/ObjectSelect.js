import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import { useTable } from "react-table";

import styles from "../styles/ObjectSelect.module.css";
import headerStyles from "../styles/Header.module.css";
import SpinnerSecondary from "./Spinners";

import useIsSmallScreen from "../hooks/useIsSmallScreen";
import CardCollection from "./CardCollection";
import DataTable from "./DataTable";
import useInfiniteData from "../hooks/useInfiniteData";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const ObjectSelect = ({
  show,
  setSelectedItem,
  handleClose,
  url,
  columns,
  queryKey,
  selectedField,
}) => {
  const [query, setQuery] = useState("");
  const [isSmallScreen] = useIsSmallScreen();

  const handleRowClick = (object) => {
    setSelectedItem(object);
    handleClose();
  };
  const {
    data,
    objects,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
  } = useInfiniteData({
    queryKey,
    searchQuery: query,
    filters: selectedField.additional_filter,
    url,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: objects });

  const { tableBodyRef, cardsRef } = useInfiniteScroll({
    hasNextPage,
    isFetching,
    fetchNextPage,
    data,
    isSmallScreen,
    show,
  });

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      refetch();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
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
          ) : objects.length === 0 ? (
            <>
              <p className={headerStyles.HeaderNotFound}>No results found.</p>
            </>
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
