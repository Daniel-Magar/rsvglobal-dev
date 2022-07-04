import React, { useState, useEffect, useRef, useContext } from "react";
import { useRecoilState } from "recoil";
import DropDown from "../AdminPanel/DropDown";
import "../AdminPanel/dropdown.css";
import closeAtom from "../Recoil/closeAtom";
import show2Atom from "../Recoil/show2Atom";
import selectedAtom from "../Recoil/selectedAtom";
import { LocationContext } from "../context/LocationContext";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import "../alert.css";
const ModalEdit = (props) => {
  const [closeStatus, setCloseStatus] = useRecoilState(closeAtom);
  const [selected, setSelected] = useState();
  const editRef = useRef();
  const [isActive, setIsActive] = useState(false);

  const [show2, setShow2] = useRecoilState(show2Atom);
  const [locationData, setLocationData] = useContext(LocationContext);

  const [jobtitle, setJobtitle] = useState("");
  const [qualification, setQualification] = useState("");
  const [jobdescrp, setJobdescrp] = useState("");
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");
  const [secskill, setSecskill] = useState("");
  const [experience, setExperience] = useState("");
  const [ctc, setCtc] = useState("");
  const [noticeperiod, setNoticeperiod] = useState("");
  const [id, setId] = useState("");

  const [editData, setEditData] = useState({
    jobtitle: "",
    qualification: "",
    jobdescrp: "",
    skill: "",
    secskill: "",
    location: "",
    experience: "",
    ctc: "",
    noticeperiod: "",
    editedon: "",
  });
  useEffect(() => {
    setId(props.editFormData.id);
    setJobtitle(props.editFormData.jobtitle);
    setQualification(props.editFormData.qualification);
    setJobdescrp(props.editFormData.jobdescrp);
    setSkill(props.editFormData.skill);
    setLocation(props.editFormData.location);
    setSecskill(props.editFormData.secskill);
    setExperience(props.editFormData.experience);
    setNoticeperiod(props.editFormData.noticeperiod);
    setCtc(props.editFormData.ctc);

    // setEditData({
    //   id: props.editFormData.id,
    //   jobtitle: props.editFormData.jobtitle,
    //   qualification: props.editFormData.qualification,
    //   jobdescrp: props.editFormData.jobdescrp,
    //   skill: props.editFormData.skill,
    //   secskill: props.editFormData.secskill,
    //   location: props.editFormData.location,
    //   experience: props.editFormData.experience,
    //   ctc: props.editFormData.ctc,
    //   noticeperiod: props.editFormData.noticeperiod,
    //   editedon: "",
    // });
    // setEditData((state) => {
    //   return state;
    // });
  }, [props.editFormData]);
  // uef to update the onchange value to set the new value while updation
  useEffect(() => {
    console.log("------------------------------------", editData);
  }, [editData]);
  // onchange function to get all the values typed by the user from the form
  // const handleChange = (evt) => {
  //   const value = evt.target.value;

  //   setEditData({
  //     ...editData,
  //     [evt.target.name]: value,
  //   });
  // };

  // update function
  const update = (event) => {
    event.preventDefault();
    console.log(props.editFormData);
    try {
      const ref = doc(db, "job_posts", id);
      updateDoc(ref, {
        jobtitle: jobtitle,
        qualification: qualification,
        jobdescrp: jobdescrp,
        experience: experience,
        skill: skill,
        secskill: secskill,
        location: location,
        ctc: ctc,
        noticeperiod: noticeperiod,
        editedon: Timestamp.now(),
      })
        .then(() => {
          console.log("Dataa updated");
          setStatus({ type: "success" });
          setTimeout(() => {
            setStatus(undefined);
          }, 4000);
        })
        .catch((error) => {
          // alert("Unsuccessfull, Error:" + error);
          setStatus({ type: "error", error });
          setTimeout(() => {
            setStatus(undefined);
          }, 4000);
        });
    } catch (err) {
      console.log("errororororor", err);
    }
    // setCloseStatus(true);
    // setShow2(false);
  };
  const [status, setStatus] = useState(undefined);

  // Sorting Ascending and Descending

  return (
    <>
      <div
        className={`modal ${show2 ? "show" : "hide"}`}
        onClick={() => setShow2(!show2)}
      >
        <div
          className={`  ${closeStatus ? "hide" : "modal-content"} `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className="msg">
            {status?.type == "success" && (
              <div className="msg-success">
                <div>
                  <i className="bx bx-info-square msg-icon"></i>
                </div>
                <div>
                  <p>Edit Successful!</p>
                </div>
              </div>
            )}
            {status?.type == "error" && (
              <div className="msg-error">
                <div>
                  <i className="bx bx-error msg-icon"></i>
                </div>
                <div>
                  <p>Error! Please try again.</p>
                </div>
              </div>
            )}
          </div>

          <div className="modal-bodee">
            <div className="job-form">
              <form className="jform" ref={editRef}>
                <div className="form-content">
                  <div className="form-left">
                    <label htmlFor="jobtitle">Job Title:</label>
                  </div>
                  <div className="form-right">
                    <input
                      type="text"
                      name="jobtitle"
                      value={jobtitle}
                      onChange={(e) => setJobtitle(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-content">
                  <div className="form-left">
                    <label htmlFor="jobdescrp">Job Description:</label>
                  </div>
                  <div className="form-right">
                    <textarea
                      id="jobdescrp"
                      name="jobdescrp"
                      rows="4"
                      cols="51"
                      value={jobdescrp}
                      onChange={(e) => setJobdescrp(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-content">
                  <div className="form-left">
                    <label htmlFor="experience">Experience:</label>
                  </div>
                  <div className="form-right">
                    <input
                      type="text"
                      name="experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-content">
                  <div className="form-left">
                    <label htmlFor="pskill">Primary Skill:</label>
                  </div>
                  <div className="form-right">
                    <textarea
                      id="skill"
                      name="skill"
                      rows="4"
                      cols="51"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-content">
                  <div className="form-left">
                    <label htmlFor="secskill">Secondary Skill:</label>
                  </div>
                  <div className="form-right">
                    <textarea
                      id="secskill"
                      name="secskill"
                      rows="4"
                      cols="51"
                      value={secskill}
                      onChange={(e) => setSecskill(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-content">
                  <div className="form-left">
                    <label htmlFor="ctc">CTC:</label>
                  </div>
                  <div className="form-right">
                    <input
                      type="text"
                      name="ctc"
                      value={ctc}
                      onChange={(e) => setCtc(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-content">
                  <div className="form-left">
                    <label htmlFor="location">Location:</label>
                  </div>
                  <div className="form-right">
                    <div className="dropdown">
                      <div
                        className="dropdown-btn"
                        onClick={(e) => setIsActive(!isActive)}
                      >
                        {location}
                        <i
                          className={`bx bxs-chevron-down  ${
                            isActive ? "invertedicon" : "normal-icon "
                          }`}
                        ></i>
                      </div>
                      {isActive && (
                        <div className="dropdown-content">
                          {locationData?.map((data, idx) => {
                            return (
                              <div
                                key={idx}
                                className="dropdown-item"
                                onClick={(e) => {
                                  setLocation(data?.label);

                                  setIsActive(false);
                                }}
                              >
                                {data?.label}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-content">
                  <div className="form-left">
                    <label htmlFor="notice-period">
                      Notice Period: <br />
                      (Days)
                    </label>
                  </div>
                  <div className="form-right">
                    <input
                      type="text"
                      name="notice-period"
                      value={noticeperiod}
                      onChange={(e) => setNoticeperiod(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <div className="modal-footer-flex">
              <div>
                <button
                  className="btn-delete"
                  onClick={() => {
                    setCloseStatus(true);
                    setShow2(false);
                  }}
                >
                  Close
                </button>
              </div>
              <div>
                <button className="modal-cls-btn" onClick={update}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEdit;
