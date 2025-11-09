import mongoose from 'mongoose';

// Using direct connection string instead of SRV
const uri = 'mongodb://harshitsr22_db_user:gw5KCM3767vtuVmo@ac-yhdw18l-shard-00-00.lecyial.mongodb.net:27017,ac-yhdw18l-shard-00-01.lecyial.mongodb.net:27017,ac-yhdw18l-shard-00-02.lecyial.mongodb.net:27017/surakshasetu?replicaSet=atlas-3xipr3-shard-0&ssl=true';

console.log('Testing direct MongoDB connection...');

mongoose.connect(uri)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB!');
    process.exit(0);
  })
  .catch(err => {
    console.error('🔴 Connection failed:', err.message);
    process.exit(1);
  });