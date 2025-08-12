// pages/Contact.jsx
// Purpose: a quick, reliable contact form with good user experience.
// It calls trigger flows existing API at /api/contact.
// We add validation, loading state, and success/error feedback.

import React, { useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE_URL; // set on Vercel

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", note: "" }); 
  // state: idle | sending | success | error

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function submit(e) {
    e.preventDefault();

    // simple validation before sending
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ state: "error", note: "Please fill in all fields." });
      return;
    }

    setStatus({ state: "sending", note: "Sending your message…" });

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }

      setStatus({ state: "success", note: "Thanks! I will reply shortly." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ state: "error", note: "Sorry—something went wrong. Please try again." });
      console.error(err);
    }
  }

  return (
    <section className="section">
      <h1 className="section__title">Contact</h1>

      <form className="form" onSubmit={submit} noValidate>
        <label className="form__label">
          Your name
          <input
            className="form__input"
            type="text"
            value={form.name}
            onChange={e => update("name", e.target.value)}
            placeholder="Your name"
            required
          />
        </label>

        <label className="form__label">
          Your email
          <input
            className="form__input"
            type="email"
            value={form.email}
            onChange={e => update("email", e.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="form__label">
          Your message
          <textarea
            className="form__textarea"
            rows="6"
            value={form.message}
            onChange={e => update("message", e.target.value)}
            placeholder="What do you need?"
            required
          />
        </label>

        <button className="btn btn--primary" type="submit" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending…" : "Send"}
        </button>

        {/* Feedback to the user */}
        {status.state === "success" && <p className="note note--success">{status.note}</p>}
        {status.state === "error" && <p className="note note--error">{status.note}</p>}

        {/* Optional: show the API base you are talking to while developing */}
        {process.env.NODE_ENV !== "production" && (
          <p className="note">Using API: {API_BASE}</p>
        )}
      </form>
    </section>
  );
}
