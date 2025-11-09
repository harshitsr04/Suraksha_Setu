import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const args = process.argv.slice(2);
const to = args[0] || '+17753205851';
const text = args.slice(1).join(' ') || 'Test message from Suraksha Setu';

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
    console.log('Sending SMS to', to, 'from', from);
    const msg = await client.messages.create({ body: text, from, to });
    console.log('Twilio message SID:', msg.sid);
    console.log('Full response:', msg);
    process.exit(0);
  } catch (err) {
    console.error('Twilio send error:', err);
    if (err.code) console.error('Error code:', err.code);
    process.exit(1);
  }
})();
