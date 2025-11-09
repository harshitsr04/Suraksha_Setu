import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const uri = process.env.MONGO_URI;
console.log('Using MONGO_URI from .env:', !!uri);
if (!uri) {
  console.error('No MONGO_URI found in environment. Aborting.');
  process.exit(1);
}

const opts = { serverSelectionTimeoutMS: 5000 };

(async () => {
  console.log('\n1) Normal connect attempt (strict TLS)');
  try {
    const conn = await mongoose.connect(uri, opts);
    console.log('✅ Normal connect succeeded — TLS OK. Connected host:', conn.connection.host);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('🔴 Normal connect failed:', err.message || err);
  }

  console.log('\n2) Debug connect attempt (tlsAllowInvalidCertificates = true) — INSECURE, debug-only');
  try {
    const debugOpts = { ...opts, tlsAllowInvalidCertificates: true };
    const conn2 = await mongoose.connect(uri, debugOpts);
    console.log('✅ Debug connect succeeded with tlsAllowInvalidCertificates — indicates TLS/CA interception or CA trust issue.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err2) {
    console.error('🔴 Debug connect failed too:', err2.message || err2);
    process.exit(1);
  }
})();
