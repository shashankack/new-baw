import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Slide2.scss"; // Ensure this file exists

gsap.registerPlugin(ScrollTrigger);

const Slide2 = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const headers = gsap.utils.toArray(".slide-2-section h3");

    gsap.fromTo(
      headers,
      { opacity: 0 }, // Start with very low visibility
      {
        opacity: 1,
        stagger: 0.3, // Animates one by one
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top+=2000 top",
          end: "bottom+=500 bottom",
          scrub: 1,
          pin: true, // Keeps the text fixed while scrolling
          anticipatePin: 1,
          markers: true, // For debugging
        },
      }
    );
  }, []);

  return (
    <section className="slide-2-wrapper" ref={containerRef}>
      <div className="slide-2-section">
        <h3>BRANDING</h3>
        <h3>BRANDING</h3>
        <h3>BRANDING</h3>
        <h3>BRANDING</h3>
        <h3>BRANDING</h3>
        <h3>BRANDING</h3>
        <h3>BRANDING</h3>
      </div>
    </section>
  );
};

export default Slide2;
