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

const ObjectList = ({
  filters,
  setFilters,
  columns,
  url,
  ObjectsName,
  filterFields,
}) => {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const history = useHistory();
  const showToast = useToast();

  const handleRowClick = (object) => {
    history.push(`${url}${object.id}`);
  };

  const handleAddClick = () => {
    history.push(`${url}add`);
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, refetch } =
    useInfiniteQuery({
      queryKey: ["objects", filters],
      queryFn: async ({ pageParam = null }) => {
        try {
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
      { root: null, rootMargin: "80px", threshold: 1.0 }
    );

    observer.observe(lastRow);

    return () => {
      if (lastRow) observer.unobserve(lastRow);
    };
  }, [hasNextPage, isFetching, fetchNextPage, data]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    refetch();
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
            {filterFields.map(({ name, type, placeholder, options }) => (
              <Col xs={12} md={3} className="mb-1">
                <Form.Control
                  className={styles.Input}
                  as={type === "select" ? "select" : undefined}
                  type={type !== "select" ? type : undefined}
                  placeholder={placeholder}
                  name={name}
                  value={filters[name]}
                  onChange={handleFilterChange}
                >
                  {options?.map((option, index) => (
                    <option key={`${name}${index}`} value={option[0]}>
                      {option[1]}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            ))}
          </Row>
        </Form>
      )}

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
    </section>
  );
};

export default ObjectList;
