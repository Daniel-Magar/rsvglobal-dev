import React, { useEffect } from "react";
import Footer from "./Footer";

const Aboutus = () => {
  return (
    <>
      <div className="abt-main">
        <div className="about-section">
          <div className="about-abt" style={{ width: "30%" }}>
            {/* <p className="abt-text"> About</p> */}
            <p className="text">
              <b className="rsv-global">RSV</b>
              <b className="global">Global</b>
            </p>
          </div>
          <div className="about-abt" style={{ width: "70%" }}>
            <p className="text">
              RSV Global, with the leadership experience of 25+ years in the
              fields of staffing, Recruitment, entire gamut of HR, Operation and
              Customer Relationship, is geared to be a partner in the areas of:
            </p>
          </div>
        </div>
        <div className="abt-grid">
          <div>
            <div className="card-abt">
              <div className="abt-card-container">
                <h5 className="myh5">
                  <b>Recruitment</b>
                </h5>
              </div>
              <div className="card-top">
                <img src="./hire.svg" alt="" style={{ width: "100%" }} />
              </div>
            </div>
          </div>
          <div>
            <div className="card-abt">
              <div className="abt-card-container">
                <h5 className="myh5">
                  <b>Temp Staffing</b>
                </h5>
              </div>
              <div className="card-top">
                <img
                  src="./tempstaff.svg"
                  className="abt-img"
                  alt=""
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="card-abt">
              <div className="abt-card-container">
                <h5 className="myh5">
                  <b>HR Statutory Compliance</b>
                </h5>
              </div>
              <div className="card-top">
                <img
                  src="./hr.svg"
                  alt=""
                  style={{ width: "100%", height: "200px" }}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="card-abt">
              <div className="abt-card-container">
                <h5 className="myh5">
                  <b>Payroll Management</b>
                </h5>
              </div>
              <div className="card-top">
                <img src="./payroll.svg" alt="" style={{ width: "100%" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="ptext">
          <p className="texttext">
            Each of the above by nature are heavy in time and cost.
          </p>

          <p className="texttext">
            By undertaking these processess for you, we provide you the
            opportunity to grow lean, focusing and growing on your core buiess
            objectives.
          </p>
        </div>
        {/* <div className="flex-container">
          <div className="flex-item-left">
            <img src="./group.png" alt="about" className="responsiveimg" />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Aboutus;
