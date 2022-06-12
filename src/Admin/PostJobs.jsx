import React, { useState, useEffect, useContext } from "react";

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
  Modal,
  Divider,
} from "rsuite";

import { Table, Column, HeaderCell, Cell } from "rsuite-table";
// import { CheckPicker, Checkbox, Button, SelectPicker, Schema } from "rsuite";
import LeftNav from "./LeftNav";
import RemindOutlineIcon from "@rsuite/icons/RemindOutline";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../firebase-config";

import Welcome from "./Welcome";
import { LocationContext } from "../context/LocationContext";

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

  const [locationData, setLocationData] = useContext(LocationContext);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("");

  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    jobtitle: "",
    qualification: "",
    jobdescrp: "",
    skill: "",
    secskill: "",
    experience: "",
    location: "",
    ctc: "",
    noticeperiod: "",
  });

  const handleSubmit = async () => {
    const abortCont = new AbortController();
    if (!formRef.current.check()) {
      console.error("Form Error");
      return;
    }
    console.log(formValue, "Form Value");
    try {
      await addDoc(
        collection(db, "job_posts"),
        {
          jobtitle: formValue.jobtitle,
          qualification: formValue.qualification,
          jobdescrp: formValue.jobdescrp,
          experience: formValue.experience,
          skill: formValue.skill,
          secskill: formValue.secskill,
          ctc: formValue.ctc,
          noticeperiod: formValue.noticeperiod,
          location: formValue.location,
          timestamp: Timestamp.now(),
        },
        { signal: abortCont.signal }
      );
    } catch (err) {
      alert("sfsfsfsdsdfs", err.name);
    }
    setInfo("New Job has been posted successfully!");
    setShow(true);
    setInterval(() => setShow(false), 4000);
    console.log("Clearing Form");
    setFormValue({
      jobtitle: "",
      qualification: "",
      jobdescrp: "",
      skill: "",
      noticeperiod: "",
    });
    return () => abortCont.abort();
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
  }, [props]);
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
          <span className="exp-text">Job Title:</span> {rowData.jobtitle} |
          <span className="exp-text">Qualification:</span>
          {rowData.qualification}
        </p>

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
      <Notification ref={ref} {...rest} type={type} width="100%">
        <Grid fluid>
          <Row className="show-grid">
            <Col xs={4} sm={4} md={4}>
              <i
                class="bx bx-info-square"
                style={{
                  color: "#ffb300",
                  fontSize: 34,
                }}
              ></i>
            </Col>
            <Col xs={20} sm={20} md={20}>
              {info}
            </Col>
          </Row>
        </Grid>
      </Notification>
    );
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [size, setSize] = React.useState();
  const handleOpenEdit = (value) => {
    setSize(value);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);

  const [editData, setEditData] = useState([]);

  useEffect(() => {
    if (editData.length == 0) {
      console.log("no data");
    } else {
      console.log("Setting Data;;;;;", editData);
      setTimeout(() => {
        setEditFormData({
          jobtitle: editData.jobtitle,
          qualification: editData.qualification,
          jobdescrp: editData.jobdescrp,
          skill: editData.skill,
          noticeperiod: editData.noticeperiod,
        });
      }, 100);
    }
  }, [editData]);

  const initialState = {
    jobtitle: "",
    qualification: "",
    jobdescrp: "",
    skill: "",
    noticeperiod: "",
  };
  const clearState = () => {
    setEditFormData({ ...initialState });
  };
  const editformRef = React.useRef();

  const [editFormData, setEditFormData] = useState({
    jobtitle: "",
    qualification: "",
    jobdescrp: "",
    skill: "",
    secskill: "",
    experience: "",
    ctc: "",
    noticeperiod: "",
  });

  const [location, setLocation] = useState();
  const [ctc, setCtc] = useState();
  const handleUpdate = async () => {
    const abortCont = new AbortController();
    try {
      var ref = doc(db, "job_posts", editData.id);
      await updateDoc(
        ref,

        {
          jobtitle: editFormData.jobtitle,
          qualification: editFormData.qualification,
          jobdescrp: editFormData.jobdescrp,
          experience: editData.experience,
          primaryskill: editFormData.skill,
          secondaryskill: editFormData.secskill,
          location: editFormData.location,
          ctc: editFormData.ctc,
          noticeperiod: editFormData.noticeperiod,
          timestamp: Timestamp.now(),
        },
        { signal: abortCont.signal }
      )
        .then(() => {
          console.log("Dataa updated");
        })
        .catch((error) => {
          alert("Unsuccessfull, Error:" + error);
        });
    } catch (err) {
      alert("errororororor", err);
    }

    // setInfo("Selected Data has been updated successfully!");
    // setShow(true);

    // setInterval(() => setShow(false), 4000);
    return () => abortCont.abort();
  };
  const handleRemove = async () => {
    const abortCont = new AbortController();
    try {
      var ref = doc(db, "job_posts", editData.id);
      await deleteDoc(ref, { signal: abortCont.signal })
        .then(() => {
          console.log("Data has been Deleted successfully!");
          setInfo("Data has been Deleted successfully");
          setTimeout(() => {
            setShow(true);
          }, 100);
        })
        .catch((error) => {
          alert("Unsuccessfull, Error:" + error);
        });
    } catch (err) {
      alert(err);
    }
    setOpenWarningModal(false);
    return () => abortCont.abort();
  };

  const [openWarningModal, setOpenWarningModal] = React.useState(false);
  const handleOpenWarning = () => setOpenWarningModal(true);
  const handleCloseWarning = () => setOpenWarningModal(false);
  return (
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
                  <h3>Post Jobs</h3>
                </Header>

                <Content>
                  <Row className="show-grid">
                    <Col xs={24} sm={24} md={24}>
                      <Panel>
                        <div className="modal-container">
                          <ButtonToolbar>
                            <Button onClick={handleOpen} className="btn-submit">
                              <i class="bx bx-edit" /> Post Job(s)
                            </Button>
                          </ButtonToolbar>

                          <Modal
                            open={open}
                            onClose={handleClose}
                            overflow={true}
                          >
                            <Modal.Header>
                              <Modal.Title>Post Job</Modal.Title>
                            </Modal.Header>
                            {show && (
                              <Message
                                type="info"
                                style={{ width: "100%" }}
                              ></Message>
                            )}
                            <Modal.Body>
                              <Form
                                layout="horizontal"
                                ref={formRef}
                                onChange={setFormValue}
                                onCheck={setFormError}
                                formValue={formValue}
                                model={model}
                                // className="adminform"
                              >
                                <TextField name="jobtitle" label="Job Title:" />
                                <TextField
                                  name="qualification"
                                  label="Min. Qualification:"
                                />

                                <TextField
                                  name="jobdescrp"
                                  label="Job Description:"
                                />
                                 <TextField name="location" label="Location:" />
                                 <TextField name="experience" label="Experience Reqd.:" />
                                <TextField name="skill" label="Primary Skills:" />
                                <TextField name="secskill" label="Secondary Skills:" />
                                <TextField name="ctc" label="CTC:" />
                                <TextField
                                  name="noticeperiod"
                                  label="Notice Period:"
                                />
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                className="btn-submit"
                                appearance="primary"
                                onClick={handleSubmit}
                              >
                                <i class="bx bx-check"></i> Submit
                              </Button>
                              <Button
                                onClick={handleClose}
                                appearance="primary"
                                className="btn-cancel"
                              >
                                <i class="bx bx-x-circle"></i> Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </Panel>

                      <Panel header="List of Jobs Posted" bordered>
                        <Modal
                          size={size}
                          open={openEdit}
                          onClose={handleCloseEdit}
                        >
                          <Modal.Header>
                            <Modal.Title>Edit This Item</Modal.Title>
                            {show && (
                              <Message
                                type="info"
                                style={{ width: "100%" }}
                              ></Message>
                            )}
                          </Modal.Header>
                          <Modal.Body>
                            <Form
                              layout="horizontal"
                              ref={editformRef}
                              onChange={setEditFormData}
                              formValue={editFormData}

                              // className="adminform"
                            >
                              <TextField name="jobtitle" label="Job Title:" />
                              <TextField
                                name="qualification"
                                label="Min. Qualification:"
                              />

                              <TextField
                                name="jobdescrp"
                                label="Job Description:"
                              />
                              <TextField name="skill" label="Skills:" />
                              <TextField
                                name="noticeperiod"
                                label="Notice Period:"
                              />
                            </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              className="btn-submit"
                              onClick={handleUpdate}
                              appearance="primary"
                            >
                              <i class="bx bx-check"></i> Update
                            </Button>
                            <Button
                              onClick={handleCloseEdit}
                              appearance="subtle"
                              className="btn-cancel"
                            >
                              <i class="bx bx-x"></i>Cancel
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        <Table
                          virtualized
                          height={400}
                          data={getData()}
                          loading={loading}
                          sortColumn={sortColumn}
                          sortType={sortType}
                          onSortColumn={handleSortColumn}
                          // cellBordered
                          autoHeight
                          affixHeader
                          rowKey={rowKey}
                          expandedRowKeys={expandedRowKeys}
                          onRowClick={(data) => {
                            console.log(data);

                            setEditData(data);
                          }}
                          renderRowExpanded={renderRowExpanded}
                        >
                          <Column width={50} align="center">
                            <HeaderCell>#</HeaderCell>
                            <ExpandCell
                              dataKey="id"
                              expandedRowKeys={expandedRowKeys}
                              onChange={handleExpanded}
                              height={100}
                            />
                          </Column>
                          <Column width={200} sortable flexGrow={2}>
                            <HeaderCell>Job Title</HeaderCell>
                            <Cell dataKey="jobtitle" />
                          </Column>

                          <Column width={200} flexGrow={2}>
                            <HeaderCell>Description</HeaderCell>
                            <Cell dataKey="jobdescrp" />
                          </Column>

                          <Column width={200} flexGrow={2}>
                            <HeaderCell>Skills Required</HeaderCell>
                            <Cell dataKey="skill" />
                          </Column>
                          <Column width={200} flexGrow={1}>
                            <HeaderCell>Qualification</HeaderCell>
                            <Cell dataKey="qualification" />
                          </Column>
                          <Column width={100} flexGrow={1}>
                            <HeaderCell>Notice Period</HeaderCell>
                            <Cell dataKey="noticeperiod" />
                          </Column>
                          <Column width={130} flexGrow={1}>
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
                          <Column width={180}>
                            <HeaderCell>Action</HeaderCell>

                            <Cell>
                              {(rowData) => {
                                function handleAction() {
                                  // alert(`id:${rowData.id}`);

                                  handleOpenEdit();
                                }
                                return (
                                  <span>
                                    <Button
                                      className="btn-submit"
                                      size="sm"
                                      onClick={handleAction}
                                    >
                                      <i class="bx bx-edit-alt"></i> Edit
                                    </Button>
                                    |
                                    <Button
                                      className="btn-cancel"
                                      size="sm"
                                      onClick={handleOpenWarning}
                                    >
                                      <i class="bx bx-x"></i> Remove
                                    </Button>
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
                      {show && (
                        <Message
                          type="info"
                          style={{ width: "100%" }}
                        ></Message>
                      )}
                      <Modal
                        backdrop="static"
                        role="alertdialog"
                        open={openWarningModal}
                        onClose={handleCloseWarning}
                        size="xs"
                      >
                        <Modal.Body>
                          <RemindOutlineIcon
                            style={{
                              color: "#ffb300",
                              fontSize: 38,
                            }}
                          />
                          <br />
                          Do you really want to remove this item?
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            className="btn-submit"
                            onClick={handleRemove}
                            appearance="primary"
                          >
                            <i class="bx bx-check"></i> Yes
                          </Button>
                          <Button
                            className="btn-cancel"
                            onClick={handleCloseWarning}
                            appearance="subtle"
                          >
                            <i class="bx bx-x"></i> No
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Col>
                  </Row>
                </Content>
              </Container>
            </div>
          </Grid>
        </div>
      </Container>
    </Container>
  );
};

export default PostJobs;
