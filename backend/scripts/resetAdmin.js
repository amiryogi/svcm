// Quick script to reset admin user
// Run with: node scripts/resetAdmin.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete existing admin
    const result = await mongoose.connection.db.collection('users').deleteMany({ role: 'admin' });
    console.log(`Deleted ${result.deletedCount} admin user(s)`);

    // Create new admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);

    await mongoose.connection.db.collection('users').insertOne({
      name: 'Admin',
      email: 'admin@svcm.edu.np',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('\n✅ New admin created!');
    console.log('Email: admin@svcm.edu.np');
    console.log('Password: Admin@123');
    console.log('\nYou can now login at /admin/login');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

resetAdmin();
