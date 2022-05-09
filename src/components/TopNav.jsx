import React from "react";

import "boxicons";

const TopNav = () => {
  return (
    <>
      <nav className="navbar">
        <h1 className="logo">
          <a href="#">
            <div className="flex-logo">
              <div>
                <img src="./RSVglobal.png" alt="" style={{ width: "50px" }} />
              </div>
              <div style={{ paddingTop: "25px" }}> RSV Global</div>
            </div>
          </a>
        </h1>
        <input type="checkbox" name="" id="" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <ul class="main-nav">
          <li>
            <a href="#hero">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#vision">Vision</a>
          </li>
          <li className="submenu">
            <a href="#services">
              Services <i class="bx bx-chevron-down"></i>{" "}
            </a>
            <ul class="dropdown" aria-label="submenu">
              <li>
                <a href="#">Permanent Staffing</a>
              </li>
              <li>
                <a href="#">Temp Staffing</a>
              </li>
              <li>
                <a href="#">HR Statutory Compliance</a>
              </li>
              <li>
                <a href="#"> Payroll</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Contact </a>
          </li>
          <li>
            <a href="#">Careers </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default TopNav;
