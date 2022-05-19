import React, { useState } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  Sidebar,
  Dropdown,
  Nav,
  Navbar,
  Sidenav,
} from "rsuite";
import DashboardIcon from "@rsuite/icons/Dashboard";
import "rsuite/dist/rsuite.min.css"; // or 'rsuite/dist/rsuite.min.css'
import "../rsuit.css";
import CandidateList from "./CandidateList";

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
  // useEffect(() => {
  //   const colRef = collection(db, "candidates");
  //   getDocs(colRef)
  //     .then((snapshot) => {
  //       let productdb = [];
  //       snapshot.docs.forEach((doc) => {
  //         productdb.push({ ...doc.data(), id: doc.id });
  //       });
  //       // console.log(online);
  //       setProduct(productdb);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  const [expand, setExpand] = React.useState(true);
  const [candlist, setCandlist] = useState();
  return (
    <div className="show-fake-browser sidebar-page">
      <Container>
        <Sidebar
          style={{ display: "flex", flexDirection: "column" }}
          width={expand ? 260 : 56}
          collapsible
          className="r-nav"
        >
          <Sidenav.Header>
            <div style={headerStyles}>
              {/* <LogoAnalytics style={{ fontSize: 20 }} /> */}
              <span style={{ marginLeft: 12 }}> BRAND</span>
            </div>
          </Sidenav.Header>
          <Sidenav
            expanded={expand}
            defaultOpenKeys={["3"]}
            appearance="subtle"
          >
            <Sidenav.Body className="r-nav">
              <Nav>
                <Nav.Item
                  eventKey="1"
                  active
                  icon={<i className="bx bxs-dashboard icn" />}
                >
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<i className="bx bxs-group"></i>}>
                  Candidates
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

        <Container>
          <Header>
            <h3>Admin</h3>
          </Header>
          <Content>
            <div>
              <CandidateList candidates={props.candidates} />
            </div>
          </Content>
        </Container>
      </Container>
    </div>
  );
};
const NavToggle = ({ expand, onChange }) => {
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
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </Nav>

        <Nav pullRight>
          <Nav.Item
            onClick={onChange}
            style={{ width: 56, textAlign: "center" }}
          >
            {expand ? (
              <i class="bx bx-chevron-left"></i>
            ) : (
              <i class="bx bx-chevron-right"></i>
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

export default Admin;
