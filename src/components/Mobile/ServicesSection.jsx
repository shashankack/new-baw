import "./ServicesSection.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, Fragment } from "react";

import carTimelapse from "../../assets/videos/car_timelapse.mp4";
import poster from "../../assets/images/branding_poster.png";
import mellowVideo from "../../assets/videos/mellow.mp4";

import { Grid, Typography } from "@mui/material";

import { socialsImages, productionData } from "../../data";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const posterRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".mobile-title",
      { fontSize: "5rem" },
      {
        x: 0,
        y: 0,
        color: "#1563FF",
        fontSize: "2rem",
        opacity: 1,
        scrollTrigger: {
          trigger: ".mobile-title",
          start: "top top",
          end: "top+=700 top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      posterRef.current,
      { scale: 0, rotate: "-10deg" },
      {
        scale: 1,
        x: "0%",
        y: "0%",
        rotate: "10deg",
        ease: "power4",
        scrollTrigger: {
          trigger: posterRef.current,
          start: "top 56%",
          end: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    const brandingTexts = gsap.utils.toArray(".section-two p");

    brandingTexts.forEach((el, i) => {
      const distance = i % 2 === 0 ? 150 : -150;
      gsap.fromTo(
        el,
        { x: -distance },
        {
          x: distance,
          ease: "none",
          scrollTrigger: {
            trigger: ".section-two",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    gsap.utils.toArray(".section-three h2").forEach((el, i) => {
      const xFrom = i % 2 === 0 ? "-100%" : "100%";
      gsap.fromTo(
        el,
        { scale: 0, opacity: 0, x: xFrom },
        {
          scale: 1,
          x: 0,
          opacity: 1,
          color: "#1563FF",
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    gsap.fromTo(
      ".section-four .image-slider",
      { y: -100 },
      {
        y: -800,
        ease: "none",
        scrollTrigger: {
          trigger: ".section-four",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".section-four .text-slider h3",
      { x: 300 },
      {
        x: -1000,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".section-four",
          start: "top+=300 bottom",
          end: "bottom top",
          scrub: 4,
        },
      }
    );
  }, []);
  return (
    <section className="mobile-services-section">
      <div className="mobile-title-wrapper">
        <h2 className="mobile-title">SERVICES</h2>
      </div>
      <section className="section-one">
        <div className="video-container">
          <video src={carTimelapse} loop autoPlay muted playsInline />
        </div>
      </section>

      <section className="section-two">
        <div className="text-wrapper">
          <p>BRANDING BRANDING BRANDING BRANDING</p>
          <p>BRANDING BRANDING BRANDING BRANDING</p>
          <p>BRANDING BRANDING BRANDING BRANDING</p>
          <p>BRANDING BRANDING BRANDING BRANDING</p>
          <p>BRANDING BRANDING BRANDING BRANDING</p>
        </div>
        <div className="image-container">
          <img src={poster} ref={posterRef} />
        </div>
        <button onClick={() => (window.location.href = "/branding")}>
          Learn More
        </button>
      </section>

      <section className="section-three">
        <h2>WEB</h2>
        <video src={mellowVideo} autoPlay playsInline loop muted />
        <button onClick={() => (window.location.href = "/web")}>
          Learn More
        </button>
        <h2>SITE</h2>
      </section>

      <section className="section-four">
        <div className="image-slider-wrapper">
          <div className="image-slider">
            {socialsImages.map((src, i) => (
              <img src={src} alt={`social-${i}`} key={i} />
            ))}
          </div>
        </div>
        <div className="text-slider">
          <h3>
            GET YOUR FEED ALIGNED & GET YOUR FEED ALIGNED & GET YOUR FEED
            ALIGNED
          </h3>
        </div>
        <div className="cta">
          <p>GET YOUR FEED ALIGNED WITH BAW STUDIOS</p>
          <button>LEARN MORE</button>
        </div>
      </section>

      <section className="section-five">
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "3.3rem", sm: "4rem", md: "5rem" },
            fontWeight: 500,
            fontFamily: "Helvetica",
            color: "#fcf3e3",
            textAlign: "center",
            mb: 4,
          }}
        >
          PRODUCTION
        </Typography>
        <Grid container spacing={0} justifyContent="center">
          {productionData.slice(0, -1).map((item, i) => {
            const isEvenRow = Math.floor(i / 2) % 2 === 0;

            return (
              <Fragment key={item.id}>
                {isEvenRow ? (
                  <>
                    <Grid size={{ xs: 3, sm: 4 }}>
                      <div className="image-wrapper">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          onClick={() => (window.location.href = item.redirect)}
                        />
                      </div>
                    </Grid>
                    <Grid size={{ xs: 3, sm: 4 }}>
                      <div className="black-square" />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid size={{ xs: 3, sm: 4 }}>
                      <div className="black-square" />
                    </Grid>
                    <Grid size={{ xs: 3, sm: 4 }}>
                      <div className="image-wrapper">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          onClick={() => (window.location.href = item.redirect)}
                        />
                      </div>
                    </Grid>
                  </>
                )}
              </Fragment>
            );
          })}
        </Grid>
      </section>
    </section>
  );
};

export default ServicesSection;
