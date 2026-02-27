const express = require("express");
const router = express.Router();
const Emergency = require("../models/Emergency");

// POST new emergency
router.post("/", async (req, res) => {
  try {
    const newEmergency = new Emergency(req.body);
    await newEmergency.save();
    res.status(201).json({ message: "Emergency reported successfully!", emergency: newEmergency });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all emergencies (for Hospital Dashboard)
router.get("/", async (req, res) => {
  try {
    const emergencies = await Emergency.find().sort({ createdAt: -1 });
    res.status(200).json(emergencies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET a single emergency by ID
router.get("/:id", async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id);
    if (!emergency) return res.status(404).json({ message: "Emergency not found" });
    res.status(200).json(emergency);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;

