import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const AboutMobile = () => {
  const theme = useTheme();

  const paragraphStyles = {
    textAlign: "justify",
    fontSize: 14,
    fontWeight: 400,
    fontFamily: theme.fonts.helvetica,
    color: theme.palette.white,
    textTransform: "uppercase",
  };

  return (
    <Box p={2} height="100vh">
      <Box height={300}></Box>
      <Typography
        textTransform="uppercase"
        textAlign="center"
        fontSize={44}
        fontWeight={700}
        mt={2}
        fontFamily={theme.fonts.akira}
      >
        The Studio
      </Typography>

      <Typography variant="body2" sx={paragraphStyles} mt={2}>
        At BAW Studios, we believe good design is about more than just looking
        good. It's about telling your story the right way.
      </Typography>
      <Typography variant="body2" sx={paragraphStyles} mt={2}>
        We help brands connect with people through social media, websites,
        branding, and powerful content. Every project we work on is crafted with
        care, creativity, and a clear purpose.
      </Typography>
      <Typography variant="body2" sx={paragraphStyles} mt={2}>
        We’re not just a design agency. We’re your creative team, working with
        you to build something real, something memorable.
      </Typography>
    </Box>
  );
};

export default AboutMobile;
