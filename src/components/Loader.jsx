import React from "react";
import loadingVideo from "../assets/videos/loading.mp4";
import { Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      height="100vh"
      position="relative"
      zIndex={4000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#121212"
    >
      <Box width={300} bgcolor="#121212">
        <Box
          component="video"
          src={loadingVideo}
          autoPlay
          muted
          playsInline
          loop
        />
      </Box>
    </Box>
  );
};

export default Loader;
