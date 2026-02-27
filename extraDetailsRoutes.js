const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User"); // make sure User model exists

console.log("✅ ExtraDetailsRoutes loaded"); // debug to ensure route is loaded

/* ================= POST Save Extra Details ================= */
router.post("/save-extra", async (req, res) => {
  console.log("✅ POST /save-extra hit", req.body);

  const { userId, relationship, phone1, phone2, bloodGroup } = req.body;

  if (!userId) return res.status(400).json({ message: "User ID required" });

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { extraDetails: { relationship, phone1, phone2, bloodGroup } } },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Extra details saved", user });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= GET ALL USERS ================= */
router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, __v: 0, email: 0 });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Optional test route
router.get("/test", (req, res) => res.send("Extra route working!"));

module.exports = router;

