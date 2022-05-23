import React, { useState } from "react";
import { Container, Header, Content } from "rsuite";
import DashboardIcon from "@rsuite/icons/Dashboard";
import "rsuite/dist/rsuite.min.css"; // or 'rsuite/dist/rsuite.min.css'
import "../cusrsuit.css";

import LeftNav from "./LeftNav";
import AdminBody from "./AdminBody";

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: "#030441",
  color: " #fff",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

const iconStyles = {
  width: 56,
  height: 56,
  padding: 18,
  lineHeight: "56px",
  textAlign: "center",
};
const Admin = (props) => {
  return (
    <div className="show-fake-browser sidebar-page admin">
      <Container>
        <LeftNav />
        <Container>
          <div className="adminboard">
            <Header>
              <h3>Welcome Admin</h3>
            </Header>
            <Content>
              <div id="admin">
                <AdminBody
                  candidates={props.candidates}
                  jobposts={props.jobposts}
                />
              </div>
            </Content>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default Admin;
