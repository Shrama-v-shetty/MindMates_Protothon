const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/share", async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Location missing" });
  }

  // Convert coordinates to address (Google Maps)
  const geoRes = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json`,
    {
      params: {
        latlng: `${latitude},${longitude}`,
        key: "YOUR_GOOGLE_MAPS_API_KEY"
      }
    }
  );

  const address =
    geoRes.data.results[0]?.formatted_address || "Unknown location";

  // Here you can save to DB if needed

  res.json({
    message: "Location received",
    address
  });
});

module.exports = router;

