import React from "react";

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
import Welcome from "./Welcome";
import LeftNav from "./LeftNav";

const Clients = () => {
  return (
    <>
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
              </Container>
            </div>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Clients;
