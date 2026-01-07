import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pocketfinds';

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Admin credentials - CHANGE THESE!
    const adminData = {
      email: 'admin@pocketfinds.com',
      password: 'admin123', // Change this to a secure password
      first_name: 'Admin',
      last_name: 'User',
      phone: '1234567890',
      type: 'admin',
      updates: []
    };

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    // Insert directly into users collection
    const result = await mongoose.connection.db.collection('users').insertOne({
      ...adminData,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('✅ Admin account created successfully!');
    console.log('Email:', adminData.email);
    console.log('Password:', adminData.password);
    console.log('ID:', result.insertedId);

  } catch (error) {
    if (error.code === 11000) {
      console.error('❌ Error: An account with this email already exists');
    } else {
      console.error('❌ Error creating admin:', error.message);
    }
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createAdmin();
