const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth"); // keep your auth routes
const locationRoutes = require("./routes/location");
const emergencyRoutes = require("./routes/emergency");
const chatRoutes = require("./routes/chatRoute");
const extraRoutes = require("./routes/extraDetailsRoutes"); // this is the important one

const app = express();

// ---------------- Middleware ----------------
app.use(cors({
  origin: "http://127.0.0.1:5500", // your frontend origin
  methods: ["GET", "POST", "PUT"],
  credentials: true
}));
app.use(express.json());

// ---------------- Connect DB ----------------
// ---------------- Connect DB ----------------
const MONGO_URI = "mongodb://127.0.0.1:27017/mindmates"; // your DB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


// ---------------- Routes ----------------
app.use("/api/auth", authRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/emergencies", emergencyRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/extra", extraRoutes); // ← this enables /save-extra

// Optional test route
app.get("/", (req, res) => res.send("MindMates Backend Running"));

// ---------------- PUT Ambulance (keep yours) ----------------
app.put("/api/emergencies/:id/ambulance", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const Emergency = require("./models/Emergency"); // make sure model exists

  try {
    const emergency = await Emergency.findByIdAndUpdate(id, { ambulanceStatus: status }, { new: true });
    res.json(emergency);
  } catch (err) {
    res.status(500).json({ error: "Failed to update ambulance status" });
  }
});

// ---------------- Start Server ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));




