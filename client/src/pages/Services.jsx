// pages/Services.jsx
// Purpose: a fuller description of services so people know exactly what trigger flow offer.

import React from "react";

export default function Services() {
  return (
    <section className="section">
      <h1 className="section__title">Services</h1>

      <article className="service">
        <h2>Website creation</h2>
        <p>
          Design and build of responsive websites using React for the front end,
          Node.js and Express for the back end, and MongoDB when a database is needed.
          Hosting on Vercel (front end) and Render (back end) for simple deployments.
        </p>
        <p><strong>Deliverables:</strong> live site, source code, and a short handover guide.</p>
      </article>

      <article className="service">
        <h2>Application and interface testing</h2>
        <p>
          Automated testing for application programming interfaces and user interfaces.
          I prioritise stability and easy-to-read reports over fragile, flashy tests.
        </p>
        <p><strong>Deliverables:</strong> test plan, test code, run instructions, and reports.</p>
      </article>

      <article className="service">
        <h2>Procurement and delivery support</h2>
        <p>
          Tool and vendor selection, proof-of-concept builds, and realistic roadmaps
          that fit your budget and timelines.
        </p>
      </article>

      <article className="service">
        <h2>Planning and design</h2>
        <p>
          Requirements, user journeys, wireframes, and acceptance criteria that make
          building and testing straightforward.
        </p>
      </article>
    </section>
  );
}
