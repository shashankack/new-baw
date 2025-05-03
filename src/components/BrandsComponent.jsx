import { useTheme, Box, Typography } from "@mui/material";
import React from "react";

import { aboutUsVideos } from "../cdnData";
import LogoShowcase from "./LogoShowcase/LogoShowcase";

const BrandsComponent = () => {
  const theme = useTheme();
  const isMobile = window.innerWidth <= 768;
  return (
    <>
      <Box
        py={10}
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
      >
        {aboutUsVideos.map((video, index) => (
          <Box
            key={index}
            borderRadius={5}
            component="video"
            src={video.video}
            width={300}
            autoPlay
            muted
            loop
            playsInline
            onClick={() => {
              window.location.href = isMobile
                ? video.redirect.mobile
                : video.redirect.desktop;
            }}
            sx={{
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          />
        ))}
      </Box>
      <Typography
        my={10}
        fontFamily={theme.fonts.helvetica}
        textAlign={"center"}
        fontSize={80}
        lineHeight={1}
        fontWeight={700}
        textTransform="uppercase"
        color={theme.palette.white}
        sx={{
          "& span": {
            backgroundColor: theme.palette.blue,
          },
        }}
      >
        Brands we <br />
        <span>have worked</span>
        <br />
        with
      </Typography>
      <Box
        py={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box borderRadius={5} bgcolor={theme.palette.white} p={2}>
          <LogoShowcase />
        </Box>
      </Box>
    </>
  );
};

export default BrandsComponent;
