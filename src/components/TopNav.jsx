import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import "boxicons";

const TopNav = () => {
  return (
    <>
      <nav className="navbar">
        <h1 className="logo">
          <a href="#hero">
            <div className="flex-logo">
              <div>
                <img src="./RSVglobal.png" alt="" style={{ width: "50px" }} />
              </div>
              <div style={{ paddingTop: "25px" }}>
                {" "}
                <span style={{ color: "#F74749" }}>RSV</span> Global
              </div>
            </div>
          </a>
        </h1>
        <input type="checkbox" name="" id="" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <ul className="main-nav">
          <li>
            <Link href="#hero" to="/home">
              Home
            </Link>
          </li>
          <li>
            {/* <a href="#about">About</a> */}
            <Link to="/about">About us</Link>
          </li>
          <li>
            <a href="#why">Why RSV</a>
          </li>
          <li className="submenu">
            <a href="#services">
              Services <i className="bx bx-chevron-down"></i>{" "}
            </a>
            <ul className="dropdown" aria-label="submenu">
              <li>
                {/* <a href="#">Permanent Staffing</a> */}
                <Link to="/permanentstaffing">Permanent Staffing</Link>
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
            <Link to="/career">Career</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default TopNav;
