import React, { useState, useEffect, useRef } from "react";
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
import ProgressBar from "./ProgressBar";
import { CheckPicker, Checkbox, Button, SelectPicker, Schema } from "rsuite";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import {
  collection,
  addDoc,
  Timestamp,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import { storage } from "../firebase-config";
import { db } from "../firebase-config";

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

const { StringType, NumberType } = Schema.Types;

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

  const [jobpref, setJobpref] = React.useState(null);
  const [eduvalue, setEduvalue] = React.useState(null);
  const [vaccine, setVaccine] = React.useState(null);
  const reference = useRef(null);

  const location = useLocation();
  const selectedItem = location.state;

  const [selectedData, setSelectedData] = useState(selectedItem);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [altPhNumber, setAltPhNumber] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [relvExperience, setRelvExperience] = useState("");
  const [currentLastEmp, setCurrentLastEmp] = useState("");
  const [currentLastRole, setCurrentLastRole] = useState("");
  const [selfNoticePeriod, setSelfNoticePeriod] = useState("");
  const [currentCTC, setCurrentCTC] = useState("");
  const [expectedCTC, setExpectedCTC] = useState("");

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [status, setStatus] = useState("");

  const [isFilePicked, setIsFilePicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [showResults, setShowResults] = React.useState(false);
  const [showMsg, setShowMsg] = React.useState(false);
  const [msg, setMsg] = useState("");

  function randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);

    setIsFilePicked(true);
    setShowResults(true);
    // setShowMsg(false);
  };

  const [querydata, setQuerydata] = useState([]);
  useEffect(() => {
    try {
      const colRef = collection(db, "candidates");
      const q = query(
        colRef,

        where("emial_id", "==", email)
      );
      onSnapshot(q, (snapshot) => {
        let asperquery = [];
        snapshot.docs.forEach((doc) => {
          asperquery.push({ ...doc.data(), id: doc.id });
        });
        console.log(asperquery);
        setQuerydata(asperquery);
      });
    } catch (error) {}
  }, [email]);

  ////////////////////// Validation use effect////////////////////////////////
  useEffect(() => {
    if (eduvalue != null) {
      setValmsg({
        ...valmsg,
        eduvalue: null,
      });
    }
  }, [eduvalue]);
  useEffect(() => {
    if (value.length != 0) {
      setValmsg({
        ...valmsg,
        value: null,
      });
    }
  }, [value]);
  useEffect(() => {
    if (vaccine != null) {
      setValmsg({
        ...valmsg,
        vaccine: null,
      });
    }
  }, [vaccine]);
  useEffect(() => {
    if (selectedFile != null || selectedFile != undefined) {
      setValmsg({
        ...valmsg,
        selectedFile: null,
      });
    }
  }, [selectedFile]);

  // applying job
  const [valmsg, setValmsg] = useState({});

  const applyJob = (e) => {
    e.preventDefault();
    if (!eduvalue) {
      console.log("Please Enter Full Name");
      setValmsg({
        ...valmsg,
        eduvalue: "Please Select Qualification",
      });
      return;
    }
    if (value.length == 0) {
      setValmsg({
        ...valmsg,
        value: "Please Select Languages",
      });
      return;
    }
    if (!vaccine) {
      setValmsg({
        ...valmsg,
        vaccine: "Please Select One!",
      });
      return;
    }
    var file = selectedFile;

    if (!file) {
      setValmsg({
        ...valmsg,
        selectedFile: "Please Upload CV!",
      });
      return;
    }
    if (file.size > 2048000) {
      setValmsg({
        ...valmsg,
        selectedFile:
          "File Size too big, Please upload a file not more than 2 MB!",
      });

      return;
    }
    let random = randomString(
      6,
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );

    for (let i in querydata) {
      console.log("input emails", email);

      if (email === querydata[i].emial_id) {
        console.log("Duplicate");
        setMsg("User existing! Please enter new valid email id. ");
        setValmsg({
          ...valmsg,
          email: "User existing! Please enter new valid email id.",
        });

        window.scrollTo(0, 0);

        return;
      }
    }
    const filename = file.name.replace(/(\.[\w\d_-]+)$/i, random);
    const storageRef = ref(storage, `resume/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    try {
      // addDoc(collection(db, "job_posts"), {
      //   job_post_id: selectedData.data.id,
      //   jobtitle: selectedData.data.jobtitle,
      //   qualification_reqd: selectedData.data.qualification,
      //   jobdescrp: selectedData.data.jobdescrp,
      //   skill: selectedData.data.skill,
      //   noticeperiod: selectedData.data.noticeperiod,
      //   applied_type: "Job Post",
      //   full_name: fullname,
      //   gender: gender,
      //   email_id: email,
      // phone_no: phoneNumber,
      // alt_ph_no: altPhNumber,
      // qualification: eduvalue,
      // languages_known: value,
      // total_experience: experience,
      // relevant_experience: relvExperience,
      // currentLastEmployee: currentLastEmp,
      // currentLastJobRole: currentLastRole,
      // job_preference: jobpref,
      // candidate_noticeperiod: selfNoticePeriod,
      //current_ctc: currentCTC,
      //expected_ctc: expectedCTC,
      // vaccinated: vaccine,
      //    applied_date: selectedDate,
      //   timestamp: Timestamp.now(),
      // });
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setInterval(() => setShowMsg(false), 3000);
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            let temp = downloadURL;
            setImgUrl(temp);
            console.log("url --------------", downloadURL);

            addDoc(collection(db, "candidates"), {
              job_post_id: selectedData.data.id,
              jobtitle: selectedData.data.jobtitle,
              qualification_reqd: selectedData.data.qualification,
              jobdescrp: selectedData.data.jobdescrp,
              skill: selectedData.data.skill,
              noticeperiod: selectedData.data.noticeperiod,
              applied_type: "Job Post",
              first_name: fullname,
              gender: gender,
              emial_id: email,
              phone_no: phoneNumber,
              alt_ph_no: altPhNumber,
              qualification: eduvalue,
              languages_known: value,
              total_experience: experience,
              relevant_experience: relvExperience,
              currentLastEmployee: currentLastEmp,
              currentLastJobRole: currentLastRole,
              cuurent_location: currentLocation,
              preferred_location: preferredLocation,
              job_preference: jobpref,
              candidate_noticeperiod: selfNoticePeriod,
              current_ctc: currentCTC,
              expected_ctc: expectedCTC,
              vaccinated: vaccine,
              applied_date: selectedDate,
              fileURL: downloadURL,
              timestamp: Timestamp.now(),
            });
          });
        }
      );
    } catch (error) {
      setMsg("Oops! Please try again.");
      setShowMsg(true);
      e.target.reset();

      // setInterval(() => setShowMsg(false), 4000);
    }
    setValue([]);
    setJobpref(null);
    setEduvalue(null);
    setVaccine(null);
    e.target.reset();
    setInterval(() => setShowResults(false), 4000);
    setStatus("Completed!");
  };

  const classes = useStyles({
    // color: "red",
    width: "100%",
    height: 0,
  });
  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const [mycustDate, setMycustDate] = useState();
  const [mydate, setMydate] = useState();
  const [finalDate, setFinalDate] = useState();

  useEffect(() => {
    setMydate(selectedData.data);
    console.log("==========================", mydate?.timestamp);
    var d = new Date(mydate?.timestamp?.seconds * 1000);
    console.log("uuuuuuuuuuuuuuuuuuuuu", d);
    var cdte = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    console.log(cdte);
    setFinalDate(cdte);
  }, [mydate]);
  return (
    <>
      <div>
        <TopNav />
        <section id="applyjob" className="career">
          <div className="career-flex-container">
            <div className="flex-item">
              <div className="card upldcard" style={{ height: "auto" }}>
                <div className="jobsinfo">
                  <div className="jobinfo-head">
                    <i className="bx bxs-info-square icn-apply"></i>
                  </div>
                  <div style={{ width: "100%" }}>
                    <h5>Job Details</h5>
                  </div>
                </div>
                <div>
                  <div class="info-grid-container">
                    <div class="info-grid-item">
                      <b>Role: </b>

                      <span>{selectedData.data.jobtitle}</span>
                    </div>
                    <div class="info-grid-item">
                      <b>Skill Required: </b>
                      <span>{selectedData.data.skill}</span>
                    </div>
                    <div class="info-grid-item">
                      <b>Job Description: </b>
                      <span>{selectedData.data.jobdescrp}</span>
                    </div>
                    <div class="info-grid-item">
                      <b>Qualification: </b>
                      <span>{selectedData.data.qualification}</span>
                    </div>
                    <div class="info-grid-item">
                      <b>Notice Period: </b>
                      <span>{selectedData.data.noticeperiod}</span>
                    </div>
                    <div class="info-grid-item">
                      <b>Job Posted On: </b>

                      <span>{finalDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="career-flex-container">
            <div className="career-flex-item-left">
              <div className="card upldcard" style={{ height: "auto" }}>
                <div className="container">
                  <form className="applyform" onSubmit={applyJob}>
                    <div className="wrapper">
                      <div className="box a">
                        <label for="fname">Full Name</label>
                        <input
                          type="text"
                          id="fname"
                          name="fname"
                          onChange={(e) => setFullname(e.target.value)}
                          required
                        />
                        {/* {valmsg.fullname && <h6>{valmsg.fullname}</h6>} */}
                      </div>
                      <div className="box b">
                        <label for="gender">Gender</label>
                        <div
                          className="cus_radio"
                          onChange={(event) => setGender(event.target.value)}
                        >
                          <label className="cust_label">
                            <input
                              className="cust_inp"
                              type="radio"
                              name="gender"
                              value="Male"
                              required
                            />
                            <span>Male</span>
                          </label>
                          <label className="cust_label">
                            <input
                              className="cust_inp"
                              type="radio"
                              name="gender"
                              value="Female"
                            />
                            <span>Female</span>
                          </label>
                          <label className="cust_label">
                            <input
                              className="cust_inp"
                              type="radio"
                              name="gender"
                              value="Prefer not to say"
                            />
                            <span>Prefer not to say</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="wrapper">
                      <div className="box a">
                        <label for="gender">Email Address</label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <div className="tooltip">
                          {valmsg.email && (
                            <span className="tooltiptext">
                              <div className="toolbody">
                                <div>
                                  <i className="bx bxs-info-square reqrd"></i>
                                </div>
                                <div>{valmsg.email}</div>
                              </div>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="box b">
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
                    <div className="wrapper">
                      <div className="box a">
                        <label for="phno">Phone Number</label>

                        <input
                          type="tel"
                          id="phno"
                          pattern="[0-9]{10}"
                          name="phno"
                          min="10"
                          max="10"
                          maxLength="10"
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                        />
                        <span className="validity"></span>
                      </div>
                      <div className="box b">
                        <label for="altphno">Alternate Phone Number</label>
                        <input
                          type="tel"
                          id="altphno"
                          name="altphno"
                          pattern="[0-9]{10}"
                          max="10"
                          min="10"
                          maxLength="10"
                          onChange={(e) => setAltPhNumber(e.target.value)}
                          required
                        />
                        <span className="validity"></span>
                      </div>
                    </div>
                    <div className="wrapper">
                      <div className="box a">
                        <label for="location">Current Location</label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          onChange={(e) => setCurrentLocation(e.target.value)}
                          required
                        />
                      </div>
                      <div className="box b">
                        <label for="prelocation">Preferred Location</label>
                        <input
                          type="text"
                          id="prelocation"
                          name="prelocation"
                          onChange={(e) => setPreferredLocation(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="wrapper">
                      <div className="box a">
                        <label for="eduqual">
                          Highest Education Qualification
                        </label>

                        <SelectPicker
                          value={eduvalue}
                          onChange={setEduvalue}
                          data={qaulif}
                          name="eduqual"
                          block
                          style={{ marginTop: "5px" }}
                          searchable={false}
                        />
                        <div className="tooltip">
                          {valmsg.eduvalue && (
                            <span className="tooltiptext">
                              <div className="toolbody">
                                <div>
                                  <i className="bx bxs-info-square reqrd"></i>
                                </div>
                                <div> {valmsg.eduvalue}</div>
                              </div>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="box b">
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
                            searchable={false}
                          />
                          <div className="tooltip">
                            {valmsg.value && (
                              <span className="tooltiptext">
                                <div className="toolbody">
                                  <div>
                                    <i className="bx bxs-info-square reqrd"></i>
                                  </div>
                                  <div> {valmsg.value}</div>
                                </div>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="wrapper">
                      <div className="box a">
                        <label for="experience">
                          Total Experience (in Years)
                        </label>
                        <input
                          type="text"
                          id="experience"
                          name="experience"
                          onChange={(e) => setExperience(e.target.value)}
                          required
                        />
                      </div>
                      <div className="box b">
                        <label for="rexperience">
                          Relevant Experience (in Years)
                        </label>
                        <input
                          type="text"
                          id="rexperience"
                          name="rexperience"
                          onChange={(e) => setRelvExperience(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="wrapper">
                      <div className="box a">
                        <label for="company">
                          Current/Last Employee or Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          onChange={(e) => setCurrentLastEmp(e.target.value)}
                          required
                        />
                      </div>
                      <div className="box b">
                        <label for="role">Current/Last Job Role</label>
                        <input
                          type="text"
                          id="role"
                          name="role"
                          onChange={(e) => setCurrentLastRole(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="wrapper">
                      <div className="box a">
                        <label for="jpreference">Job Preference</label>
                        <SelectPicker
                          value={jobpref}
                          onChange={setJobpref}
                          data={jobprefrence}
                          block
                          style={{ marginTop: "5px" }}
                          searchable={false}
                        />
                      </div>
                      <div className="box b">
                        <label for="notice">Notice Period (Days)</label>
                        <input
                          type="text"
                          id="notice"
                          name="notice"
                          onChange={(e) => setSelfNoticePeriod(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="wrapper">
                      <div className="box a">
                        <label for="clocation">Current CTC (LPA)</label>
                        <input
                          type="number"
                          id="experience"
                          name="experience"
                          onChange={(e) => setCurrentCTC(e.target.value)}
                          required
                          maxLength="2"
                        />
                      </div>
                      <div className="box b">
                        <label for="clocation">Expected CTC (LPA)</label>
                        <input
                          type="text"
                          id="experience"
                          name="experience"
                          onChange={(e) => setExpectedCTC(e.target.value)}
                          required
                          maxLength="2"
                        />
                      </div>
                    </div>
                    <div className="wrapper">
                      <div className="box a">
                        <label for="clocation">
                          Are you 100% vaccinated for Covid-19?{" "}
                        </label>
                        <SelectPicker
                          value={vaccine}
                          onChange={setVaccine}
                          data={vaccinated}
                          block
                          style={{ marginTop: "5px" }}
                          searchable={false}
                        />
                        <div className="tooltip">
                          {valmsg.vaccine && (
                            <span className="tooltiptext">
                              <div className="toolbody">
                                <div>
                                  <i className="bx bxs-info-square reqrd"></i>
                                </div>
                                <div> {valmsg.vaccine}</div>
                              </div>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="box b">
                        <div className="up">
                          <div className="upd-file">
                            <label class="btn fileUpload btn-default">
                              Select file
                              <input
                                type="file"
                                hidden=""
                                accept={".pdf"}
                                onChange={changeHandler}
                                ref={reference}
                              />
                              <i
                                class="bx bx-file"
                                style={{
                                  color: "white",
                                  fontSize: "20px",
                                }}
                              ></i>
                              <div className="tooltip">
                                {valmsg.selectedFile && (
                                  <span
                                    className="tooltiptext"
                                    style={{
                                      zIndex: "1!important",
                                      bottom: "100%!important",
                                      left: "50%!important",
                                      marginLeft: "-60px!important",
                                    }}
                                  >
                                    <div
                                      className="toolbody"
                                      style={{ width: "100%" }}
                                    >
                                      <div>
                                        <i className="bx bxs-info-square reqrd"></i>
                                      </div>
                                      <div>{valmsg.selectedFile}</div>
                                    </div>
                                  </span>
                                )}
                              </div>
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
                        <div>
                          {showResults ? (
                            <Results
                              imgUrl={imgUrl}
                              progresspercent={progresspercent}
                              status={status}
                              isFilePicked={isFilePicked}
                              selectedFile={selectedFile}
                            />
                          ) : null}
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
const Results = (props) => (
  <div id="results" className="search-results">
    <div>
      {!props.imgUrl && (
        <div className="outerbar">
          <div className="App">
            <ProgressBar
              bgcolor="rgb(247, 71, 73)"
              completed={props.progresspercent}
            />
          </div>
        </div>
      )}
      {props.imgUrl && <h1>{props.status}</h1>}

      {props.isFilePicked ? (
        <div>
          <p>Filename: {props.selectedFile.name}</p>

          <p>Filetype: {props.selectedFile.type}</p>

          <p>Size: {props.selectedFile.size / 1000} kB</p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
    </div>
  </div>
);
export default ApplyJob;
