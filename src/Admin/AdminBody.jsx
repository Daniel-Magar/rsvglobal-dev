import React, { useEffect, useState } from "react";
import { Grid, Row, Col, Panel } from "rsuite";
import { Chart } from "react-google-charts";

export const options = {
  chart: {
    title: "Random Apply vs Job Posts",
    subtitle: "in millions of dollars (USD)",
  },
};

const AdminBody = (props) => {
  console.log("admin body candidates", props.candidates);
  const [candistesCount, setCandidateCount] = useState(0);
  const [jobpostCount, setJobpostCount] = useState(0);
  useEffect(() => {
    let candidatelist = props.candidates;
    let len = candidatelist.length;
    console.log(len);
    setCandidateCount(len);
  }, [props]);

  useEffect(() => {
    let totaljobpost = props.jobposts;
    let len2 = totaljobpost.length;
    setJobpostCount(len2);
  }, [props.jobposts]);

  const candidatevsjobs = [
    ["Random vs Job Posts", "Job Posts", "Job Provided"],
    [candistesCount, jobpostCount, 55],
  ];

  return (
    <>
      <div>
        <Grid fluid>
          <Row className="show-grid">
            <Col xs={24} sm={24} md={6}>
              <Panel header="Total Candidates" bordered>
                <Col xs={24} sm={24} md={6}>
                  <i className="bx bxs-group adminicon"></i>
                </Col>
                <Col xs={24} sm={24} md={6}>
                  <h2 className="htxt">{candistesCount}</h2>
                </Col>
              </Panel>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Panel header="Total Job Posts" bordered>
                <Col xs={24} sm={24} md={6}>
                  <i class="bx bxs-hard-hat adminicon"></i>
                </Col>
                <Col xs={24} sm={24} md={6}>
                  <h2 className="htxt">{jobpostCount}</h2>
                </Col>
              </Panel>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Panel header="Total Jobs Provided" bordered>
                <Col xs={24} sm={24} md={6}>
                  <i class="bx bxs-briefcase-alt-2 adminicon"></i>
                </Col>
                <Col xs={24} sm={24} md={6}>
                  <h2 className="htxt">5</h2>
                </Col>
              </Panel>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Panel header="Total Employers" bordered>
                <Col xs={24} sm={24} md={6}>
                  <i class="bx bxs-building-house adminicon"></i>
                </Col>
                <Col xs={24} sm={24} md={6}>
                  <h2 className="htxt">30</h2>
                </Col>
              </Panel>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={24} sm={24} md={12}>
              <Panel header="Lorem" bordered>
                <Chart
                  chartType="Line"
                  width="100%"
                  height="400px"
                  data={candidatevsjobs}
                  options={options}
                />
              </Panel>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Panel header="Lorem" bordered></Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    </>
  );
};

export default AdminBody;
