import React from "react";
import Carousel, { CarouselItem } from "./Carousel";

import { CarouselData } from "./CarouselData";
const Container = (props) => {
  return (
    <>
      <div className="sec">
        <div className="carousel">
          <Carousel style={{ display: "none!important" }}>
            <CarouselItem>
              <img src="./globe.svg" alt="" className="imgresponsive" />
              <div className="banner-txt">
                <p>Your Only Reliable Global</p>
                <p>Partner for all your HR related</p>
                <p> requirements.</p>
              </div>
            </CarouselItem>
            <CarouselItem>
              <img src="./item1.svg" alt="" className="imgresponsive" />
              <div className="banner-txt">
                <p>Your Only Reliable Global</p>
                <p>Partner for all your HR related</p>
                <p> requirements.</p>
              </div>
            </CarouselItem>
            <CarouselItem>
              <img src="./item2.svg" alt="" className="imgresponsive" />
              <div className="banner-txt">
                <p>Your Only Reliable Global</p>
                <p>Partner for all your HR related</p>
                <p> requirements.</p>
              </div>
            </CarouselItem>
            <CarouselItem>
              <img src="./item3.svg" alt="" className="imgresponsive" />
              <div className="banner-txt">
                <p>Your Only Reliable Global</p>
                <p>Partner for all your HR related</p>
                <p> requirements.</p>
              </div>
            </CarouselItem>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Container;
