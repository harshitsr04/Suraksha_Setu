import express from 'express';
import { verifyPhoneNumber, checkVerificationCode } from '../services/verificationService.js';

const router = express.Router();

// Send verification code
router.post('/send-code', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number is required' 
      });
    }

    const result = await verifyPhoneNumber(phoneNumber);
    res.json(result);
  } catch (error) {
    console.error('Send Code Error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Verify code
router.post('/verify-code', async (req, res) => {
  try {
    const { phoneNumber, code, serviceId } = req.body;
    if (!phoneNumber || !code || !serviceId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number, code, and serviceId are required' 
      });
    }

    const result = await checkVerificationCode(phoneNumber, code, serviceId);
    res.json(result);
  } catch (error) {
    console.error('Verify Code Error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

export default router;