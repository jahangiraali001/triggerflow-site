// App.js
// Purpose: define the top-level layout and routes so pages added easily.

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

import "./styles.css"; // global styles for spacing, colors, typography

export default function App() {
  return (
    <BrowserRouter>
      {/* The Navbar stays on every page */}
      <Navbar />

      {/* Main content area. The Routes below swap based on the URL */}
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          {/* You can add a 404 route later */}
        </Routes>
      </main>

      {/* The Footer stays on every page */}
      <Footer />
    </BrowserRouter>
  );
}
