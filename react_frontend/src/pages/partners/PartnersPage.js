import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useTable } from "react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPartners, getPartnerTypes, getNextPage } from "../../api/axiosURL";
import headerStyles from "../../styles/Header.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/PartnersPage.module.css";
import SpinnerSecondary from "../../components/Spinners";

const PartnersPage = () => {
  const [filters, setFilters] = useState({
    trade_name: "",
    bin: "",
    partner_type: "",
    is_own: "",
  });
  const [partnerTypes, setPartnerTypes] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  const history = useHistory();

  const handleRowClick = (partner) => {
    console.log(partner);
    history.push(`/partners/${partner.id}`);
  };

  useEffect(() => {
    fetchPartnerTypes();
  }, []);

  const fetchPartnerTypes = async () => {
    try {
      const response = await getPartnerTypes();
      setPartnerTypes(response.data.results || []);
    } catch (error) {
      console.error("Error fetching partner types:", error);
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, refetch } =
    useInfiniteQuery({
      queryKey: ["partners", filters],
      queryFn: async ({ pageParam = null }) => {
        const response = pageParam
          ? await getNextPage(pageParam)
          : await getPartners(filters);
        return response.data;
      },
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    });

  const partners = data?.pages.flatMap((page) => page.results) || [];

  const columns = React.useMemo(
    () => [
      { Header: "Trade Name", accessor: "trade_name" },
      { Header: "BIN", accessor: "bin" },
      { Header: "Partner Type", accessor: "partner_type_display" },
      {
        Header: "Is Own Partner",
        accessor: "is_own",
        Cell: ({ value }) => (value ? "Yes" : "No"),
      },
      { Header: "Contact Person", accessor: "contact_person" },
      { Header: "Phone Number", accessor: "phone_number" },
      { Header: "Created At", accessor: "created_at" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: partners });

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

  return (
    <Container className={styles.Main}>
      <div className={`${styles.HeaderContainer} mb-3`}>
        <h1
          className={`${headerStyles.Header} ${headerStyles.MarginTop5} text-center flex-grow-1`}
        >
          Partners
        </h1>
        <Button
          className={`${btnStyles.ButtonTransparent} ${btnStyles.OrangeTransparent} ${styles.ButtonFilter}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <i class="fa-solid fa-magnifying-glass"></i>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <Form className="mb-3">
          <Row>
            <Col xs={12} md={3} className="mb-1">
              <Form.Control
                type="text"
                name="trade_name"
                className={styles.Input}
                placeholder="Search by Trade Name"
                value={filters.trade_name}
                onChange={handleFilterChange}
              />
            </Col>
            <Col xs={12} md={3} className="mb-1">
              <Form.Control
                type="text"
                name="bin"
                className={styles.Input}
                placeholder="Search by BIN"
                value={filters.bin}
                onChange={handleFilterChange}
              />
            </Col>
            <Col xs={12} md={3} className="mb-1">
              <Form.Control
                as="select"
                name="is_own"
                className={styles.Input}
                value={filters.is_own}
                onChange={handleFilterChange}
              >
                <option value="">All Partners</option>
                <option value="true">Own Partner</option>
                <option value="false">Non-own Partner</option>
              </Form.Control>
            </Col>
            <Col xs={12} md={3} className="mb-1">
              <Form.Control
                as="select"
                name="partner_type"
                className={styles.Input}
                value={filters.partner_type}
                onChange={handleFilterChange}
              >
                <option value="">All Types</option>
                {partnerTypes.map((type) => (
                  <option key={type.label} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Form.Control>
            </Col>
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
  );
};

export default PartnersPage;
