import React, { useState, useEffect, useRef, useContext } from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import "../form.css";
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
import { LocationContext } from "../context/LocationContext";
import { QualificationContext } from "../context/QualificationContext";
import { LanguagesContext } from "../context/LanguagesContext";
import ReadMore from "../ReadMore";

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

const vaccinated = [
  { value: "Yes", label: "Yes" },
  { value: "Partial", label: "Partial" },
  { value: "No", label: "No" },
];
const allValue = data.map((item) => item.value);

const { StringType, NumberType } = Schema.Types;

const ApplyJob = () => {
  //   console.log("Geting data on button click:", props.selected_data);
  const [locationData, setLocationData] = useContext(LocationContext);
  const [qualificationData, setQualificationData] =
    useContext(QualificationContext);
  const [languagesData, setLanguagesData] = useContext(LanguagesContext);
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

    let extension = file.name.split(".").pop();

    const filename = file.name.replace(/(\.[\w\d_-]+)$/i, random);
    const storageRef = ref(storage, `resume/${filename + "." + extension}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    try {
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
              // alt_ph_no: altPhNumber,
              qualification: eduvalue,
              languages_known: value,
              total_experience: experience + "Year(s)",
              relevant_experience: relvExperience + "Year(s)",
              currentLastEmployee: currentLastEmp,
              currentLastJobRole: currentLastRole,
              cuurent_location: currentLocation,
              preferred_location: preferredLocation,
              job_preference: jobpref,
              candidate_noticeperiod: selfNoticePeriod + "Days",
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
    }
    setValue([]);
    setJobpref(null);
    setEduvalue(null);
    setVaccine(null);
    setCurrentLocation(null);
    setPreferredLocation(null);
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

    var d = new Date(mydate?.timestamp?.seconds * 1000);

    var cdte = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    console.log(cdte);
    setFinalDate(cdte);
  }, [mydate]);

  const [jobwithdot, setJobwithdot] = useState("");
  useEffect(() => {
    // let jobdescription = String(selectedData.data.jobdescrp);
    let str = String(selectedData.data.jobdescrp);

    // let strArr = str.split("\u25CF");
    let strArr = str.split("●");

    // let newStr = "\u25CF" + strArr.join("\n\u25CF");
    let newStr = "●" + strArr.join("\n●");

    setJobwithdot(newStr);

    setJobwithdot((state) => {
      console.log("Selected Job Description" + state);
      return state;
    });
  }, [selectedData.data]);
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
                  <div className="info-grid-container">
                    <div className="info-grid-item">
                      <b>
                        <i className="bx bxs-user-circle frm-i"></i> Role:
                      </b>

                      <span>
                        {selectedData.data.jobtitle} |
                        <i className="bx bx-file frm-i"></i>
                        Job Posted on:
                        {finalDate} | <i className="bx bx-calendar frm-i"></i>{" "}
                        Notiece Period:
                        {selectedData.data.noticeperiod}
                      </span>
                    </div>
                    <div class="info-grid-item">
                      <b>
                        <i className="bx bx-laptop frm-i"></i>Primary Skill
                        Required:{" "}
                      </b>
                      <span>
                        <div className="readmoreless">
                          {selectedData.data.skill.length >= 100 ? (
                            <ReadMore>{selectedData.data.skill}</ReadMore>
                          ) : (
                            <div>{selectedData.data.skill}</div>
                          )}
                        </div>
                      </span>
                    </div>
                    <div className="info-grid-item">
                      <b>
                        <i className="bx bxs-edit frm-i"></i>Description:{" "}
                      </b>
                      <div>
                        {selectedData.data.jobdescrp
                          .split("●")
                          .map((i, key) => {
                            return (
                              <div className="readmoreless" key={key}>
                                {/* <ReadMore>{"●" + i}</ReadMore> */}
                                {i.length >= 100 ? (
                                  <ReadMore>{"●" + i}</ReadMore>
                                ) : (
                                  <div>{"●" + i}</div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    <div class="info-grid-item">
                      <b>
                        <i className="bx bx-laptop frm-i"></i>Secondary Skill:{" "}
                      </b>
                      <span>
                        <div className="readmoreless">
                          {selectedData.data.secskill.length >= 80 ? (
                            <ReadMore>{selectedData.data.secskill}</ReadMore>
                          ) : (
                            <div>{selectedData.data.secskill}</div>
                          )}
                        </div>
                      </span>
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
                        <label for="fname">
                          <i className="bx bxs-user frm-i"></i>Full Name
                        </label>
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
                        <label for="gender">
                          <i className="bx bx-body frm-i"></i>Gender
                        </label>
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
                        <label for="gender">
                          <i className="bx bxs-envelope frm-i"></i>Email Address
                        </label>
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
                        <label for="phno">
                          <i className="bx bxs-phone frm-i"></i>Phone Number
                        </label>

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
                      {/* <div className="box b">
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
                      </div> */}
                    </div>
                    {/* <div className="wrapper">
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
                    </div> */}
                    <div className="wrapper">
                      <div className="box a">
                        <label for="location">
                          <i className="bx bxs-map frm-i"></i>Current Location
                        </label>
                        <SelectPicker
                          value={currentLocation}
                          onChange={setCurrentLocation}
                          data={locationData}
                          block
                        />
                        {/* <input
                          type="text"
                          id="location"
                          name="location"
                          onChange={(e) => setCurrentLocation(e.target.value)}
                          required
                        /> */}
                      </div>
                      <div className="box b">
                        <label for="prelocation">
                          <i className="bx bxs-map frm-i"></i>Preferred Location
                        </label>
                        <SelectPicker
                          value={preferredLocation}
                          onChange={setPreferredLocation}
                          data={locationData}
                          block
                        />
                        {/* <input
                          type="text"
                          id="prelocation"
                          name="prelocation"
                          onChange={(e) => setPreferredLocation(e.target.value)}
                          required
                        /> */}
                      </div>
                    </div>
                    <div className="wrapper">
                      <div className="box a">
                        <label for="eduqual">
                          <i className="bx bxs-graduation frm-i"></i> Highest
                          Education Qualification
                        </label>

                        <SelectPicker
                          value={eduvalue}
                          onChange={setEduvalue}
                          data={qualificationData}
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
                        <label for="clocation">
                          <i className="bx bxs-user-voice frm-i"></i>Languages
                          Known
                        </label>
                        <div
                          className="example-item"
                          style={{ marginTop: "5px" }}
                        >
                          <CheckPicker
                            data={languagesData}
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
                          <i className="bx bxs-briefcase frm-i"></i> Total
                          Experience (in Years)
                        </label>
                        <input
                          type="tel"
                          id="experience"
                          name="experience"
                          onChange={(e) => setExperience(e.target.value)}
                          min="2"
                          max="2"
                          maxLength="2"
                          required
                        />
                      </div>
                      <div className="box b">
                        <label for="rexperience">
                          <i className="bx bxs-briefcase frm-i"></i> Relevant
                          Experience (in Years)
                        </label>
                        <input
                          type="tel"
                          id="rexperience"
                          name="rexperience"
                          onChange={(e) => setRelvExperience(e.target.value)}
                          required
                          min="2"
                          max="2"
                          maxLength="2"
                        />
                      </div>
                    </div>
                    <div className="wrapper">
                      <div className="box a">
                        <label for="company">
                          <i className="bx bxs-building-house frm-i"></i>
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
                        <label for="role">
                          <i className="bx bxs-hard-hat frm-i"></i>Current/Last
                          Job Role
                        </label>
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
                        <label for="clocation">
                          <i className="bx bxs-wallet-alt frm-i"></i>Current CTC
                          (LPA)
                        </label>
                        <input
                          type="tel"
                          id="experience"
                          name="experience"
                          onChange={(e) => setCurrentCTC(e.target.value)}
                          required
                          min="2"
                          max="2"
                          maxLength="2"
                        />
                      </div>
                      <div className="box b">
                        <label for="clocation">
                          <i className="bx bxs-wallet-alt frm-i"></i>Expected
                          CTC (LPA)
                        </label>
                        <input
                          type="tel"
                          id="experience"
                          name="experience"
                          onChange={(e) => setExpectedCTC(e.target.value)}
                          required
                          min="2"
                          max="2"
                          maxLength="2"
                        />
                      </div>
                    </div>
                    <div className="wrapper">
                      <div className="box a">
                        <label for="notice">
                          <i className="bx bx-calendar frm-i"></i> Notice Period
                          (Days)
                        </label>
                        <input
                          type="tel"
                          id="notice"
                          name="notice"
                          min="2"
                          max="2"
                          maxLength="2"
                          onChange={(e) => setSelfNoticePeriod(e.target.value)}
                          required
                        />
                      </div>
                      <div className="box b">
                        <label for="clocation">
                          <i className="bx bx-injection frm-i"></i> Are you 100%
                          vaccinated for Covid-19?{" "}
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
                    </div>
                    <div className="wrapper">
                      <div className="box a"></div>
                      <div className="box b">
                        <div className="up">
                          <div className="upd-file">
                            <label className="btn fileUpload btn-default">
                              Select file
                              <input
                                type="file"
                                hidden=""
                                accept={".pdf"}
                                onChange={changeHandler}
                                ref={reference}
                              />
                              <i
                                className="bx bx-file"
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
                          <span>(PDF or word file only)</span>
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
