import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const args = process.argv.slice(2);
const to = args[0];
const customLat = args[1];
const customLng = args[2];

if (!to) {
  console.error('Please provide a phone number as argument');
  process.exit(1);
}

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
    // Use provided coordinates or fallback to IP-based location
    const latitude = customLat || '19.0760';  // Mumbai default
    const longitude = customLng || '72.8777'; // Mumbai default
    
    // Create shorter message with just the essential info
    const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
    const text = `SOS! Emergency help needed! Location: ${mapsLink}`;
    
    console.log('Sending emergency alert to:', to);
    console.log('Location link:', mapsLink);
    
    const msg = await client.messages.create({ body: text, from, to });
    console.log('Message sent successfully! SID:', msg.sid);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();