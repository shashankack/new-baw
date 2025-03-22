import React, { useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import "./InteractiveMarquee.scss";

const InteractiveMarquee = ({
  text,
  images,
  extraText = "",
  ctaLink = "",
  ctaText = "",
}) => {
  const marqueeTextRef = useRef(null);
  const marqueeImageRef = useRef(null);
  const textTweenRef = useRef(null);
  const imageTweenRef = useRef(null);
  const scrollTimeout = useRef(null);

  const duplicatedItems = useMemo(() => [...images, ...images], [images]);

  // Functions to pause/resume animations
  const handleMouseEnter = () => {
    if (textTweenRef.current) textTweenRef.current.pause();
    if (imageTweenRef.current) imageTweenRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (textTweenRef.current) textTweenRef.current.resume();
    if (imageTweenRef.current) imageTweenRef.current.resume();
  };

  useEffect(() => {
    const textElement = marqueeTextRef.current;
    const textContent = textElement.querySelector(".marquee__text");

    const imageElement = marqueeImageRef.current;
    const imageContent = imageElement.querySelector(".marquee__images");
    const images = imageContent.querySelectorAll("img");
    let imagesLoadedCount = 0;

    const handleImageLoad = () => {
      imagesLoadedCount += 1;
      if (imagesLoadedCount === images.length) {
        initAnimation();
      }
    };

    const initAnimation = () => {
      const textWidth = textContent.offsetWidth / 2;
      const imageHeight = imageContent.offsetHeight / 2;

      textTweenRef.current = gsap.to(textContent, {
        x: -textWidth,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });

      imageTweenRef.current = gsap.to(imageContent, {
        y: -imageHeight,
        repeat: -1,
        duration: 10,
        ease: "linear",
      });
    };

    images.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.onload = handleImageLoad;
        img.onerror = handleImageLoad;
      }
    });

    const handleWheel = (event) => {
      event.preventDefault();

      const velocity = Math.abs(event.deltaY);
      const direction = event.deltaY > 0 ? 1 : -1;
      const newSpeed = gsap.utils.clamp(1, 10, velocity * 0.1);
      const pausedScrollSpeedMultiplier = 0.01;

      // Update both tweens whether paused or running
      [textTweenRef.current, imageTweenRef.current].forEach((tween) => {
        if (tween.paused()) {
          // If paused, manually adjust its current time
          tween.time(
            tween.time() + direction * newSpeed * pausedScrollSpeedMultiplier
          );
        } else {
          // If running, change the timeScale
          gsap.to(tween, {
            timeScale: direction * newSpeed,
            duration: 0.2,
            ease: "power1.out",
          });
        }
      });

      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        [textTweenRef.current, imageTweenRef.current].forEach((tween) => {
          if (!tween.paused()) {
            gsap.to(tween, {
              timeScale: 1,
              duration: 0.5,
              ease: "power2.out",
            });
          }
        });
      }, 150);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeout.current);
    };
  }, [text, duplicatedItems]);

  return (
    <div className="interactive-marquee-container">
      <div className="marquee marquee--horizontal" ref={marqueeTextRef}>
        <div className="marquee__text">
          <span>{text} - </span>
          <span>{text} - </span>
          <span>{text} - </span>
          <span>{text} - </span>
        </div>
      </div>

      {/* Attach hover events to the vertical marquee container */}
      <div className="marquee marquee--vertical" ref={marqueeImageRef}>
        <div className="marquee__images">
          {duplicatedItems.map((item, index) => (
            <a
              key={`${item.id}-${index}`}
              href={item.redirect}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={item.image}
                alt={`marquee-${item.id}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </a>
          ))}
        </div>
      </div>

      <div className="extra-text">
        <p>{extraText}</p>
        {extraText ? <a href={ctaLink}>{ctaText}</a> : null}
      </div>
    </div>
  );
};

export default InteractiveMarquee;
