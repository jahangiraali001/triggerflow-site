// server/index.js
// Purpose: bootstrap the server, expose health endpoints that ALWAYS work,
//          start listening immediately, and connect DB in the background.

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { connectDB, closeDB } = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;     // Render injects PORT; locally defaults to 5000
const MONGO_URI = process.env.MONGO_URI;

// --- CORS (why): browsers block cross-site requests by default.
// We allow only the origins we trust (your Vercel and later your custom domain).
// If FRONTEND_ORIGIN is empty, we fall back to permissive (handy for local dev).
const allowed = (process.env.FRONTEND_ORIGIN || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);           // allow server-to-server, curl, health checks
    if (!allowed.length) return cb(null, true);   // if not configured, be permissive (dev)
    return allowed.includes(origin) ? cb(null, true) : cb(new Error("CORS"));
  }
}));

app.use(express.json());

// --- Health endpoints (why):
// 1) /api/health: should be 200 even if DB is still connecting so Render passes health checks.
// 2) /api/ready: expose Mongoose state for debugging (0=disconnected,1=connected,2=connecting,3=disconnecting).
app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true, uptime: process.uptime(), ts: new Date().toISOString() });
});

app.get("/api/ready", (_req, res) => {
  res.json({ dbState: mongoose.connection.readyState });
});

// --- Routes
app.use("/api/contact", require("./routes/contact"));
app.use("/api/test", require("./routes/test"));

// --- Start server immediately (why): Render needs the port bound quickly to avoid 502/503.
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// --- Connect DB in the background (why): avoids blocking the boot when Atlas is slow.
connectDB(MONGO_URI);

// --- Graceful shutdown
async function shutdown(signal) {
  try {
    console.log(`\n${signal} received. Shutting down...`);
    await new Promise(resolve => server.close(resolve));
    await closeDB();
  } catch (e) {
    console.error("Error during shutdown:", e.message);
  } finally {
    process.exit(0);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
