import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./IntroLoader.scss";
import monogram1 from "../../assets/images/monogram/monogram_m1.png";
import monogram2 from "../../assets/images/monogram/monogram_m2.png";

const IntroLoader = ({ nextComponent: NextComponent }) => {
  const loaderRef = useRef(null);
  const [hideLoader, setHideLoader] = useState(false);
  const [isComponentReady, setIsComponentReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("introSeen")) {
      setHideLoader(true);
      setIsComponentReady(true); // Skip animation if already seen
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("introSeen", "true");
        setHideLoader(true);
        setIsComponentReady(true); // Set component as ready after animation
      },
    });

    tl.fromTo(
      loaderRef.current.querySelector(".monogram1"),
      { opacity: 0, scale: 1.6 },
      { opacity: 1, scale: 1, duration: 1 }
    )
      .fromTo(
        loaderRef.current.querySelector(".monogram2"),
        { opacity: 0, scale: 1.5 },
        { opacity: 1, scale: 1, rotation: -50, duration: 1 },
        "-=1"
      )
      .to(loaderRef.current, { y: "-100%", duration: 1, delay: 0.3 });
  }, []);

  return (
    <>
      {/* Intro Loader UI */}
      {!hideLoader && (
        <div className="intro-loader" ref={loaderRef}>
          <div className="monogram1">
            <img src={monogram1} alt="Monogram 1" />
          </div>

          <div className="monogram2">
            <img src={monogram2} alt="Monogram 2" />
          </div>
        </div>
      )}

      {/* Show the next component after loader finishes */}
      {hideLoader && isComponentReady && NextComponent && <NextComponent />}
    </>
  );
};

export default IntroLoader;
