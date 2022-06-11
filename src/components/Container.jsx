import React from "react";
import Carousel, { CarouselItem } from "./Carousel";
import "../banner.css";

import { CarouselData } from "./CarouselData";
const Container = (props) => {
  return (
    <>
      <div className="banner-flex-container">
        <div className="banner-flex-item-left">
          <div className="banner-left">
            <div className="banner-svg">
              <img src="./ellipse1.png" alt="ellipse" className="ellipse" />
            </div>
            <div className="banner-txt">
              <p>Trusted Partners </p>
              <p>for all your HR requirements</p>
            </div>
          </div>
        </div>
        <div className="banner-flex-item-right">
          <img src="./Group2.png" alt="group2" className="heropic" />
        </div>
      </div>
    </>
  );
};

export default Container;
