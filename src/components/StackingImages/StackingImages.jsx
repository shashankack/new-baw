import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./StackingImages.scss";

gsap.registerPlugin(ScrollTrigger);

const StackingImages = ({ images = [], paragraph = "" }) => {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);

  imagesRef.current = images.map(
    (_, i) => imagesRef.current[i] ?? React.createRef()
  );

  useEffect(() => {
    const container = containerRef.current;
    const imageEls = imagesRef.current.map((ref) => ref.current);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      smoothChildTiming: true,
    });

    imageEls.forEach((imgEl, i) => {
      const randomRotation = Math.random() * 10 - 5;

      tl.fromTo(
        imgEl,
        {
          scale: 4,
          rotation: randomRotation,
          y: 200,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: randomRotation,
          y: 0,
          opacity: 1,
          duration: 2,
          ease: "power1.inOut",
        },
        i === 0 ? 0 : "+=0.5"
      );

      tl.to({}, { duration: 4 });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [images]);

  return (
    <div className="stacking-images-container" ref={containerRef}>
      <div className="paragraph-section">
        {paragraph}
        <div className="arrows"></div>
      </div>
      <div className="images-section">
        {images.map((img, index) => (
          <img
            key={`stack-img-${index}`}
            ref={imagesRef.current[index]}
            src={img}
            alt={`stack-img-${index}`}
            className="stacked-image"
            style={{ zIndex: 5 + index }}
          />
        ))}
      </div>
    </div>
  );
};

export default StackingImages;
