import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Button from "@mui/material/Button";
import "./App.css";
import HomePage from "./pages/HomePage";
import FilterFormPage from "./pages/FilterFormPage";

function App() {
  return (
    <BrowserRouter>
      {window.location.href === "http://localhost:3000/" ? (
        <Button variant="contained" href="/addFilter">
          Add Filter
        </Button>
      ) : undefined}

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/addFilter" element={<FilterFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
