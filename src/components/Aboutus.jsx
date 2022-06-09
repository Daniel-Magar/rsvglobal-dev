import React, { useEffect } from "react";
import "../banner.css";

import Footer from "./Footer";

const Aboutus = () => {
  return (
    <>
      <div className="services">
        <div className="services-container">
          <div className="about-serv">
            <div className="about-abt" style={{ width: "30%" }}>
              {/* <p className="abt-text"> About</p> */}
              <p className="text">
                <b className="rsv-global">RSV</b>
                <b className="global">Global</b>
              </p>
            </div>
            <div className="abt-main">
              <div className="about-abt">
                <p className="text">
                  RSV Global, with leadership experience of 25+ years in the
                  fields of Staffing, Recruitment, entire gamut of HR Operations
                  and Customer Relationship, is geared to be a partner in the
                  areas of:
                </p>
              </div>
            </div>
          </div>
          {/* <div className="services-txt">
            <h3>Services We Offer</h3>
          </div> */}

          <div class="service-container">
            <div class="service-item">
              <div>
                <img
                  src="./pstaff.svg"
                  className="serv-img"
                  alt="Permanent Staffing"
                />
                <p>
                  Permanent <br /> Staffing
                </p>
              </div>
            </div>
            <div class="service-item">
              <div>
                <img
                  src="./temprstaff.svg"
                  className="serv-img"
                  alt="Temporary Staffing"
                />
                <p>
                  Temporary <br /> Staffing
                </p>
              </div>
            </div>
            <div class="service-item">
              <div>
                <img
                  src="./payroll123.svg"
                  className="serv-img"
                  alt="Payroll Management"
                />
                <p>
                  Payroll <br /> Management
                </p>
              </div>
            </div>
            <div class="service-item">
              <div>
                <img
                  src="./compliance.svg"
                  className="serv-img"
                  alt="Compliance Management"
                />
                <p>
                  Compliance <br /> Management
                </p>
              </div>
            </div>
          </div>
          <div className="mission-txt abt-nature">
            Each of the above, by nature, are heavy on time and cost. By
            undertaking these processes for you, we provide you the opportunity
            to grow lean, focusing and growing on your core business objectives
          </div>
          <div className="">
            <div className="services-txt">
              <h3>Our Vision</h3>
              <div className="mission-txt">
                <p style={{ textAlign: "center" }}>
                  To uphold the common welfare and enhance the benefits of all
                  stakeholders.
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="services-txt">
              <h3>Our Mission</h3>
              <div className="mission-txt">
                <p>
                  Endeavour to pass optimum benefit to Customers, business
                  partners and employees; contribute to the society by spreading
                  awareness of available employment opportunities by optimum use
                  of technology
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="abt-main">
        <div className="about-section">
          <div className="about-abt" style={{ width: "30%" }}>
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
      </div> */}
    </>
  );
};

export default Aboutus;
