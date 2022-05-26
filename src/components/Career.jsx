import React, { useState, useRef, useEffect } from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Modal from "react-modal";
import "../modal.css";
import {
  collection,
  addDoc,
  Timestamp,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import { storage } from "../firebase-config";
import ProgressBar from "./ProgressBar";
import { db } from "../firebase-config";
import { async } from "@firebase/util";
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
const Career = (props) => {
  console.log("Job posts lists", props.jobposts);

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [status, setStatus] = useState("");

  const [isFilePicked, setIsFilePicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [showResults, setShowResults] = React.useState(false);
  const [showMsg, setShowMsg] = React.useState(false);
  const [msg, setMsg] = useState("");
  const reference = useRef(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [jobmodalIsOpen, setJobIsOpen] = React.useState(false);
  const [firstname, setFirstname] = useState("");
  const [qualification, setQualification] = useState("");
  const [appliedfor, setAppliedfor] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setPhno] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);

    setIsFilePicked(true);
    setShowResults(true);
    // setShowMsg(false);
  };
  const [querydata, setQuerydata] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("RESULT DATA:", querydata);
    var file = selectedFile;

    if (file === "" || file === undefined || file === null) {
      setShowMsg(true);
      setMsg("Please upload your CV in either .PDF or .DOCX extension.");
      setInterval(() => setShowMsg(false), 3000);
      return;
    } else {
      setShowMsg(false);
    }
    if (file.size > 2048000) {
      setShowMsg(true);
      // setInterval(() => setShowMsg(false), 6000);
      setMsg("File Size is too big, Please upload a file not more than 2 MB");

      return;
    } else {
      setShowMsg(false);
    }

    if (!file) return;
    let random = randomString(
      6,
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );

    for (let i in querydata) {
      console.log("input emails", email);

      if (email === querydata[i].emial_id) {
        console.log("Duplicate");
        setMsg("User existing! Please enter new valid email id. ");
        setShowMsg(true);
        setInterval(() => setShowResults(false), 5000);
        return;
      }
    }
    const filename = file.name.replace(/(\.[\w\d_-]+)$/i, random);
    const storageRef = ref(storage, `resume/${filename}`);
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
            console.log("url --------------", imgUrl);

            addDoc(collection(db, "candidates"), {
              first_name: firstname,
              emial_id: email,
              phone_no: phno,
              qualification: qualification,
              appliedfor: appliedfor,
              fileURL: downloadURL,
              applied_type: "Random",
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
    setInterval(() => setShowResults(false), 5000);
    setStatus("Completed!");
    e.target.reset();
  };

  const closebtn = (e) => {
    setIsOpen(false);
    setShowMsg(false);
    setIsFilePicked(false);
    setShowResults(false);
    setJobIsOpen(false);
  };

  function randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }
  useEffect(() => {}, [imgUrl]);
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

  const [jobpostid, setJobpostid] = useState("");
  const [job_title, setJob_title] = useState("");
  const [c_qual, setC_qual] = useState("");
  const [j_descrp, setsJ_descrp] = useState("");
  const [j_skill, setsJ_skill] = useState("");
  const [j_notice_period, setsJ_notice_period] = useState("");

  const selectApply = async (selected_data) => {
    setJobIsOpen(true);
    setJobpostid(selected_data.id);
    setJob_title(selected_data.jobtitle);
    setC_qual(selected_data.qualification);
    setsJ_descrp(selected_data.jobdescrp);
    setsJ_skill(selected_data.skill);
    setsJ_notice_period(selected_data.noticeperiod);
  };
  const applyJon = async () => {
    try {
      await addDoc(collection(db, "job_posts"), {
        job_post_id: jobpostid,
        jobtitle: job_title,
        qualification: c_qual,
        jobdescrp: j_descrp,
        skill: j_skill,
        noticeperiod: j_notice_period,
        applied_type: "Job Post",
        timestamp: Timestamp.now(),
      });
    } catch (err) {
      alert("sfsfsfsdsdfs", err.name);
    }
  };
  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const classes = useStyles({
    // color: "red",
    width: 300,
    height: 0,
  });

  return (
    <>
      <div>
        <TopNav />
        <section id="career" className="career">
          <div className="career-flex-container">
            <div className="career-flex-item-left">
              <div className="card upldcard">
                <div className="container">
                  <img src="./career1.svg" alt="" className="career-img" />
                </div>
              </div>
            </div>
            <div className="career-flex-item-right">
              <div className="card upldcard">
                <div className="container">
                  <div className="upld">
                    <h3>Upload your CV</h3>
                    <h3>to get your Dream Job</h3>
                    <button
                      className="btn-upload"
                      onClick={() => setIsOpen(true)}
                    >
                      Upload CV
                    </button>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={() => setIsOpen(false)}
                      overlayClassName={{
                        base: "overlay-base",
                        afterOpen: "overlay-after",
                        beforeClose: "overlay-before",
                      }}
                      className={{
                        base: "content-base",
                        afterOpen: "content-after",
                        beforeClose: "content-before",
                      }}
                      closeTimeoutMS={500}
                    >
                      <div>
                        <div className=" cls-flex">
                          <div className="cls div1">
                            <button onClick={closebtn} className="cls-btn">
                              <i class="bx bx-x"></i>
                            </button>
                          </div>

                          <div className="div2">
                            <h2>Enter Your Details</h2>
                          </div>
                        </div>

                        <div className="modal-body">
                          <form onSubmit={handleSubmit} className="upl-form">
                            <div>{showMsg ? <Message msg={msg} /> : null}</div>
                            <div className="form-body">
                              <label for="fname">First Name</label>
                              <input
                                type="text"
                                id="fname"
                                name="firstname"
                                placeholder="Your Full name.."
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                              />

                              <label for="email">Email</label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Your email id.."
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                              <label for="phno">Mobile Number</label>
                              <input
                                type="number"
                                id="phno"
                                name="phno"
                                placeholder="Your contact number.."
                                onChange={(e) => setPhno(e.target.value)}
                                required
                              />

                              <label for="qualification">Qualification</label>
                              <select
                                id="qualification"
                                name="qualification"
                                onChange={(e) =>
                                  setQualification(e.target.value)
                                }
                                required
                              >
                                <option>Select Qualification</option>
                                <option value="Post-Graduate">
                                  Post Graudate
                                </option>
                                <option value="Graduate">Graduate</option>
                                <option value="Under-Graduate">
                                  Under Graduate
                                </option>
                              </select>
                              <label for="degree">Applied For</label>
                              <select
                                id="degree"
                                name="degree"
                                onChange={(e) => setAppliedfor(e.target.value)}
                                required
                              >
                                <option>Select Role</option>
                                <option value="Front End Developer">
                                  Front End Developer
                                </option>
                                <option value="Back End Developer">
                                  Back End Developer
                                </option>
                                <option value="Python Developer">
                                  Python Developer
                                </option>
                                <option value="Java Developer">
                                  Java Developer
                                </option>
                                <option value="Java Script Developer">
                                  Java Script Developer
                                </option>
                                <option value="Node JS Developer">
                                  Node JS Developer
                                </option>
                                <option value="React JS Developer">
                                  React JS Developer
                                </option>
                              </select>
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
                          </form>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="career-flex-container">
            <div className="flex-item">
              <div className="incontainer">
                {props.jobposts.map((data, idx) => (
                  <div className="card" key={idx}>
                    <div className="container">
                      <div className="cargrid">
                        <div className="cargrid-item-left">
                          <h6>Role: </h6>
                        </div>
                        <div className="cargrid-item-right">
                          <div className="cargrid-item">- {data.jobtitle}</div>
                        </div>
                      </div>
                      <div className="cargrid">
                        <div className="cargrid-item-left">
                          <h6>Skills Required: </h6>
                        </div>
                        <div className="cargrid-item-right">
                          <div className="cargrid-item">- {data.skill}</div>
                        </div>
                      </div>
                      <div className="cargrid">
                        <div className="cargrid-item-left">
                          <h6>Description: </h6>
                        </div>
                        <div className="cargrid-item-right">
                          <div className="cargrid-item">- {data.jobdescrp}</div>
                        </div>
                      </div>
                      <div className="cargrid">
                        <div className="cargrid-item-left">
                          <h6>Qualification: </h6>
                        </div>
                        <div className="cargrid-item-right">
                          <div className="cargrid-item">
                            - {data.qualification}
                          </div>
                        </div>
                      </div>
                      <div className="cargrid">
                        <div className="cargrid-item-left">
                          <h6>Notice Period: </h6>
                        </div>
                        <div className="cargrid-item-right">
                          <div className="cargrid-item">
                            - {data.noticeperiod}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="btngrid">
                      <div className="btn-item-left ">
                        <button className="btn">Apply</button>
                      </div>
                      <div className="btn-item-right ">
                        <button
                          className="btn"
                          onClick={() => selectApply(data)}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Modal
            isOpen={jobmodalIsOpen}
            onRequestClose={() => setJobIsOpen(false)}
            overlayClassName={{
              base: "overlay-base",
              afterOpen: "overlay-after",
              beforeClose: "overlay-before",
            }}
            className={{
              base: "content-base",
              afterOpen: "content-after",
              beforeClose: "content-before",
            }}
            closeTimeoutMS={500}
          >
            <div>
              <div className=" cls-flex">
                <div className="cls div1">
                  <button onClick={closebtn} className="cls-btn">
                    <i class="bx bx-x"></i>
                  </button>
                </div>

                <div className="div2">
                  <h4>Enter Your Details (Job Posts)</h4>
                </div>
              </div>

              <div className="modal-body" style={{ border: "1px solid blue" }}>
                <form className="upl-form" style={{ width: "70%" }}>
                  <div>
                    <b>Role:</b> <span>{job_title}</span>
                  </div>
                  <div>{showMsg ? <Message msg={msg} /> : null}</div>
                  <div className="form-body">
                    <div class="apply-flex">
                      <div class="apply-flex-item">
                        <label for="fullname">First Name</label>
                        <input
                          type="text"
                          id="fullname"
                          name="fullname"
                          placeholder="Your Full name.."
                          onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                      <div className="apply-flex-item">
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
                    <div class="apply-flex">
                      <div class="apply-flex-item">
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
                      <div className="apply-flex-item">
                        <label for="fullname">Phone Number</label>
                        <input
                          type="text"
                          id="phno"
                          name="phno"
                          placeholder="Phone Number.."
                          onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div class="apply-flex">
                      <div class="apply-flex-item">
                        <label for="fullname">Alternate Phone Number</label>
                        <input
                          type="text"
                          id="fullname"
                          name="fullname"
                          placeholder="Alternate Phone Number.."
                          onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                      <div className="apply-flex-item">
                        <label for="gender">Email Address</label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Email Address.."
                          onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div class="apply-flex">
                      <div class="apply-flex-item">
                        <label for="clocation">Current Location</label>
                        <input
                          type="text"
                          id="clocation"
                          name="clocation"
                          placeholder="Current Location.."
                          onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                      <div className="apply-flex-item">
                        <label for="prelocation">Preferred Location</label>
                        <input
                          type="text"
                          id="prelocation"
                          name="prelocation"
                          placeholder="Preferred Location.."
                          onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div class="apply-flex">
                      <div class="apply-flex-item">
                        <label for="prelocation">
                          Highest Education Qualification
                        </label>
                        <select
                          id="qualification"
                          name="qualification"
                          onChange={(e) => setQualification(e.target.value)}
                          required
                        >
                          <option>Select Qualification</option>
                          <option value="Post-Graduate">Post Graudate</option>
                          <option value="Graduate">Graduate</option>
                          <option value="12th Pass">12th Pass</option>
                          <option value="10th Pass">10th Pass</option>
                          <option value="8th Pass">8th Pass</option>
                        </select>
                      </div>
                      <div className="apply-flex-item">
                        <label for="clocation">Total Experience</label>
                        <input
                          type="text"
                          id="experience"
                          name="experience"
                          placeholder="Experience.."
                          onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div class="apply-flex">
                      <div class="apply-flex-item">
                        <label for="clocation">Relevant Experience</label>
                        <input
                          type="text"
                          id="rexperience"
                          name="rexperience"
                          placeholder="Relevant Experience.."
                          onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                      <div className="apply-flex-item">
                        <label for="clocation">Total Experience</label>
                        <input
                          type="text"
                          id="experience"
                          name="experience"
                          placeholder="Experience.."
                          onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
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
const Message = (props) => (
  <>
    <div>
      {/* <div class="bar">Plain message</div>
          <div class="bar info">Information message</div>
          <div class="bar success">Successful message</div>
          <div class="bar warn">Warning message</div> */}
      <div className="bar error">{props.msg}</div>
    </div>
  </>
);

export default Career;
