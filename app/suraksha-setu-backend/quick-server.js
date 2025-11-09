import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
app.use(express.json());

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/surakshasetu';
(async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log('🟢 Quick MongoDB Connected:', conn.connection.host);
  } catch (err) {
    console.error('🔴 Quick MongoDB Connection Error:', err.message);
  }
})();

// Inline location route (same as src/routes/location.js)
const locationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});
const Location = mongoose.model('QuickLocation', locationSchema);

app.post('/api/location/update', async (req, res) => {
  try {
    const { userId, lat, lng } = req.body;
    if (!userId || lat === undefined || lng === undefined) {
      return res.status(400).json({ success: false, message: 'userId, lat and lng are required.' });
    }
    const location = new Location({ userId, lat, lng });
    await location.save();
    res.json({ success: true, message: 'Location updated (quick-server).', location });
  } catch (err) {
    console.error('Error saving location (quick-server):', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Quick server running on port ${PORT}`));
