import { useEffect, useRef } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { gsap } from "gsap";

import { websiteData } from "../../cdnData";

const InteractiveLaptop = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const containerRef = useRef(null);
  const laptopRef = useRef(null);

  const positions = {
    desktop: [
      { top: "37%", left: "35%" },
      { top: "43%", left: "51%" },
      { top: "68%", left: "39%" },
      { top: "19%", left: "60%" },
      { top: "50%", left: "65%" },
    ],
    tablet: [
      { top: "60%", left: "35%" },
      { top: "45%", left: "45%" },
      { top: "38%", left: "30%" },
      { top: "25%", left: "55%" },
      { top: "52%", left: "60%" },
    ],
    mobile: [
      { top: "35%", left: "20%" },
      { top: "42%", left: "50%" },
      { top: "62%", left: "27%" },
      { top: "20%", left: "70%" },
      { top: "47%", left: "77%" },
    ],
  };

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = ((centerY - y) / centerY) * 15;

    gsap.to(containerRef.current, {
      rotationY: rotateY,
      rotationX: rotateX,
      transformPerspective: 1000,
      transformOrigin: "center",
      ease: "power2.out",
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(containerRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const getCurrentPositions = () => {
    if (isDesktop) return positions.desktop;
    if (isTablet) return positions.tablet;
    return positions.mobile;
  };

  useEffect(() => {
    const tl = gsap.timeline();
    const pos = getCurrentPositions();
    const featured = gsap.utils.toArray(".featured-site");

    tl.fromTo(
      laptopRef.current,
      { y: "-100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1, ease: "power4.out" }
    );

    featured.forEach((el) => {
      gsap.set(el, {
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: 1,
        opacity: 0,
        rotate: -17,
        position: "absolute",
        zIndex: 1,
      });
    });

    tl.to(featured, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0,
    });

    featured.forEach((el, index) => {
      tl.to(el, {
        top: pos[index].top,
        left: pos[index].left,
        scale: 1,
        duration: 0.1,
        ease: "back.out(1)",
      });
    });
    featured.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(el, {
          scale: 1.06,
          duration: 0.3,
          ease: "power2.out",
          zIndex: 2,
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          zIndex: 1,
        });
      });
    });
  }, [isMobile, isTablet, isDesktop]);

  return (
    <Box
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      width={1200}
      height={600}
      position="relative"
      sx={{ perspective: 1000 }}
    >
      <Box
        component="img"
        src="https://res.cloudinary.com/dsxowwoxw/image/upload/v1746283394/laptop_rl2lxr.png"
        ref={laptopRef}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
      {websiteData.slice(0, 5).map((item, index) => (
        <Box
          key={index}
          component="img"
          className="featured-site"
          src={item.thumbnail}
          onClick={() => window.open(item.redirect, "_blank")}
          sx={{
            width: 220,
            height: 140,
            objectFit: "cover",
            cursor: "pointer",
            borderRadius: 2,
            zIndex: 3,
          }}
        />
      ))}
    </Box>
  );
};

export default InteractiveLaptop;
