import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const verifyPhoneNumber = async (phoneNumber) => {
  try {
    // Remove any non-numeric characters and ensure it starts with +
    let cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');
    if (!cleanPhone.startsWith('+')) {
      cleanPhone = '+' + cleanPhone;
    }

    // First, create a verification service if not exists
    const services = await client.verify.v2.services.list();
    let verifyService = services[0];
    
    if (!verifyService) {
      verifyService = await client.verify.v2.services.create({
        friendlyName: 'EVA Mobile Verification'
      });
    }

    // Send verification code
    const verification = await client.verify.v2.services(verifyService.sid)
      .verifications
      .create({
        to: cleanPhone,
        channel: 'sms'
      });

    return {
      success: true,
      status: verification.status,
      serviceId: verifyService.sid
    };
  } catch (error) {
    console.error('Verification Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const checkVerificationCode = async (phoneNumber, code, serviceId) => {
  try {
    let cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');
    if (!cleanPhone.startsWith('+')) {
      cleanPhone = '+' + cleanPhone;
    }

    const check = await client.verify.v2.services(serviceId)
      .verificationChecks
      .create({
        to: cleanPhone,
        code: code
      });

    return {
      success: true,
      verified: check.status === 'approved',
      status: check.status
    };
  } catch (error) {
    console.error('Verification Check Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};