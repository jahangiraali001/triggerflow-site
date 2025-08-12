// server/config/db.js
// Purpose: own the MongoDB connection logic in ONE place.

const mongoose = require("mongoose");

/**
 * Connect to MongoDB using the URI we pass in.
 * - Keep this file "pure" (no dotenv here) so it's easy to test.
 * - Throw errors up to the caller so startup can fail fast & clearly.
 */
async function connectDB(mongoUri) {
  if (!mongoUri) {
    throw new Error("connectDB: mongoUri was not provided");
  }

  // Optional: quiet some deprecation warnings in some setups.
  // mongoose.set("strictQuery", true);

  // Modern Mongoose: no extra options necessary for Atlas
  await mongoose.connect(mongoUri, {});

  // Nice console message so we know where we're connected.
  const { host, name } = mongoose.connection;
  console.log(`✅ MongoDB connected → host: ${host}  db: ${name}`);
}

/**
 * Close the Mongo connection (used on shutdown).
 */
async function closeDB() {
  await mongoose.connection.close();
  console.log("🛑 MongoDB connection closed");
}

module.exports = { connectDB, closeDB };
