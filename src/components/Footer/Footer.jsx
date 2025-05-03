import {
  Box,
  Divider,
  Link,
  Stack,
  useTheme,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import { useRef, useLayoutEffect } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import whiteLogo from "../../assets/images/white_logo.png";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const leftLinksRef = useRef(null);
  const rightLinksRef = useRef(null);
  const dividerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: -100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        }
      )
        .fromTo(
          dividerRef.current,
          { height: "0%" },
          { height: "100%", duration: 0.5 },
          "-=0.5"
        )
        .fromTo(
          leftLinksRef.current,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
          }
        )

        .fromTo(
          rightLinksRef.current,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
          }
        );
    }, footerRef);
  });

  const linkStyles = {
    color: theme.palette.white,
    padding: 0,
    fontFamily: theme.fonts.helvetica,
    textAlign: "end",
    fontSize: 26,
    textTransform: "none",
    transition: "all 0.3s ease",
    textDecoration: "none",

    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.blue,
    },
  };

  const iconStyles = {
    color: theme.palette.white,
    fontSize: 40,
    "&:hover": {
      color: theme.palette.blue,
      transform: "scale(.5..5)",
      transition: "all 0.3s ease",
    },
  };

  return isMobile ? (
    <div>Mobile</div>
  ) : (
    <Box
      width="100%"
      ref={footerRef}
      bgcolor={theme.palette.black}
      height={300}
      display="flex"
      justifyContent="space-between"
      alignItems="end"
      p={7}
      position="relative"
      zIndex={1000}
    >
      <Box
        ref={logoRef}
        component="img"
        src={whiteLogo}
        sx={{
          width: "700px",
          height: "auto",
          display: "block",
          objectFit: "contain",
        }}
      />
      <Box
        height="100%"
        width="100%"
        display="flex"
        justifyContent="end"
        alignItems="center"
      >
        <Box overflow="hidden" height="100%" mr={1}>
          <Stack
            mr={3}
            ref={leftLinksRef}
            direction="column"
            display="flex"
            justifyContent="space-between"
            height="100%"
          >
            <Link href="/services/branding" sx={linkStyles}>
              Design
            </Link>
            <Link href="/services/web" sx={linkStyles}>
              Websites
            </Link>
            <Link href="/works" sx={linkStyles}>
              Production
            </Link>
            <Link href="/services/socials" sx={linkStyles}>
              Social Media
            </Link>
          </Stack>
        </Box>
        <Divider
          ref={dividerRef}
          orientation="vertical"
          variant="fullWidth"
          sx={{
            border: `2px solid ${theme.palette.blue}`,
          }}
        />
        <Box overflow="hidden" height="100%" ml={1}>
          <Stack
            ref={rightLinksRef}
            direction="column"
            ml={3}
            display="flex"
            justifyContent="space-between"
            height="100%"
          >
            <Link
              href="tel:8083333328"
              sx={{ ...linkStyles, textAlign: "start" }}
            >
              +91 80833 33328
            </Link>
            <Link
              href="mailto:bawstudios55@gmail.com"
              sx={{ ...linkStyles, textAlign: "start" }}
            >
              bawstudios55@gmail.com
            </Link>
            <Stack direction="row">
              <IconButton>
                <InstagramIcon sx={iconStyles} />
              </IconButton>
              <IconButton>
                <LinkedInIcon sx={iconStyles} />
              </IconButton>
              <IconButton>
                <WhatsAppIcon sx={iconStyles} />
              </IconButton>
            </Stack>
            <Typography variant="caption">
              Copyrights2024 BAW @ All Rights Reserved
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
