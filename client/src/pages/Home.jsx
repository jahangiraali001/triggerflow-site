// pages/Home.jsx
// Purpose: the landing page. Clear value, what triggerflow offers, and a strong call to action.

import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__inner">
          <h1 className="hero__title">Web builds, testing, and automation that ship.</h1>
          <p className="hero__subtitle">
            We build clean, responsive websites; design and automate application
            programming interface and user interface tests; and help plan the full
            software lifecycle—from idea to production.
          </p>
          <div className="hero__cta">
            <NavLink to="/services" className="btn btn--primary">View Services</NavLink>
            <NavLink to="/contact" className="btn btn--ghost">Start a conversation</NavLink>
          </div>
        </div>
      </section>

      {/* SERVICES SNAPSHOT (links to full page) */}
      <section className="section">
        <h2 className="section__title">What I do</h2>
        <div className="grid">
          <article className="card">
            <h3>Website creation</h3>
            <p>
              Fast, responsive sites using React on the front end and Node.js on the
              back end. Deployed on Vercel and Render. Content-first and accessible.
            </p>
          </article>

          <article className="card">
            <h3>Application and interface testing</h3>
            <p>
              Practical automated tests for your application programming interface and
              user interface with clear reporting and stable pipelines.
            </p>
          </article>

          <article className="card">
            <h3>Procurement and delivery support</h3>
            <p>
              Vendor selection, tooling choice, and delivery planning that aligns with
              your goals and budget.
            </p>
          </article>

          <article className="card">
            <h3>Planning and design</h3>
            <p>
              Requirements, user flows, and lightweight design to keep teams aligned and
              projects moving.
            </p>
          </article>
        </div>
        <div style={{ marginTop: "1.25rem" }}>
          <NavLink to="/services" className="btn">See details</NavLink>
        </div>
      </section>

      {/* PROOF / PLACEHOLDERS */}
      <section className="section section--muted">
        <h2 className="section__title">Why work with Trigger Flow</h2>
        <ul className="bullets">
          <li>Clear communication and steady delivery.</li>
          <li>Testable work with automation from day one.</li>
          <li>Simple, honest pricing—no surprises.</li>
        </ul>
      </section>

      {/* FINAL CTA */}
      <section className="section">
        <div className="cta">
          <h2>Have a project in mind?</h2>
          <p>Tell me what you need, and I will suggest the simplest way to deliver it.</p>
          <NavLink to="/contact" className="btn btn--primary">Get in touch</NavLink>
        </div>
      </section>
    </>
  );
}
