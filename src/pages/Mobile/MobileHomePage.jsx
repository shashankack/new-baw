import { Box, Stack, useTheme, Typography, Button } from "@mui/material";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";

import introVideo from "../../assets/videos/intro_video.mp4";
import whiteArrow from "../../assets/images/white_arrow.png";

import { mobileBrands } from "../../data";
import KnowMore from "./KnowMore";
import LogoShowcase from "../../components/LogoShowcase/LogoShowcase";

const MobileHomePage = () => {
  const theme = useTheme();
  const textRef = useRef(null);

  useEffect(() => {
    const typeSplit = new SplitType(textRef.current, {
      types: "lines, words, chars",
    });

    gsap.from(textRef.current.querySelectorAll(".line"), {
      y: "100%",
      delay: 0.5,
      opacity: 0,
      duration: 0.5,
      ease: "back.out",
      stagger: 0.2,
    });

    return () => {
      typeSplit.revert();
    };
  }, []);

  return (
    <Box p={1} bgcolor={theme.palette.black}>
      <Stack
        padding={1}
        bgcolor={theme.palette.black}
        gap={1}
        borderRadius={3}
        spacing={3}
        mb={5}
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
          ref={textRef}
          variant="body2"
          color={theme.palette.white}
          fontSize={12}
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
          in <span>design, motion, web</span> and <span>social</span>
        </Typography>
        <Button
          variant="contained"
          disableRipple
          onClick={() => (window.location.href = "/about")}
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
          about us
        </Button>
      </Stack>

      <KnowMore />

      <Box mt={5} px={2}>
        <Typography
          my={10}
          fontFamily={theme.fonts.helvetica}
          textAlign={"center"}
          fontSize={40}
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

        <Box borderRadius={5} bgcolor={theme.palette.white} p={2}>
          <LogoShowcase />
        </Box>
      </Box>
    </Box>
  );
};

export default MobileHomePage;
