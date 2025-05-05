import {
  Drawer,
  Box,
  useTheme,
  Typography,
  Stack,
  IconButton,
  Collapse,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const MobileNavbar = ({ navbarTheme = "light" }) => {
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const threshold = 50;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) < threshold) return;

      if (currentScrollY > lastScrollY) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const linkStyles = {
    textDecoration: "none",
    color: theme.palette.black,
    fontFamily: "Akira",
    fontStyle: "normal",
    fontSize: 30,
    fontWeight: 600,
    "&:hover": {
      color: theme.palette.blue,
    },
  };

  return (
    <Box
      position={"sticky"}
      top={0}
      zIndex={2000}
      bgcolor={"transparent"}
      sx={{
        transition: "all 0.3s ease",
        transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <Stack
        direction="row-reverse"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={2}
      >
        <Typography
          fontSize={25}
          fontFamily={"Akira"}
          textTransform="uppercase"
          fontWeight={800}
          color={
            navbarTheme === "light"
              ? isMenuOpen
                ? theme.palette.blue
                : theme.palette.white
              : theme.palette.black
          }
          zIndex={20}
          onClick={() => ((window.location.href = "/"), setIsMenuOpen(false))}
        >
          Baw Studio
        </Typography>

        <IconButton
          onClick={() => setIsMenuOpen((prev) => !prev)}
          sx={{
            width: 40,
            height: 40,
            zIndex: 20,
            p: 0,
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 24,
              position: "relative",
              transition: "transform 0.3s ease",
              transform: isMenuOpen ? "rotate(90deg)" : "none",
            }}
          >
            {/* Top bar */}
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: 4,
                backgroundColor: !isMenuOpen
                  ? navbarTheme === "light"
                    ? theme.palette.white
                    : theme.palette.black
                  : theme.palette.blue,
                top: 0,
                left: 0,
                transform: isMenuOpen
                  ? "rotate(44deg) translate(5px, -3px)"
                  : "rotate(0)",
                transformOrigin: "top left",
                transition: "transform 0.4s ease",
              }}
            />
            {/* Middle bar */}
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: 4,
                backgroundColor: !isMenuOpen
                  ? navbarTheme === "light"
                    ? theme.palette.white
                    : theme.palette.black
                  : theme.palette.blue,
                top: "50%",
                left: 0,
                opacity: isMenuOpen ? 0 : 1,
                transition: "opacity 0.3s ease",
                transform: "translateY(-50%)",
              }}
            />
            {/* Bottom bar */}
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: 4,
                backgroundColor: !isMenuOpen
                  ? navbarTheme === "light"
                    ? theme.palette.white
                    : theme.palette.black
                  : theme.palette.blue,
                bottom: 0,
                left: 0,
                transform: isMenuOpen
                  ? "rotate(-45deg) translate(4px, 5px)"
                  : "rotate(0)",
                transformOrigin: "bottom left",
                transition: "transform 0.4s ease",
              }}
            />
          </Box>
        </IconButton>
      </Stack>

      <Drawer
        anchor="top"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        sx={{
          zIndex: 1000,
          "& .MuiDrawer-paper": {
            backgroundColor: theme.palette.white,
            py: 15,
            px: 2,
            height: "100vh",
            width: "100%",
          },
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Link
            style={linkStyles}
            to="/about"
            onClick={() => setIsMenuOpen(false)}
          >
            ABOUT
          </Link>
          <Divider
            sx={{
              width: "90%",
              backgroundColor: theme.palette.black,
              border: 1,
              borderRadius: 1,
            }}
          />
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography
              variant="h5"
              style={linkStyles}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              color={isDropDownOpen ? theme.palette.blue : theme.palette.black}
            >
              SERVICES
            </Typography>

            <Collapse in={isDropDownOpen} timeout={300}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt={1}
                gap={1}
              >
                <Link
                  style={{ ...linkStyles, color: theme.palette.blue }}
                  to={"/services?type=branding"}
                  onClick={() => {
                    setIsMenuOpen(false), setIsDropdownOpen(false);
                  }}
                >
                  BRANDING
                </Link>
                <Link
                  style={{ ...linkStyles, color: theme.palette.blue }}
                  to={"/services?type=web"}
                  sx={{ fontSize: 14 }}
                  onClick={() => {
                    setIsMenuOpen(false), setIsDropdownOpen(false);
                  }}
                >
                  WEB
                </Link>
                <Link
                  style={{ ...linkStyles, color: theme.palette.blue }}
                  to={"/services?type=socials"}
                  sx={{ fontSize: 14 }}
                  onClick={() => {
                    setIsMenuOpen(false), setIsDropdownOpen(false);
                  }}
                >
                  SOCIAL
                </Link>
                <Link
                  style={{ ...linkStyles, color: theme.palette.blue }}
                  to={"/services?type=production"}
                  sx={{ fontSize: 14 }}
                  onClick={() => {
                    setIsMenuOpen(false), setIsDropdownOpen(false);
                  }}
                >
                  PRODUCTION
                </Link>
              </Box>
            </Collapse>
          </Box>
          <Divider
            sx={{
              width: "90%",
              backgroundColor: theme.palette.black,
              border: 1,
              borderRadius: 1,
            }}
          />
          <Link
            style={linkStyles}
            to={"/works"}
            onClick={() => setIsMenuOpen(false)}
          >
            WORKS
          </Link>
          <Divider
            sx={{
              width: "90%",
              backgroundColor: theme.palette.black,
              border: 1,
              borderRadius: 1,
            }}
          />
          <Link
            style={linkStyles}
            to={"/contact"}
            onClick={() => setIsMenuOpen(false)}
          >
            CONTACT
          </Link>
          <Divider
            sx={{
              width: "90%",
              backgroundColor: theme.palette.black,
              border: 1,
              borderRadius: 1,
            }}
          />
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileNavbar;
