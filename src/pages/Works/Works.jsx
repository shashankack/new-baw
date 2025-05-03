import { useState, useEffect, useRef } from "react";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { worksData } from "../../cdnData";

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const nav = useNavigate();
  const theme = useTheme();
  const cardRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading status
  const [loadedImages, setLoadedImages] = useState(0); // Track number of loaded images
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Preload images
  useEffect(() => {
    let imagesLoaded = 0;
    const totalImages = worksData.length;

    const checkIfAllImagesLoaded = () => {
      if (imagesLoaded === totalImages) {
        setIsLoading(false); // Set loading to false once all images are loaded
      }
    };

    worksData.forEach((item) => {
      const img = new Image();
      img.src = item.thumbnail;
      img.onload = () => {
        imagesLoaded += 1;
        checkIfAllImagesLoaded();
      };
    });
  }, []);

  // GSAP animations only after images are loaded
  useEffect(() => {
    if (!isLoading) {
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
    }
  }, [isLoading]);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state until images are loaded
  }

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
      <Grid container size={12} spacing={isMobile ? 2 : 2} p={1}>
        {worksData.map((item, index) => (
          <Grid size={{ xs: 6, md: 3 }} key={index}>
            <Box
              ref={addToRefs}
              onClick={() => {
                nav(item.redirect);
                window.scrollTo(0, 0);
              }}
              sx={{
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                "&:hover img": {
                  transform: "scale(1.05)",
                  transition: "all 0.3s ease",
                },
                "&:hover .overlay": {
                  opacity: 1,
                  backdropFilter: "blur(3px)",
                },
                "&:hover .title": {
                  transform: "translateY(0)",
                  opacity: 1,
                },
              }}
            >
              <Box
                component="img"
                src={item.thumbnail}
                sx={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  transition: "all 0.5s ease",
                }}
              />
              <Box
                className={isMobile ? "" : "overlay"}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(18, 18, 18, 0.35)",
                  opacity: 0,
                  transition: "all 0.5s ease",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  p: 2,
                }}
              >
                <Typography
                  className="title"
                  fontSize={isMobile ? 20 : 25}
                  textTransform="uppercase"
                  color="#fff"
                  sx={{
                    transform: "translateY(100%)",
                    opacity: 0,
                    transition: "all 0.4s ease",
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            </Box>
            {isMobile && (
              <Typography
                fontSize={isMobile ? 20 : 25}
                textTransform="uppercase"
                color={theme.palette.blue}
              >
                {item.title}
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Works;
