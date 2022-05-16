import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

import "boxicons";

const TopNav = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {}, []);
  return (
    <>
      <nav className="navbar">
        <h1 className="logo">
          <Link href="#home" to="/home">
            {/* <a href="#home"> */}
            <div className="flex-logo">
              <div>
                <img src="./RSVglobal.png" alt="" style={{ width: "50px" }} />
              </div>
              <div style={{ paddingTop: "25px" }}>
                {" "}
                <span style={{ color: "#F74749" }}>RSV</span> Global
              </div>
            </div>
            {/* </a> */}
          </Link>
        </h1>
        <input type="checkbox" name="" id="" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <ul className="main-nav">
          <li>
            <NavHashLink to="/#home">Home</NavHashLink>
          </li>
          <li>
            <NavHashLink to="/#about">About</NavHashLink>
          </li>
          <li>
            <NavHashLink to="/#why">Why RSV</NavHashLink>
          </li>
          <li className="submenu">
            <a href="#services">
              Services <i className="bx bx-chevron-down"></i>{" "}
            </a>
            <ul className="dropdown" aria-label="submenu" id="target">
              <li>
                <Link to="/permanentstaffing">Permanent Staffing</Link>
              </li>
              <li>
                <a href="#" id="subnav">
                  Temp Staffing
                </a>
              </li>
              <li>
                <a href="#" id="subnav">
                  HR Statutory Compliance
                </a>
              </li>
              <li>
                <a href="#" id="subnav">
                  {" "}
                  Payroll
                </a>
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
