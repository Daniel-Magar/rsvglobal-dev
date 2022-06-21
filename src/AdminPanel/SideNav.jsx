import React from "react";
import "./adminpanel.css";

const SideNav = (props) => {
  console.log(props.toggle);
  return (
    <>
      <aside className={props.toggle ? "active" : "inactive"}>
        <nav className="left-nav">
          <div className="ad-logo">
            <div>
              <img src="./RSVglobal.png" alt="logo" width="50" />
            </div>
            <div className="logo-txt">RSV Global</div>
          </div>
          <div className="nav-content">
            <a href="" className="tabs">
              <div className="nav-icons">
                <i className="bx bxs-dashboard" label="dashboard"></i>
              </div>
              <div className="nav-texts">Dashboard</div>
            </a>
            <a href="" className="tabs">
              <div className="nav-icons">
                <i className="bx bxs-group"></i>
              </div>
              <div className="nav-texts">Clients</div>
            </a>
            <a href="" className="tabs">
              <div className="nav-icons">
                <i className="bx bxs-user-detail"></i>
              </div>
              <div className="nav-texts">Candidates</div>
            </a>
            <a href="" className="tabs">
              <div className="nav-icons">
                <i className="bx bxs-briefcase-alt-2"></i>
              </div>
              <div className="nav-texts">Post Jobs</div>
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default SideNav;
