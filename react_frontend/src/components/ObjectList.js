import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useTable } from "react-table";
import headerStyles from "../styles/Header.module.css";
import btnStyles from "../styles/Button.module.css";
import styles from "../styles/ObjectList.module.css";
import SpinnerSecondary from "./Spinners";

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
import useInfiniteData from "../hooks/useInfiniteData";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Instruction from "./Instruction";
import { use } from "react";

const ObjectList = ({
  filters,
  setFilters,
  columns,
  url,
  ObjectsName,
  filterFields,
  modalForms = [],
  queryKey = "Objects",
  instructionBody = <></>,
  showFiltersParameter = false,
}) => {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(showFiltersParameter);
  const history = useHistory();
  const [showModal, setShowModal] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [showInstruction, setShowInstruction] = useState(false);

  const [selectedField, setSelectedFiled] = useState({
    field: "",
    foreignKey: "",
    additional_filter: undefined,
  });

  const handleRowClick = (object) => {
    history.push(`${url}${object.id}`);
  };

  const handleAddClick = () => {
    history.push(`${url}add`);
  };

  const [isSmallScreen] = useIsSmallScreen();
  const {
    data,
    objects,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
  } = useInfiniteData({ queryKey, filters, url });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: objects });

  const { tableBodyRef, cardsRef } = useInfiniteScroll({
    hasNextPage,
    isFetching,
    fetchNextPage,
    data,
    isSmallScreen,
  });

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
    setFilters((prevFilters) => ({ ...prevFilters, ...newValue }));
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [t]);

  const handleForeignKeyClick = (e, foreignKey, additional_filter) => {
    setSelectedFiled((prevSelected) => ({
      ...prevSelected,
      field: e.target.name,
      foreignKey,
      additional_filter,
    }));
    setShowModal((prevShowModal) => ({
      ...prevShowModal,
      [foreignKey]: true,
    }));
  };

  useEffect(() => {
    if (selectedField.field && selectedItem) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [selectedField.field]: {
          id: getIDFromItem(selectedField.foreignKey, selectedItem),
          name:
            selectedItem[getNameByNameTable(selectedField.foreignKey)] || "",
        },
      }));
      setShowModal({ ...showModal, [selectedField.foreignKey]: false });
    }
  }, [selectedItem]);

  const handleClearFilterClick = (field, foreignKey) => {
    setFilters((prevSelected) => ({
      ...prevSelected,
      [field]: foreignKey !== undefined ? { id: "", name: "" } : "",
    }));
  };

  const handleClearFiltersClick = () => {
    const emptyValue = (value) => {
      if (typeof value === "object") {
        return { id: "", name: "" };
      } else if (typeof value === "number") {
        return 0;
      } else {
        return "";
      }
    };
    setFilters((prevSelected) => ({
      ...Object.fromEntries(
        Object.entries(prevSelected).map(([key, value]) => [
          key,
          emptyValue(value),
        ])
      ),
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
        <Row className="justify-content-center">
          <h1 className={headerStyles.Header}>{ObjectsName}</h1>
          <Button
            className={`${btnStyles.ButtonIcon} ${btnStyles.OrangeIcon}`}
            onClick={() => setShowInstruction(true)}
          >
            <i className="fa-solid fa-circle-question" />
          </Button>
        </Row>
        <Row className={styles.HeaderButtons}>
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
          <Button
            className={`${btnStyles.ButtonTransparent} ${btnStyles.BlueTransparent}`}
            onClick={() => handleClearFiltersClick()}
          >
            <i className="fa-regular fa-trash-can"></i>
            {t("button.clear_filters")}
          </Button>
        </Row>
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
                  additional_filter,
                }) => (
                  <Col key={name} xs={12} md={4} lg={3} className="mb-1">
                    <Form.Label className={styles.Label} htmlFor={name}>
                      {label === undefined ? placeholder : label}
                    </Form.Label>
                    <Col className="p-0 d-flex">
                      <Form.Control
                        id={name}
                        key={name}
                        className={styles.Input}
                        as={type === "select" ? "select" : undefined}
                        type={
                          type !== "select" && type !== "textarea"
                            ? type
                            : undefined
                        }
                        placeholder={
                          type !== "select" && type !== "date"
                            ? placeholder
                            : undefined
                        }
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
                            ? (e) =>
                                handleForeignKeyClick(
                                  e,
                                  foreignKey,
                                  additional_filter
                                )
                            : undefined
                        }
                      >
                        {options?.map((option, index) => (
                          <option key={`${name}${index}`} value={option[0]}>
                            {option[1]}
                          </option>
                        ))}
                      </Form.Control>
                      {type !== "select" ? (
                        <>
                          <Button
                            className={`${btnStyles.ButtonIcon} ${btnStyles.BlueIcon}`}
                            onClick={() =>
                              handleClearFilterClick(name, foreignKey)
                            }
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
        ) : objects.length === 0 ? (
          <>
            <p className={headerStyles.HeaderNotFound}>
              {t("toast.no_results_found")}
            </p>
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
            selectedField={selectedField}
          />
        ))
      ) : (
        <></>
      )}
      <Instruction
        instructionBody={instructionBody}
        showInstruction={showInstruction}
        setShowInstruction={setShowInstruction}
      />
    </section>
  );
};

export default ObjectList;
