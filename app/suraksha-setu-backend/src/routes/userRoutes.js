// src/routes/userRoutes.js
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "✅ User route working fine!" });
});

export default router;
