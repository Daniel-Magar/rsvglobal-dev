import React, { useContext, useEffect, useState } from "react";
import "../contact.css";
import { BusinessRequiredContext } from "../context/BussinessRquiredContext";
import { CheckPicker, Checkbox, Button } from "rsuite";
import {
  collection,
  addDoc,
  Timestamp,
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
  const [fullname, setFullname] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [valmsg, setValmsg] = useState();
  const contact = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "business"), {
        Name: fullname,
        Company: company,
        Designation: designation,
        PhoneNo: phoneNumber,
        Email: email,
        Requirement: value,
        timestamp: Timestamp.now(),
      });

      setValmsg("Data Posted Succesfully!");
      setTimeout(function () {
        setValmsg("");
      }, 3000);
    } catch (error) {
      alert("Oops! Something went wrong.");
      setValmsg("Oops! Something went wrong.!");
      setTimeout(function () {
        setValmsg("");
      }, 3000);
    }
    e.target.reset();
    setValue(null);
  };

  return (
    <>
      <div className="cont">
        <div className="contact-main contact-abt">
          <div className="about-section">
            <div className="contact">
              <div className="contact-container">
                <h4 className="cont-h">
                  Tell us about yourself, we will connect.
                </h4>
                <form className="contact-form" onSubmit={contact}>
                  <div className="form-content">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="companyname"
                      onChange={(e) => setFullname(e.target.value)}
                      required
                    />
                    <label htmlFor="companyname">Company</label>
                    <input
                      type="text"
                      name="companyname"
                      onChange={(e) => setCompany(e.target.value)}
                      required
                    />
                    <label htmlFor="designation">Designation</label>
                    <input
                      type="text"
                      name="designation"
                      onChange={(e) => setDesignation(e.target.value)}
                      required
                    />
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
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
                    <div className="tooltip">
                      {valmsg && (
                        <span className="tooltiptext">
                          <div className="toolbody">
                            <div>
                              <i className="bx bxs-info-square reqrd"></i>
                            </div>
                            <div>{valmsg}</div>
                          </div>
                        </span>
                      )}
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
