import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useTable } from "react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getData, getNextPage } from "../api/axiosURL";
import headerStyles from "../styles/Header.module.css";
import btnStyles from "../styles/Button.module.css";
import styles from "../styles/ObjectList.module.css";
import SpinnerSecondary from "./Spinners";

import { useToast } from "../contexts/ToastContext";
import { handleRequestError } from "../utils/errorHandler";

import bgImageStyles from "../styles/BgImage.module.css";
import backgroundImage from "../assets/main-background.jpg";
import ObjectSelect from "./ObjectSelect";
import {
  getNameByNameTable,
  getIDFromItem,
} from "../utils/selectFormParameters";
import useIsSmallScreen from "../hooks/useIsSmallScreen";
import CardCollection from "./CardCollection";
import DataTable from "./DataTable";

const ObjectList = ({
  filters,
  setFilters,
  columns,
  url,
  ObjectsName,
  filterFields,
  modalForms = [],
  queryKeyObjects = "Objects",
}) => {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const history = useHistory();
  const showToast = useToast();
  const [showModal, setShowModal] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedField, setSelectedFiled] = useState({
    field: "",
    foreignKey: "",
  });

  const handleRowClick = (object) => {
    history.push(`${url}${object.id}`);
  };

  const handleAddClick = () => {
    history.push(`${url}add`);
  };

  const [isSmallScreen] = useIsSmallScreen();

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, refetch } =
    useInfiniteQuery({
      queryKey: [[queryKeyObjects], filters],
      queryFn: async ({ pageParam = null }) => {
        try {
          const newFilters = Object.fromEntries(
            Object.entries(filters).map(([key, value]) => [
              key,
              typeof value === "object" && value !== null ? value.id : value,
            ])
          );
          const response = pageParam
            ? await getNextPage(pageParam)
            : await getData(url, newFilters);
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
      { root: null, rootMargin: "80px", threshold: 0.8 }
    );

    observer.observe(lastRow);

    return () => {
      if (lastRow) observer.unobserve(lastRow);
    };
  }, [hasNextPage, isFetching, fetchNextPage, data, isSmallScreen]);

  const handleFilterChange = (e) => {
    let newValue = { [e.target.name]: e.target.value };
    if (e.target.name.startsWith("start_")) {
      const nameField = "end_" + e.target.name.substring(6);
      if (new Date(filters[nameField]) < new Date(e.target.value)) {
        newValue[nameField] = e.target.value;
      }
    }

    if (e.target.name.startsWith("end_")) {
      const nameField = "start_" + e.target.name.substring(4);
      if (new Date(e.target.value) < new Date(filters[nameField])) {
        newValue[nameField] = e.target.value;
      }
    }
    setFilters({ ...filters, ...newValue });
    refetch();
  };

  const handleForeignKeyClick = (e, foreignKey) => {
    setSelectedFiled((prevSelected) => ({
      ...prevSelected,
      field: e.target.name,
      foreignKey,
    }));
    setShowModal((prevShowModal) => ({
      ...prevShowModal,
      [foreignKey]: true,
    }));
  };

  useEffect(() => {
    if (selectedField.field && selectedItem) {
      setFilters({
        ...filters,
        [selectedField.field]: {
          id: getIDFromItem(selectedField.foreignKey, selectedItem),
          name:
            selectedItem[getNameByNameTable(selectedField.foreignKey)] || "",
        },
      });
      setShowModal({ ...showModal, [selectedField.foreignKey]: false });
    }
  }, [selectedItem]);

  const handleClearFilterClick = (field) => {
    setFilters((prevSelected) => ({
      ...prevSelected,
      [field]: { id: "", name: "" },
    }));
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section className={`${bgImageStyles.BgImage}`} style={backgroundStyle}>
      <Container className={styles.Main}>
        <div>
          <h1 className={`${headerStyles.Header} text-center flex-grow-1`}>
            {ObjectsName}
          </h1>
        </div>
        <Container className={styles.HeaderButtons}>
          <Button
            className={`${btnStyles.ButtonTransparent} ${btnStyles.GreenTransparent}`}
            onClick={() => handleAddClick()}
          >
            <i className="fa-solid fa-circle-plus"></i>
            {t("button.add")}
          </Button>
          <Button
            className={`${btnStyles.ButtonTransparent} ${btnStyles.OrangeTransparent}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
            {showFilters ? t("button.hide_filters") : t("button.show_filters")}
          </Button>
        </Container>
        {/* Filters Section */}
        {showFilters && (
          <Form className="mb-3">
            <Row>
              {filterFields.map(
                ({
                  name,
                  type,
                  placeholder,
                  options,
                  foreignKey,
                  readOnly,
                  label,
                }) => (
                  <Col key={name} xs={12} md={4} lg={3} className="mb-1">
                    <Form.Label className={styles.Label}>
                      {label === undefined ? placeholder : label}
                    </Form.Label>
                    <Col className="p-0 d-flex">
                      <Form.Control
                        key={name}
                        className={styles.Input}
                        as={type === "select" ? "select" : undefined}
                        type={type !== "select" ? type : undefined}
                        placeholder={placeholder}
                        name={name}
                        value={
                          foreignKey !== undefined
                            ? filters[name].name
                            : filters[name]
                        }
                        readOnly={readOnly}
                        onChange={(e) => handleFilterChange(e)}
                        onClick={
                          foreignKey !== undefined
                            ? (e) => handleForeignKeyClick(e, foreignKey)
                            : undefined
                        }
                      >
                        {options?.map((option, index) => (
                          <option key={`${name}${index}`} value={option[0]}>
                            {option[1]}
                          </option>
                        ))}
                      </Form.Control>
                      {foreignKey !== undefined ? (
                        <>
                          <Button
                            className={`${btnStyles.ButtonIcon} ${btnStyles.BlueIcon}`}
                            onClick={() => handleClearFilterClick(name)}
                          >
                            <i className="fa-regular fa-trash-can"></i>
                          </Button>
                        </>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Col>
                )
              )}
            </Row>
          </Form>
        )}

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

      {modalForms ? (
        modalForms.map(({ url, columns, foreignKey, queryKey }) => (
          <ObjectSelect
            key={foreignKey}
            show={showModal[foreignKey]}
            handleClose={() =>
              setShowModal({ ...showModal, [foreignKey]: false })
            }
            setSelectedItem={setSelectedItem}
            url={url}
            columns={columns}
            queryKey={queryKey}
          />
        ))
      ) : (
        <></>
      )}
    </section>
  );
};

export default ObjectList;
