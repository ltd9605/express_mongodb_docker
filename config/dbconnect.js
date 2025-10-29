const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

//  async function
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Successfully connected to MongoDB');
    } catch (err) {
        // This will catch any connection errors
        console.error('❌ Error connecting to MongoDB:', err.message);
    }
};

// module.exports for CommonJS
module.exports = connectDB;