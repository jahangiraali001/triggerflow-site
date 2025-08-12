// components/Navbar.jsx
// Purpose: top navigation with triggerflow brand and clear links.

import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <NavLink to="/" className="brand">
          Trigger Flow
        </NavLink>

        <nav className="nav__links">
          <NavLink to="/" end className="nav__link">
            Home
          </NavLink>
          <NavLink to="/services" className="nav__link">
            Services
          </NavLink>
          <NavLink to="/contact" className="nav__link btn btn--primary">
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
