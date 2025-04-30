import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
  Skeleton,
} from "@mui/material";
import gsap from "gsap";

import whiteArrow from "../../assets/images/white_arrow.png";
import { aboutUsVideos } from "../../data";

const KnowMore = () => {
  const theme = useTheme();
  const trackRef = useRef(null);

  const [loadedVideos, setLoadedVideos] = useState(
    new Array(aboutUsVideos.length).fill(false)
  );

  const handleVideoLoad = (index) => {
    setLoadedVideos((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const totalWidth = track.scrollWidth;

      gsap.to(track, {
        x: `-${totalWidth / 2}px`,
        ease: "none",
        duration: 25,
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const buttonStyles = {
    fontSize: 26,
    justifyContent: "space-between",
    color: theme.palette.white,
  };

  const buttonData = [
    { text: "BRANDING", redirect: "/services?type=branding" },
    { text: "WEBSITE", redirect: "/services?type=web" },
    { text: "SOCIAL", redirect: "/services?type=social" },
    { text: "PRODUCTION", redirect: "/services?type=production" },
  ];

  return (
    <Box p={1} gap={2} display="flex" flexDirection="column">
      <Typography
        variant="h4"
        textTransform={"uppercase"}
        fontWeight={700}
        fontSize={26}
        textAlign={"start"}
        fontFamily={theme.fonts.helvetica}
        color={theme.palette.white}
      >
        What are you <br /> looking for?
      </Typography>
      <Divider
        sx={{
          height: 2,
          backgroundColor: theme.palette.blue,
        }}
      />
      <Stack mt={3}>
        {buttonData.map((item, index) => (
          <Box key={index}>
            <Button
              fullWidth
              variant="text"
              sx={{
                ...buttonStyles,
                "&:hover": {
                  backgroundColor: theme.palette.white,
                  color: theme.palette.black,
                  border: `2px solid ${theme.palette.blue}`,
                },
              }}
              onClick={() => (window.location.href = item.redirect)}
            >
              {item.text}
              <img
                src={whiteArrow}
                alt="arrow"
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </Button>
            <Divider
              sx={{
                height: 2,
                backgroundColor: theme.palette.blue,
              }}
            />
          </Box>
        ))}
      </Stack>

      <Box
        mt={5}
        sx={{
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Box
          ref={trackRef}
          sx={{
            display: "flex",
            width: "max-content",
          }}
        >
          {[...aboutUsVideos, ...aboutUsVideos].map((video, index) => {
            const realIndex = index % aboutUsVideos.length;
            return (
              <Box key={index} sx={{ position: "relative", marginRight: 2 }}>
                {!loadedVideos[realIndex] && (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={150}
                    height={300}
                    sx={{ borderRadius: 3, bgcolor: theme.palette.black }}
                  />
                )}
                <Box
                  component="video"
                  src={video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onLoadedData={() => handleVideoLoad(realIndex)}
                  sx={{
                    width: 150,
                    height: 300,
                    objectFit: "cover",
                    borderRadius: 3,
                    display: loadedVideos[realIndex] ? "block" : "none",
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default KnowMore;
