import React, { useState, useEffect, useRef, useContext } from "react";
import { useRecoilState } from "recoil";
import DropDown from "../AdminPanel/DropDown";
import "../AdminPanel/dropdown.css";
import closeAtom from "../Recoil/closeAtom";
import show2Atom from "../Recoil/show2Atom";
import selectedAtom from "../Recoil/selectedAtom";
import { LocationContext } from "../context/LocationContext";
const ModalEdit = (props) => {
  const [closeStatus, setCloseStatus] = useRecoilState(closeAtom);
  const [selected, setSelected] = useState();
  const editRef = useRef();
  const [isActive, setIsActive] = useState(false);

  const [show2, setShow2] = useRecoilState(show2Atom);
  const [locationData, setLocationData] = useContext(LocationContext);
  // console.log("EEEEE", props.editFormData);
  // useEffect(() => {
  //   setSelected(props.editItem.location);
  //   setSelected((state) => {
  //     console.log("selected location:", state);
  //     return state;
  //   });
  // }, [props.editItem]);

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
    setEditData({
      jobtitle: props.editFormData.jobtitle,
      qualification: props.editFormData.qualification,
      jobdescrp: props.editFormData.jobdescrp,
      skill: props.editFormData.skill,
      secskill: props.editFormData.skill,
      location: props.editFormData.location,
      experience: props.editFormData.experience,
      ctc: props.editFormData.ctc,
      noticeperiod: props.editFormData.noticeperiod,
      editedon: "",
    });
    setEditData((state) => {
      return state;
    });
  }, [props.editFormData]);
  // uef to update the onchange value to set the new value while updation
  useEffect(() => {
    console.log("------------------------------------", editData);
  }, [editData]);
  // onchange function to get all the values typed by the user from the form
  const handleChange = (evt) => {
    const value = evt.target.value;
    console.log(evt.targe.name);
    setEditData({
      ...editData,
      [evt.target.name]: value,
    });
  };
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
            <h4 className="modal-title">{props.title} Edit Data</h4>
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
                      value={editData.jobtitle}
                      onChange={handleChange}
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
                      value={editData.jobdescrp}
                      onChange={handleChange}
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
                      value={editData.experience}
                      onChange={handleChange}
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
                      value={editData.skill}
                      onChange={handleChange}
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
                      value={editData.secskill}
                      onChange={handleChange}
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
                      value={editData.ctc}
                      onChange={handleChange}
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
                        {editData.location}
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
                                  setEditData({
                                    location: data?.label,
                                  });

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
                      value={editData.noticeperiod}
                      onChange={handleChange}
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
                <button
                  className="modal-cls-btn"
                  onClick={() => {
                    setCloseStatus(true);
                    setShow2(false);
                  }}
                >
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
