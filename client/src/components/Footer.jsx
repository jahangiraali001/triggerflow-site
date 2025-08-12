// components/Footer.jsx
// Purpose: simple footer with contact info and a small note about triggerflow stack.

import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>© {year} Trigger Flow Ltd.</p>
        <p>
          Built with React on Vercel. API by Node.js and Express on Render.
        </p>
        <p>
          Email: <a href="mailto:info@triggerflow.ai">info@triggerflow.ai</a>
        </p>
      </div>
    </footer>
  );
}
