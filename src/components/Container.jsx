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
              <div className="carousel-flex">
                <div className="carousel-flex-left">
                  <div className="banner-svg">
                    <img
                      src="./ellipse1.png"
                      alt="ellipse"
                      className="ellipse"
                    />
                  </div>
                  <div className="banner-txt">
                    <p>Your Only Reliable Global</p>
                    <p>Partner for all your HR related</p>
                    <p> requirements.</p>
                  </div>
                </div>
                <div className="carousel-flex-right">
                  <img src="./globe.svg" alt="" className="imgresponsive" />
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="carousel-flex">
                <div className="carousel-flex-left">
                  <img src="./item11.svg" alt="" className="imgresponsive" />
                </div>
                <div className="carousel-flex-right">
                  <div className="banner-svg">
                    <img
                      src="./ellipse1.png"
                      alt="ellipse"
                      className="ellipse"
                    />
                  </div>
                  <div className="banner-txt">
                    <p>Your Only Reliable Global</p>
                    <p>Partner for all your HR related</p>
                    <p> requirements.</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="carousel-flex">
                <div className="carousel-flex-left">
                  <div className="banner-svg">
                    <img
                      src="./ellipse1.png"
                      alt="ellipse"
                      className="ellipse"
                    />
                  </div>
                  <div className="banner-txt">
                    <p>Your Only Reliable Global</p>
                    <p>Partner for all your HR related</p>
                    <p> requirements.</p>
                  </div>
                </div>
                <div className="carousel-flex-right">
                  <img src="./item12.svg" alt="" className="imgresponsive" />
                </div>
              </div>
            </CarouselItem>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Container;
