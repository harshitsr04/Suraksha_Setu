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

// Get the real laptop IP first
const getLaptopIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting IP:', error);
    return null;
  }
};

// Get location from the IP
const getLaptopLocation = async (ip) => {
  try {
    console.log('Getting location for IP:', ip);
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    console.log('Location data:', data);
    
    if (data.status === 'success') {
      return {
        lat: data.lat,
        lon: data.lon,
        city: data.city,
        region: data.regionName,
        country: data.country,
        isp: data.isp,
        ip: ip
      };
    }
    throw new Error('Location lookup failed');
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
    console.log('Getting your laptop IP...');
    const ip = await getLaptopIP();
    if (!ip) {
      throw new Error('Could not determine IP address');
    }

    console.log('Getting location for your laptop...');
    const location = await getLaptopLocation(ip);
    if (!location) {
      throw new Error('Could not determine location');
    }

    console.log('Your laptop location:', location);
    
    // Create a detailed message with the location and IP
    const mapsLink = `http://maps.google.com/maps?q=${location.lat},${location.lon}`;
    const text = `🚨 EMERGENCY ALERT!\n\nDevice Location:\n📍 ${location.city}, ${location.region}\n🌍 ${location.country}\n🖥️ IP: ${location.ip}\n🔍 ISP: ${location.isp}\n\n📱 Track location: ${mapsLink}`;
    
    console.log('Sending location to:', to);
    console.log('Message:', text);
    
    const msg = await client.messages.create({ body: text, from, to });
    console.log('Message sent successfully! SID:', msg.sid);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();