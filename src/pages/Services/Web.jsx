import { Box, Typography, useTheme, Grid, Tooltip, Zoom } from "@mui/material";
import InteractiveLaptop from "../../components/Test/InteractiveLaptop";
import MarqueeSlider from "../../components/MarqueeSlider/MarqueeSlider";
import { websiteData } from "../../data";
import React, { useState, useCallback } from "react";

const Web = () => {
  const [isHovered, setIsHovered] = useState(null);
  const theme = useTheme();

  const handleMouseEnter = useCallback((index) => {
    setIsHovered(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(null);
  }, []);

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
