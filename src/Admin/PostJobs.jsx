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
  SelectPicker,
} from "rsuite";
import Input from "rsuite/Input";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import LeftNav from "./LeftNav";
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  doc,
  writeBatch,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";

const selectdata = [
  { value: "Under Graduate", label: "Under Graduate" },
  { value: "Graduate", label: "Graduate" },
  { value: "Post Graduate", label: "Post Graduate" },
];

const PostJobs = (props) => {
  const { StringType, NumberType, ArrayType } = Schema.Types;
  const model = Schema.Model({
    jobtitle: StringType().isRequired("This field is required."),
    jobdescription: StringType().isRequired("This field is required."),
    qualification: StringType().isRequired("This field is required."),
  });

  function TextField(props) {
    const { name, label, accepter, ...rest } = props;
    return (
      <Form.Group controlId={`${name}-3`}>
        <Form.ControlLabel>{label} </Form.ControlLabel>
        <Form.Control name={name} accepter={accepter} {...rest} />
      </Form.Group>
    );
  }
  const Textarea = React.forwardRef((props, ref) => (
    <Input {...props} as="textarea" ref={ref} />
  ));
  const [jobtitle, setJobtitle] = useState("");
  const [qualification, setQualification] = useState("");
  const [jobdescrp, setJobdescrp] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(jobtitle);
    console.log(qualification);
    console.log(jobdescrp);
    // try {
    //   await addDoc(collection(db, "job-post"), {
    //     job_title: jobtitle,
    //     qualification: qualification,
    //     job_description: jobdescrp,
    //     timestamp: Timestamp.now(),
    //   });
    //   console.log("Success!!!!");
    // } catch (err) {
    //   alert(err);
    // }
  };

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
                      <Col xs={24} sm={24} md={8}>
                        <Panel header="Post New Job" bordered>
                          <Form
                            model={model}
                            className="adminform"
                            fluid
                            onSubmit={handleSubmit}
                          >
                            <Form.Group controlId="jobtitle">
                              <TextField
                                name="jobtitle"
                                label="Job Title"
                                onChange={(e) => setJobtitle(e.target.value)}
                              />
                            </Form.Group>
                            <Form.Group controlId="qualification">
                              <Form.Group controlId="Min. Qualification"></Form.Group>
                              <TextField
                                accepter={SelectPicker}
                                data={selectdata}
                                className="select"
                                name="qualification"
                                label="Minimum Qualification"
                                width={224}
                                onChange={(e) =>
                                  setQualification(e.target.value)
                                }
                              />
                            </Form.Group>

                            <Form.Group controlId="textarea">
                              <Form.ControlLabel>
                                Job Description
                              </Form.ControlLabel>
                              <Form.Control
                                rows={6}
                                name="jobdescription"
                                accepter={Textarea}
                                onChange={(e) => setJobdescrp(e.target.value)}
                              />
                            </Form.Group>
                            <ButtonToolbar>
                              <Button appearance="primary" type="submit">
                                Submit
                              </Button>
                            </ButtonToolbar>
                          </Form>
                        </Panel>
                      </Col>
                      <Col xs={24} sm={24} md={16}>
                        <Panel header="List of Jobs Posted" bordered>
                          <Table
                            virtualized
                            height={400}
                            data={props.candidates}
                            onRowClick={(data) => {
                              console.log(data);
                            }}
                          >
                            <Column width={130}>
                              <HeaderCell>Full Name</HeaderCell>
                              <Cell dataKey="first_name" />
                            </Column>

                            <Column width={130}>
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
                                    <a
                                      href={`${mydata.fileURL}`}
                                      target="_blank"
                                    >
                                      Download CV
                                    </a>
                                  );
                                }}
                              </Cell>
                            </Column>
                          </Table>
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
