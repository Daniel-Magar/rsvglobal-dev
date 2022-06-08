import React, { useContext, useEffect } from "react";
import "../contact.css";
import { BusinessRequiredContext } from "../context/BussinessRquiredContext";
import { CheckPicker, Checkbox, Button } from "rsuite";
import {
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase-config";

const Contact = () => {
  const [value, setValue] = React.useState([]);
  const picker = React.useRef();
  const footerStyles = {
    padding: "10px 2px",
    borderTop: "1px solid #e5e5e5",
  };

  const footerButtonStyle = {
    float: "right",
    marginRight: 10,
    marginTop: 2,
  };

  const [buzReqd, setBuzReqd] = useContext(BusinessRequiredContext);

  const allValue = buzReqd.map((item) => item.value);
  const handleChange = (value) => {
    setValue(value);
  };

  const handleCheckAll = (value, checked) => {
    setValue(checked ? allValue : []);
  };

  return (
    <>
      <div className="cont">
        <div className="abt-main contact-abt">
          <div className="about-section">
            <div className="contact">
              <div className="contact-container">
                <h4 className="cont-h">
                  Contact us for your Business Requirements
                </h4>
                <form className="contact-form">
                  <div className="form-content">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="companyname" />
                    <label htmlFor="companyname">Company Name</label>
                    <input type="text" name="companyname" />
                    <label htmlFor="designation">Designation</label>
                    <input type="text" name="designation" />
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" name="phone" />
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" />
                    <label for="clocation">Requirement</label>
                    <div className="example-item" style={{ marginTop: "5px" }}>
                      <CheckPicker
                        data={buzReqd}
                        ref={picker}
                        block
                        value={value}
                        onChange={handleChange}
                        renderExtraFooter={() => (
                          <div style={footerStyles}>
                            <Checkbox
                              inline
                              indeterminate={
                                value.length > 0 &&
                                value.length < allValue.length
                              }
                              checked={value.length === allValue.length}
                              onChange={handleCheckAll}
                            >
                              Check all
                            </Checkbox>

                            <Button
                              style={footerButtonStyle}
                              appearance="primary"
                              size="sm"
                              onClick={() => {
                                picker.current.close();
                              }}
                            >
                              Ok
                            </Button>
                          </div>
                        )}
                        searchable={false}
                      />
                    </div>
                    <div className="btn-div">
                      <button className="contact-btn btn-right" type="submit">
                        <div className="btn-content">
                          <div className="btn-sub">Submit</div>
                          <div className="btn-sub">
                            <i
                              class="bx bx-check"
                              style={{
                                color: "white",
                                fontSize: "22px",
                              }}
                            ></i>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
