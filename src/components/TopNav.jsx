import React from "react";
import "boxicons";

const TopNav = () => {
  return (
    <>
      <nav className="navbar">
        <h1 class="logo">
          <a href="#">
            <i class="bx bx-globe"></i>RSV Global
          </a>
        </h1>
        <ul class="main-nav">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Portfolio</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default TopNav;
