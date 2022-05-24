import React, { useState, useContext } from "react";
import { Container, Content } from "rsuite";

import "rsuite/dist/rsuite.min.css"; // or 'rsuite/dist/rsuite.min.css'
import "../cusrsuit.css";

import LeftNav from "./LeftNav";
import AdminBody from "./AdminBody";
import Welcome from "./Welcome";

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
            <Welcome />
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
