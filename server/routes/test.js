// server/routes/test.js
const express = require("express");
const Ping = require("../models/Ping");
const router = express.Router();

// POST /api/test  → create a ping
router.post("/", async (_req, res) => {
  try {
    const ping = await Ping.create({});
    res.status(201).json({ message: "Ping created", id: ping._id, when: ping.when });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/test  → list all pings (newest first)
router.get("/", async (_req, res) => {
  try {
    const pings = await Ping.find().sort({ when: -1 });
    res.json(pings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/test/count  → how many pings?
router.get("/count", async (_req, res) => {
  try {
    const count = await Ping.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/test  → delete all pings (reset)
router.delete("/", async (_req, res) => {
  try {
    const result = await Ping.deleteMany({});
    res.json({ deleted: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
