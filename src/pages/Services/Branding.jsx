import { Box, Stack, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { brandingData } from "../../cdnData";

const Branding = () => {
  const theme = useTheme();

  const points = [
    "Logo Design",
    "Typography",
    "Brand Guidelines",
    "Color Palette",
    "Brand Voice",
    "Brand Strategy",
  ];

  // Set the default selected brand to be the first one
  const [selectedBrand, setSelectedBrand] = useState(brandingData[0]);

  // Preload images and other assets
  useEffect(() => {
    // Preload all images in the brandingData array
    brandingData.forEach((item) => {
      const img = new Image();
      img.src = item.thumbnail; // Preload thumbnail image
      img.src = item.image; // Preload main image
    });
  }, []);

  const handleThumbnailClick = (brand) => {
    setSelectedBrand(brand);
  };

  return (
    <Box py={10} px={10} width="100%" display="flex">
      <Stack
        direction="column"
        width="100%"
        maxWidth={200}
        gap={1}
        height="100%"
        mr={5}
      >
        {brandingData.map((item, index) => (
          <Box
            key={index}
            component="img"
            src={item.thumbnail}
            alt={item.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer", // Add cursor pointer to indicate it's clickable
              border:
                selectedBrand.title === item.title ? "3px solid #000" : "none", // Highlight the selected thumbnail
            }}
            onClick={() => handleThumbnailClick(item)}
          />
        ))}
      </Stack>

      <Box display="flex" flexDirection="column" width="100%">
        <Box width="100%">
          <Typography
            textTransform="uppercase"
            variant="h2"
            fontFamily={theme.fonts.helvetica}
            fontWeight={700}
          >
            Branding
          </Typography>
          <Stack direction="row">
            {points.map((item, index) => (
              <Typography
                key={index}
                color={theme.palette.blue}
                mr={3}
                variant="h5"
              >
                {item}
              </Typography>
            ))}
          </Stack>
        </Box>

        {/* Right Box */}
        <Box
          height="100%"
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="start"
          p={2}
          gap={5}
        >
          <Box
            width="30%"
            height="100%"
            display="flex"
            justifyContent="start"
            alignItems="start"
            flexDirection="column"
          >
            <Typography
              variant="h2"
              textTransform="uppercase"
              fontFamily={theme.fonts.helvetica}
              fontWeight={700}
              textAlign="start"
              width={"100%"}
              color={theme.palette.blue}
            >
              {selectedBrand.title}
            </Typography>
            <Typography
              mt={5}
              variant="body1"
              fontSize={24}
              lineHeight={1.3}
              fontFamily={theme.fonts.helvetica}
              fontWeight={300}
              color={theme.palette.white}
            >
              {selectedBrand.description}
            </Typography>
          </Box>
          <Box
            width="60%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              component="img"
              src={selectedBrand.image}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Branding;
