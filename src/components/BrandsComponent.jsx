import { useTheme, Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { aboutUsVideos } from "../cdnData";
import LogoShowcase from "./LogoShowcase/LogoShowcase";

const BrandsComponent = () => {
  const theme = useTheme();
  const isMobile = window.innerWidth <= 768;
  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      const glowColor =
        index % 2 === 0 ? theme.palette.blue : theme.palette.white;

      const handleMouseMove = (e) => {
        const rect = video.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const percentX = (x / rect.width - 0.5) * 3;
        const percentY = (y / rect.height - 0.5) * 3;

        const glowX = percentX * 5;
        const glowY = percentY * 5;

        gsap.to(video, {
          boxShadow: `${glowX}px ${glowY}px 15px ${glowColor}`,
          rotateX: -percentY * 5,
          rotateY: percentX * 5,
          scale: 1.05,
          transformPerspective: 800,
          transformOrigin: "center",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(video, {
          boxShadow: "0px 0px 0px transparent",
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      video.addEventListener("mousemove", handleMouseMove);
      video.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        video.removeEventListener("mousemove", handleMouseMove);
        video.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, [theme.palette.blue]);

  return (
    <>
      <Box
        py={10}
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        flexWrap="wrap"
        gap={4}
      >
        {aboutUsVideos.map((video, index) => (
          <Box
            key={index}
            component="video"
            src={video.video}
            ref={(el) => (videoRefs.current[index] = el)}
            borderRadius={5}
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
            }}
          />
        ))}
      </Box>

      <Typography
        my={10}
        fontFamily={theme.fonts.helvetica}
        textAlign="center"
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
