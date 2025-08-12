// server/models/Ping.js
const mongoose = require("mongoose");

// A very simple schema: just stores the current time
const pingSchema = new mongoose.Schema({
  when: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ping", pingSchema);
