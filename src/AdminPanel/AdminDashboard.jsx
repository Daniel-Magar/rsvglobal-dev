import React, { useState } from "react";
import SideNav from "./SideNav";

const AdminDashboard = () => {
  const [toggle, setToggle] = useState(true);
  const openSidenav = () => {
    setToggle(!toggle);
  };
  return (
    <>
      {!toggle ? (
        <span className="open" onClick={openSidenav}>
          <i class="bx bxs-chevron-right"></i>
        </span>
      ) : (
        <span className="close" onClick={openSidenav}>
          <i class="bx bxs-chevron-left"></i>
        </span>
      )}
      <SideNav toggle={toggle} />
    </>
  );
};

export default AdminDashboard;
