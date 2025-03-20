import React from "react";
import carVid from "../../assets/videos/car_timelapse.mp4";
import "./Slide1.scss";

const Slide1 = () => {
  return (
    <section className="slide-1-section">
      <video src={carVid} autoPlay loop muted playsInline />
    </section>
  );
};

export default Slide1;
