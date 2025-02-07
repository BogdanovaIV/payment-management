import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { useTable } from "react-table";
import { getPartners, getPartnerTypes, getNextPage } from "../../api/axiosURL";
import headerStyles from "../../styles/Header.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import SpinnerSecondary from "../../components/Spinners";

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [filters, setFilters] = useState({
    trade_name: "",
    bin: "",
    partner_type: "",
    is_own: "",
  });
  const [partnerTypes, setPartnerTypes] = useState([]);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    fetchPartnerTypes();
  }, []);

  const fetchPartnerTypes = async () => {
    try {
      const response = await getPartnerTypes();
      setPartnerTypes(
        Array.isArray(response.data.results) ? response.data.results : []
      );
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error fetching partner types:", error);
      }
    }
  };

  useEffect(() => {
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPartners(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filters]);

  const fetchPartners = async (reset = false) => {
    try {
      const response = await getPartners(filters);
      setPartners(
        reset
          ? Array.isArray(response.data.results)
            ? response.data.results
            : []
          : [...partners, ...(response.data.results || [])]
      );
      setNextPage(response.data.next);
      setHasLoaded(true);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error fetching partners:", error);
      }
    }
  };

  const loadMorePartners = async () => {
    if (!nextPage) return;
    try {
      const response = await getNextPage(nextPage);
      console.log(response.data);
      setPartners((prevPartners) => {
        const existingIds = new Set(prevPartners.map((p) => p.id));
  
        // Add only new partners that aren't already in prevPartners
        const newPartners = response.data.results.filter(
          (p) => !existingIds.has(p.id)
        );
  
        return [...prevPartners, ...newPartners];
      });
  
      setNextPage(response.data.next);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error loading more partners:", error);
      }
    }
  };

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

  const data = React.useMemo(() => partners, [partners]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <h1 className={headerStyles.Header}>Partners</h1>
      <Form>
        <Row>
          <Col>
            <Form.Control
              type="text"
              name="trade_name"
              placeholder="Search by Trade Name"
              value={filters.trade_name}
              onChange={handleFilterChange}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              name="bin"
              placeholder="Search by BIN"
              value={filters.bin}
              onChange={handleFilterChange}
            />
          </Col>
          <Col>
            <Form.Control
              as="select"
              name="is_own"
              value={filters.is_own}
              onChange={(e) =>
                setFilters({ ...filters, is_own: e.target.value })
              }
            >
              <option value="">All Partners</option>
              <option value="true">Own Partner</option>
              <option value="false">Non-own Partner</option>
            </Form.Control>
          </Col>
          <Col>
            <Form.Control
              as="select"
              name="partner_type"
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
      {hasLoaded ? (
        <>
          <InfiniteScroll
            dataLength={partners.length}
            next={loadMorePartners}
            hasMore={!!nextPage}
            loader={<p>Loading more partners...</p>}
          >
            {" "}
            <table {...getTableProps()} className="table table-striped mt-3">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </InfiniteScroll>{" "}
        </>
      ) : (
        <>
          <SpinnerSecondary />
        </>
      )}
    </Container>
  );
};

export default PartnersPage;
