import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Location = mongoose.model("Location", locationSchema);

export default Location;
