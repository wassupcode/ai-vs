require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai-assistant');

    const adminData = {
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: process.env.ADMIN_PASSWORD || 'securepassword123',
      name: process.env.ADMIN_NAME || 'System Admin',
      role: 'admin'
    };

    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Администратор уже существует:', existingAdmin.email);
      return process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    adminData.password = await bcrypt.hash(adminData.password, salt);

    const admin = new User(adminData);
    await admin.save();

    console.log('✅ Администратор успешно создан');
    console.log('Email:', admin.email);
    console.log('ID:', admin._id);

    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка при создании администратора:', error);
    process.exit(1);
  }
};

createAdmin();