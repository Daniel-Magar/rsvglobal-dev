import React, { useState, useEffect } from "react";

import {
  Grid,
  Row,
  Col,
  Container,
  Header,
  Content,
  Panel,
  Pagination,
} from "rsuite";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import Loader from "rsuite/Loader";

import LeftNav from "./LeftNav";
import Welcome from "./Welcome";

const Clients = (props) => {
  const [mydata, setMydata] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  useEffect(() => {
    setMydata(props.clients);
  }, [props]);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };
  const data = props.clients.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
  const data2 = props.clients.filter((v, i) => i < 8);
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();

  const getData = () => {
    if (sortColumn && sortType) {
      return data2.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };
  return (
    <>
      <Container>
        <LeftNav />
        <Container>
          <div className="adminboard">
            <Welcome />
            <Grid fluid>
              <div
                className="show-fake-browser sidebar-page adminboard"
                id="candidates"
              >
                <Container>
                  <Header>
                    <h3>Clients</h3>
                  </Header>
                </Container>
                <Content>
                  <Row className="show-grid">
                    <Col xs={24} sm={24} md={24}>
                      <Panel header="List of Clients" bordered>
                        <Table
                          isTree
                          defaultExpandAllRows
                          bordered
                          cellBordered
                          rowKey="id"
                          virtualized
                          height={400}
                          data={getData()}
                          loading={loading}
                          sortColumn={sortColumn}
                          sortType={sortType}
                          onSortColumn={handleSortColumn}
                          autoHeight
                          affixHeader
                          shouldUpdateScroll={false}
                          onExpandChange={(isOpen, rowData) => {
                            console.log(isOpen, rowData);
                          }}
                          renderTreeToggle={(icon, rowData) => {
                            if (
                              rowData.children &&
                              rowData.children.length === 0
                            ) {
                              return <Loader spin />;
                            }
                            return icon;
                          }}
                        >
                          <Column width={170} sortable>
                            <HeaderCell>Name</HeaderCell>
                            <Cell dataKey="Name" />
                          </Column>

                          <Column width={180}>
                            <HeaderCell>Company</HeaderCell>
                            <Cell dataKey="Company" />
                          </Column>

                          <Column width={150}>
                            <HeaderCell>Designation</HeaderCell>
                            <Cell dataKey="Designation" />
                          </Column>
                          <Column width={200}>
                            <HeaderCell>Email Id</HeaderCell>
                            <Cell dataKey="Email" />
                          </Column>
                          <Column width={100}>
                            <HeaderCell>Ph. Number</HeaderCell>
                            <Cell dataKey="PhoneNo" />
                          </Column>
                          <Column flexGrow={1}>
                            <HeaderCell>Requirement</HeaderCell>

                            <Cell>
                              {(mydata, index) => {
                                let mystr = mydata.Requirement;
                                let data = String(mystr);
                                console.log(
                                  data.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                );
                                let mylist = data.split(",").join("\n");
                                console.log(mylist);

                                return <p>{data}</p>;
                              }}
                            </Cell>
                          </Column>
                          <Column width={130}>
                            <HeaderCell>Applied Date</HeaderCell>
                            <Cell>
                              {(mydata, index) => {
                                const dte = mydata.timestamp.toDate();
                                var cdte =
                                  dte.getDate() +
                                  "/" +
                                  (dte.getMonth() + 1) +
                                  "/" +
                                  dte.getFullYear();
                                return <span>{cdte}</span>;
                              }}
                            </Cell>
                          </Column>
                        </Table>
                        <div style={{ padding: 20 }}>
                          <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            maxButtons={5}
                            size="xs"
                            layout={[
                              "total",
                              "-",
                              "limit",
                              "|",
                              "pager",
                              "skip",
                            ]}
                            total={props.clients.length}
                            limitOptions={[10, 20]}
                            limit={limit}
                            activePage={page}
                            onChangePage={setPage}
                            onChangeLimit={handleChangeLimit}
                          />
                        </div>
                      </Panel>
                    </Col>
                  </Row>
                </Content>
              </div>
            </Grid>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default Clients;
