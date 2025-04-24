import "../assets/styles/HomePage.scss";
import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

import introVideo from "../assets/videos/intro_video.mp4";
import clientsVideo from "../assets/videos/clients.mp4";
import carVid from "../assets/videos/car_timelapse.mp4";
import stepImage from "../assets/images/slide2.png";
import webVideo from "../assets/videos/mellow.mp4";

import { productionData, socialsImages } from "../data";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const horizontalRef = useRef(null);
  const slidesRef = useRef(null);
  const slide3VideoRef = useRef(null);

  const breakpoints = {
    lg: {
      slide1: { start: "top+=100 top", end: "bottom+=400 bottom" },
      slide2: { start: "top+=1000 top", end: "bottom+=1900 bottom" },
      slide3: { start: "top+=3500 top", end: "bottom+=3900 bottom" },
      slide4: { start: "top+=5000 top", end: "bottom+=7300 bottom" },
      slide5: { start: "top+=7500 top", end: "bottom+=7700 bottom" },
    },
    xl: {
      slide1: { start: "top+=100 top", end: "bottom+=400 bottom" },
      slide2: { start: "top+=1000 top", end: "bottom+=1900 bottom" },
      slide3: { start: "top+=2600 top", end: "bottom+=2800 bottom" },
      slide4: { start: "top+=3000 top", end: "bottom+=7300 bottom" },
      slide5: { start: "top+=5500 top", end: "bottom+=5800 bottom" },
    },

    xxl: {
      //
      slide1: { start: "top+=100 top", end: "bottom+=400 bottom" },
      slide2: { start: "top+=1000 top", end: "bottom+=1900 bottom" },
      slide3: { start: "top+=2500 top", end: "bottom+=2800 bottom" },
      slide4: { start: "top+=3000 top", end: "bottom+=7300 bottom" },
      slide5: { start: "top+=5500 top", end: "bottom+=5800 bottom" },
    },
    xxxl: {
      slide1: { start: "top+=100 top", end: "bottom+=400 bottom" },
      slide2: { start: "top+=1000 top", end: "bottom+=1900 bottom" },
      slide3: { start: "top+=3700 top", end: "bottom+=2800 bottom" },
      slide4: { start: "top+=4000 top", end: "bottom+=7300 bottom" },
      slide5: { start: "top+=7400 top", end: "bottom+=7800 bottom" },
    },
  };

  const getBreakpoints = () => {
    const width = window.innerWidth;
    if (width <= 1024) return "lg";
    if (width <= 1440) return "xl";
    if (width <= 1512) return "xxl";
    if (width > 1512) return "xxxl";
    return "xxxl";
  };

  const setupAnimations = useCallback(() => {
    const totalWidth = slidesRef.current.scrollWidth - window.innerWidth;
    const titleMoveDistance = window.innerWidth / 1.5;
    const currentBreakpoint = getBreakpoints();
    const breakPointForCurrentSize = breakpoints[currentBreakpoint];

    // Kill previous animations
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    gsap.fromTo(
      ".video-section video",
      { scale: 1, rotation: 0 },
      {
        scale: 0.7,
        rotation: -20,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".video-section",
          start: "top top",
          end: "bottom+=400 top",
          scrub: true,
        },
      }
    );

    // Horizontal Scroll
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

    // Slide 1: Title Animation
    gsap.fromTo(
      ".scroll-title",
      { fontSize: "8rem", x: "10%" },
      {
        x: 0,
        y: 0,
        fontSize: "3rem",
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

    // Slide 2
    gsap.fromTo(
      gsap.utils.toArray(".slide2 h2"),
      { opacity: 0, y: 0, x: (index) => index * 200 },
      {
        opacity: 1,
        x: (index) => index * 200,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".slide2",
          start: breakPointForCurrentSize.slide2.start,
          end: breakPointForCurrentSize.slide2.end,
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
          start: breakPointForCurrentSize.slide2.start,
          end: breakPointForCurrentSize.slide2.end,
        },
        zIndex: -10,
      }
    );

    const slide2 = document.querySelector(".slide2");
    const image = slide2.querySelector("img");

    slide2.addEventListener("mousemove", (e) => {
      const rect = slide2.getBoundingClientRect();
      const x = e.clientX - rect.left - 100;
      const y = e.clientY - rect.top - 100;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 3;
      const rotateX = -((y - centerY) / centerY) * 3;

      gsap.to(image, {
        rotateX,
        rotateY,
        scale: 1.05,
        cursor: "pointer",
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 1000,
        transformOrigin: "center",
      });
    });

    slide2.addEventListener("mouseleave", () => {
      gsap.to(image, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    // Slide 3
    const slide3 = new SplitType(".slide3 h2", { types: "words,chars" });
    gsap.fromTo(
      slide3.chars,
      { opacity: 1 },
      {
        opacity: 1,
        color: "#1563FF",
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".slide3",
          start: breakPointForCurrentSize.slide3.start,
          end: breakPointForCurrentSize.slide3.end,
          scrub: 1,
        },
      }
    );

    if (slide3VideoRef.current) {
      const video = slide3VideoRef.current;

      video.addEventListener("mousemove", (e) => {
        const rect = video.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const percentX = (x / rect.width - 0.5) * 2;
        const percentY = (y / rect.height - 0.5) * 2;

        const glowX = percentX * 5;
        const glowY = percentY * 5;

        gsap.to(video, {
          boxShadow: `${glowX}px ${glowY}px 5px #1563FF`,
          rotateX: -percentY * 5,
          rotateY: percentX * 5,
          scale: 1.1,
          transformPerspective: 800,
          transformOrigin: "center",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      video.addEventListener("mouseleave", () => {
        gsap.to(video, {
          boxShadow: "0px 0px 0px transparent",
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    }

    gsap.fromTo(
      ".slide3 video",
      { y: "-100%", opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".slide3",
          start: breakPointForCurrentSize.slide3.start,
          end: breakPointForCurrentSize.slide3.end,
        },
      }
    );

    // Slide 4
    gsap.fromTo(
      ".image-slider",
      { y: 2500 },
      {
        y: -1000,
        ease: "none",
        scrollTrigger: {
          trigger: ".slide4",
          start: breakPointForCurrentSize.slide4.start,
          end: breakPointForCurrentSize.slide4.end,
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      ".text-slider h3",
      { x: 1300 },
      {
        x: -1000,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".slide4",
          start: breakPointForCurrentSize.slide4.start,
          end: breakPointForCurrentSize.slide4.end,
          scrub: 1,
        },
      }
    );

    // Slide 5
    const slide5 = new SplitType(".slide5 h2", { types: "words,chars" });
    gsap.fromTo(
      slide5.chars,
      { opacity: 0 },
      {
        opacity: 1,
        color: "#1563FF",
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".slide3",
          start: breakPointForCurrentSize.slide5.start,
          end: breakPointForCurrentSize.slide5.end,
          scrub: 1,
        },
      }
    );
  }, []);

  useEffect(() => {
    setupAnimations();

    const handleResize = () => {
      setupAnimations(); // Re-run only when window size changes
    };

    const debouncedResize = debounce(handleResize, 300);
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      ScrollTrigger.killAll();
    };
  }, [setupAnimations]);

  return (
    <>
      {/* Intro Video */}
      <VideoSection src={introVideo} />

      {/* Horizontal Scroll */}
      <section className="horizontal-scroll" ref={horizontalRef}>
        <h1 className="scroll-title">SERVICES</h1>
        <div className="slides" ref={slidesRef}>
          {/* Slide 1 */}
          <VideoSlide src={carVid} className="slide slide1" />

          {/* Slide 2 */}
          <section className="slide slide2">
            <div className="text-container">
              {Array(7)
                .fill("BRANDING")
                .map((text, i) => (
                  <h2 key={i}>{text}</h2>
                ))}
            </div>
            <div className="image-container">
              <img
                src={stepImage}
                alt="Step"
                onClick={() => (window.location.href = "/services/branding")}
              />
            </div>
          </section>

          {/* Slide 3 */}
          <section className="slide slide3">
            <div className="text-container">
              <h2 className="title">WEB</h2>
              <h2 className="title">SITE</h2>
            </div>
            <div className="video-container">
              <video
                ref={slide3VideoRef}
                src={webVideo}
                muted
                autoPlay
                playsInline
                loop
                preload="none"
                onClick={() => (window.location.href = "/services/web")}
              />
            </div>
          </section>

          {/* Slide 4 */}
          <section className="slide slide4" id="#social">
            <div className="image-slider-wrapper">
              <div className="image-slider">
                {socialsImages.map((src, i) => (
                  <img src={src} alt="" key={i} />
                ))}
              </div>
            </div>
            <div className="cta-content">
              <p>GET YOUR FEED ALIGNED WITH BAW STUDIO</p>
              <button
                onClick={() => {
                  window.location.href = "/services/socials";
                }}
              >
                KNOW MORE
              </button>
            </div>

            <div className="text-slider" style={{ color: "#1563FF" }}>
              <h3>GET YOUR FEED ALIGNED & GET YOUR FEED ALIGNED</h3>
            </div>
          </section>

          {/* Slide 5 */}
          <section className="slide slide5">
            <div className="images-container">
              {productionData.map((item, i) => (
                <React.Fragment key={item.id}>
                  <div className="image-wrapper">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      onClick={() => {
                        window.location.href = `/services${item.redirect}`;
                      }}
                      className="image"
                    />
                  </div>
                  <div className="black-square"></div>
                </React.Fragment>
              ))}
            </div>

            <h2>PRODUCTION</h2>
          </section>
        </div>
      </section>

      {/* Outro Video */}
      <div className="outro-video">
        <video
          src={clientsVideo}
          autoPlay
          muted
          playsInline
          loop
          preload="none"
        />
      </div>
    </>
  );
};

const VideoSection = ({ src }) => (
  <section className="video-section">
    <video src={src} autoPlay muted playsInline loop preload="none" />
  </section>
);

const VideoSlide = ({ src, className }) => (
  <section className={className}>
    <video src={src} autoPlay loop muted playsInline preload="none" />
  </section>
);

// Debounce utility
function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export default HomePage;
