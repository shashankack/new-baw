import { Box, Stack, useTheme, Typography, Button } from "@mui/material";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import introVideo from "../../assets/videos/intro_video.mp4";
import whiteArrow from "../../assets/images/white_arrow.png";

import { brandingData, mobileBrands } from "../../data";

gsap.registerPlugin(ScrollTrigger);

const MobileHomePage = () => {
  const theme = useTheme();
  const textRef = useRef(null);
  const secondTextRef = useRef(null);
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

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

  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, mobileBrands.length);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 20%",
        end: () => `+=${mobileBrands.length * 500}`,
        scrub: true,
        pin: true,
      },
    });

    imageRefs.current.forEach((img, i) => {
      const xValue = i % 2 === 0 ? "-200vw" : "200vw";
      tl.fromTo(
        img,
        {
          x: xValue,
          scale: 2,
          rotate: i % 2 === 0 ? -70 : 70,
          zIndex: i + 1,
          boxShadow: "1px 1px 10px 10px rgba(0,0,0,0.2)",
        },
        { x: 0, scale: 1, duration: 1, rotate: 0 },
        `+=${i === 0 ? 0 : 1}`
      );
    });

    gsap.fromTo(
      secondTextRef.current,
      {
        y: "100%",
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 40%",
          end: "top 10%",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

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
          ref={textRef}
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
        ref={containerRef}
        height={"60vh"}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        position={"relative"}
        overflow={"hidden"}
        mt={5}
      >
        <Typography
          ref={secondTextRef}
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

        {mobileBrands.map((item, index) => (
          <Box
            key={index}
            ref={(el) => (imageRefs.current[index] = el)}
            position="absolute"
            top="50%"
            left="50%"
            sx={{
              width: "80%",
              transform: "translate(-50%, -50%)",
              zIndex: index + 1,
            }}
          >
            <Box
              component="img"
              src={item}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MobileHomePage;
