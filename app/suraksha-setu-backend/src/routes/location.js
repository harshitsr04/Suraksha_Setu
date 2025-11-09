import express from "express";
import Location from "../models/Location.js"; // import model

const router = express.Router();

// POST /api/location/update
router.post("/update", async (req, res) => {
  try {
    const { userId, lat, lng } = req.body;

    if (!userId || lat === undefined || lng === undefined) {
      return res.status(400).json({ success: false, message: "userId, lat and lng required" });
    }

    const location = new Location({ userId, lat, lng });
    await location.save();

    res.json({ success: true, message: "Location updated", location });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

export default router;
