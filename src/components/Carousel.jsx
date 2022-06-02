import React, { Children } from "react";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

//Carousal Child------------------------------------------------------------------------
export const CarouselItem = (props) => {
  return (
    <div className="carousel-item" style={{ width: props.width }}>
      {props.children}
    </div>
  );
};
//Carousal-----------------------------------------------------------------------------
const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0); // to activate/deactivate the carousal items
  // to update the carousal index on moving---------------------------------------------
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };
  // Auto movement in carousal after every 2 sec--------------------------------------------
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 4000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });
  return (
    <>
      <div
        {...handlers}
        className="carousel"
        onMouseEnter={() => {
          setPaused(true);
        }}
        onMouseLeave={() => {
          setPaused(false);
        }}
      >
        <div
          className="inner"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, { width: "100%" });
          })}
        </div>
      </div>
      <div className="indicators">
        <button
          className="btn-arrow"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          <div className="next">
            <i
              className="bx bx-chevron-left"
              style={{ fontSize: "28px", color: "white" }}
            ></i>
          </div>
        </button>
        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={`${index == activeIndex ? "active" : ""}`}
              onClick={() => {
                updateIndex(index);
              }}
            >
              {/* {index + 1} */}
            </button>
          );
        })}
        <button
          className="btn-arrow"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          <div className="next">
            <i
              className="bx bx-chevron-right"
              style={{ fontSize: "28px", color: "white" }}
            ></i>
          </div>
        </button>
      </div>
    </>
  );
};

export default Carousel;
