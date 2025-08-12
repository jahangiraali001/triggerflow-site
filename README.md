# Trigger Flow

Web builds, testing, and automation that ship.

This repository powers **https://triggerflow.ai** (frontend) and the supporting **API** (backend). It’s a lightweight monorepo designed for simple local development and zero-drama deployments.

> **Status:** Live  
> Frontend on Vercel · Backend on Render · Database on MongoDB Atlas · Email via Zoho

---

## Table of contents

- [What’s inside](#whats-inside)
- [Tech stack](#tech-stack)
- [Local development](#local-development)
- [Environment variables](#environment-variables)
- [Deployment](#deployment)
- [API endpoints](#api-endpoints)
- [CORS and security](#cors-and-security)
- [Project roadmap](#project-roadmap)
- [Branding & design](#branding--design)
- [License](#license)
- [Hiring / contracting](#hiring--contracting)

---

## What’s inside

```
triggerflow-site/
├─ client/                 # React app (landing, services, contact)
│  ├─ public/              # static assets, index.html, manifest
│  ├─ src/
│  │  ├─ components/       # Navbar, Footer
│  │  ├─ pages/            # Home, Services, Contact
│  │  ├─ styles.css        # small design system
│  │  └─ App.js            # routes + layout
│  └─ vercel.json          # SPA rewrite so /services, /contact load directly
│
├─ server/                 # Node.js + Express API
│  ├─ config/db.js         # Mongo connection
│  ├─ models/              # Mongoose models (Contact, Ping)
│  ├─ routes/              # /api/contact, /api/test
│  └─ index.js             # app bootstrap, health/ready endpoints
│
├─ .gitignore
├─ LICENSE                 # MIT
└─ README.md
```

---

## Tech stack

- **Frontend:** React, React Router, plain CSS; hosted on **Vercel**
- **Backend:** Node.js + Express; hosted on **Render**
- **Database:** MongoDB Atlas
- **Email:** Zoho (SMTP)
- **Domains:** `triggerflow.ai` (+ `www`)

Why: stable, inexpensive, fast to iterate—ideal for portfolio and client work.

---

## Local development

> Prerequisites: Node.js 20+ and Git

1) **Clone**
   ```bash
   git clone https://github.com/jahangiraali001/triggerflow-site.git
   cd triggerflow-site
   ```

2) **Install**
   ```bash
   cd server && npm i
   cd ../client && npm i
   ```

3) **Environment files**
   - `server/.env`
     ```
     PORT=5000
     MONGO_URI=<your MongoDB Atlas connection string>
     FRONTEND_ORIGIN=http://localhost:3000
     EMAIL_USER=info@triggerflow.ai
     EMAIL_PASS=<your-zoho-password>
     ```
   - `client/.env.local` (development only)
     ```
     REACT_APP_API_BASE_URL=http://localhost:5000
     ```

4) **Run**
   - Terminal A
     ```bash
     cd server
     npm run dev
     ```
   - Terminal B
     ```bash
     cd client
     npm start
     ```
   Visit: http://localhost:3000

---

## Environment variables

**Frontend (React)**  
- Dev: `client/.env.local`  
- Prod: set in **Vercel → Project → Environment Variables**
  - `REACT_APP_API_BASE_URL = https://triggerflow-server.onrender.com`  
    (or a custom `https://api.triggerflow.ai` later)

> React only exposes variables prefixed with `REACT_APP_`. These are public—do not put secrets here.

**Backend (Express)**  
Set in **Render → Service → Environment**:
- `MONGO_URI`, `EMAIL_USER`, `EMAIL_PASS`
- `FRONTEND_ORIGIN` (comma-separated allow-list), e.g.:  
  `https://triggerflow.ai,https://www.triggerflow.ai,https://triggerflow-site.vercel.app`

---

## Deployment

**Frontend (Vercel)**  
- Root directory: `client`  
- SPA rewrites: `client/vercel.json`
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
- Ship by pushing to `main` with changes under `client/**`.

**Backend (Render)**  
- Root directory: `server`  
- Auto-deploy filter: `server/**` (only redeploy when backend changes)  
- Health: `/api/health`  
- Note: Free tier sleeps; first request may take ~10–20 seconds.

**Domains**  
- `triggerflow.ai` → A `76.76.21.21` (Vercel apex)  
- `www.triggerflow.ai` → CNAME to Vercel

**Rollback**  
- Vercel: Promote a previous deployment  
- Render: Events → Rollback

---

## API endpoints

Base (prod): `https://triggerflow-server.onrender.com`

```
GET  /api/health     -> 200 { ok, uptime, ts }
GET  /api/ready      -> 200 { dbState }
POST /api/contact    -> 200 on success
POST /api/test       -> create a ping (dev tool)
GET  /api/test       -> list pings (dev tool)
```

---

## CORS and security

- Browser calls allowed **only** from origins in `FRONTEND_ORIGIN`.  
- Direct calls (curl, servers) work because they do not send an `Origin`.  
- Secrets are not committed: `.env`, `client/.env*`, and `server/.env` are ignored.

---

## Project roadmap

Near-term:
- Portfolio page (grid + `/work/<slug>`)
- Pricing packages
- Blog/Notes (Markdown → static)

Testing:
- API tests for `/api/health` and `/api/contact`
- UI smoke tests for nav and contact validation

Later:
- Stripe checkout for packages
- Persist contact submissions + simple admin view
- Always-on backend plan if needed

---

## Branding & design

Current UI is intentionally minimal and fast. 

---

## License

Code is licensed under the **MIT License** (see [LICENSE](./LICENSE)).  
Site content (text/images) © 2025 Trigger Flow Ltd.

---

## Hiring / contracting

Available for:
- Website creation (design → build → deploy)
- API and UI test automation
- Procurement, planning, and delivery support

Email: **info@triggerflow.ai**
