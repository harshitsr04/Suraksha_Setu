import SOS from "../models/SOS.js";
import User from "../models/User.js";
import { sendSMS } from "../services/smsService.js";

export const createSOS = async (req, res) => {
  try {
    const { userId, contacts, location } = req.body;
    if (!userId || !location) {
      return res.status(400).json({ message: "Missing userId or location" });
    }

    // 1️⃣ Save SOS entry in DB
    const sos = await SOS.create({ userId, contacts, location });

    // 2️⃣ Resolve location
    const lat = location?.lat ?? location?.latitude;
    const lng = location?.lng ?? location?.longitude;

    // 3️⃣ Fetch user info for personalization
    let user = null;
    try {
      user = await User.findById(userId).select("username phone");
    } catch {}

    const displayName = user?.username || "Your contact";

    // 4️⃣ Build Google Maps link and message
    const mapsLink = lat && lng ? `https://maps.google.com/?q=${lat},${lng}` : "Location not provided";
    const message = `EMERGENCY SOS ALERT!\n\n${displayName} needs immediate help!\n\nCurrent Location: ${mapsLink}\n\nPlease respond immediately or contact emergency services.`;

    // helper: normalize phone number to E.164-ish (best-effort)
    const defaultCountry = process.env.DEFAULT_COUNTRY_CODE || "+91";
    const normalize = (phone) => {
      if (!phone) return phone;
      const s = String(phone).trim();
      if (s.startsWith("+")) return s;
      // remove non-digits
      const digits = s.replace(/[^0-9]/g, "");
      if (digits.length === 10) {
        // assume local 10-digit -> prepend country
        return `${defaultCountry}${digits}`;
      }
      if (digits.length > 10 && digits.startsWith("0")) {
        // drop leading zero and prepend +
        return `+${digits.replace(/^0+/, "")}`;
      }
      // fallback: if digits already include country (like 919...), ensure leading +
      if (digits.length >= 11) return `+${digits}`;
      return s;
    };

    // 5️⃣ Send SMS to contacts
    const contactList = Array.isArray(contacts) ? contacts : [];
    let notifyResults = [];
    if (contactList.length > 0) {
      const tasks = contactList.map((c) => {
        const to = normalize(c.phone || c.number || c.mobile || "");
        console.log(`Sending SOS SMS to ${to} (raw: ${c.phone})`);
        return sendSMS(to, message)
          .then((r) => ({ to, status: "sent", sid: r.sid }))
          .catch((err) => ({ to, status: "error", error: err.message }));
      });
      notifyResults = await Promise.all(tasks);
    } else if (user?.phone) {
      // fallback: if client didn't send contacts, notify user's own phone (useful for testing)
      const to = normalize(user.phone);
      console.log(`No contacts provided — sending SOS to user's phone ${to}`);
      try {
        const r = await sendSMS(to, message);
        notifyResults = [{ to, status: "sent", sid: r.sid }];
      } catch (err) {
        notifyResults = [{ to, status: "error", error: err.message }];
      }
    }

    // 6️⃣ Return response including map link
    res.status(201).json({ sos, notifications: notifyResults, mapLink: mapsLink });
  } catch (err) {
    console.error("SOS creation error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Receive live location
export const sendLocation = async (req, res) => {
  try {
    const { userId, lat, lng } = req.body;
    if (!userId || lat === undefined || lng === undefined) {
      return res.status(400).json({ message: "Missing userId or coordinates" });
    }

    // Find last SOS of this user and update location (if active)
    const lastSOS = await SOS.findOne({ userId }).sort({ createdAt: -1 });
    if (lastSOS) {
      lastSOS.location = { lat, lng };
      await lastSOS.save();
    }

    return res.status(200).json({ message: "Location updated" });
  } catch (err) {
    console.error("Live location error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
