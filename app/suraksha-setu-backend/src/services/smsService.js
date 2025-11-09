import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = async (to, body) => {
  try {
    if (!to) {
      throw new Error("Phone number is required");
    }

    // Clean up the phone number
    let cleanPhone = to.replace(/[^0-9+]/g, '');
    if (!cleanPhone.startsWith('+')) {
      cleanPhone = '+' + cleanPhone;
    }

    // Validate Twilio credentials
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE) {
      console.error("Missing Twilio credentials:", {
        TWILIO_ACCOUNT_SID: !!process.env.TWILIO_ACCOUNT_SID,
        TWILIO_AUTH_TOKEN: !!process.env.TWILIO_AUTH_TOKEN,
        TWILIO_PHONE: process.env.TWILIO_PHONE
      });
      throw new Error("Twilio credentials not configured");
    }

    console.log("SMS Attempt:", {
      to: cleanPhone,
      from: process.env.TWILIO_PHONE,
      bodyLength: body.length,
      timestamp: new Date().toISOString()
    });

    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE,
      to,
    });

    console.log("SMS Success:", {
      sid: message.sid,
      status: message.status,
      to: cleanPhone,
      timestamp: new Date().toISOString()
    });

    return message;
  } catch (error) {
    console.error("SMS Error Details:", {
      to,
      timestamp: new Date().toISOString(),
      errorCode: error.code,
      errorMessage: error.message,
      twilioError: error.moreInfo,
      rawError: error
    });
    throw error;
  }
};
