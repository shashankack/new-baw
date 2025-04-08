import "./ServicesSection.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import carTimelapse from "../../assets/videos/car_timelapse.mp4";
import poster from "../../assets/images/branding_poster.png";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const posterRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".mobile-title",
      { fontSize: "5rem" },
      {
        x: 0,
        y: 0,
        color: "#1563FF",
        fontSize: "3rem",
        opacity: 1,
        scrollTrigger: {
          trigger: ".mobile-title",
          start: "top top",
          end: "top+=700 top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      posterRef.current,
      { scale: 0, rotate: "-10deg" },
      {
        scale: 1,
        x: "0%",
        y: "0%",
        rotate: "10deg",
        ease: "power4",
        scrollTrigger: {
          trigger: posterRef.current,
          start: "top 70%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
  return (
    <section className="mobile-services-section">
      <div className="mobile-title-wrapper">
        <h2 className="mobile-title">SERVICES</h2>
      </div>
      <section className="section-one">
        <div className="video-container">
          <video src={carTimelapse} loop autoPlay muted playsInline />
        </div>
      </section>

      <section className="section-two">
        <p>BRANDING</p>
        <p>BRANDING</p>
        <p>BRANDING</p>
        <p>BRANDING</p>
        <p>BRANDING</p>
        <div className="image-container">
          <img src={poster} ref={posterRef} />
        </div>
      </section>
    </section>
  );
};

export default ServicesSection;
