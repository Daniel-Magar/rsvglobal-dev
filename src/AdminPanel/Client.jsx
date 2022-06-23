import React, { useEffect } from "react";
import ToggleAtom from "../Recoil/ToggleAtom";
import { useRecoilState } from "recoil";
import SideNav from "./SideNav";
import Header from "./Header";

const Client = () => {
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
        <div>Cleints</div>
      </div>
    </>
  );
};

export default Client;
