import "./ServicesSection.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import carTimelapse from "../../assets/videos/car_timelapse.mp4";
import poster from "../../assets/images/branding_poster.png";
import mellowVideo from "../../assets/videos/mellow.mp4";

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
        fontSize: "2rem",
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
          start: "top 56%",
          end: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    const brandingTexts = gsap.utils.toArray(".section-two p");

    brandingTexts.forEach((el, i) => {
      const distance = i % 2 === 0 ? 150 : -150;
      gsap.fromTo(
        el,
        { x: -distance },
        {
          x: distance,
          ease: "none",
          scrollTrigger: {
            trigger: ".section-two",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    gsap.utils.toArray(".section-three h2").forEach((el, i) => {
      const xFrom = i % 2 === 0 ? "-100%" : "100%";
      gsap.fromTo(
        el,
        { scale: 0, opacity: 0, x: xFrom },
        {
          scale: 1,
          x: 0,
          opacity: 1,
          color: "#1563FF",
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);
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
        <div className="text-wrapper">
          <p>BRANDING BRANDING BRANDING BRANDING</p>
          <p>BRANDING BRANDING BRANDING BRANDING</p>
          <p>BRANDING BRANDING BRANDING BRANDING</p>
          <p>BRANDING BRANDING BRANDING BRANDING</p>
          <p>BRANDING BRANDING BRANDING BRANDING</p>
        </div>
        <div className="image-container">
          <img
            src={poster}
            ref={posterRef}
            onClick={() => (window.location.href = "/branding")}
          />
        </div>
      </section>

      <section className="section-three">
        <h2>WEB</h2>
        <video src={mellowVideo} autoPlay playsInline loop muted />
        <h2>SITE</h2>
      </section>

      <section className="section-four"></section>
    </section>
  );
};

export default ServicesSection;
