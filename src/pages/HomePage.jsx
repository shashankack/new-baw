import "../assets/styles/HomePage.scss";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Intro Video
import introVideo from "../assets/videos/intro_video.mp4";

// Outro Video
import clientsVideo from "../assets/videos/clients.mp4";

// Slide 1 Video
import carVid from "../assets/videos/car_timelapse.mp4";

// Slide 2 Video
import stepImage from "../assets/images/slide2.png";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const horizontalRef = useRef(null);
  const slidesRef = useRef(null);

  useEffect(() => {
    const totalWidth = slidesRef.current.scrollWidth - window.innerWidth;
    const titleMoveDistance = window.innerWidth / 1.5;
    const updateAnimation = () => {
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

    gsap.fromTo(
      ".scroll-title",
      { fontSize: "8rem", x: "100%", y: "250%" },
      {
        x: 0,
        y: 0,
        fontSize: "2rem",
        color: "#1563FF",
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-scroll",
          start: "top top",
          end: () => `+=${titleMoveDistance}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );

    gsap.fromTo(
      gsap.utils.toArray(".slide2 h2"),
      {
        opacity: 0,
        // y: (index) => index * 40 + 100,
        y: 0,
        x: (index) => index * 200,
      },
      {
        opacity: 0.5,
        y: 0,
        x: (index) => index * 200,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".slide2",
          start: "top+=1000 top",
          end: "bottom+=1900 bottom",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      ".slide2 img",
      { x: "-100%", y: "100%", opacity: 0, scale: 1.4 },
      {
        x: "-50%",
        y: 0,
        scale: 1,
        opacity: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".slide2",
          start: "top+=1000 top",
          end: "bottom+=1900 bottom",
          scrub: 1,
        },
      }
    );

    updateAnimation();

    window.addEventListener("resize", updateAnimation);

    return () => {
      window.removeEventListener("resize", updateAnimation);
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <>
      {/* Intro Video */}
      <section className="video-section">
        <video src={introVideo} autoPlay muted playsInline loop></video>
      </section>

      {/* Horizontal Scroll */}
      <section className="horizontal-scroll" ref={horizontalRef}>
        <h1 className="scroll-title">SERVICES</h1>
        <div className="slides" ref={slidesRef}>
          {/* slide 1 */}
          <section className="slide slide1">
            <video src={carVid} autoPlay loop muted playsInline />
          </section>

          {/* slide 2 */}
          <section className="slide slide2">
            <div className="text-container">
              <h2>BRANDING</h2>
              <h2>BRANDING</h2>
              <h2>BRANDING</h2>
              <h2>BRANDING</h2>
              <h2>BRANDING</h2>
              <h2>BRANDING</h2>
              <h2>BRANDING</h2>
            </div>
            <div className="image-container">
              <img src={stepImage} alt="Step" />
            </div>
          </section>

          {/* slide 3 */}
          <section className="slide slide3">Slide 3</section>

          {/* slide 4 */}
          <section className="slide slide4">Slide 4</section>

          {/* slide 5 */}
          <section className="slide slide5">Slide 5</section>
        </div>
      </section>

      {/* Outro Video */}
      <section className="clients">
        <video src={clientsVideo} autoPlay muted playsInline loop></video>
      </section>
    </>
  );
};

export default HomePage;
