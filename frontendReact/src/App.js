import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import FilterFormPage from "./pages/FilterFormPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/addFilter" element={<FilterFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
