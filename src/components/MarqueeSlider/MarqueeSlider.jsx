import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./MarqueeSlider.scss";

const MarqueeSlider = ({
  text = "Marquee Text Here",
  direction = "left",
  speed = 10,
  autoSlide = true,
}) => {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);

  useEffect(() => {
    if (!autoSlide) return;

    const textWidth = textRef1.current.scrollWidth;

    gsap.set(containerRef.current, { width: textWidth * 3 });

    let fromX, toX;
    if (direction === "left") {
      fromX = 0;
      toX = -textWidth;
    } else {
      fromX = -textWidth;
      toX = 0;
    }

    const marqueeAnim = gsap.fromTo(
      containerRef.current,
      { x: fromX },
      {
        x: toX,
        duration: speed,
        ease: "none",
        repeat: -1,
      }
    );

    return () => marqueeAnim.kill();
  }, [direction, speed, autoSlide, text]);

  return (
    <div className="marquee-wrapper" ref={wrapperRef}>
      <div className="marquee-slider" ref={containerRef}>
        <div className="marquee-text" ref={textRef1}>
          {text}
        </div>
        {/* Duplicate for continuous effect */}
        <div className="marquee-text" ref={textRef2}>
          {text}
        </div>
        <div className="marquee-text" ref={textRef2}>
          {text}
        </div>
        <div className="marquee-text" ref={textRef2}>
          {text}
        </div>
      </div>
    </div>
  );
};

export default MarqueeSlider;
