import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const args = process.argv.slice(2);
const to = args[0];

if (!to) {
  console.error('Please provide a phone number as argument');
  process.exit(1);
}

// Simulating getting user's current location
// In the real app, this comes from expo-location
const getCurrentLocation = () => {
  // This would be replaced with actual GPS location in the app
  return new Promise((resolve) => {
    // Use HTML5 Geolocation API for testing
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          resolve(null);
        }
      );
    } else {
      resolve(null);
    }
  });
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
      ? `https://maps.google.com/?q=${location.latitude},${location.longitude}`
      : 'https://maps.google.com/'; // Fallback if location not available

    const text = `EMERGENCY: Someone needs immediate help! Track their live location here: ${mapsLink}`;
    
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