import React, { useState, useEffect } from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import { Button, Pagination, Container, Header, Content } from "rsuite";
import { set } from "firebase/database";
import LeftNav from "./LeftNav";
import "../cusrsuit.css";
const CandidateList = (props) => {
  const [mydata, setMydata] = useState([]);
  console.log(" Poprssssss", props.candidates);
  const [listdata, setListdata] = useState({});
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };
  useEffect(() => {
    setMydata(props.candidates);
  }, []);
  const data = props.candidates.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
  const data2 = props.candidates.filter((v, i) => i < 8);
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
      <div>
        <div className="show-fake-browser sidebar-page" id="candidates">
          <Container>
            <LeftNav />
            <Container>
              <div className="adminboard">
                <Header>
                  <h3>List of Applicants</h3>
                </Header>
                <Content>
                  <Table
                    height={420}
                    // data={data}
                    data={getData()}
                    loading={loading}
                    sortColumn={sortColumn}
                    sortType={sortType}
                    onSortColumn={handleSortColumn}
                    onRowClick={(data) => {
                      console.log(data.phone_no);
                    }}
                    bordered
                    cellBordered
                    autoHeight
                    affixHeader
                  >
                    <Column
                      className="wid"
                      width={200}
                      align="left"
                      fixed
                      sortable
                      resizable
                    >
                      <HeaderCell>Candidate Name</HeaderCell>
                      <Cell dataKey="first_name" />
                    </Column>

                    <Column className="wid" width={250} resizable>
                      <HeaderCell>Email Id</HeaderCell>
                      <Cell dataKey="emial_id" />
                    </Column>

                    <Column width={200} resizable>
                      <HeaderCell>Mobile No.</HeaderCell>
                      <Cell dataKey="phone_no" />
                    </Column>
                    <Column width={200} resizable>
                      <HeaderCell>Qualification</HeaderCell>
                      <Cell dataKey="qualification" />
                    </Column>
                    <Column width={200} resizable>
                      <HeaderCell>Applied For</HeaderCell>
                      <Cell dataKey="appliedfor" />
                    </Column>
                    <Column width={200} resizable>
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

                    <Column width={200} resizable>
                      <HeaderCell>CV</HeaderCell>

                      <Cell>
                        {(mydata, index) => {
                          return (
                            <a href={`${mydata.fileURL}`} target="_blank">
                              Download CV
                            </a>
                          );
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
                      layout={["total", "-", "limit", "|", "pager", "skip"]}
                      total={props.candidates.length}
                      limitOptions={[10, 20]}
                      limit={limit}
                      activePage={page}
                      onChangePage={setPage}
                      onChangeLimit={handleChangeLimit}
                    />
                  </div>
                </Content>
              </div>
            </Container>
          </Container>
        </div>
      </div>
    </>
  );
};

export default CandidateList;
