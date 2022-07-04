import React, { useEffect, useState } from "react";
import Container from "./Container";
import SideNav from "./SideNav";
import "./adminpanel.css";
import { useRecoilState } from "recoil";
import ToggleAtom from "../Recoil/ToggleAtom";
import Header from "./Header";

const AdminDashboard = () => {
  const [toggle, setToggle] = useRecoilState(ToggleAtom);

  useEffect(() => {
    console.log(toggle);
  }, [toggle]);

  return (
    <>
      <SideNav />
      <div
        className={`content-admin ${
          toggle ? "admin-active" : "admin-inactive"
        }`}
      >
        <Header />
        <p className="admin-text">Under Construction</p>
      </div>
    </>
  );
};

export default AdminDashboard;
