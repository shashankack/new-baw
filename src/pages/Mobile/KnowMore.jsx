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
    px: 2,
    fontSize: 30,
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
    <Box p={1} gap={5} display="flex" flexDirection="column">
      <Box bgcolor={theme.palette.white} padding={1} borderRadius={3} my={3}>
        <Typography
          variant="h1"
          fontSize={65}
          textAlign="start"
          fontFamily={theme.fonts.akira}
          color={theme.palette.black}
          sx={{
            "& span": {
              fontFamily: theme.fonts.akira,
              color: theme.palette.blue,
              fontWeight: 700,
            },
          }}
        >
          <span>BAW</span> <br /> STUDIO.
        </Typography>
        <Typography
          variant="body2"
          color={theme.palette.black}
          fontFamily={theme.fonts.helvetica}
          textTransform="uppercase"
          fontWeight={600}
          textAlign={"justify"}
          sx={{
            textAlignLast: "start",
            "& span": {
              color: theme.palette.blue,
            },
          }}
        >
          At <span>BAW Studios</span>, we believe branding goes beyond visuals;
          it’s about <span>crafting a unique identity</span> that resonates with
          your audience. Our team offers comprehensive solutions including
          strategic <span>branding, logo design</span>, and
          <span>digital branding</span> to ensure your business stands out. Let
          us transform your brand into a powerful asset that drives growth and
          enhances your market presence.
        </Typography>
      </Box>
      <Typography
        variant="h4"
        textTransform={"uppercase"}
        fontWeight={700}
        textAlign={"start"}
        fontFamily={theme.fonts.helvetica}
        color={theme.palette.white}
        gutterBottom
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
