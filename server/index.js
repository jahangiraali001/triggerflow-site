// server/index.js
// Purpose: bootstrap the web server, load env, connect DB, and start listening.

require("dotenv").config(); // 1) Load .env into process.env at the very top

const express = require("express");
const cors = require("cors");
const { connectDB, closeDB } = require("./config/db");

const app = express();

// 2) Read config from env (with safe defaults where sensible)
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// 3) Register middleware BEFORE routes
app.use(cors());
app.use(express.json());

// 4) Always-on health check (works even if DB is down)
app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true, uptime: process.uptime() });
});

// 5) App routes (mount after middleware)
app.use("/api/contact", require("./routes/contact"));
// Test route
app.use("/api/test", require("./routes/test"));

// 6) Start sequence: connect DB first, then start HTTP server
let server; // we'll keep a reference for graceful shutdowns

(async () => {
  try {
    // Fail fast if env is missing so we don't start a half-broken server
    if (!MONGO_URI) throw new Error("MONGO_URI missing from server/.env");

    await connectDB(MONGO_URI); // waits until Atlas is reachable
    server = app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Startup failed:", err.message);
    process.exit(1); // let nodemon restart after you fix it
  }
})();

// 7) Graceful shutdown – close HTTP server and DB cleanly
async function shutdown(signal) {
  try {
    console.log(`\n${signal} received. Shutting down...`);
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      console.log("🧰 HTTP server closed");
    }
    await closeDB();
  } catch (e) {
    console.error("Error during shutdown:", e.message);
  } finally {
    process.exit(0);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));   // e.g. Ctrl+C
process.on("SIGTERM", () => shutdown("SIGTERM")); // hosting platforms
