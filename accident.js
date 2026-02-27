const express = require("express");
const router = express.Router();
const Accident = require("./models/Accident"); // create this model

router.post("/location", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const accident = new Accident({ latitude, longitude, reportedAt: new Date() });
    await accident.save();

    res.status(200).json({ message: "Location saved", accident });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
