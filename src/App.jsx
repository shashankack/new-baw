import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroLoader from "./components/IntroLoader/IntroLoader";
import WorksInternal from "./components/WorksInternal/WorksInternal";
import HomePage from "./pages/HomePage";
import MobileHomePage from "./pages/MobileHomePage";
import Navbar from "./components/Navbar/Navbar";
import About from "./pages/About";
import InteractiveGridGallery from "./components/InteractiveGridGallery/InteractiveGridGallery";
import { worksData } from "./data";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 500);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const RenderedPage = isMobile ? MobileHomePage : HomePage;

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<IntroLoader nextComponent={RenderedPage} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/works" element={<InteractiveGridGallery  data={worksData}/>} />
        <Route path="/works/:slug" element={<WorksInternal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
