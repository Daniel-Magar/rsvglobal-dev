import React, { useState } from "react";
import "./adminpanel.css";
import { Link } from "react-router-dom";
import ToggleAtom from "../Recoil/ToggleAtom";
import { useRecoilState } from "recoil";

const SideNav = () => {
  const [toggle, setToggle] = useRecoilState(ToggleAtom);
  const openSidenav = () => {
    setToggle(!toggle);
  };
  return (
    <>
      {/* <div>
        {!toggle ? (
          <span className="open" onClick={openSidenav}>
            <i class="bx bxs-chevron-right"></i>
          </span>
        ) : (
          <span className="close" onClick={openSidenav}>
            <i class="bx bxs-chevron-left"></i>
          </span>
        )}
      </div> */}

      <aside className={toggle ? "left-active" : "left-inactive"}>
        <nav className="left-nav">
          <div className="ad-logo">
            <div>
              <img
                src="./RSVglobal.png"
                className="logo-img"
                alt="logo"
                // width="50"
              />
            </div>
            <div className="logo-txt">RSV Global</div>
          </div>
          <input type="checkbox" id="checkbox_toggle" />
          <label for="checkbox_toggle" class="hamburger">
            &#9776;
          </label>
          <hr />
          <div className="nav-content">
            {/* hamburger */}

            <Link className="tabs" to="/admindashboard">
              <div className="nav-icons">
                <i className="bx bxs-grid-alt"></i>
              </div>
              <div className="nav-texts">Dashboard</div>
            </Link>

            <Link className="tabs" to="/client">
              <div className="nav-icons">
                <i className="bx bxs-group"></i>
              </div>
              <div className="nav-texts">Clients</div>
            </Link>
            <Link className="tabs" to="/candidates">
              <div className="nav-icons">
                <i className="bx bxs-user-detail"></i>
              </div>
              <div className="nav-texts">Candidates</div>
            </Link>
            <Link className="tabs" to="/jobs">
              <div className="nav-icons">
                <i className="bx bxs-briefcase-alt-2"></i>
              </div>
              <div className="nav-texts">Post Jobs</div>
            </Link>
            <Link className="tabs" to="/settings">
              <div className="nav-icons">
                <i class="bx bxs-cog"></i>
              </div>
              <div className="nav-texts">Settings</div>
            </Link>
            <Link className="tabs" to="/spinning">
              <div className="nav-icons">
                <i class="bx bxs-cog"></i>
              </div>
              <div className="nav-texts">Spinning</div>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default SideNav;
