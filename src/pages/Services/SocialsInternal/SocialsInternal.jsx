import { Grid, Box } from "@mui/material";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { socialsGrids } from "../../../data";

gsap.registerPlugin(ScrollTrigger);

const SocialsInternal = () => {
  const imageRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      imageRefs.current,
      { opacity: 0 },
      {
        opacity: 1,
        y: 50,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
      }
    );
  }, []);

  return (
    <Box
      paddingX={5}
      paddingY={10}
      sx={{
        backgroundColor: "#080808",
      }}
    >
      <Grid
        container
        spacing={5}
        display={`flex`}
        justifyContent={`start`}
        alignItems={`center`}
      >
        {socialsGrids.map((image, index) => (
          <Grid
            size={{
              xs: 6,
              sm: 6,
              md: 4,
            }}
            item
            ref={(el) => (imageRefs.current[index] = el)}
            sx={{ padding: 0 }}
            key={index}
          >
            <div className="socials-image-container">
              <Box
                component="img"
                src={image}
                alt={`Image-${index}`}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 5,
                  boxShadow: 3,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SocialsInternal;
