import React from "react";
import { useState, useContext } from "react";
import { useRecoilState } from "recoil";
import selectedAtom from "../Recoil/selectedAtom";
import { LocationContext } from "../context/LocationContext";

const DropDown = () => {
  const [locationData, setLocationData] = useContext(LocationContext);
  const options = [
    {
      lableName: "React",
      value: 125,
    },
    {
      lableName: "Angular",
      value: 5645,
    },
    {
      lableName: "Vue",
      value: 564,
    },
    {
      lableName: "Native",
      value: 45,
    },
    {
      lableName: "CoffeeShop",
      value: 657,
    },
    {
      lableName: "SpeingBoot",
      value: 23,
    },
    {
      lableName: "Java",
      value: 4515,
    },
  ];
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useRecoilState(selectedAtom);
  return (
    <>
      {/* custom dropdown menu */}
      <div className="dropdown">
        <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
          {selected}
          <i
            className={`bx bxs-chevron-down  ${
              isActive ? "invertedicon" : "normal-icon "
            }`}
          ></i>
        </div>
        {isActive && (
          <div className="dropdown-content">
            {locationData?.map((data) => {
              return (
                <div
                  className="dropdown-item"
                  onClick={(e) => {
                    setSelected(data?.label);

                    setIsActive(false);
                  }}
                >
                  {data?.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default DropDown;
