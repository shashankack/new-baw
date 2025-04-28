import { useRef, useEffect } from "react";
import { worksData } from "../../data";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);
const Works = () => {
  const nav = useNavigate();
  const theme = useTheme();
  const cardRefs = useRef([]);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    cardRefs.current.forEach((el) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <Box p={2}>
      <Typography
        variant="h1"
        fontSize={isMobile ? 32 : 64}
        textAlign="center"
        mt={isMobile ? 0 : 10}
        mb={isMobile ? 0 : 5}
        textTransform="uppercase"
        fontFamily={theme.fonts.akira}
        color={theme.palette.blue}
      >
        Works
      </Typography>
      <Grid container size={12} spacing={1} p={1}>
        {worksData.map((item, index) => (
          <Grid size={{ xs: 6, md: 3 }} key={index}>
            <Box ref={addToRefs}>
              <Box
                component="img"
                src={item.thumbnail}
                onClick={() => {
                  nav(item.redirect);
                  window.scrollTo(0, 0);
                }}
                sx={{
                  height: "100%",
                  objectFit: "cover",
                  transition: "all 0.3s ease",
                  cursor: "pointer",

                  "&:hover": {
                    transform: "scale(1.01)",
                  },
                }}
              />
            </Box>
            <Typography
              fontSize={isMobile ? 20 : 40}
              color={theme.palette.blue}
            >
              {item.title}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Works;
