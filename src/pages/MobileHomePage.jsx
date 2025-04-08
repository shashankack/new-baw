import "./MobileHomePage.scss";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import introVideo from "../assets/videos/intro_video.mp4";

import ServicesSection from "../components/Mobile/ServicesSection";

gsap.registerPlugin(ScrollTrigger);

const MobileHomePage = () => {
  const introSectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      introSectionRef.current,
      { scale: 1 },
      {
        scale: 0.8,
        x: "-110%",
        rotate: "-10deg",
        scrollTrigger: {
          trigger: introSectionRef.current,
          start: "top top",
          end: "bottom+=200 top",
          scrub: true,
        },
      }
    );
  });

  return (
    <section className="mobile-section">
      <section className="intro-section" ref={introSectionRef}>
        <video src={introVideo} autoPlay playsInline loop muted />
      </section>
      <ServicesSection />
    </section>
  );
};

export default MobileHomePage;
