// server/config/db.js
// Purpose: own MongoDB connection logic.
// Change: start trying to connect, but DON'T crash the process if Mongo is slow/unavailable.
// This prevents Render 502/503 during cold starts.

const mongoose = require("mongoose");

async function connectDB(uri) {
  if (!uri) {
    console.error("connectDB: no Mongo URI provided");
    return; // don't throw; let the app run /health while we figure it out
  }

  let attempt = 0;
  const max = 5; // try a few times on boot

  while (attempt < max && mongoose.connection.readyState !== 1) {
    attempt++;
    try {
      // Modern Mongoose: no extra options needed for Atlas
      await mongoose.connect(uri, {});
      const { host, name } = mongoose.connection;
      console.log(`✅ MongoDB connected → host: ${host}  db: ${name}`);
      return;
    } catch (err) {
      console.error(`⚠️ Mongo connect attempt ${attempt} failed: ${err.message}`);
      // Exponential-ish backoff: 1s, 2s, 3s, ...
      if (attempt < max) await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }

  // If we still didn't connect, keep the app running.
  // /api/health will still be 200; /api/ready will report DB state.
  console.warn("⚠️ Mongo not connected after retries; app remains up, will connect on next deploy.");
}

async function closeDB() {
  await mongoose.connection.close();
  console.log("🛑 MongoDB connection closed");
}

module.exports = { connectDB, closeDB };
