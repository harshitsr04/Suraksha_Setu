import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ MONGO_URI not found in .env file");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });

    console.log(`🟢 MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("🔴 MongoDB Connection Error:", err.message);

    // Provide detailed diagnostics for TLS/DNS/IP issues
    const msg = (err && err.message) ? err.message : '';
    const code = (err && err.code) ? err.code : '';

    const isTlsIssue = /TLS|tls|SSL|ssl|tlsv1|certificate|alert/i.test(msg) || /ERR_TLS|ERR_OSSL/i.test(code);
    if (isTlsIssue) {
      console.warn('⚠️ Detected a TLS/SSL error during MongoDB connection. Likely causes:');
      console.warn('  - Local TLS interception (corporate proxy / antivirus) replacing certificates');
      console.warn('  - Missing/trusted CA in Node/OpenSSL on this machine');
      console.warn('  - System clock skew causing cert validation failures');
      console.warn('Quick checks:');
      console.warn('  1) Ensure system clock is correct: run `Get-Date` in PowerShell');
      console.warn('  2) Try connecting from another network (phone hotspot) to rule out interception');
      console.warn('  3) If your org uses a proxy with a custom CA, add it for Node with:');
      console.warn('       $env:NODE_EXTRA_CA_CERTS="C:\\\ull\\path\\to\\company-ca.pem"; node server.js');
      console.warn('  4) Test with mongosh for clearer client output');
      console.warn('  5) For debugging only, try adding `tlsAllowInvalidCertificates: true` (DO NOT use in production)');
    }

    if (msg.includes('ENOTFOUND') || msg.includes('querySrv')) {
      console.warn('⚠️ DNS SRV lookup failed. Try switching to Google DNS (8.8.8.8 / 8.8.4.4) or use the direct (non-SRV) connection string from Atlas.');
    }

    if (msg.toLowerCase().includes('whitelist') || msg.toLowerCase().includes('ip')) {
      console.warn('⚠️ IP whitelist issue: ensure your current public IP is added in Atlas Network Access (or add 0.0.0.0/0 for testing).');
    }

    // keep server running even if DB fails
  }
};

export default connectDB;
