import { useTheme, Box, Typography } from "@mui/material";
import React from "react";

import { aboutUsVideos } from "../../data";
import LogoShowcase from "../LogoShowcase/LogoShowcase";

const Test = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
      >
        {aboutUsVideos.map((video, index) => (
          <Box
            key={index}
            borderRadius={5}
            component="video"
            src={video}
            width={300}
            autoPlay
            muted
            loop
            playsInline
            sx={{
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        ))}
      </Box>
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box border={1}>
          <LogoShowcase />
        </Box>
      </Box>
    </>
  );
};

export default Test;
