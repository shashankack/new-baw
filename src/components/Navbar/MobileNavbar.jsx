import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronUp } from "react-icons/fa";
import "./MobileNavbar.scss";

import whiteLogo from "../../assets/images/white_logo.png";
import blackLogo from "../../assets/images/black_logo.png";
import whiteHamburger from "../../assets/images/white_menu.png";
import blackHamburger from "../../assets/images/black_menu.png";
import blueAmp from "../../assets/images/blue_amp.png";
import whiteAmp from "../../assets/images/white_amp.png";
import monogram from "../../assets/images/monogram/monogram_m2.png";

const MobileNavbar = ({ color = "white" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const nav = useNavigate();

  const monogramRef = useRef(null);

  useEffect(() => {
    gsap.to(monogramRef.current, {
      rotation: 360,
      duration: 30,
      ease: "linear",
      repeat: -1,
    });
  }, []);

  const handleRedirect = (path) => {
    nav(path);
    setIsMenuOpen(false);
    setIsServicesMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
    setIsServicesMenuOpen(false);
  };

  const getMenuIcon = () => {
    if (color === "white") {
      if (isMenuOpen) {
        return isHovered ? blueAmp : whiteAmp;
      } else {
        return isHovered ? blueAmp : whiteHamburger;
      }
    } else {
      if (isMenuOpen) {
        return isHovered ? blueAmp : whiteAmp;
      } else {
        return isHovered ? blueAmp : blackHamburger;
      }
    }
  };

  const openServicesMenu = () => {
    setIsServicesMenuOpen(true);
  };

  const closeServicesMenu = () => {
    setIsServicesMenuOpen(false);
  };

  return (
    <div className="main-menu-container">
      <img
        src={color === "white" ? whiteLogo : blackLogo}
        alt="BAW Studios Logo"
        className="logo"
        onClick={() => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
          setTimeout(() => nav("/"), 10);
        }}
      />

      <div
        className="menu-icon"
        onClick={handleMenuToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={getMenuIcon()} alt="Menu Icon" />
      </div>

      {/* Main Menu */}
      <div
        className={`main-menu ${isMenuOpen ? "open" : ""} ${
          isServicesMenuOpen ? "slide-up" : ""
        }`}
      >
        <img
          src={monogram}
          alt="Monogram"
          ref={monogramRef}
          className="monogram"
        />

        <ul>
          <li>
            <button
              onClick={() => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
                setTimeout(() => handleRedirect("/about"), 10);
              }}
            >
              ABOUT
            </button>
          </li>
          <li>
            <button onClick={openServicesMenu}>SERVICES</button>
          </li>
          <li>
            <button
              onClick={() => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
                setTimeout(() => handleRedirect("/works"), 10);
              }}
            >
              WORKS
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
                setTimeout(() => handleRedirect("/contact"), 10);
              }}
            >
              CONTACT
            </button>
          </li>
        </ul>
      </div>

      {/* Services Menu */}
      <div className={`services-menu ${isServicesMenuOpen ? "open" : ""}`}>
        <div className="services-menu-container">
          <button className="close-services" onClick={closeServicesMenu}>
            <FaChevronUp size={24} />
          </button>

          <h2>Services</h2>

          <div className="glow-text">
            <p>WHAT ARE YOU LOOKING FOR?</p>
          </div>

          <ul>
            <li>
              <button onClick={() => handleRedirect("/branding")}>
                BRANDING
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  ScrollTrigger.getAll().forEach((trigger) =>
                    trigger.kill(true)
                  );
                  setTimeout(() => handleRedirect("/web"), 10);
                }}
              >
                WEB
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  ScrollTrigger.getAll().forEach((trigger) =>
                    trigger.kill(true)
                  );
                  setTimeout(() => handleRedirect("/socials"), 10);
                }}
              >
                SOCIAL
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  ScrollTrigger.getAll().forEach((trigger) =>
                    trigger.kill(true)
                  );
                  setTimeout(() => handleRedirect("/services/production"), 10);
                }}
              >
                PRODUCTION
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
