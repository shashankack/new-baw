import { useState, useEffect, useRef } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import { EffectCreative, Autoplay } from "swiper/modules";
import Loader from "../../components/Loader";
import gsap from "gsap";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

const ServicesLayout = ({ data }) => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("branding");
  const [animating, setAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const paragraphRef = useRef(null);
  const tagsRef = useRef([]);
  tagsRef.current = [];
  const addTagRef = (el) => {
    if (el && !tagsRef.current.includes(el)) {
      tagsRef.current.push(el);
    }
  };

  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam && data[typeParam]) {
      setActiveTab(typeParam);
    }
  }, [searchParams, data]);

  useEffect(() => {
    const validTags = tagsRef.current.filter(Boolean);
    if (validTags.length > 0) {
      gsap.fromTo(
        validTags,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }

    if (paragraphRef.current) {
      gsap.fromTo(
        paragraphRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => setAnimating(false),
        }
      );
    }
  }, [activeTab]);

  const handleTabClick = (tab) => {
    if (tab === activeTab || animating) return;

    setAnimating(true);

    gsap.to(tagsRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.out",
      onComplete: () => {
        setActiveTab(tab);
        tagsRef.current = [];
      },
    });

    gsap.to(paragraphRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const buttonStyles = (tab) => ({
    px: 2,
    fontSize: 16,
    color: activeTab === tab ? theme.palette.white : theme.palette.blue,
    backgroundColor:
      activeTab === tab ? theme.palette.blue : theme.palette.white,
    borderRadius: 2,
    textTransform: "uppercase",
    fontFamily: theme.fonts.helvetica,
    width: "100%",
    justifyContent: "start",
    overflow: "hidden",
  });

  const current = data[activeTab];

  // Preload images
  useEffect(() => {
    let imagesLoaded = 0;
    const totalImages = current.sliderImages.length + current.gridImages.length;

    const checkIfAllImagesLoaded = () => {
      if (imagesLoaded === totalImages) {
        setIsLoading(false);
      }
    };

    // Preload slider images
    current.sliderImages.forEach((image) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        imagesLoaded += 1;
        checkIfAllImagesLoaded();
      };
    });

    // Preload grid images
    current.gridImages.forEach((image) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        imagesLoaded += 1;
        checkIfAllImagesLoaded();
      };
    });
  }, [current]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      p={1}
      width="100%"
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      <Typography
        color={theme.palette.blue}
        fontFamily={theme.fonts.akira}
        fontSize={40}
        textAlign="center"
        textTransform="uppercase"
        fontWeight={800}
      >
        Services
      </Typography>

      <Grid container spacing={1} my={2} size={12}>
        {Object.keys(data).map((tab) => (
          <Grid size={6} key={tab}>
            <Button sx={buttonStyles(tab)} onClick={() => handleTabClick(tab)}>
              {data[tab].title}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Box
        display="flex"
        gap={1}
        mb={2}
        sx={{
          overflowY: "scroll",
        }}
      >
        {current.keyTags.map((tag, i) => (
          <Box
            key={i}
            ref={addTagRef}
            px={1}
            py={1}
            bgcolor={"none"}
            border={1}
            color={theme.palette.blue}
            fontSize={12}
            borderRadius={1}
            sx={{ textWrap: "nowrap" }}
          >
            {tag}
          </Box>
        ))}
      </Box>

      <Box
        mt={2}
        border={1}
        bgcolor={theme.palette.white}
        borderRadius={3}
        p={1}
        gap={2}
        display="flex"
        flexDirection="column"
      >
        <Swiper
          modules={[EffectCreative, Autoplay]}
          effect="creative"
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-40%", 0, -1],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          style={{
            width: "100%",
            height: "250px",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          {Object.keys(current.sliderImages).map((img, i) => (
            <SwiperSlide key={i} style={{ overflow: "hidden" }}>
              <Box
                component="img"
                src={current.sliderImages[img]}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  overflow: "hidden",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Typography
          ref={paragraphRef}
          mb={2}
          variant="body2"
          fontSize={14}
          fontFamily={theme.fonts.helvetica}
          color={theme.palette.black}
          textAlign={"justify"}
          fontWeight={400}
          textTransform={"uppercase"}
        >
          {current.description}
        </Typography>
      </Box>
      <Grid container spacing={1} mt={4}>
        {current.gridImages.map((img, i) => (
          <Grid size={activeTab === "web" ? 12 : 6} key={i}>
            <Box
              component="img"
              src={img}
              sx={{
                width: "100%",
                height: "200px",
                borderRadius: 2,
                objectFit: "cover",
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServicesLayout;
