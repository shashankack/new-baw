import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroLoader from "./components/IntroLoader/IntroLoader";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroLoader nextComponent={HomePage} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
