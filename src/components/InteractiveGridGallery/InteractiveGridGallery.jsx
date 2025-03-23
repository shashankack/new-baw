import React, { useRef, useEffect, useState, useCallback } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import "./InteractiveGridGallery.scss";

gsap.registerPlugin(ScrollToPlugin);

// Fisher-Yates shuffle to randomize the data in array.
function randomizeData(data) {
  const randomized = [...data];
  for (let i = randomized.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomized[i], randomized[j]] = [randomized[j], randomized[i]];
  }
  return randomized;
}

// Seeded random function for consistent random values per seed.
function seededRandom(seed) {
  // Mulberry32: Fast, repeatable PRNG
  seed = seed >>> 0;
  let t = (seed += 0x6D2B79F5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const getResponsiveDimensions = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  let cellWidth, cellHeight;
  if (width >= 1024) {
    cellWidth = 450;
    cellHeight = 600;
  } else if (width >= 768) {
    cellWidth = 400;
    cellHeight = Math.round(400 * (600 / 450));
  } else if (width >= 500) {
    cellWidth = 350;
    cellHeight = Math.round(350 * (600 / 450));
  } else {
    if (width < height) {
      cellWidth = 300;
      cellHeight = Math.round(300 * (600 / 450));
    } else {
      cellWidth = 400;
      cellHeight = 300;
    }
  }
  return { cellWidth, cellHeight };
};

const InteractiveGridGallery = ({ data }) => {
  const GAP = 1;
  const [dimensions, setDimensions] = useState(getResponsiveDimensions());
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Randomize the provided data globally.
  const [shuffledData, setShuffledData] = useState(() => randomizeData(data));
  useEffect(() => {
    setShuffledData(randomizeData(data));
  }, [data]);

  const columns = 1000;
  const rows = 1000;
  const containerRef = useRef(null);
  const lastScrollTop = useRef(0);
  const lastScrollLeft = useRef(0);
  const ticking = useRef(false);

  // Update dimensions on window resize.
  useEffect(() => {
    const handleResize = () => {
      setDimensions(getResponsiveDimensions());
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Center scroll on mount or when window size/dimensions change.
  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight, scrollWidth, scrollHeight } =
        containerRef.current;
      const centerX = (scrollWidth - clientWidth) / 2;
      const centerY = (scrollHeight - clientHeight) / 2;
      containerRef.current.scrollLeft = centerX;
      containerRef.current.scrollTop = centerY;
      lastScrollLeft.current = centerX;
      lastScrollTop.current = centerY;
    }
  }, [windowSize, dimensions]);

  // Update animations (vertical/horizontal shrink and recentering).
  const updateAnimations = () => {
    const container = containerRef.current;
    if (!container) return;

    // Vertical shrink.
    const scrollTop = container.scrollTop;
    const deltaY = Math.abs(scrollTop - lastScrollTop.current);
    const newScaleX = 1 - Math.min(deltaY / 400, 0.1);
    gsap.to(".gallery-card", {
      scaleX: newScaleX,
      duration: 0.01,
      ease: "power1.out",
    });
    clearTimeout(updateAnimations.resetTimeout);
    updateAnimations.resetTimeout = setTimeout(() => {
      gsap.to(".gallery-card", {
        scaleX: 1,
        duration: 0.01,
        ease: "power1.out",
      });
    }, 150);
    lastScrollTop.current = scrollTop;

    // Horizontal shrink.
    const currentScrollLeft = container.scrollLeft;
    const deltaX = Math.abs(currentScrollLeft - lastScrollLeft.current);
    const newScaleY = 1 - Math.min(deltaX / 400, 0.1);
    gsap.to(".gallery-img", {
      scaleY: newScaleY,
      duration: 0.01,
      ease: "power1.out",
    });
    clearTimeout(updateAnimations.resetTimeoutHorizontal);
    updateAnimations.resetTimeoutHorizontal = setTimeout(() => {
      gsap.to(".gallery-img", {
        scaleY: 1,
        duration: 0.01,
        ease: "power1.out",
      });
    }, 150);
    lastScrollLeft.current = currentScrollLeft;

    // Center scroll logic.
    const thresholdX = dimensions.cellWidth * 40;
    const thresholdY = dimensions.cellHeight * 40;
    if (
      currentScrollLeft < thresholdX ||
      currentScrollLeft >
        container.scrollWidth - container.clientWidth - thresholdX
    ) {
      const centerX = (container.scrollWidth - container.clientWidth) / 2;
      gsap.to(container, {
        duration: 0.5,
        scrollTo: { x: centerX },
        ease: "power2.inOut",
      });
      lastScrollLeft.current = centerX;
    }
    if (
      scrollTop < thresholdY ||
      scrollTop > container.scrollHeight - container.clientHeight - thresholdY
    ) {
      const centerY = (container.scrollHeight - container.clientHeight) / 2;
      gsap.to(container, {
        duration: 0.5,
        scrollTo: { y: centerY },
        ease: "power2.inOut",
      });
      lastScrollTop.current = centerY;
    }

    // Columns parallax with randomized scroll speed per column.
    const centerScrollY = (container.scrollHeight - container.clientHeight) / 2;
    const parallaxCells = container.querySelectorAll(".parallax-cell");
    parallaxCells.forEach((cell) => {
      const colIndex = parseInt(cell.getAttribute("data-col-index"), 10);
      // Randomize scroll speed: generate a factor between 0.8 and 1.2.
      const factor = 0.8 + seededRandom(colIndex) * 0.4;
      const parallaxOffsetY =
        (container.scrollTop - centerScrollY) * (factor - 1);
      gsap.to(cell, {
        y: parallaxOffsetY,
        duration: 0.1,
        ease: "power1.out",
      });
    });
  };

  // Throttle scroll events.
  const handleScroll = () => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        updateAnimations();
        ticking.current = false;
      });
      ticking.current = true;
    }
  };

  // For each cell, use a seeded random value (based on row and column) to pick an element from the shuffled data.
  const renderCell = useCallback(
    ({ columnIndex, rowIndex, style }) => {
      const adjustedStyle = { ...style };
      const seed = rowIndex * columns + columnIndex;
      const randomValue = seededRandom(seed);
      const index = Math.floor(randomValue * shuffledData.length);
      const item = shuffledData[index];

      return (
        <div style={adjustedStyle}>
          <div
            className="parallax-cell"
            data-col-index={columnIndex}
            style={{ width: "100%", height: "100%" }}
          >
            <div style={{ margin: GAP / 2, width: "100%", height: "100%" }}>
              <div
                className="gallery-card"
                style={{ width: "100%", height: "100%" }}
              >
                <a
                  href={item.redirect}
                  style={{ display: "block", width: "100%", height: "100%" }}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="gallery-img"
                    loading="lazy"
                    style={{ display: "block", width: "100%", height: "100%" }}
                    onMouseEnter={(e) =>
                      gsap.to(e.currentTarget, {
                        scale: 1.03,
                        duration: 0.05,
                        ease: "power1.out",
                      })
                    }
                    onMouseLeave={(e) =>
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        duration: 0.2,
                        ease: "power1.out",
                      })
                    }
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    },
    [shuffledData, columns]
  );

  return (
    <Grid
      columnCount={columns}
      rowCount={rows}
      columnWidth={dimensions.cellWidth + GAP}
      rowHeight={dimensions.cellHeight + GAP}
      height={windowSize.height}
      width={windowSize.width}
      className="gallery-grid"
      outerRef={containerRef}
      onScroll={handleScroll}
      itemKey={({ columnIndex, rowIndex }) => rowIndex * columns + columnIndex}
    >
      {renderCell}
    </Grid>
  );
};

export default InteractiveGridGallery;
