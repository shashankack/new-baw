import React, { useRef, useLayoutEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./InteractiveCarousel.scss";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const InteractiveCarousel = ({
  data = [],
  direction = "bottom",
  scrollControl = "false",
  sliderHeight = "100%",
}) => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const sliderTimeline = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const nav = useNavigate();

  const shuffledData = useMemo(() => shuffleArray(data), [data]);
  const repeatedData = [...shuffledData, ...shuffledData];

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || repeatedData.length === 0) return;

    const setupAnimation = () => {
      sliderTimeline.current?.kill();

      const totalHeight = wrapper.scrollHeight;
      const halfHeight = totalHeight / 2;

      sliderTimeline.current = gsap.timeline({
        repeat: -1,
        ease: "none",
      });

      const fromY = direction === "bottom" ? 0 : -halfHeight;
      const toY = direction === "bottom" ? -halfHeight : 0;

      sliderTimeline.current.fromTo(
        wrapper,
        { y: fromY },
        { y: toY, duration: 20, ease: "none" }
      );
    };

    const images = wrapper.querySelectorAll("img");
    let loadedImages = 0;
    const totalImages = images.length;

    const checkImagesLoaded = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        setImagesLoaded(true);
        setupAnimation();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkImagesLoaded();
      } else {
        img.addEventListener("load", checkImagesLoaded);
        img.addEventListener("error", checkImagesLoaded);
      }
    });

    if (totalImages === 0) {
      setImagesLoaded(true);
      setupAnimation();
    }

    let scrollHandler;
    if (scrollControl === "true") {
      scrollHandler = () => {
        const scrollY = window.scrollY;
        const newTimeScale = 1 + scrollY / 1000;
        sliderTimeline.current &&
          sliderTimeline.current.timeScale(newTimeScale);
      };
      window.addEventListener("scroll", scrollHandler);
    }

    return () => {
      sliderTimeline.current?.kill();
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
      }
    };
  }, [direction, scrollControl, repeatedData]);

  // Pause animation on hover; resume on mouse leave.
  const handleMouseEnter = () => {
    sliderTimeline.current?.pause();
  };

  const handleMouseLeave = () => {
    sliderTimeline.current?.resume();
  };

  // Handle card click to navigate to the redirect link.
  const handleCardClick = (redirect) => {
    nav(redirect);
    window.scrollTo(0, 0);
  };

  return (
    <div
      className="endless-image-slider"
      style={{ height: sliderHeight }}
      ref={containerRef}
    >
      <div
        className="slider-wrapper"
        ref={wrapperRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {repeatedData.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="slider-card"
            onClick={() => handleCardClick(item.redirect)}
          >
            {!imagesLoaded ? (
              <Skeleton height={200} width={"90%"} borderRadius={10} />
            ) : (
              <img src={item.thumbnail} alt={`brand-${item.id}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveCarousel;
