import React, { useState, useRef, useEffect } from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import "../modal.css";
import "../career.css";
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

import { Link, useNavigate, useLocation } from "react-router-dom";

// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
// import "date-fns";
// import DateFnsUtils from "@date-io/date-fns";
// import {
//   makeStyles,
//   createStyles,
//   ThemeProvider,
//   createMuiTheme,
// } from "@material-ui/core/styles";
// import { CheckPicker } from "rsuite";
// import ApplyJob from "./ApplyJob";
// const useStyles = makeStyles(() =>
//   createStyles({
//     componentStyle: {
//       verticalAlign: "middle",
//       fontSize: "12px",
//       width: (params) => (params.width ? params.width : "auto"),

//       "& fieldset": {
//         border: "solid 1px #ccc;",
//       },
//       "& .MuiInputBase-root": {
//         height: (params) => (params.height ? params.height : "auto"),
//         color: (params) => (params.color ? params.color : "inherit"),
//       },
//     },
//   })
// );

// const theme = createMuiTheme({
//   overrides: {
//     MuiTextField: {
//       root: {
//         verticalAlign: "middle",
//         fontSize: "12px",
//         width: 150,
//         "& fieldset": {
//           border: "solid 1px #ccc;",
//         },
//       },
//     },
//   },
// });
const Career = (props) => {
  const routePath = useLocation();
  const onTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    onTop();
  }, [routePath]);

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
      setInterval(() => setShowResults(false), 5000);
      setStatus("Completed!");
    } catch (error) {
      setMsg("Oops! Please try again.");
      setShowMsg(true);
      e.target.reset();
      // setInterval(() => setShowMsg(false), 4000);
    }

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

  const [reqdData, setReqdData] = useState("");
  const navigate = useNavigate();

  const selectApply = (selected_data) => {
    setReqdData(selected_data);
  };
  useEffect(() => {
    setReqdData((state) => {
      console.log("callling state", state); // "React is awesome!"

      return state;
    });
  }, [reqdData]);

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  // const classes = useStyles({
  //   // color: "red",
  //   width: 300,
  //   height: 0,
  // });

  return (
    <>
      <div>
        <TopNav />
        <section id="career" className="career">
          <div className="career-banner">
            <div className="career-banner-content">
              <div className="staff-pic-div">
                <img src="./cv.svg" alt="hire" className="uploadcv" />
              </div>
              <div className="pstaff-txt">
                <div className="upld">
                  <h3>Help Us Help You !!</h3>
                  <h4>Upload your CV</h4>

                  <Link className="btn" to="/cvupload">
                    Upload CV
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="career-flex-container">
            {/* <div className="career-flex-item-left">
              <div className="card upldcard">
                <div className="container">
                  <img src="./career.svg" alt="" className="career-img" />
                </div>
              </div>
            </div>
            <div className="career-flex-item-right">
              <div className="card upldcard">
                <div className="container">
                  <div className="upld">
                    <h3>Help Us Help You !!</h3>
                    <h4>Upload your CV</h4>

                    <Link className="btn" to="/cvupload">
                      Upload CV
                    </Link>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="oppr-area">
            <div className="career-flex-container">
              <div className="flex-item">
                <div className="oppurtunity">
                  <div>
                    <i className="bx bxs-hard-hat oppr-icn"></i>
                    {/* <i className="bx bxs-briefcase-alt-2 oppr-icn"></i> */}
                  </div>

                  <div>
                    <h3 className="career-h3">Current Opportunities</h3>
                  </div>
                </div>
                <div className="incontainer">
                  {props.jobposts.map((data, idx) => (
                    <div className="card" key={idx}>
                      <div className="car-container">
                        <div className="cargrid">
                          <div className="cargrid-item-right">
                            <div className="cargrid-item">
                              <h4> {data.jobtitle}</h4>
                            </div>
                          </div>
                        </div>
                        <div className="cargrid">
                          <div className="cargrid-item-right">
                            <div className="cargrid-item">
                              <div className="oppr-flex">
                                <div>
                                  <i className="bx bxs-wallet career-icn"></i>
                                </div>
                                <div>
                                  <p>{data.ctc}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="cargrid">
                          <div className="cargrid-item-right">
                            <div className="cargrid-item">
                              <div className="oppr-flex">
                                <div>
                                  <i className="bx bxs-briefcase-alt career-icn"></i>
                                </div>
                                <div>
                                  <p>{data.experience}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="cargrid">
                          <div className="cargrid-item-right">
                            <div className="cargrid-item">
                              <div className="oppr-flex">
                                <div>
                                  <i className="bx bxs-map career-icn"></i>
                                </div>
                                <div>
                                  <p> {data.location}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="btngrid">
                        <div className="btn-item-right ">
                          <Link
                            to={{
                              pathname: "/applyjob",
                            }}
                            state={{ data }} // <-- from the array being mapped
                          >
                            <button
                              className="appy-btn"
                              onClick={() => selectApply(data)}
                            >
                              Apply
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
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
const Message = (props) => (
  <>
    <div>
      <div className="bar error">{props.msg}</div>
    </div>
  </>
);

export default Career;
