import axios from "axios";

// Backend base URL
const BASE_URL = "http://10.0.2.2:5000/api"; // Use 10.0.2.2 for Android Emulator to reach localhost

// --- SOS creation ---
export const createSOS = async (payload, token) => {
  try {
    console.log('Sending SOS with payload:', JSON.stringify(payload, null, 2));
    const res = await axios.post(`${BASE_URL}/sos`, payload, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    console.log('SOS Response:', JSON.stringify(res.data, null, 2));
    return res.data;
  } catch (error) {
    console.error('SOS API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

// --- Send live location ---
export const sendLocation = async (userId, latitude, longitude) => {
  try {
    await axios.post(`${BASE_URL}/sos/live-location`, {
      userId,
      latitude,
      longitude,
    });
  } catch (err) {
    console.error("Error sending location:", err.message);
  }
};
