import {
  Grid,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useState, useRef } from "react";

import { socialsGrids } from "../../../cdnData";
import Loader from "../../../components/Loader";

gsap.registerPlugin(ScrollTrigger);

const SocialsInternal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const imageRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const openFullscreen = (index) => {
    if (isMobile) setActiveImageIndex(index);
  };

  const closeFullscreen = () => {
    setActiveImageIndex(null);
  };

  const showPrevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? socialsGrids.length - 1 : prev - 1
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((prev) =>
      prev === socialsGrids.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    let imagesLoaded = 0;
    const totalImages = socialsGrids.length;

    const checkIfAllImagesLoaded = () => {
      if (imagesLoaded === totalImages) {
        setIsLoading(false);
      }
    };

    socialsGrids.forEach((image) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        imagesLoaded += 1;
        checkIfAllImagesLoaded();
      };
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      imageRefs.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(
            el,
            {
              scale: 0.8,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out",
              scrollTrigger: {
                trigger: el,
                start: isMobile ? "top 90%" : "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }
  }, [isLoading]);

  if (isLoading) return <Loader />;

  return (
    <Box paddingX={isMobile ? 1 : 5} paddingY={isMobile ? 5 : 10}>
      <Typography
        textAlign="center"
        textTransform="uppercase"
        fontFamily={theme.fonts.helvetica}
        fontWeight={800}
        color={theme.palette.blue}
        fontSize={isMobile ? 30 : 64}
        mb={5}
      >
        9 post Social Media Grids
      </Typography>
      <Grid
        container
        spacing={isMobile ? 1 : 5}
        display="flex"
        justifyContent="start"
        alignItems="center"
      >
        {socialsGrids.map((image, index) => (
          <Grid
            size={{
              xs: 6,
              sm: 6,
              md: 4,
            }}
            key={index}
            ref={(el) => (imageRefs.current[index] = el)}
            sx={{ padding: 0 }}
          >
            <Box
              component="img"
              src={image}
              alt={`Image-${index}`}
              onClick={() => openFullscreen(index)}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 5,
                boxShadow: 3,
                transition: "transform 0.3s",
                cursor: isMobile ? "pointer" : "default",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Fullscreen Preview (Mobile Only) */}
      {activeImageIndex !== null && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          bgcolor="rgba(0,0,0,0.95)"
          zIndex={2000}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <IconButton
            onClick={closeFullscreen}
            sx={{
              position: "absolute",
              top: "6%",
              right: 16,
              color: "red",
              zIndex: 2001,
            }}
          >
            <CloseIcon />
          </IconButton>

          <IconButton
            onClick={showPrevImage}
            sx={{
              position: "absolute",
              left: 10,
              color: theme.palette.blue,
              fontSize: 40,
            }}
          >
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>

          <Box
            component="img"
            src={socialsGrids[activeImageIndex]}
            sx={{
              width: "90%",
              height: "auto",
              maxHeight: "80vh",
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 5,
            }}
          />

          <IconButton
            onClick={showNextImage}
            sx={{
              position: "absolute",
              right: 10,
              color: theme.palette.blue,
              fontSize: 40,
            }}
          >
            <ArrowForwardIosIcon fontSize="large" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default SocialsInternal;
