import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import IntroLoader from "./components/IntroLoader/IntroLoader";
import Navbar from "./components/Navbar/Navbar";
import About from "./pages/About";
import AboutMobile from "./pages/Mobile/AboutMobile.jsx";
import InteractiveGridGallery from "./components/InteractiveGridGallery/InteractiveGridGallery";
import { worksData, mobileServicesData } from "./data";
import Branding from "./pages/Services/Branding";
import Web from "./pages/Services/Web";
import Footer from "./components/Footer/Footer";
import ProductionInternal from "./components/ProductionInternal/ProductionInternal";
import WorksInternal from "./components/WorksInternal/WorksInternal";
import Contact from "./pages/Contact/Contact";
import HomePage from "./pages/HomePage";
import MobileHomePage from "./pages/Mobile/MobileHomePage";
import SocialsInternal from "./pages/Services/SocialsInternal/SocialsInternal";
import MobileNavbar from "./components/Navbar/MobileNavbar";

import { createTheme, ThemeProvider } from "@mui/material";
import KnowMore from "./pages/Mobile/KnowMore";
import ServicesLayout from "./pages/Services/ServicesLayout";
import Works from "./pages/Works/works.jsx";

const AppRoutes = ({ isMobile }) => {
  const location = useLocation();
  const HomeRenderedPage = isMobile ? MobileHomePage : HomePage;
  const BrandingRenderedPage = isMobile ? ServicesLayout : Branding;
  const AboutRenderedPage = isMobile ? AboutMobile : About;

  const isDark =
    location.pathname.startsWith("/services/branding") ||
    location.pathname.startsWith("/services/web") ||
    location.pathname.startsWith("/services/production/");

  const theme = createTheme({
    palette: {
      white: "#FCF3E3",
      black: "#121212",
      blue: "#1563FF",
    },
    fonts: {
      akira: "Akira",
      helvetica: "Arial, Helvetica, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {isMobile ? <MobileNavbar /> : <Navbar dark={isDark} />}
      <Routes>
        <Route path="/" element={<HomeRenderedPage />} />
        <Route path="/about" element={<AboutRenderedPage />} />
        <Route path="/know-more" element={<KnowMore />} />
        <Route path="/works" element={<Works />} />
        <Route path="/works/:slug" element={<WorksInternal />} />
        <Route
          path="/services/production/:slug"
          element={<ProductionInternal />}
        />
        <Route
          path="/services"
          element={<ServicesLayout data={mobileServicesData} />}
        />
        <Route path="/services/branding" element={<BrandingRenderedPage />} />
        <Route path="/services/web" element={<Web />} />
        <Route path="/services/socials" element={<SocialsInternal />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={"NOT FOUND"} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
};

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMainApp, setShowMainApp] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <BrowserRouter>
      {!showMainApp ? (
        <IntroLoader onComplete={() => setShowMainApp(true)} />
      ) : (
        <Suspense fallback={null}>
          <AppRoutes isMobile={isMobile} />
        </Suspense>
      )}
    </BrowserRouter>
  );
}

export default App;
