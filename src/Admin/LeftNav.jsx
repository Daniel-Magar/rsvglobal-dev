import React, { useContext, useState } from "react";
import { Button, Sidebar, Dropdown, Nav, Navbar, Sidenav } from "rsuite";

import { Routes, Route, Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const headerStyles = {
  padding: 18,
  paddingLeft: 54,
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

const LeftNav = () => {
  const [expand, setExpand] = React.useState(true);
  return (
    <>
      <Sidebar
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
        width={expand ? 260 : 56}
        collapsible
        className="r-nav"
      >
        <Sidenav.Header>
          <div className="headerstyle" style={headerStyles}>
            <span
              style={{ color: "#F74749", marginLeft: "18", fontSize: "28px" }}
            >
              RSV
            </span>{" "}
            &nbsp;
            <span style={{ color: "#fff", fontSize: "28px" }}>Global</span>
          </div>
          {/* <span style={{ marginLeft: 12 }}> RSV Global</span> */}
        </Sidenav.Header>
        <Sidenav
          expanded={expand}
          defaultOpenKeys={["3"]}
          className="sidelist"
          appearance="subtle"
        >
          <Sidenav.Body className="r-nav">
            <Nav className="nav-bar">
              <Nav.Item className="nav-item" eventKey="1" active>
                <Link to="/admin">
                  <i className="bx bxs-dashboard icn" />
                  <span>Dashboard</span>
                </Link>
              </Nav.Item>
              <Nav.Item className="nav-item" eventKey="2">
                <Link to="/admin/candidates">
                  {" "}
                  <i className="bx bxs-group icn"></i>
                  <span>Candidates</span>
                </Link>
              </Nav.Item>
              <Nav.Item className="nav-item" eventKey="3">
                <Link to="/admin/postjobs">
                  <i class="bx bx-edit icn" />
                  <span>Post Jobs</span>
                </Link>
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>

        <NavToggle
          className="r-nav-toggle"
          expand={expand}
          onChange={() => setExpand(!expand)}
        />
      </Sidebar>
    </>
  );
};
const NavToggle = ({ expand, onChange }) => {
  const [error, setError] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);
  const handleLogout = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        console.log("loging out");
        dispatch({ type: "LOGOUT", payload: null });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };
  const { currentUser } = useContext(AuthContext);
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Navbar.Body className="rnav">
        <Nav>
          <Dropdown
            placement="topStart"
            trigger="click"
            renderTitle={(children) => {
              // return <Cog style={iconStyles} />;
            }}
          >
            <Dropdown.Item>Help</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>
              <Button onClick={handleLogout}>Log out</Button>
            </Dropdown.Item>
          </Dropdown>
        </Nav>

        <Nav pullRight>
          <Nav.Item
            onClick={onChange}
            style={{ width: 56, textAlign: "center" }}
          >
            {expand ? (
              <i class="bx bx-chevron-left icn"></i>
            ) : (
              <i class="bx bx-chevron-right icn"></i>
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};
export default LeftNav;
