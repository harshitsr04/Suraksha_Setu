import mongoose from 'mongoose';
import dns from 'dns';

// First test DNS SRV record resolution
const hostname = 'cluster0.lecyial.mongodb.net';
console.log('Testing DNS SRV resolution for:', hostname);

dns.resolveSrv(`_mongodb._tcp.${hostname}`, (err, addresses) => {
  if (err) {
    console.error('DNS SRV Error:', err);
  } else {
    console.log('SRV records found:', addresses);
  }
});

// Then test MongoDB connection
const uri = 'mongodb+srv://harshitsr22_db_user:gw5KCM3767vtuVmo@cluster0.lecyial.mongodb.net/surakshasetu?retryWrites=true&w=majority';
console.log('\nTesting MongoDB connection...');

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('✅ Successfully connected to MongoDB!');
    process.exit(0);
  })
  .catch(err => {
    console.error('🔴 Connection failed:', err.message);
    process.exit(1);
  });