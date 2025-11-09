import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
if (!accountSid || !authToken) {
  console.error('TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set');
  process.exit(1);
}
const client = twilio(accountSid, authToken);
(async () => {
  try {
    const nums = await client.incomingPhoneNumbers.list({ limit: 20 });
    console.log('Owned Twilio numbers:');
    nums.forEach(n => console.log(n.phoneNumber, n.sid));
    if (nums.length === 0) console.log('(none)');
    process.exit(0);
  } catch (err) {
    console.error('Failed to list phone numbers:', err.message || err);
    process.exit(1);
  }
})();
