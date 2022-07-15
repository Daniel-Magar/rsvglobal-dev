import React from "react";
import { useRecoilState } from "recoil";
import ToggleAtom from "../Recoil/ToggleAtom";

const Header = () => {
  const [toggle, setToggle] = useRecoilState(ToggleAtom);

  const openSidenav = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <div className="header-flex">
        {/* <div>
          {!toggle ? (
            <span className="open" onClick={openSidenav}>
              <i className="bx bxs-chevron-right"></i>
            </span>
          ) : (
            <span className="close" onClick={openSidenav}>
              <i className="bx bxs-chevron-left"></i>
            </span>
          )}
        </div> */}
        <div className="round-toggle">
          <div>
            {!toggle ? (
              <span onClick={openSidenav}>
                <i className="bx bx-list-ul"></i>
              </span>
            ) : (
              <span onClick={openSidenav}>
                <i className="bx bx-dots-vertical"></i>
              </span>
            )}
          </div>
        </div>

        <div>
          <h4 className="admin-head">Admin Panel</h4>
        </div>
      </div>
    </>
  );
};

export default Header;
