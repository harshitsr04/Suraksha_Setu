import dotenv from 'dotenv';
import twilio from 'twilio';
import fetch from 'node-fetch';

dotenv.config();

const args = process.argv.slice(2);
const to = args[0];

if (!to) {
  console.error('Please provide a phone number as argument');
  process.exit(1);
}

// Get location using IP geolocation for testing
// In the real app, this comes from expo-location
const getCurrentLocation = async () => {
  try {
    const response = await fetch('http://ip-api.com/json/');
    const data = await response.json();
    if (data.status === 'success') {
      return {
        latitude: data.lat,
        longitude: data.lon
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting location:', error);
    return null;
  }
};

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_PHONE;

if (!accountSid || !authToken || !from) {
  console.error('TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN or TWILIO_PHONE not set in .env');
  process.exit(1);
}

const client = twilio(accountSid, authToken);

(async () => {
  try {
    // Get current location
    const location = await getCurrentLocation();
    
    // Create maps link with current location
    const mapsLink = location 
      ? `https://maps.google.com/?q=${location.latitude},${location.longitude}&z=17`
      : 'https://maps.google.com/'; // Fallback if location not available

    const text = `EMERGENCY ALERT: Someone needs immediate help!\n\nTrack their live location: ${mapsLink}\n\nPlease respond immediately!`;
    
    console.log('Sending SOS SMS to', to, 'from', from);
    console.log('Location link:', mapsLink);
    
    const msg = await client.messages.create({ body: text, from, to });
    console.log('Twilio message sent! SID:', msg.sid);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();