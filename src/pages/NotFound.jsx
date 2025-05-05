import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const NotFound = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [hoveringSpan, setHoveringSpan] = useState(false);

  const boxRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(boxRef.current, { width: "0%" }, { width: "auto" });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0, duration: 0.8 },
      "+=0.1"
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );
  }, []);

  return (
    <Box
      height={isMobile ? "85vh" : "100vh"}
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box ref={boxRef} bgcolor={theme.palette.blue} overflow="hidden">
        <Typography
          whiteSpace="nowrap"
          ref={titleRef}
          color={theme.palette.white}
          variant="h3"
          fontFamily={theme.fonts.helvetica}
          fontWeight={600}
          fontSize={isMobile ? 30 : 100}
          textAlign="center"
          px={isMobile ? 2 : 5}
        >
          Page not found
        </Typography>
      </Box>

      <Typography
        ref={subtitleRef}
        color={theme.palette.white}
        textAlign="center"
        fontSize={isMobile ? 20 : 60}
        mt={2}
        mb={isMobile ? 2 : 7}
        sx={{ cursor: "default" }}
      >
        try manifesting it
      </Typography>

      <Typography
        ref={paragraphRef}
        color={theme.palette.white}
        textAlign="center"
        fontSize={hoveringSpan ? 26 : isMobile ? 20 : 30}
        mt={2}
        sx={{
          cursor: "default",
          transition: "font-size 0.3s ease",
          "& span": {
            color: theme.palette.blue,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s ease",
            textDecoration: "underline",
            "&:hover": {
              color: theme.palette.blue,
              textShadow: "0 0 10px rgba(21, 99, 255, 0.5)",
              textDecoration: "none",
              fontSize: 45,
            },
          },
        }}
      >
        404 energy. <br />
        Let’s just go
        <span
          onMouseEnter={() => setHoveringSpan(true)}
          onMouseLeave={() => setHoveringSpan(false)}
          onClick={() => (window.location.href = "/")}
        >
          home
        </span>
        and pretend <br />
        this didn’t happen
      </Typography>
    </Box>
  );
};

export default NotFound;
