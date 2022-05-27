import React, { useState, useEffect } from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import "../applyjobs.css";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  makeStyles,
  createStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { CheckPicker, Checkbox, Button, SelectPicker } from "rsuite";

const useStyles = makeStyles(() =>
  createStyles({
    componentStyle: {
      verticalAlign: "middle",
      fontSize: "12px",
      width: (params) => (params.width ? params.width : "auto"),

      "& fieldset": {
        border: "solid 1px #ccc;",
      },
      "& .MuiInputBase-root": {
        height: (params) => (params.height ? params.height : "auto"),
        color: (params) => (params.color ? params.color : "inherit"),
      },
    },
  })
);

const theme = createMuiTheme({
  overrides: {
    MuiTextField: {
      root: {
        verticalAlign: "middle",
        fontSize: "12px",
        width: 150,
        "& fieldset": {
          border: "solid 1px #ccc;",
        },
      },
    },
  },
});

const footerStyles = {
  padding: "10px 2px",
  borderTop: "1px solid #e5e5e5",
};

const footerButtonStyle = {
  float: "right",
  marginRight: 10,
  marginTop: 2,
};

const data = [
  { value: "English", label: "English" },
  { value: "Hindi", label: "Hindi" },
  { value: "Tamil", label: "Tamil" },
];
const qaulif = [
  { value: "Post-Graduate", label: "Post-Graduate" },
  { value: "Graduate", label: "Graduate" },
  { value: "12th Pass", label: "12th Pass" },
  { value: "10th Pass", label: "10th Pass" },
  { value: "8th Pass", label: "8th Pass" },
];
const jobprefrence = [
  { value: "Angular Developer", label: "Angular Developer" },
  { value: "Backend Developer", label: "Backend Developer" },
  { value: "React Developer", label: "eact Developer" },
  { value: "Java Developer", label: "Java Developer" },
  { value: "Python Developer", label: "Python Developer" },
];
const vaccinated = [
  { value: "Yes", label: "Yes" },
  { value: "Partial", label: "Partial" },
  { value: "No", label: "No" },
];
const allValue = data.map((item) => item.value);
const ApplyJob = () => {
  //   console.log("Geting data on button click:", props.selected_data);

  const picker = React.useRef();
  const [value, setValue] = React.useState([]);

  const handleChange = (value) => {
    setValue(value);
  };

  const handleCheckAll = (value, checked) => {
    setValue(checked ? allValue : []);
  };

  const [eduvalue, setEduvalue] = React.useState(null);

  const location = useLocation();
  const selectedData = location.state;

  const [selectedDate, setSelectedDate] = useState(new Date());

  const classes = useStyles({
    // color: "red",
    width: "100%",
    height: 0,
  });
  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  return (
    <>
      <div>
        <TopNav />
        <section id="applyjob" className="career">
          <div>{selectedData.data.jobtitle}</div>
          <div className="career-flex-container">
            <div className="career-flex-item-left">
              <div className="card upldcard" style={{ height: "auto" }}>
                <div className="container">
                  <form className="applyform">
                    <div class="wrapper">
                      <div class="box a">
                        <label for="fname">Fuull Name</label>
                        <input
                          type="text"
                          id="fname"
                          name="fname"
                          // value="John"
                        />
                      </div>
                      <div class="box b">
                        <label for="gender">Gender</label>
                        <div className="cus_radio">
                          <label className="cust_label">
                            <input
                              className="cust_inp"
                              type="radio"
                              name="radio"
                            />
                            <span>Male</span>
                          </label>
                          <label className="cust_label">
                            <input
                              className="cust_inp"
                              type="radio"
                              name="radio"
                            />
                            <span>Female</span>
                          </label>
                          <label className="cust_label">
                            <input
                              className="cust_inp"
                              type="radio"
                              name="radio"
                            />
                            <span>Prefer not to say</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="wrapper">
                      <div class="box a">
                        <label for="gender">Email Address</label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          // onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                      <div class="box b">
                        <label for="gender">Date of Birth</label>
                        <ThemeProvider theme={theme}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <div
                              style={{
                                display: "inline-flex",
                                flexDirection: "column",
                                gap: 10,
                                width: "100%",
                              }}
                            >
                              <KeyboardDatePicker
                                value={selectedDate}
                                inputVariant="outlined"
                                onChange={handleDateChange}
                                className={`muiinp ${classes.componentStyle}`}
                              />
                            </div>
                          </MuiPickersUtilsProvider>
                        </ThemeProvider>
                      </div>
                    </div>
                    <div class="wrapper">
                      <div class="box a">
                        <label for="fullname">Phone Number</label>
                        <input
                          type="text"
                          id="phno"
                          name="phno"
                          //   onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                      <div class="box b">
                        <label for="altphno">Alternate Phone Number</label>
                        <input
                          type="text"
                          id="altphno"
                          name="altphno"
                          //   onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div class="wrapper">
                      <div class="box a">
                        <label for="clocation">Current Location</label>
                        <input
                          type="text"
                          id="clocation"
                          name="clocation"
                          //   onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                      <div class="box b">
                        <label for="prelocation">Preferred Location</label>
                        <input
                          type="text"
                          id="prelocation"
                          name="prelocation"
                          //   onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div class="wrapper">
                      <div class="box a">
                        <label for="prelocation">
                          Highest Education Qualification
                        </label>

                        <SelectPicker
                          value={eduvalue}
                          onChange={setEduvalue}
                          data={qaulif}
                          block
                          style={{ marginTop: "5px" }}
                        />
                      </div>
                      <div class="box b">
                        <label for="clocation">Languages Known</label>
                        <div
                          className="example-item"
                          style={{ marginTop: "5px" }}
                        >
                          <CheckPicker
                            data={data}
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
                          />
                        </div>
                      </div>
                    </div>
                    <div class="wrapper">
                      <div class="box a">
                        <label for="clocation">Total Experience</label>
                        <input
                          type="text"
                          id="rexperience"
                          name="rexperience"
                          // onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                      <div class="box b">
                        <label for="clocation">Relevant Experience</label>
                        <input
                          type="text"
                          id="experience"
                          name="experience"
                          //   onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div class="wrapper">
                      <div class="box a">
                        <label for="clocation">
                          Current/Last Employee or Company
                        </label>
                        <input
                          type="text"
                          id="rexperience"
                          name="rexperience"
                          // onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                      <div class="box b">
                        <label for="clocation">Current/Last Job Role</label>
                        <input
                          type="text"
                          id="experience"
                          name="experience"
                          //   onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div class="wrapper">
                      <div class="box a">
                        <label for="clocation">Job Preference</label>
                        <SelectPicker
                          value={jobprefrence}
                          onChange={setEduvalue}
                          data={jobprefrence}
                          block
                          style={{ marginTop: "5px" }}
                        />
                      </div>
                      <div class="box b">
                        <label for="clocation">Notice Period</label>
                        <input
                          type="text"
                          id="experience"
                          name="experience"
                          //   onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div class="wrapper">
                      <div class="box a">
                        <label for="clocation">Current CTC</label>
                        <input
                          type="text"
                          id="experience"
                          name="experience"
                          //   onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                      <div class="box b">
                        <label for="clocation">Expected CTC</label>
                        <input
                          type="text"
                          id="experience"
                          name="experience"
                          //   onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div class="wrapper">
                      <div class="box a">
                        <label for="clocation">
                          Are you 100% vaccinated for Covid-19?{" "}
                        </label>
                        <SelectPicker
                          value={jobprefrence}
                          onChange={setEduvalue}
                          data={vaccinated}
                          block
                          style={{ marginTop: "5px" }}
                        />
                      </div>
                      <div class="box b">
                        <div className="up">
                          <div className="upd-file">
                            <label class="btn fileUpload btn-default">
                              Select file
                              <input
                                type="file"
                                hidden=""
                                accept={".pdf"}
                                // onChange={changeHandler}
                                // ref={reference}
                              />
                              <i
                                class="bx bx-file"
                                style={{
                                  color: "white",
                                  fontSize: "20px",
                                }}
                              ></i>
                            </label>
                            <button className="btn-upload" type="submit">
                              <div className="btn-content">
                                <div className="btn-sub">Upload</div>
                                <div className="btn-sub">
                                  <i
                                    class="bx bx-upload"
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
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default ApplyJob;
