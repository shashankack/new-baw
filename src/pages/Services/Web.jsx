import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

import MarqueeSlider from "../../components/MarqueeSlider/MarqueeSlider";
import SimpleImageSlider from "../../components/ImageSlider/SimpleImageSlider";

import { websiteData } from "../../data";

import laptop from "../../assets/images/pages/services/web/laptop.png";

import "./Web.scss";

const Web = () => {
  const sectionRef = useRef(null);
  const laptopContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [breakpoint, setBreakpoint] = useState("desktop");

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setBreakpoint("desktop");
      } else if (window.innerWidth >= 768) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("mobile");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getWebsitePositions = (bp) => {
    if (bp === "desktop") {
      return [
        {
          class: ".website-1",
          top: "67%",
          left: "30%",
          scaleBefore: 0.4,
          scaleAfter: 0.45,
        },
        {
          class: ".website-2",
          top: "42%",
          left: "50%",
          scaleBefore: 0.4,
          scaleAfter: 0.45,
        },
        {
          class: ".website-3",
          top: "33%",
          left: "15%",
          scaleBefore: 0.4,
          scaleAfter: 0.45,
        },
        {
          class: ".website-4",
          top: "19%",
          left: "70%",
          scaleBefore: 0.4,
          scaleAfter: 0.45,
        },
        {
          class: ".website-5",
          top: "50%",
          left: "80%",
          scaleBefore: 0.4,
          scaleAfter: 0.45,
        },
      ];
    } else if (bp === "tablet") {
      return [
        {
          class: ".website-1",
          top: "60%",
          left: "35%",
          scaleBefore: 0.75,
          scaleAfter: 0.75,
        },
        {
          class: ".website-2",
          top: "45%",
          left: "45%",
          scaleBefore: 0.75,
          scaleAfter: 0.75,
        },
        {
          class: ".website-3",
          top: "38%",
          left: "30%",
          scaleBefore: 0.75,
          scaleAfter: 0.75,
        },
        {
          class: ".website-4",
          top: "25%",
          left: "55%",
          scaleBefore: 0.75,
          scaleAfter: 0.75,
        },
        {
          class: ".website-5",
          top: "52%",
          left: "60%",
          scaleBefore: 0.75,
          scaleAfter: 0.75,
        },
      ];
    } else {
      // mobile
      return [
        {
          class: ".website-1",
          top: "35%",
          left: "20%",
          scaleBefore: 0.4,
          scaleAfter: 0.65,
        },
        {
          class: ".website-2",
          top: "42%",
          left: "50%",
          scaleBefore: 0.4,
          scaleAfter: 0.65,
        },
        {
          class: ".website-3",
          top: "62%",
          left: "27%",
          scaleBefore: 0.4,
          scaleAfter: 0.65,
        },
        {
          class: ".website-4",
          top: "20%",
          left: "70%",
          scaleBefore: 0.4,
          scaleAfter: 0.65,
        },
        {
          class: ".website-5",
          top: "47%",
          left: "77%",
          scaleBefore: 0.4,
          scaleAfter: 0.65,
        },
      ];
    }
  };

  // GSAP animations and website positions.
  useEffect(() => {
    const websitePositions = getWebsitePositions(breakpoint);

    const ctx = gsap.context(() => {
      // Set initial properties for laptop and websites.
      gsap.set(".laptop", { opacity: 0, y: "-50%" });
      // Remove scale from the general website set-up; we'll set it individually.
      gsap.set(".website", {
        opacity: 0,
        rotate: -16,
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        position: "absolute",
      });
      // Set each website's initial scale (scaleBefore).
      websitePositions.forEach((pos) => {
        gsap.set(pos.class, { scale: pos.scaleBefore });
      });

      const tl = gsap.timeline();

      tl.to(".laptop", {
        y: "0%",
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power4.out",
      });

      // Animate each website to its target position and scale (scaleAfter).
      websitePositions.forEach((pos, idx) => {
        tl.to(
          pos.class,
          {
            opacity: 1,
            scale: pos.scaleBefore,
            top: pos.top,
            left: pos.left,
            duration: 0.8,
            ease: "back.out(1.1)",
          },
          "websites+=" + idx * 0.1
        );
      });

      const websites = document.querySelectorAll(".website");
      websites.forEach((website) => {
        website.addEventListener("mouseenter", () => {
          gsap.to(website, {
            scale: (pos) => {
              // On hover, we can optionally adjust the scale relative to the current scaleAfter.
              // For example, increase by 6%.
              const currentScale = websitePositions.find(
                (w) => w.class === `.${website.classList[1]}`
              )?.scaleAfter;
              return currentScale ? currentScale * 1.06 : 0.85;
            },
            duration: 0.3,
            ease: "power2.out",
            zIndex: 100,
          });
        });

        website.addEventListener("mouseleave", () => {
          // Return to the defined scaleAfter value.
          const websiteClass = website.classList[1];
          const posData = websitePositions.find(
            (w) => w.class === `.${websiteClass}`
          );
          gsap.to(website, {
            scale: posData ? posData.scaleAfter : 0.8,
            duration: 0.3,
            ease: "power2.out",
            zIndex: 2,
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [breakpoint]);

  // Mouse event handlers for desktop.
  const handleMouseMove = useCallback((e) => {
    const rect = laptopContainerRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;

    const rotationY = xPos * 20;
    const rotationX = yPos * -20;

    gsap.to(laptopContainerRef.current, {
      rotationY,
      rotationX,
      transformPerspective: 800,
      transformOrigin: "center",
      duration: 0.4,
      ease: "power3.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(laptopContainerRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  // Device orientation handler for mobile with baseline calibration.
  const baselineRef = useRef({ beta: null, gamma: null });

  useEffect(() => {
    if (isMobile && window.DeviceOrientationEvent) {
      const handleOrientation = (event) => {
        if (
          baselineRef.current.beta === null ||
          baselineRef.current.gamma === null
        ) {
          baselineRef.current = { beta: event.beta, gamma: event.gamma };
        }
        const rotationY = (event.gamma - baselineRef.current.gamma) * (20 / 30);
        const rotationX = -(event.beta - baselineRef.current.beta) * (20 / 30);

        gsap.to(laptopContainerRef.current, {
          rotationY,
          rotationX,
          transformPerspective: 800,
          transformOrigin: "center",
          duration: 0.4,
          ease: "power3.out",
        });
      };

      window.addEventListener("deviceorientation", handleOrientation, true);
      return () => {
        window.removeEventListener(
          "deviceorientation",
          handleOrientation,
          true
        );
      };
    }
  }, [isMobile]);

  const handleRedirect = (link) => {
    window.open(link, "_blank");
  };

  return (
    <section className="web-section" ref={sectionRef}>
      <h3>Web Design & Development</h3>

      <div
        className="laptop-container"
        ref={laptopContainerRef}
        {...(!isMobile && {
          onMouseMove: handleMouseMove,
          onMouseLeave: handleMouseLeave,
        })}
      >
        <img src={laptop} className="laptop" alt="Laptop" />
        {websiteData.map((website) => (
          <img
            key={website.id}
            src={website.thumbnail}
            className={`website website-${website.id}`}
            alt={website.title}
            onClick={() => handleRedirect(website.redirect)}
          />
        ))}
      </div>

      <div className="moving-text-container">
        <MarqueeSlider text="YOUR WEBSITE OUR DESIGN - " />
      </div>

      <h3>OTHER WEBSITES</h3>
      <div className="slider-container">
        <SimpleImageSlider websites={websiteData} clickable />
      </div>
    </section>
  );
};

export default Web;
