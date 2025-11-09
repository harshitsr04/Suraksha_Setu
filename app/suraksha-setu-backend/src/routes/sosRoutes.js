import express from "express";
import { createSOS, getAllSOS } from "../controllers/sosController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
// Allow unauthenticated SOS POSTs (the app may run with a mock token). GET list remains protected.
router.post("/", createSOS);
router.get("/", protect, getAllSOS);

export default router;
