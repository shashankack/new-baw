import { useParams } from "react-router-dom";
import { worksData } from "../../cdnData";
import ImageSlider from "../ImageSlider/ImageSlider";
import { Box, useTheme, Typography, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";

import "./WorksInternal.scss";
import Loader from "../Loader";

const WorksInternal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { slug } = useParams();
  const workItem = worksData.find((item) => item.redirect === `/works/${slug}`);

  const [isLoading, setIsLoading] = useState(true); // State to track image loading
  const [loadedImages, setLoadedImages] = useState(0); // Track number of loaded images

  // Preload images
  useEffect(() => {
    if (!workItem) return;

    let imagesLoaded = 0;
    const totalImages = [
      ...workItem.images.one,
      ...workItem.images.two,
      ...workItem.images.three,
      workItem.logo,
      ...workItem.images.misc,
    ].length;

    const checkIfAllImagesLoaded = () => {
      if (imagesLoaded === totalImages) {
        setIsLoading(false); // Set loading to false once all images are loaded
      }
    };

    // Preload images
    const preloadImages = (images) => {
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          imagesLoaded += 1;
          checkIfAllImagesLoaded();
        };
      });
    };

    preloadImages([
      ...workItem.images.one,
      ...workItem.images.two,
      ...workItem.images.three,
      workItem.logo,
      ...workItem.images.misc,
    ]);
  }, [workItem]);

  if (isLoading) {
    return <Loader />;
  }

  return isMobile ? (
    <Box p={2}>
      <Typography
        fontSize={30}
        fontWeight={800}
        color={theme.palette.blue}
        textTransform="uppercase"
        gutterBottom
      >
        {workItem.title}
      </Typography>
      <Typography
        fontFamily={theme.fonts.helvetica}
        fontWeight={400}
        variant="body2"
        lineHeight={1.3}
        textAlign="start"
        fontSize={13}
        mb={5}
      >
        {workItem.description}
      </Typography>
      <Box height={200} mb={2} borderRadius={2} overflow="hidden">
        <ImageSlider images={workItem.images.one} direction="horizontal" />
      </Box>

      <Box
        height={200}
        mb={2}
        display="flex"
        flexDirection="row"
        gap={2}
        justifyContent="space-between"
      >
        <Box bgcolor={theme.palette.white} borderRadius={2} width={"40%"} p={1}>
          <Box
            component="img"
            src={workItem.logo}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
        <Box borderRadius={2} overflow="hidden" width={"60%"} height="100%">
          <Box
            component="img"
            src={workItem.images.misc[0]}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
      <Box height={200} mb={2} borderRadius={2} overflow="hidden">
        <ImageSlider images={workItem.images.two} direction="horizontal" />
      </Box>
      <Box
        height={200}
        mb={2}
        display="flex"
        flexDirection="row-reverse"
        gap={2}
        justifyContent="space-between"
      >
        <Box borderRadius={2} overflow="hidden">
          <Box
            component="img"
            src={workItem.images.misc[1]}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box borderRadius={2} overflow="hidden">
          <Box
            component="img"
            src={workItem.images.misc[2]}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Box>
  ) : (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      flexDirection="row"
      gap={3}
      padding={10}
    >
      <Box
        width="70%"
        height="100%"
        gap={3}
        display="flex"
        flexDirection="column"
      >
        <Box height="50%" display={"flex"} flexDirection="row" gap={3}>
          <Box height="100%" width="70%">
            <ImageSlider images={workItem.images.one} direction="horizontal" />
          </Box>

          <Box bgcolor={theme.palette.white} p={5} width="30%">
            <Box
              component="img"
              src={workItem.logo}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
        <Box height="50%" display={"flex"} flexDirection="row" gap={3}>
          <Box
            width={"35%"}
            height="100%"
            bgcolor={theme.palette.white}
            p={5}
            alignItems="start"
            display="flex"
            justifyContent="center"
            overflow={"auto"}
          >
            <Typography
              color={theme.palette.black}
              fontFamily={theme.fonts.helvetica}
              fontWeight={400}
              variant="body1"
              textAlign="justify"
              fontSize={20}
            >
              {workItem.description}
            </Typography>
          </Box>

          <Box width={"65%"} height="100%">
            <ImageSlider images={workItem.images.two} direction="horizontal" />
          </Box>
        </Box>
      </Box>

      <Box width="30%" height={"100%"}>
        <Box width="100%" height="100%">
          <ImageSlider images={workItem.images.three} direction="vertical" />
        </Box>
      </Box>
    </Box>
  );
};

export default WorksInternal;
