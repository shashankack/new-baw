import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroLoader from "./components/IntroLoader/IntroLoader";
import HomePage from "./pages/HomePage";

import Slide2 from "./components/Slides/Slide2";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroLoader nextComponent={HomePage} />} />
        <Route path="/test" element={<Slide2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
