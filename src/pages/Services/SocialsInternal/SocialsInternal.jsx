import { Grid, Box, Typography, useTheme } from "@mui/material";
import gsap from "gsap";
import { useEffect, useState, useRef } from "react";

import { socialsGrids } from "../../../cdnData";
import Loader from "../../../components/Loader";

const SocialsInternal = () => {
  const theme = useTheme();
  const imageRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let imagesLoaded = 0;
    const totalImages = socialsGrids.length;

    const checkIfAllImagesLoaded = () => {
      if (imagesLoaded === totalImages) {
        setIsLoading(false);
      }
    };

    socialsGrids.forEach((image, index) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        imagesLoaded += 1;
        checkIfAllImagesLoaded();
      };
    });

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      paddingX={5}
      paddingY={10}
      sx={{
        backgroundColor: "#080808",
      }}
    >
      <Typography
        textAlign={"center"}
        textTransform="uppercase"
        fontFamily={theme.fonts.helvetica}
        fontWeight={800}
        color={theme.palette.blue}
        fontSize={64}
      >
        9 post Social Media Grids
      </Typography>
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
