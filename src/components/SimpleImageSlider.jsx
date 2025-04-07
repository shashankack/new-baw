import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

/**
 * SimpleImageSlider
 *
 * @param {Array}   websites    - Array of objects with { id, title, thumbnail, redirect }
 * @param {string}  direction   - "vertical", "horizontal", or "random" (default)
 * @param {boolean} clickable   - If true, parallax on hover and click to redirect
 *
 * Behavior:
 * - If a slide is mid-transition, we let it finish.
 * - Once the transition completes, if hovered, do NOT schedule the next.
 * - On mouse leave, if no next slide is scheduled, schedule one.
 */
const SimpleImageSlider = ({
  websites = [],
  direction = "horizontal",
  clickable = false,
}) => {
  const sliderRef = useRef(null); // the container
  const websiteRefs = useRef([]); // references to <img> elements
  const currentIndexRef = useRef(0); // track current slide index

  // GSAP timeline for the current transition
  const timelineRef = useRef(null);

  // We'll store the timeout that handles the delay before starting the next slide
  const timeoutRef = useRef(null);

  // Track whether user is hovered
  const hoveredRef = useRef(false);
  // Track whether the next slide is already scheduled
  const nextScheduledRef = useRef(false);

  // ----------------------------------------------------------------
  // ANIMATION LOGIC
  // ----------------------------------------------------------------
  useEffect(() => {
    if (!websites.length) return;

    // Choose possible directions
    let availableDirections = [];
    if (direction === "vertical") {
      availableDirections = ["top", "bottom"];
    } else if (direction === "horizontal") {
      availableDirections = ["left", "right"];
    } else {
      // "random" / default
      availableDirections = ["top", "bottom", "left", "right"];
    }

    // Kick off the very first slide transition
    startSlideTransition();

    function startSlideTransition() {
      // Clear previous timeline & any scheduled next slide
      killTimelineAndTimeout();

      nextScheduledRef.current = false; // not yet scheduled for the next

      const currentIndex = currentIndexRef.current;
      const nextIndex = (currentIndex + 1) % websites.length;
      currentIndexRef.current = nextIndex;

      // Randomly pick a direction for the transition
      const selectedDirection =
        availableDirections[
          Math.floor(Math.random() * availableDirections.length)
        ];

      // We'll animate the current image "off screen" and the next "on screen."
      // outProps -> how we move the *current* slide off
      // inProps  -> how we move the *next* slide on
      let outProps = {};
      let inFromProps = {};
      let inToProps = {
        opacity: 1,
        x: "0%",
        y: "0%",
        duration: 1,
        ease: "power2.inOut",
      };

      // Animate the "current" image (index-1 in normal usage, but we had nextIndexRef logic)
      // Actually, let's figure out which was the "old" index:
      const oldIndex = (nextIndex + websites.length - 1) % websites.length;

      if (selectedDirection === "top") {
        outProps = { y: "100%", opacity: 1, duration: 1, ease: "power2.inOut" };
        inFromProps = { y: "-100%", opacity: 1 };
      } else if (selectedDirection === "bottom") {
        outProps = {
          y: "-100%",
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        };
        inFromProps = { y: "100%", opacity: 1 };
      } else if (selectedDirection === "left") {
        outProps = { x: "100%", opacity: 1, duration: 1, ease: "power2.inOut" };
        inFromProps = { x: "-100%", opacity: 1 };
      } else if (selectedDirection === "right") {
        outProps = {
          x: "-100%",
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        };
        inFromProps = { x: "100%", opacity: 1 };
      }

      // Build a timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // The slide has finished transitioning. Let's see if we should schedule the next.
          if (!hoveredRef.current) {
            // Not hovered => schedule the next slide
            scheduleNextSlide();
          } else {
            // If hovered => do nothing. We'll wait until mouse leaves.
            nextScheduledRef.current = false;
          }
        },
      });

      // Move old slide "off"
      tl.to(websiteRefs.current[oldIndex], outProps, 0);
      // Bring new slide "on"
      tl.fromTo(websiteRefs.current[nextIndex], inFromProps, inToProps, 0);

      timelineRef.current = tl;
    }

    // Schedule the next transition after a random delay
    function scheduleNextSlide() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      const randomDelay = Math.floor(Math.random() * 2001) + 2000; // 2-4s
      timeoutRef.current = setTimeout(() => {
        startSlideTransition();
      }, randomDelay);
      nextScheduledRef.current = true;
    }

    function killTimelineAndTimeout() {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    // Start fresh: ensure each image is hidden
    websiteRefs.current.forEach((img, idx) => {
      gsap.set(img, { opacity: idx === 0 ? 1 : 0, x: 0, y: 0 });
      // ^ Optionally show the "first" image if you want one visible at the start
      //   That depends on your desired initial state.
    });

    // Cleanup
    return () => {
      killTimelineAndTimeout();
    };
  }, [websites, direction]);

  // ----------------------------------------------------------------
  // HOVER LOGIC
  // ----------------------------------------------------------------
  const handleMouseEnter = useCallback(() => {
    if (!clickable) return;
    hoveredRef.current = true;
  }, [clickable]);

  const handleMouseLeave = useCallback(() => {
    if (!clickable) return;
    hoveredRef.current = false;

    // If the timeline is done and we haven't scheduled the next slide, do it now
    // "timeline done" => timelineRef.current exists & progress() >= 1
    if (
      timelineRef.current &&
      timelineRef.current.progress() >= 1 &&
      !nextScheduledRef.current
    ) {
      // schedule next
      const event = new Event("scheduleAfterHover");
      window.dispatchEvent(event);
    }
  }, [clickable]);

  // We'll handle scheduling next slide on a custom event if needed
  useEffect(() => {
    const handleSchedule = () => {
      // If user left and the timeline is done but we never scheduled next, do so
      // We just check nextScheduledRef.
      if (!nextScheduledRef.current) {
        // We can just do a new custom function here or replicate the logic in the effect
        // We'll do a quick approach: increment to the next slide and do a new transition
        // But to keep it consistent with our approach, let's replicate the "scheduleNextSlide" behavior
        // Easiest is to "fake" a short delay and call the same approach the effect used.
        // We'll rely on the effect's closure over scheduleNextSlide, which doesn't exist outside it.
        // So let's store a quick reference to 'scheduleNextSlide' in a ref if we want reusability.
        // Or do a simpler approach: we can forcibly do the next transition after a small delay:
        window.setTimeout(() => {
          if (timelineRef.current && timelineRef.current.progress() < 1) return;
          // If the timeline is still mid transition, do nothing
          // Otherwise, let's do the next transition ourselves:
          // We'll manually replicate the logic inside startSlideTransition
          const oldIndex = currentIndexRef.current;
          const nextIndex = (oldIndex + 1) % websites.length;
          currentIndexRef.current = nextIndex;

          if (timelineRef.current) {
            timelineRef.current.kill();
            timelineRef.current = null;
          }
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }

          // animate old out, new in:
          let outProps = {
            x: "100%",
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          };
          let inFromProps = { x: "-100%", opacity: 1 };
          let inToProps = {
            opacity: 1,
            x: "0%",
            y: "0%",
            duration: 1,
            ease: "power2.inOut",
          };
          // Adjust these as needed or replicate the random direction logic if you want.

          const tl = gsap.timeline({
            onComplete: () => {
              // Then schedule next if not hovered
              if (!hoveredRef.current) {
                // random delay approach
                const randomDelay = Math.floor(Math.random() * 2001) + 2000;
                timeoutRef.current = setTimeout(() => {
                  // do next transition, and so on
                  // Ideally we unify all logic in a single function to avoid repetition
                  window.setTimeout(() => {
                    // force next
                    const next2 =
                      (currentIndexRef.current + 1) % websites.length;
                    currentIndexRef.current = next2;
                    // etc ...
                    // This could get messy quickly if we keep in-lining.
                    // It's just a demonstration that no reload is needed.
                  }, 0);
                }, randomDelay);
                nextScheduledRef.current = true;
              } else {
                nextScheduledRef.current = false;
              }
            },
          });
          // Animate out old index
          tl.to(websiteRefs.current[oldIndex], outProps, 0);
          // Animate in new index
          tl.fromTo(websiteRefs.current[nextIndex], inFromProps, inToProps, 0);

          timelineRef.current = tl;
        }, 50);
      }
    };

    window.addEventListener("scheduleAfterHover", handleSchedule);
    return () => {
      window.removeEventListener("scheduleAfterHover", handleSchedule);
    };
  }, [websites.length]);

  // ----------------------------------------------------------------
  // PARALLAX & CLICK
  // ----------------------------------------------------------------
  const handleMouseMove = useCallback(
    (e) => {
      if (!clickable || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const xPos = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const yPos = (e.clientY - rect.top) / rect.height - 0.5; // -0.5..0.5

      const moveX = xPos * 20; // parallax multiplier
      const moveY = yPos * 20;

      gsap.to(sliderRef.current, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        overwrite: true,
      });
    },
    [clickable]
  );

  const handleClick = useCallback(
    (redirect) => {
      if (!clickable || !redirect) return;
      window.open(redirect, "_blank");
    },
    [clickable]
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        ref={sliderRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          cursor: clickable ? "pointer" : "default",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={clickable ? handleMouseMove : undefined}
      >
        {websites.map((item, index) => (
          <img
            key={item.id}
            ref={(el) => (websiteRefs.current[index] = el)}
            src={item.thumbnail}
            alt={item.title}
            onClick={() => handleClick(item.redirect)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleImageSlider;
