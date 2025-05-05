import { Box, Typography, useTheme, Grid, Tooltip, Zoom } from "@mui/material";
import InteractiveLaptop from "../../components/Test/InteractiveLaptop";
import MarqueeSlider from "../../components/MarqueeSlider/MarqueeSlider";
import { websiteData } from "../../cdnData";
import React, { useState, useEffect, useCallback } from "react";
import Loader from "../../components/Loader";

const Web = () => {
  const [isHovered, setIsHovered] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    let imagesLoaded = 0;
    let videosLoaded = 0;
    const totalItems = websiteData.length * 2;

    const checkIfAllLoaded = () => {
      if (imagesLoaded + videosLoaded === totalItems) {
        setIsLoading(false);
      }
    };

    websiteData.forEach((item) => {
      const img = new Image();
      img.src = item.thumbnail;
      img.onload = () => {
        imagesLoaded += 1;
        checkIfAllLoaded();
      };
    });

    websiteData.forEach((item) => {
      const video = document.createElement("video");
      video.src = item.video;
      video.oncanplaythrough = () => {
        videosLoaded += 1;
        checkIfAllLoaded();
      };
    });
  }, []);

  const handleMouseEnter = useCallback((index) => {
    setIsHovered(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(null);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      overflow="hidden"
    >
      <Typography
        my={5}
        color={theme.palette.white}
        fontFamily={theme.fonts.helvetica}
        textAlign="center"
        textTransform="uppercase"
        fontSize={25}
        fontWeight={500}
      >
        web design & development
      </Typography>
      <Box>
        <InteractiveLaptop />
      </Box>
      <MarqueeSlider text="YOUR WEBSITE OUR DESIGN -" />
      <Grid container my={10} spacing={1} p={5}>
        {websiteData.map((item, index) => (
          <React.Fragment key={index}>
            <Tooltip
              followCursor
              title={item.title}
              slots={{ transition: Zoom }}
            >
              <Grid
                size={4}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => window.open(item.redirect, "_blank")}
                sx={{
                  cursor: "pointer",
                }}
              >
                {isHovered === index ? (
                  <Box
                    component="video"
                    src={item.video}
                    muted
                    playsInline
                    loop
                    autoPlay
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <Box
                    component="img"
                    src={item.thumbnail}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                )}
              </Grid>
            </Tooltip>
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default Web;
