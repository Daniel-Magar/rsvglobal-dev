import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

import "boxicons";

const TopNav = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <nav className="navbar">
        <h1 className="logo">
          <NavHashLink
            to="/#home"
            style={{ textDecoration: "none!important", padding: "0 12px" }}
          >
            {/* <a href="#home"> */}
            <div className="flex-logo">
              <div>
                <img src="./RSVglobal.png" alt="" style={{ width: "50px" }} />
              </div>
              <div>
                {" "}
                <span style={{ color: "#F74749" }}>RSV</span> Global
              </div>
            </div>
            {/* </a> */}
          </NavHashLink>
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
            <NavHashLink to="/#whyrsv">Why RSV</NavHashLink>
          </li>
          <li className="submenu">
            <a href="#services">
              Services <i className="bx bx-chevron-down"></i>
            </a>
            <ul className="dropdown" aria-label="submenu" id="target">
              <li>
                <Link to="/permanentstaffing">Permanent Staffing</Link>
              </li>
              <li>
                <Link to="/tempstaffing"> Temp Staffing</Link>
              </li>
              <li>
                <Link href="#statutoryCompliance" to="/statutoryCompliance">
                  HR Statutory Compliance
                </Link>
              </li>
              <li>
                <Link to="/payroll">Payroll</Link>
              </li>
            </ul>
          </li>
          <li>
            <NavHashLink to="/#contact">Contact us</NavHashLink>
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
