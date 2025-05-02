import { useEffect, useRef, useState } from "react";
import { useTheme, Grid, Box, useMediaQuery } from "@mui/material";
import { worksData } from "../../data";
import gsap from "gsap";

const TOTAL_VISIBLE = 6;

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const LogoShowcase = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const totalLogos = worksData.length;
  const containerRefs = useRef([]);

  const [logoIndexes, setLogoIndexes] = useState(() => {
    const initial = [];
    while (initial.length < TOTAL_VISIBLE) {
      const rand = Math.floor(Math.random() * totalLogos);
      if (!initial.includes(rand)) initial.push(rand);
    }
    return initial;
  });

  const usedIndexes = useRef(new Set(logoIndexes));
  const queue = useRef(
    shuffleArray(
      [...Array(totalLogos).keys()].filter((i) => !usedIndexes.current.has(i))
    )
  );

  // Replace all logos in one batch
  useEffect(() => {
    const interval = setInterval(() => {
      // If queue is empty, reset it
      if (queue.current.length < TOTAL_VISIBLE) {
        usedIndexes.current = new Set();
        queue.current = shuffleArray([...Array(totalLogos).keys()]);
      }

      const newIndexes = [];
      const updated = [...logoIndexes];

      for (let i = 0; i < TOTAL_VISIBLE; i++) {
        let newIndex;
        do {
          newIndex = queue.current.pop();
        } while (
          usedIndexes.current.has(newIndex) ||
          newIndexes.includes(newIndex)
        );

        usedIndexes.current.add(newIndex);
        newIndexes.push(newIndex);
      }

      // Animate out all current logos
      logoIndexes.forEach((_, i) => {
        const el = containerRefs.current[i];
        if (el) {
          gsap.to(el, {
            scale: 0.7,
            opacity: 0,
            duration: 0.3,
            delay: Math.random() * 0.2,
          });
        }
      });

      // Delay state update slightly to allow exit animation
      setTimeout(() => {
        setLogoIndexes(newIndexes);

        // Animate in all new logos
        newIndexes.forEach((_, i) => {
          const el = containerRefs.current[i];
          if (el) {
            gsap.fromTo(
              el,
              { scale: 0.7, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                delay: Math.random() * 0.2,
              }
            );
          }
        });
      }, 350);
    }, Math.random() * 1500 + 2000); // 2s to 3.5s

    return () => clearInterval(interval);
  }, [logoIndexes]);

  return (
    <Grid
      container
      bgcolor={theme.palette.white}
      width={"100%"}
      p={2}
      height={"100%"}
    >
      {logoIndexes.map((logoIndex, i) => (
        <Grid
          size={4}
          key={i}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            onClick={() =>
              (window.location.href = worksData[logoIndex].redirect)
            }
            ref={(el) => (containerRefs.current[i] = el)}
            component="img"
            src={worksData[logoIndex].logo}
            alt={`logo-${logoIndex}`}
            sx={{
              width: isMobile ? "100px" : "200px",
              height: isMobile ? "100px" : "200px",
              objectFit: "contain",
              opacity: 1,
              transform: "scale(1)",
              cursor: "pointer",
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default LogoShowcase;
