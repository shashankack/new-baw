import { Box, Stack, useTheme, Typography, Button } from "@mui/material";
import React from "react";

import introVideo from "../assets/videos/intro_video.mp4";
import whiteArrow from "../assets/images/white_arrow.png";

const MobileHomePage = () => {
  const theme = useTheme();
  return (
    <Box p={1}>
      <Stack
        padding={1}
        bgcolor={theme.palette.white}
        gap={1}
        borderRadius={3}
        spacing={3}
      >
        <Box height={250}>
          <Box
            component="video"
            src={introVideo}
            autoPlay
            loop
            muted
            playsInline
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 3,
            }}
          />
        </Box>
        <Typography
          variant="body2"
          color={theme.palette.black}
          fontSize={14}
          textAlign={"center"}
          fontWeight={700}
          textTransform={"uppercase"}
          sx={{
            "& span": {
              color: theme.palette.blue,
              fontWeight: 700,
            },
          }}
        >
          We are a <span>creative studio</span> based in Bengaluru specializing
          in <span>design, motion, web</span> and <span>social</span>.
        </Typography>
        <Button
          variant="contained"
          disableRipple
          endIcon={
            <img
              src={whiteArrow}
              style={{
                width: 20,
                height: 20,
                marginLeft: 10,
              }}
            />
          }
          sx={{
            backgroundColor: theme.palette.blue,
            color: theme.palette.white,
            borderRadius: 3,
            padding: "10px 20px",
            fontSize: 16,
            fontWeight: 600,
            fontFamily: theme.fonts.helvetica,
            textTransform: "uppercase",
            justifyContent: "space-between",
            transition: "all 0.3s ease",
            "&:active": {
              scale: 0.97,
            },
          }}
        >
          know more
        </Button>
      </Stack>
      <Box
        height={"60vh"}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
      >
        <Typography
          textAlign={"center"}
          fontSize={40}
          fontWeight={700}
          color={theme.palette.white}
          textTransform={"uppercase"}
          fontFamily={theme.fonts.helvetica}
          sx={{
            "& span": {
              color: theme.palette.white,
              backgroundColor: theme.palette.blue,
              fontWeight: 700,
            },
          }}
        >
          Brands we <br />
          <span>have worked</span> <br />
          with
        </Typography>
      </Box>
    </Box>
  );
};

export default MobileHomePage;

// Brands: Ampere, Fastrack, ID Foods, Bharat Benz, Switch, Umi, Needle
