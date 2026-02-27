const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role} = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    if (role === "anonymous") {
      const user = new User({
        name: "Anonymous",
        role: "anonymous",
      });
      await user.save();
      return res.status(201).json({ message: "Anonymous user created", user });
    }

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

   

    const existingUser = await User.findOne({ email, role });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    res.status(201).json({
      message: "User registered successfully",
      user: { name, email, role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password, role} = req.body;

    /* Anonymous login */
    if (role === "anonymous") {
      const user = new User({
        name: "Anonymous",
        role: "anonymous",
      });
      await user.save();
      return res.status(200).json({
        message: "Logged in anonymously",
        user: { role: "anonymous" },
      });
    }

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Missing login details" });
    }

    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        //hospitalId: user.hospitalId || null,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

