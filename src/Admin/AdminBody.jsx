import React from "react";
import { Grid, Row, Col, Panel } from "rsuite";

const AdminBody = () => {
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
                  <h2 className="htxt">54</h2>
                </Col>
              </Panel>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Panel header="Total Job Posts" bordered>
                <Col xs={24} sm={24} md={6}>
                  <i class="bx bxs-hard-hat adminicon"></i>
                </Col>
                <Col xs={24} sm={24} md={6}>
                  <h2 className="htxt">54</h2>
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
              <Panel header="Lorem" bordered></Panel>
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
