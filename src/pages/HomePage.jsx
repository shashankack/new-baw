import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import introVideo from "../assets/videos/intro_video.mp4";
import clientsVideo from "../assets/videos/clients.mp4";

import Slide1 from "../components/Slides/Slide1";
import "../assets/styles/HomePage.scss";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const horizontalRef = useRef(null);
  const slidesRef = useRef(null);

  useEffect(() => {
    const updateAnimation = () => {
      let totalWidth = slidesRef.current.scrollWidth - window.innerWidth;

      gsap.to(slidesRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-scroll",
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    };

    updateAnimation(); // Run on mount

    // Recalculate on resize
    window.addEventListener("resize", updateAnimation);

    return () => {
      window.removeEventListener("resize", updateAnimation);
      ScrollTrigger.killAll(); // Ensures no duplicate triggers
    };
  }, []);

  return (
    <>
      {/* Video Section */}
      <section className="video-section">
        <video src={introVideo} autoPlay muted playsInline loop></video>
      </section>

      {/* Horizontal Scroll Section */}
      <section className="horizontal-scroll" ref={horizontalRef}>
        <div className="slides" ref={slidesRef}>
          <div className="slide">
            <Slide1 />
          </div>
          <div className="slide slide2">Slide 2</div>
          <div className="slide slide3">Slide 3</div>
          <div className="slide slide4">Slide 4</div>
          <div className="slide slide5">Slide 5</div>
        </div>
      </section>
      <section className="clients">
        <video src={clientsVideo} autoPlay muted playsInline loop></video>
      </section>
    </>
  );
};

export default HomePage;
