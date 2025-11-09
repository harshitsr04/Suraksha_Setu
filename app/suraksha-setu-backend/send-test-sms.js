import dotenv from 'dotenv';
import { sendSMS } from './src/services/smsService.js';

dotenv.config();

const args = process.argv.slice(2);
const to = args[0] || '+17753205851';
const text = args.slice(1).join(' ') || 'Test message from Suraksha Setu';

(async () => {
  try {
    console.log('Sending SMS to', to);
    const res = await sendSMS(to, text);
    console.log('Twilio response:', res);
    process.exit(0);
  } catch (err) {
    console.error('Send failed:', err && err.message ? err.message : err);
    if (err && err.code) console.error('Twilio error code:', err.code);
    process.exit(1);
  }
})();
