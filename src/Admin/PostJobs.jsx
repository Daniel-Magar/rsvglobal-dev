import React, { useState, useEffect } from "react";

import {
  Grid,
  Row,
  Col,
  Container,
  Header,
  Content,
  Panel,
  Form,
  Button,
  ButtonToolbar,
  Schema,
  InputPicker,
  SelectPicker,
  FlexboxGrid,
  Pagination,
  IconButton,
  Notification,
} from "rsuite";
import Input from "rsuite/Input";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import LeftNav from "./LeftNav";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase-config";

const selectdata = [
  { value: "Under Graduate", label: "Under Graduate" },
  { value: "Graduate", label: "Graduate" },
  { value: "Post Graduate", label: "Post Graduate" },
];

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  jobtitle: StringType().isRequired("This field is required."),
  jobdescrp: StringType().isRequired("This field is required."),
  qualification: StringType().isRequired("This field is required."),
  skill: StringType().isRequired("This field is required."),
  noticeperiod: StringType().isRequired("This field is required."),
});
const TextField = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});
const PostJobs = (props) => {
  const [show, setShow] = useState(false);
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    jobtitle: "",
    qualification: "",
    jobdescrp: "",
    skill: "",
    noticeperiod: "",
  });
  const clearState = () => {
    setFormValue({});
  };
  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      console.error("Form Error");
      return;
    }
    console.log(formValue, "Form Value");
    try {
      await addDoc(collection(db, "job_posts"), {
        jobtitle: formValue.jobtitle,
        qualification: formValue.qualification,
        jobdescrp: formValue.jobdescrp,
        skill: formValue.skill,
        noticeperiod: formValue.noticeperiod,

        timestamp: Timestamp.now(),
      });
      setInterval(() => setShow(true));
      console.log("Clearing Form");
      setFormValue({
        jobtitle: "",
        qualification: "",
        jobdescrp: "",
        skill: "",
        noticeperiod: "",
      });
    } catch (err) {
      alert(err);
    }
  };
  const [mydata, setMydata] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };
  useEffect(() => {
    setMydata(props.jobposts);
  }, []);
  const data = props.jobposts.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
  const data2 = props.jobposts.filter((v, i) => i < 8);
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
  const rowKey = "id";
  const ExpandCell = ({
    rowData,
    dataKey,
    expandedRowKeys,
    onChange,
    ...props
  }) => (
    <Cell {...props}>
      <IconButton
        size="xs"
        appearance="subtle"
        onClick={() => {
          onChange(rowData);
        }}
        icon={
          expandedRowKeys.some((key) => key === rowData[rowKey]) ? (
            <i
              class="bx bx-checkbox-minus"
              style={{ fontSize: "20px", color: "#030441" }}
            ></i>
          ) : (
            <i
              class="bx bxs-plus-square"
              style={{ fontSize: "16px", color: "#030441" }}
            ></i>
          )
        }
      />
    </Cell>
  );
  const [expandedRowKeys, setExpandedRowKeys] = React.useState([]);
  const renderRowExpanded = (rowData) => {
    return (
      <div
        style={{
          width: "100%",
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            float: "left",
            marginRight: 10,
            background: "#eee",
          }}
        >
          <i
            class="bx bxs-info-square"
            style={{ fontSize: "60px", color: "rgb(247, 71, 73)" }}
          ></i>
        </div>
        <p style={{ width: "100%" }}>
          <span className="exp-text">Job Description:</span> {rowData.jobdescrp}
        </p>
        <p style={{ width: "100%" }}>
          <span className="exp-text">Skills Required:</span> {rowData.skill}
        </p>
      </div>
    );
  };
  const handleExpanded = (rowData, dataKey) => {
    let open = false;
    const nextExpandedRowKeys = [];

    expandedRowKeys.forEach((key) => {
      if (key === rowData[rowKey]) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    });

    if (!open) {
      nextExpandedRowKeys.push(rowData[rowKey]);
    }

    setExpandedRowKeys(nextExpandedRowKeys);
  };
  const Message = React.forwardRef(({ type, ...rest }, ref) => {
    return (
      <Notification ref={ref} {...rest} type={type} header={type}>
        {/* <Paragraph width={320} rows={3} /> */}
        Data Successfully Posted!
      </Notification>
    );
  });
  return (
    <div className="admin">
      <Container>
        <LeftNav />
        <Container>
          <div className="adminboard">
            <Grid fluid>
              <div
                className="show-fake-browser sidebar-page adminboard"
                id="candidates"
              >
                <Container>
                  <Header>
                    <h3>Post Jobs</h3>
                  </Header>

                  <Content>
                    <Row className="show-grid">
                      <Col xs={24} sm={24} md={6}>
                        <Panel header="Post New Job" bordered>
                          {show && (
                            <Message type="info" style={{ width: "100%" }} />
                          )}
                          <Form
                            ref={formRef}
                            onChange={setFormValue}
                            onCheck={setFormError}
                            formValue={formValue}
                            model={model}
                            className="adminform"
                          >
                            <TextField name="jobtitle" label="Job Title" />
                            <TextField
                              name="qualification"
                              label="Min. Qualification"
                            />

                            <TextField
                              name="jobdescrp"
                              label="Job Description"
                            />
                            <TextField name="skill" label="Skills" />
                            <TextField
                              name="noticeperiod"
                              label="Notice Period"
                            />

                            <ButtonToolbar>
                              <Button
                                className="btn-submit"
                                appearance="primary"
                                onClick={handleSubmit}
                              >
                                Submit
                              </Button>

                              <Button className="btn-cancel">Cancel</Button>
                            </ButtonToolbar>
                          </Form>
                        </Panel>
                      </Col>

                      <Col xs={24} sm={24} md={18}>
                        <Panel header="List of Jobs Posted" bordered>
                          <Table
                            virtualized
                            height={400}
                            data={getData()}
                            loading={loading}
                            sortColumn={sortColumn}
                            sortType={sortType}
                            onSortColumn={handleSortColumn}
                            bordered
                            cellBordered
                            autoHeight
                            affixHeader
                            rowKey={rowKey}
                            expandedRowKeys={expandedRowKeys}
                            onRowClick={(data) => {
                              console.log(data);
                            }}
                            renderRowExpanded={renderRowExpanded}
                          >
                            <Column width={70} align="center">
                              <HeaderCell>#</HeaderCell>
                              <ExpandCell
                                dataKey="id"
                                expandedRowKeys={expandedRowKeys}
                                onChange={handleExpanded}
                              />
                            </Column>
                            <Column width={180} resizable sortable>
                              <HeaderCell>Job Title</HeaderCell>
                              <Cell dataKey="jobtitle" />
                            </Column>

                            <Column width={250} resizable>
                              <HeaderCell>Description</HeaderCell>
                              <Cell dataKey="jobdescrp" />
                            </Column>

                            <Column width={200} resizable>
                              <HeaderCell>Skills Required</HeaderCell>
                              <Cell dataKey="skill" />
                            </Column>
                            <Column width={130} resizable>
                              <HeaderCell>Qualification</HeaderCell>
                              <Cell dataKey="qualification" />
                            </Column>
                            <Column width={130} resizable>
                              <HeaderCell>Notice Period</HeaderCell>
                              <Cell dataKey="noticeperiod" />
                            </Column>
                            <Column width={130} resizable>
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
                            <Column width={120}>
                              <HeaderCell>Action</HeaderCell>

                              <Cell>
                                {(rowData) => {
                                  function handleAction() {
                                    alert(`id:${rowData.id}`);
                                  }
                                  return (
                                    <span>
                                      <a onClick={handleAction}> Edit </a> |{" "}
                                      <a onClick={handleAction}> Remove </a>
                                    </span>
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
                              layout={[
                                "total",
                                "-",
                                "limit",
                                "|",
                                "pager",
                                "skip",
                              ]}
                              total={props.jobposts.length}
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
                </Container>
              </div>
            </Grid>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default PostJobs;
