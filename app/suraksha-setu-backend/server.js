import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import verificationRoutes from './src/routes/verificationRoutes.js';

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/surakshasetu')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));
app.use(cors());
app.use(express.json());

// Use verification routes
app.use('/api/verify', verificationRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Store live locations in memory (for demo, DB optional)
const liveLocations = {}; // key: sosId, value: {lat, lng}

// REST API to save sender location
app.post("/api/sos/live-location", (req, res) => {
  try {
    const { sosId, latitude, longitude } = req.body;
    
    if (!sosId || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ 
        status: "error", 
        message: "Missing required fields: sosId, latitude, longitude" 
      });
    }
    
    liveLocations[sosId] = { latitude, longitude };
    // Notify via WebSocket to receiver
    io.to(sosId).emit("location-update", liveLocations[sosId]);
    res.json({ status: "success", data: liveLocations[sosId] });
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// REST API to get latest location (fallback polling)
app.get("/api/sos/:sosId/latest-location", (req, res) => {
  const { sosId } = req.params;
  res.json(liveLocations[sosId] || null);
});

// Socket.io connection for receiver
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("join-sos-room", (sosId) => {
    socket.join(sosId);
    console.log(`Client joined room: ${sosId}`);
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
