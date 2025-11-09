import mongoose from "mongoose";

const sosSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: { lat: Number, lng: Number },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

const SOS = mongoose.model("SOS", sosSchema);

export default SOS;
export { SOS };
